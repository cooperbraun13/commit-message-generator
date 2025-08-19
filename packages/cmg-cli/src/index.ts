#!/usr/bin/env node
import { Command } from "commander";
import { spawnSync } from "node:child_process";
import { buildConventionalMessage, parseGitNumstat, buildSuggestedMessageFromDiff, COMMIT_TYPES } from "@cmg/core";

function runGit(args: string[]): { status: number; stdout: string; stderr: string } {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, GIT_PAGER: "cat" },
  });
  return { status: result.status ?? 1, stdout: result.stdout || "", stderr: result.stderr || "" };
}

async function readStagedDiffNumstat(): Promise<string> {
  const { status, stdout, stderr } = runGit(["diff", "--cached", "--numstat"]);
  if (status !== 0) {
    throw new Error(`git diff failed: ${stderr.trim()}`);
  }
  return stdout;
}

async function ensureStagedChanges(): Promise<void> {
  const { status, stdout } = runGit(["diff", "--name-only", "--cached"]);
  if (status !== 0) throw new Error("Failed to check staged changes");
  if (!stdout.trim()) {
    throw new Error("No staged changes. Stage files before running cmg.");
  }
}

async function promptForMessage() {
  const { default: inquirer } = await import('inquirer');
  type Answers = {
    type: string;
    scope?: string;
    subject: string;
    body?: string;
    breaking?: string;
    commitNow: boolean;
  };
  await ensureStagedChanges();
  const numstat = await readStagedDiffNumstat();
  const diff = parseGitNumstat(numstat);
  const suggestion = buildSuggestedMessageFromDiff(diff);

  const answers: Answers = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Select commit type",
      default: suggestion.type,
      choices: COMMIT_TYPES,
    },
    {
      type: "input",
      name: "scope",
      message: "Scope (optional)",
      default: suggestion.scope,
      filter: (v: string) => (v?.trim() ? v.trim() : undefined),
    },
    {
      type: "input",
      name: "subject",
      message: "Short description",
      default: suggestion.suggestedSubject,
      validate: (v: string) => (!!v && v.trim().length > 0 ? true : "Subject is required"),
    },
    {
      type: "editor",
      name: "body",
      message: "Body (optional) - closes editor to save",
    },
    {
      type: "input",
      name: "breaking",
      message: "BREAKING CHANGE description (leave empty if none)",
      filter: (v: string) => (v?.trim() ? v.trim() : undefined),
    },
    {
      type: "confirm",
      name: "commitNow",
      message: "Create commit now?",
      default: true,
    },
  ]);

  const message = buildConventionalMessage({
    type: answers.type as any,
    scope: answers.scope,
    subject: answers.subject,
    body: answers.body,
    breaking: answers.breaking || false,
  });

  if (answers.commitNow) {
    const { status, stderr } = runGit(["commit", "-m", message]);
    if (status !== 0) {
      console.error("git commit failed:\n" + stderr.trim());
      process.exit(status);
    }
    console.log("Commit created.");
  } else {
    console.log("\n--- Commit Message ---\n" + message + "\n----------------------\n");
  }
}

async function main() {
  const program = new Command();
  program
    .name("cmg")
    .description("Commit Message Generator - conventional commits helper")
    .version("0.1.0");

  program
    .command("commit")
    .description("Interactive commit flow")
    .action(async () => {
      try {
        await promptForMessage();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(msg);
        process.exit(1);
      }
    });

  program
    .command("print")
    .description("Print suggested message without committing")
    .action(async () => {
      try {
        await ensureStagedChanges();
        const numstat = await readStagedDiffNumstat();
        const diff = parseGitNumstat(numstat);
        const suggestion = buildSuggestedMessageFromDiff(diff);
        const message = buildConventionalMessage({
          type: suggestion.type,
          scope: suggestion.scope,
          subject: suggestion.suggestedSubject,
        });
        console.log(message);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(msg);
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

main();

