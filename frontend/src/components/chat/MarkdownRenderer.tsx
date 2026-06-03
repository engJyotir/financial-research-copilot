"use client";

import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <div
      className="
        prose
        prose-invert
        max-w-none

        prose-headings:text-white
        prose-headings:font-semibold

        prose-h1:text-4xl
        prose-h1:mb-8

        prose-h2:text-2xl
        prose-h2:mt-12
        prose-h2:mb-4

        prose-h3:text-xl
        prose-h3:mt-8
        prose-h3:mb-3

        prose-p:text-zinc-300
        prose-p:leading-8

        prose-li:text-zinc-300
        prose-li:leading-8

        prose-strong:text-white

        prose-blockquote:border-zinc-700
        prose-blockquote:text-zinc-400

        prose-code:text-zinc-200

        prose-pre:border
        prose-pre:border-zinc-800
        prose-pre:bg-zinc-950

        prose-hr:border-zinc-800

        prose-table:border-zinc-800
        prose-th:text-white
        prose-td:text-zinc-300
      "
    >
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
}