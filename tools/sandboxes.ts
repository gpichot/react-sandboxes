import glob from "glob";
import path from "path";
import groupBy from "lodash/groupBy";
import chalk from "chalk";
import fs from "fs/promises";
import semver from "semver";

const sandboxes = glob.sync("sandboxes/*/*/package.json");

const Config = {
  CheckTypesCommand: "tsc --noEmit --project tsconfig.json",
  Repository: "gpichot/react-sandboxes",
};

type PackageDependencies = { [key: string]: string };
type PackageScripts = { [key: string]: string };

type PackageJson = {
  name: string;
  description: string;
  keywords: string[];
  dependencies: PackageDependencies;
  devDependencies: PackageDependencies;
  scripts: PackageScripts;
  default: any;
};

async function getSandboxDetail(sandboxPackageJsonFilePath: string) {
  try {
    const absPath = path.resolve(process.cwd(), sandboxPackageJsonFilePath);

    const { default: __, ...packageJson }: PackageJson = await import(absPath);
    const [_, category, slug] = sandboxPackageJsonFilePath.split("/");
    const { name, description } = packageJson as {
      name: string;
      description: string;
      dependencies: PackageDependencies;
      scripts: PackageScripts;
    };
    return {
      name,
      description,
      category,
      slug,
      packageJsonFilePath: absPath,
      packageJson,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

type NonNull<T> = T extends null | undefined ? never : T;
type SandboxDetails = NonNull<Awaited<ReturnType<typeof getSandboxDetail>>>;

function checkSandboxDetails(sandbox: SandboxDetails) {
  if (sandbox.packageJson.scripts["types:check"] !== Config.CheckTypesCommand) {
    console.log(
      chalk.red(`${sandbox.name}: command types:check is not up-to-date`)
    );
  }
}

function getPackageVersion(
  packageName: string,
  details: SandboxDetails
): string | null {
  if (packageName in details.packageJson.dependencies) {
    return details.packageJson.dependencies[packageName] || null;
  }
  return null;
}

function ensureVersion(currentVersion: string | null, expectedVersion: string) {
  if (!currentVersion) return "-";
  if (currentVersion !== expectedVersion) {
    return chalk.red(currentVersion);
  }
  return chalk.green(currentVersion);
}

function createReadme(sandbox: SandboxDetails) {
  const title = "Open in CodeSandbox";
  const urlBadge =
    'https://img.shields.io/badge/Open-in%20CodeSandbox-blue?style=for-the-badge&logo=codesandbox"';
  const urlBox = `https://githubbox.com/${Config.Repository}/tree/main/sandboxes/${sandbox.category}/${sandbox.slug}`;

  return `[![${title}](${urlBadge})](${urlBox})`;
}

async function fixPackageJson(sandbox: SandboxDetails) {
  let modified = false;
  const reactVersion = semver.parse(getPackageVersion("react", sandbox));

  if (sandbox.packageJson.scripts["types:check"] !== Config.CheckTypesCommand) {
    sandbox.packageJson.scripts["types:check"] = Config.CheckTypesCommand;
    modified = true;
  }

  if (!sandbox.packageJson.devDependencies["@types/react"]) {
    if (reactVersion) {
      const version = {
        17: "17.0.39",
        18: "18.0.17",
      }[reactVersion.major];
      if (version) {
        sandbox.packageJson.devDependencies["@types/react"] = version;
        modified = true;
      }
    }
  }

  const readmeFilePath = `sandboxes/${sandbox.category}/${sandbox.slug}/README.md`;
  try {
    await fs.stat(readmeFilePath);
  } catch (e) {
    if ((e as { code?: string }).code === "ENOENT") {
      fs.writeFile(readmeFilePath, createReadme(sandbox));
      modified = true;
    }
  }

  if (modified) {
    const content = JSON.stringify(sandbox.packageJson, null, 2);
    if (!content) return sandbox;
    await fs.writeFile(sandbox.packageJsonFilePath, content);
  }

  return sandbox;
}

Promise.all(sandboxes.map(getSandboxDetail))
  .then((sandboxes) => {
    const validSandboxes = sandboxes.filter(
      (sandbox) => sandbox !== null
    ) as unknown as SandboxDetails[];
    return Promise.all(validSandboxes.map(fixPackageJson));
  })
  .then((sandboxesDetails) => {
    sandboxesDetails.forEach(checkSandboxDetails);
    const byCategory = groupBy(sandboxesDetails, (x) => x.category);
    for (const [category, sandboxes] of Object.entries(byCategory)) {
      console.log(chalk.bold.underline(category));
      for (const sandbox of sandboxes) {
        const isExercise = sandbox.packageJson.keywords.includes("exercise");
        const fields = [
          isExercise ? "⚽" : "  ",
          chalk.bold(sandbox.name).padEnd(70, " "),
          chalk.dim(sandbox.description || " ").padEnd(80, " "),
          getPackageVersion("react", sandbox),
          getPackageVersion("react-dom", sandbox),
          ensureVersion(getPackageVersion("react-scripts", sandbox), "5.0.0"),
          getPackageVersion("typescript", sandbox),
          sandbox.packageJson.keywords.join(","),
        ];
        console.log(`  ${fields.join(" ")}`);
      }
      console.log();
    }
  });
