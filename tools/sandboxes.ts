import glob from "glob";
import path from "path";
import groupBy from "lodash/groupBy";
import chalk from "chalk";
import fs from "fs/promises";
import semver from "semver";

const sandboxes = glob.sync("sandboxes/*/*/package.json");

type PackageDependencies = { [key: string]: string };
type PackageScripts = { [key: string]: string };

type PackageJson = {
  name: string;
  description: string;
  dependencies: PackageDependencies;
  devDependencies: PackageDependencies;
  scripts: PackageScripts;
};

async function getSandboxDetail(sandboxPackageJsonFilePath: string) {
  const absPath = path.resolve(process.cwd(), sandboxPackageJsonFilePath);
  const packageJson: PackageJson = await import(absPath);
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
}

type SandboxDetails = Awaited<ReturnType<typeof getSandboxDetail>>;

const Config = {
  CheckTypesCommand: "tsc --noEmit --project tsconfig.json",
};

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

  if (modified) {
    await fs.writeFile(
      sandbox.packageJsonFilePath,
      JSON.stringify(sandbox.packageJson, null, 2)
    );
  }

  return sandbox;
}

Promise.all(sandboxes.map(getSandboxDetail))
  .then((sandboxes) => {
    return Promise.all(sandboxes.map(fixPackageJson));
  })
  .then((sandboxesDetails) => {
    sandboxesDetails.forEach(checkSandboxDetails);
    const byCategory = groupBy(sandboxesDetails, (x) => x.category);
    for (const [category, sandboxes] of Object.entries(byCategory)) {
      console.log(chalk.bold.underline(category));
      for (const sandbox of sandboxes) {
        const fields = [
          chalk.bold(sandbox.name).padEnd(70, " "),
          chalk.dim(sandbox.description).padEnd(70, " "),
          getPackageVersion("react", sandbox),
          getPackageVersion("react-dom", sandbox),
          ensureVersion(getPackageVersion("react-scripts", sandbox), "5.0.0"),
          getPackageVersion("typescript", sandbox),
        ];
        console.log(`  ${fields.join(" ")}`);
      }
      console.log();
    }
  });
