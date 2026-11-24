// SPDX-License-Identifier: MIT
// Fortune Cookie Wisdom for Developers — entry program.
// Writes one original fortune-cookie line for a developer to /output/entry.txt.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "The bug you cannot reproduce already knows your name, and it is patient.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 120;

function emptyDir(dir: string): void {
  // Empty only the directory's contents; never remove the directory itself,
  // because the grader's /output is a mounted empty directory.
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const line = FORTUNE;
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `entry is ${line.length} characters; the gate is ${MIN_LENGTH}-${MAX_LENGTH}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line, "utf8");
  const written = readFileSync(target, "utf8");
  if (written !== line) {
    throw new Error("entry.txt does not match the fortune line");
  }
  console.log(`wrote ${target} (${written.length} characters)`);
}

main();
