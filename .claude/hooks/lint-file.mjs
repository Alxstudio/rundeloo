// PostToolUse hook: lints the edited file and reports errors back to Claude.
// Uses --stdin because route paths such as (app)/[id] are read as globs otherwise.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const LINTABLE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const root = path.resolve(import.meta.dirname, "..", "..");

const input = JSON.parse(readFileSync(0, "utf8"));
const raw = input.tool_input?.file_path ?? input.tool_response?.filePath;
if (!raw) process.exit(0);

const file = path.resolve(root, raw);
const relative = path.relative(root, file);
const insideProject = !relative.startsWith("..") && !path.isAbsolute(relative);

if (!insideProject || !LINTABLE.has(path.extname(file)) || !existsSync(file)) {
  process.exit(0);
}

const result = spawnSync(
  process.execPath,
  [
    path.join(root, "node_modules", "eslint", "bin", "eslint.js"),
    "--stdin",
    "--stdin-filename",
    file,
  ],
  { cwd: root, input: readFileSync(file), encoding: "utf8" },
);

if (result.status === 1) {
  process.stderr.write(`ESLint found errors:\n${result.stdout}`);
  process.exit(2);
}

if (result.status !== 0) {
  process.stderr.write(`ESLint could not run: ${result.stderr ?? result.error}\n`);
  process.exit(1);
}
