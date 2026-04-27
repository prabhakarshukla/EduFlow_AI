import type { ReactNode } from "react";
import { parseNoteBlocks } from "@/utils/noteFormatting";

type FormattedNoteProps = {
  content: string;
  emptyText?: string;
};

function renderInlineText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`)/g);

  return parts
    .filter(Boolean)
    .map((part, index) => {
      const bold = part.match(/^(?:\*\*([^*]+)\*\*|__([^_]+)__)$/);
      if (bold) {
        return (
          <strong key={`${part}-${index}`} className="font-semibold">
            {bold[1] || bold[2]}
          </strong>
        );
      }

      const code = part.match(/^`([^`]+)`$/);
      if (code) {
        return (
          <code
            key={`${part}-${index}`}
            className="rounded px-1.5 py-0.5 text-[0.92em]"
            style={{
              background: "rgba(110,231,216,0.08)",
              color: "var(--ui-heading)",
            }}
          >
            {code[1]}
          </code>
        );
      }

      return part;
    });
}

export function FormattedNote({ content, emptyText = "No content available." }: FormattedNoteProps) {
  const blocks = parseNoteBlocks(content);

  if (blocks.length === 0) {
    return (
      <p className="text-sm italic" style={{ color: "var(--ui-muted)" }}>
        {emptyText}
      </p>
    );
  }

  return (
    <div className="space-y-4 break-words text-sm leading-7" style={{ color: "var(--ui-text)" }}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const sizeClass =
            block.level === 1
              ? "text-xl"
              : block.level === 2
                ? "text-lg"
                : "text-base";

          return (
            <h2
              key={`${block.type}-${index}`}
              className={`${sizeClass} font-bold leading-snug`}
              style={{ color: "var(--ui-heading)", letterSpacing: 0 }}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={`${block.type}-${index}`}
              className={`space-y-2 pl-5 ${block.ordered ? "list-decimal" : "list-disc"}`}
              style={{ color: "var(--ui-text)" }}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`} className="pl-1">
                  {renderInlineText(item)}
                </li>
              ))}
            </ListTag>
          );
        }

        return (
          <p key={`${block.type}-${index}`} style={{ color: "var(--ui-text)", lineHeight: 1.75 }}>
            {renderInlineText(block.text)}
          </p>
        );
      })}
    </div>
  );
}
