// Have You Tried Turning It Off? — make.fun entry.
// A program/v1 entry: it writes one funny line to /output/entry.txt.
// The line is a single reply from a hopeless tech support agent to a
// desperate customer. The joke lives in the agent's cheerful uselessness:
// he has exactly one move, and he performs it like a ritual, dragging the
// customer into pretending along with him. The customer's desperation is
// felt in "hold your breath", never explained, and the classic
// turn-it-off-and-on-again gets a twist: it becomes a shared pretence,
// a plan that both of them know is not a plan.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Let's turn it off and on again — I'll count to ten, you hold your breath, and we'll both pretend that's a plan.";

// One line means one line: collapse any stray line break or double space
// before the gate check, so the text the judge reads is exactly the text
// written here.
const ENTRY = LINE.replace(/\s+/g, " ").trim();
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry line must be a single line");
}

// The gate: /output/entry.txt must be UTF-8 text of 1 to 199 characters,
// not only white space. Refuse to write anything outside that range so a
// broken line can never reach the judge.
if (ENTRY.length < 1 || ENTRY.length > 199 || ENTRY.trim().length === 0) {
  throw new Error(`entry line is ${ENTRY.length} characters; must be 1-199`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, ENTRY, "utf8");

// Read it back: the file the judge scores must byte-match the line above.
const written = readFileSync(target, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${ENTRY.length} characters to ${target}`);
console.log(ENTRY);
