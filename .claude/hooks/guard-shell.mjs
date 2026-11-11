// PreToolUse guard for Bash and PowerShell. Exit code 2 cancels the command.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const BOUNDARY = "$|[\\s\"'`)|;&>,]";

const ENV_FILE = new RegExp(
  `(?:^|[\\s"'\`=/\\\\(<>|;&:])\\.env(?!\\.example(?:${BOUNDARY}))(?:[.*?][\\w.*?-]*)?(?=${BOUNDARY})`,
);

const GIT_COMMIT = /\bgit\b[^;&|\n]*\scommit\b/;

const SUPABASE_REMOTE_WRITE =
  /\bsupabase(?:\.exe)?\s+(?:db\s+(?:push|reset)|migration\s+(?:up|repair)|functions\s+(?:deploy|delete)|secrets\s+(?:set|unset)|projects\s+(?:create|delete)|branches\s+(?:create|delete|update)|orgs\s+create)\b/;

const PROTECTED_BRANCHES = new Set(["main", "develop"]);

function block(reason) {
  process.stderr.write(`Blocked by .claude/hooks/guard-shell.mjs: ${reason}\n`);
  process.exit(2);
}

function currentBranch(cwd) {
  try {
    return execFileSync("git", ["branch", "--show-current"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  block("could not read the command, so it was not allowed to run.");
}

const command = input.tool_input?.command ?? "";

if (ENV_FILE.test(command)) {
  block("this command touches a .env file. Only .env.example may be accessed.");
}

if (SUPABASE_REMOTE_WRITE.test(command)) {
  block(
    "this Supabase CLI command changes the remote project. Alex runs those.",
  );
}

if (GIT_COMMIT.test(command)) {
  const branch = currentBranch(input.cwd ?? process.cwd());
  if (PROTECTED_BRANCHES.has(branch)) {
    block(
      `commits on ${branch} are not allowed. Create a working branch first.`,
    );
  }
}
