// Fortune in a Pot — one fortune line for the houseplant on this windowsill.
//
// The sun has picked this plant: warm mornings ahead, one proud new leaf,
// and a human who finally waters on time. Kind, warm, and a little funny —
// the way a gardener of thirty years would smile at a plant the sun chose.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FORTUNE =
  "The windowsill sun has picked you: warm mornings ahead, one proud new leaf, and a human who finally waters on time.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // The fortune must be exactly one line, 1-120 characters, no trailing
  // newline and no stray whitespace around it.
  const chars = [...FORTUNE];
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(
      `Fortune must be 1-120 characters, got ${chars.length}.`,
    );
  }
  if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
    throw new Error("Fortune must be a single line.");
  }
  if (FORTUNE !== FORTUNE.trim()) {
    throw new Error("Fortune must not have leading or trailing whitespace.");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, FORTUNE, "utf8");

  // Read the file back and verify it matches byte-for-byte, with the
  // same length in Unicode code points — a single line, no trailing
  // newline, no stray whitespace.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== FORTUNE) {
    throw new Error("Written fortune does not match the expected text.");
  }
  if ([...written].length !== chars.length) {
    throw new Error("Written fortune has an unexpected character count.");
  }
}

main();
