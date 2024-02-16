import glob from "glob";
import path from "path";
import groupBy from "lodash/groupBy";
import chalk from "chalk";
import fs from "fs/promises";
import semver from "semver";

const sandboxes = glob.sync("sandboxes/*/*/package.json");

const Config = {
  CheckTypesCommand: "tsc --noEmit --project tsconfig.json",
  LintCommand: "eslint --fix",
  FormatCommand: "prettier --write src",
  Repository: "gpichot/react-sandboxes",
  Dev: "vite",
  Build: "vite build",
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
  default: unknown;
};

async function getSandboxDetail(sandboxPackageJsonFilePath: string) {
  try {
    const absPath = path.resolve(process.cwd(), sandboxPackageJsonFilePath);

    const { default: __, ...packageJson }: PackageJson = await import(absPath);
    const [_, category, slug] = sandboxPackageJsonFilePath.split("/");
    const { name, description } = packageJson as {
      name: string;
      keywords: string[];
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

// function ensureVersion(currentVersion: string | null, expectedVersion: string) {
//   if (!currentVersion) return "-";
//   if (currentVersion !== expectedVersion) {
//     return chalk.red(currentVersion);
//   }
//   return chalk.green(currentVersion);
// }

function createReadme(sandbox: SandboxDetails) {
  const title = "Open in CodeSandbox";
  const urlBadge =
    'https://img.shields.io/badge/Open-in%20CodeSandbox-blue?style=for-the-badge&logo=codesandbox"';
  const urlBox = `https://githubbox.com/${Config.Repository}/tree/main/sandboxes/${sandbox.category}/${sandbox.slug}`;

  return `[![${title}](${urlBadge})](${urlBox})`;
}

/**
 *
 * [1,2,3] and [2,4] = [4]
 * [1,2,3] and [2,3] = []
 * [] and [1,2] = [1,2]
 */
function arrayDiff(actual: string[], expected: string[]) {
  return expected.filter((e) => !actual.includes(e));
}

async function fixPackageJson(sandbox: SandboxDetails) {
  let modified = false;
  const reactVersion = semver.parse(getPackageVersion("react", sandbox));

  const diffKeywords = arrayDiff(sandbox.packageJson.keywords, [
    "sandbox",
    "react",
    ...(sandbox.category ? [sandbox.category] : []),
  ]);
  if (diffKeywords.length > 0) {
    sandbox.packageJson.keywords = [
      ...sandbox.packageJson.keywords,
      ...diffKeywords,
    ];
    modified = true;
  }

  if (sandbox.packageJson.scripts["types:check"] !== Config.CheckTypesCommand) {
    sandbox.packageJson.scripts["types:check"] = Config.CheckTypesCommand;
    modified = true;
  }

  if (sandbox.packageJson.scripts["lint"] !== Config.LintCommand) {
    sandbox.packageJson.scripts["lint"] = Config.LintCommand;
    modified = true;
  }

  if (sandbox.packageJson.scripts["format"] !== Config.FormatCommand) {
    sandbox.packageJson.scripts["format"] = Config.FormatCommand;
    modified = true;
  }

  if (sandbox.packageJson.scripts["dev"] !== Config.Dev) {
    sandbox.packageJson.scripts["dev"] = Config.Dev;
    modified = true;
  }

  if (sandbox.packageJson.scripts["build"] !== Config.Build) {
    sandbox.packageJson.scripts["build"] = Config.Build;
    modified = true;
  }

  if (sandbox.packageJson.scripts['start']) {
    delete sandbox.packageJson.scripts['start'];
    modified = true;
  }

  if (sandbox.packageJson.devDependencies["typescript"] !== "^5.3.3") {
    sandbox.packageJson.devDependencies["typescript"] = "^5.3.3";
    modified = true;
  }

  if (sandbox.packageJson.devDependencies["@types/node"] !== "^18.0.9") {
    sandbox.packageJson.devDependencies["@types/node"] = "^18.0.9";
    modified = true;
  }

  if (sandbox.packageJson.dependencies["react-scripts"]) {
    delete sandbox.packageJson.dependencies["react-scripts"];
    modified = true;
  }

  if (!sandbox.packageJson.devDependencies["@types/react"]) {
    if (reactVersion) {
      const version = {
        17: "17.0.39",
        18: "18.2.0",
      }[reactVersion.major];
      if (version) {
        sandbox.packageJson.devDependencies["@types/react"] = version;
        modified = true;
      }
    }
  }

  if (!sandbox.packageJson.devDependencies["@types/react-dom"]) {
    if (reactVersion) {
      const version = {
        17: "17.0.11",
        18: "18.2.0",
      }[reactVersion.major];
      if (version) {
        sandbox.packageJson.devDependencies["@types/react-dom"] = version;
        modified = true;
      }
    }
  }

  if (sandbox.packageJson.devDependencies["vite"] !== "^5.1.1") {
    sandbox.packageJson.devDependencies["vite"] = "^5.1.1";
    modified = true;
  }

  const readmeFilePath = `sandboxes/${sandbox.category}/${sandbox.slug}/README.md`;
  try {
    await fs.stat(readmeFilePath);
  } catch (e) {
    if ((e as { code?: string }).code === "ENOENT") {
      fs.writeFile(readmeFilePath, createReadme(sandbox));
    }
  }

  if (modified) {
    const content = JSON.stringify(sandbox.packageJson, null, 2);
    if (!content) return sandbox;
    await fs.writeFile(sandbox.packageJsonFilePath, content);
  }

  return sandbox;
}

function getSandboxKind(sandbox: SandboxDetails) {
  if (sandbox.packageJson.keywords.includes("example")) {
    return "example";
  }
  if (sandbox.packageJson.keywords.includes("exercise")) {
    return "exercise";
  }
  return null;
}

function getSandboxIcon(sandbox: "example" | "exercise") {
  return {
    exercise: "🏈",
    example: "🔭",
  }[sandbox];
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
        const sandboxKind = getSandboxKind(sandbox);
        const icon = (sandboxKind ? getSandboxIcon(sandboxKind) : " ").padEnd(
          3,
          " "
        );
        const fields = [
          icon,
          chalk.bold(sandbox.name).padEnd(70, " "),
          chalk.dim(sandbox.description || " ").padEnd(80, " "),
          getPackageVersion("react", sandbox),
          getPackageVersion("react-dom", sandbox),
          getPackageVersion("vite", sandbox),
          getPackageVersion("typescript", sandbox),
          sandbox.packageJson.keywords.join(","),
        ];
        console.log(`  ${fields.join(" ")}`);
      }
      console.log();
    }

    return updateIndexReadme(byCategory);
  });

async function updateIndexReadme(byCategory: {
  [key: string]: SandboxDetails[];
}) {
  const readmeFilePath = path.resolve(__dirname, "..", "README.md");

  const startText = "<!-- START_SANDBOXES -->";
  const endText = "<!-- END_SANDBOXES -->";

  const readme = await fs.readFile(readmeFilePath, "utf8");
  const start = readme.indexOf(startText);
  const end = readme.indexOf(endText);

  const before = readme.substring(0, start);
  const after = readme.substring(end + endText.length);

  const lines = [];
  for (const [category, sandboxes] of Object.entries(byCategory)) {
    lines.push(`### ${category}\n`);
    lines.push("|   | Description | Link |");
    lines.push("|---|---|---|");
    for (const sandbox of sandboxes) {
      const sandboxKind = getSandboxKind(sandbox);
      const icon = sandboxKind ? getSandboxIcon(sandboxKind) : " ";
      const fields = [icon, sandbox.description, createReadme(sandbox)];

      lines.push("| " + fields.join(" | ") + " |");
    }
    lines.push("");
  }
  const newContent = `${before}${startText}\n\n${lines.join(
    "\n"
  )}\n\n${endText}${after}`;

  return fs.writeFile(readmeFilePath, newContent);
}
