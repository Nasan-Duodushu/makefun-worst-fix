// Worst Fix Ever — one commit-message line for a fix that made everything worse.
// The program writes exactly one line to /output/entry.txt (UTF-8, 1-100 chars).
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 100;

function buildMessage(): string {
  // The joke is the paradox in one breath: the repair itself became the defect.
  const subject = "fix";
  const twist = "the bug is fixed; the fix is now the bug";
  const line = `${subject}: ${twist}`;
  if (!line.startsWith("fix:")) throw new Error("not a commit subject");
  return line;
}

function validate(line: string): void {
  if (line.length === 0 || line.length > LIMIT) {
    throw new Error(`entry must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("entry must be a single unpadded line");
  }
}

const entry = buildMessage();
validate(entry);
mkdirSync(OUTPUT_DIR, { recursive: true });
const target = join(OUTPUT_DIR, "entry.txt");
writeFileSync(target, entry, { encoding: "utf8", mode: 0o644 });
chmodSync(target, 0o644);
console.log(`${entry.length} chars -> ${target}`);
