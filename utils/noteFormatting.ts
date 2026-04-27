export type NoteBlock =
  | {
      type: "heading";
      level: 1 | 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      ordered: boolean;
      items: string[];
    };

const latexReplacements: Array<[RegExp, string]> = [
  [/\\Delta\s*\\Phi_B/g, "change in magnetic flux"],
  [/\\Delta\s*Phi_B/g, "change in magnetic flux"],
  [/\\Phi_B/g, "magnetic flux"],
  [/\\Delta\s*t/g, "change in time"],
  [/\\Delta/g, "change in"],
  [/\\times/g, "x"],
  [/\\cdot/g, "x"],
  [/\\div/g, "/"],
  [/\\pm/g, "+/-"],
  [/\\leq/g, "<="],
  [/\\geq/g, ">="],
  [/\\neq/g, "!="],
  [/\\approx/g, "approximately"],
  [/\\alpha/g, "alpha"],
  [/\\beta/g, "beta"],
  [/\\gamma/g, "gamma"],
  [/\\theta/g, "theta"],
  [/\\lambda/g, "lambda"],
  [/\\mu/g, "mu"],
  [/\\pi/g, "pi"],
  [/\\sigma/g, "sigma"],
  [/\\omega/g, "omega"],
  [/\\Omega/g, "ohm"],
  [/\\left/g, ""],
  [/\\right/g, ""],
  [/\\,/g, " "],
  [/\$/g, ""],
];

export function normalizeNoteContent(content: string) {
  let normalized = content.replace(/\r\n?/g, "\n").replace(/\t/g, "  ");

  for (let pass = 0; pass < 4; pass += 1) {
    const next = normalized.replace(
      /\\frac\s*{([^{}]+)}\s*{([^{}]+)}/g,
      "($1 / $2)",
    );
    if (next === normalized) break;
    normalized = next;
  }

  latexReplacements.forEach(([pattern, replacement]) => {
    normalized = normalized.replace(pattern, replacement);
  });

  return normalized
    .replace(/\\([A-Za-z]+)\s*{([^{}]+)}/g, "$2")
    .replace(/\\([A-Za-z]+)/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/[ \u00a0]+/g, " ")
    .trim();
}

export function stripInlineMarkdown(text: string) {
  return normalizeNoteContent(text)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function getHeading(line: string): NoteBlock | null {
  const markdownHeading = line.match(/^(#{1,3})\s+(.+)$/);
  if (markdownHeading) {
    return {
      type: "heading",
      level: Math.min(markdownHeading[1].length, 3) as 1 | 2 | 3,
      text: stripInlineMarkdown(markdownHeading[2]),
    };
  }

  const plainHeading = line.match(/^\*\*([^*]{2,80})\*\*:?\s*$/);
  if (plainHeading) {
    return {
      type: "heading",
      level: 3,
      text: stripInlineMarkdown(plainHeading[1]),
    };
  }

  if (
    line.endsWith(":") &&
    line.length <= 72 &&
    !/[.!?]\s*:$/u.test(line) &&
    line.split(/\s+/).length <= 8
  ) {
    return {
      type: "heading",
      level: 3,
      text: stripInlineMarkdown(line.slice(0, -1)),
    };
  }

  return null;
}

export function parseNoteBlocks(content: string): NoteBlock[] {
  const lines = normalizeNoteContent(content).split("\n");
  const blocks: NoteBlock[] = [];
  let currentList: NoteBlock | null = null;

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    const unordered = line.match(/^[-*\u2022]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      const orderedList = Boolean(ordered);
      const item = ((unordered || ordered)?.[1] ?? "").trim();

      if (!currentList || currentList.type !== "list" || currentList.ordered !== orderedList) {
        flushList();
        currentList = { type: "list", ordered: orderedList, items: [] };
      }

      currentList.items.push(item);
      return;
    }

    flushList();
    const heading = getHeading(line);
    if (heading) {
      blocks.push(heading);
      return;
    }

    blocks.push({
      type: "paragraph",
      text: line,
    });
  });

  flushList();
  return blocks;
}
