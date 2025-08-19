export type CommitType =
  | "feat"
  | "fix"
  | "docs"
  | "refactor"
  | "test"
  | "chore";

export const COMMIT_TYPES: CommitType[] = [
  "feat",
  "fix",
  "docs",
  "refactor",
  "test",
  "chore",
];

export interface DiffInfo {
  filesChanged: Array<{
    path: string;
    additions: number;
    deletions: number;
    status: "A" | "M" | "D" | "R" | "C" | "T" | "U";
  }>;
  raw: string;
}

export interface BuildMessageInput {
  type: CommitType;
  scope?: string;
  subject: string;
  body?: string;
  breaking?: string | boolean;
}

export function buildConventionalMessage(input: BuildMessageInput): string {
  const scopePart = input.scope ? `(${sanitizeInline(input.scope)})` : "";
  const breakingBang = input.breaking && typeof input.breaking === "boolean" ? "!" : "";
  const header = `${input.type}${breakingBang}${scopePart}: ${sanitizeInline(input.subject)}`;

  const body = input.body ? sanitizeBody(input.body) : "";
  const breakingBlock = typeof input.breaking === "string" && input.breaking.trim().length > 0
    ? `\n\nBREAKING CHANGE: ${sanitizeBody(input.breaking)}`
    : "";

  return [header, body, breakingBlock].filter(Boolean).join("\n\n");
}

function sanitizeInline(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function sanitizeBody(value: string): string {
  // Preserve paragraphs but strip control characters
  return value.replace(/[\r]+/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

export function inferScopeFromPathList(paths: string[]): string | undefined {
  if (paths.length === 0) return undefined;
  // If monorepo, use first segment (e.g., packages/name)
  const first = paths[0];
  const segments = first.split("/");
  if (segments[0] === "packages" && segments.length >= 2) return segments[1];
  // Otherwise top-level folder
  return segments[0] || undefined;
}

export function classifyChangeTypes(paths: string[]): CommitType {
  // Simple heuristics; can be improved later. Prefer most significant type.
  const hasTests = paths.some((p) => /(^|\/)test(s)?\//.test(p) || /\.test\./.test(p));
  if (hasTests) return "test";
  const hasDocs = paths.some((p) => /(^|\/)docs\//.test(p) || /README\.md$/i.test(p));
  if (hasDocs) return "docs";
  const hasFix = paths.some((p) => /(fix|bug)/i.test(p));
  if (hasFix) return "fix";
  const hasRefactor = paths.some((p) => /(refactor|cleanup)/i.test(p));
  if (hasRefactor) return "refactor";
  const hasChore = paths.every((p) => /(config|\.\w+rc|\.json|yaml|yml)/i.test(p));
  if (hasChore) return "chore";
  return "feat";
}

export function parseGitNumstat(numstat: string): DiffInfo {
  // Safe parser for `git diff --cached --numstat --name-status`
  const filesChanged: DiffInfo["filesChanged"] = [];
  const lines = numstat.split("\n");
  for (const line of lines) {
    if (!line.trim()) continue;
    // numstat format: additions<TAB>deletions<TAB>path
    const parts = line.split("\t");
    if (parts.length < 3) continue;
    const [addStr, delStr, path] = parts;
    const additions = parseInt(addStr, 10) || 0;
    const deletions = parseInt(delStr, 10) || 0;
    filesChanged.push({ path, additions, deletions, status: "M" });
  }
  return { filesChanged, raw: numstat };
}

export function buildSuggestedMessageFromDiff(diff: DiffInfo): {
  type: CommitType;
  scope?: string;
  suggestedSubject: string;
} {
  const paths = diff.filesChanged.map((f) => f.path);
  const type = classifyChangeTypes(paths);
  const scope = inferScopeFromPathList(paths);
  const suggestedSubject = generateSubjectFromPaths(paths);
  return { type, scope, suggestedSubject };
}

function generateSubjectFromPaths(paths: string[]): string {
  if (paths.length === 0) return "update";
  if (paths.length === 1) {
    const name = paths[0].split("/").slice(-1)[0];
    return `update ${name}`;
  }
  const top = inferScopeFromPathList(paths) ?? "repo";
  return `update ${top} (${paths.length} files)`;
}

