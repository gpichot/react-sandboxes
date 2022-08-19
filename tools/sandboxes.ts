import glob from "glob";
import path from "path";
import groupBy from "lodash/groupBy";
import chalk from "chalk";

const sandboxes = glob.sync("sandboxes/*/*/package.json");

type PackageDependencies = { [key: string]: string };

async function getSandboxDetail(sandboxPackageJsonFilePath: string) {
  const absPath = path.resolve(process.cwd(), sandboxPackageJsonFilePath);
  const packageJson = await import(absPath);
  const [_, category, slug] = sandboxPackageJsonFilePath.split("/");
  const { name, description, dependencies } = packageJson as {
    name: string;
    description: string;
    dependencies: PackageDependencies;
  };
  return { name, description, category, slug, dependencies };
}

function getPackageVersion<T extends { dependencies: PackageDependencies }>(
  packageName: string,
  details: T
): string | null {
  if (packageName in details.dependencies) {
    return details.dependencies[packageName] || null;
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

Promise.all(sandboxes.map(getSandboxDetail)).then((sandboxesDetails) => {
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
