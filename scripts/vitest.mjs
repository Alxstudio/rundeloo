// Starts Vitest from a cwd with an uppercase drive letter. On Windows, VS Code
// terminals open the project as c:\... and Vitest then loads itself twice, so
// every suite fails with "Cannot read properties of undefined (reading 'config')".
import { spawnSync } from "node:child_process";
import path from "node:path";

const upperDrive = (value) =>
  value.replace(/^[a-z]:/, (drive) => drive.toUpperCase());

const root = upperDrive(path.resolve(import.meta.dirname, ".."));
const vitest = path.join(root, "node_modules", "vitest", "vitest.mjs");

const { status } = spawnSync(
  process.execPath,
  [vitest, ...process.argv.slice(2)],
  { cwd: root, stdio: "inherit" },
);
process.exit(status ?? 1);
