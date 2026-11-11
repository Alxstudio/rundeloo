// PostToolUse hook: formats the edited file with Prettier, then lints it and reports errors back to Claude.
// Prettier runs through its API and ESLint through --stdin because route paths such as (app)/[id] are read as globs by both CLIs.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const LINTABLE = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const root = path.resolve(import.meta.dirname, "..", "..");

const input = JSON.parse(readFileSync(0, "utf8"));
const raw = input.tool_input?.file_path ?? input.tool_response?.filePath;
if (!raw) process.exit(0);

const file = path.resolve(root, raw);
const relative = path.relative(root, file);
const insideProject = !relative.startsWith("..") && !path.isAbsolute(relative);

if (!insideProject || !existsSync(file)) process.exit(0);

async function format() {
  const prettier = await import("prettier");
  const info = await prettier.getFileInfo(file, {
    ignorePath: path.join(root, ".prettierignore"),
  });
  if (info.ignored || !info.inferredParser) return;

  const source = readFileSync(file, "utf8");
  const options = await prettier.resolveConfig(file);
  const formatted = await prettier.format(source, {
    ...options,
    filepath: file,
  });
  if (formatted !== source) writeFileSync(file, formatted);
}

try {
  await format();
} catch (error) {
  process.stderr.write(`Prettier could not format ${relative}: ${error}\n`);
  process.exit(1);
}

if (!LINTABLE.has(path.extname(file))) process.exit(0);

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
  process.stderr.write(
    `ESLint could not run: ${result.stderr ?? result.error}\n`,
  );
  process.exit(1);
}
