"use client";

import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  analysis: string;
}

export default function CompanyIntelligencePanel({
  analysis,
}: Props) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      <h2 className="mb-6 text-5xl font-bold text-white">
        AI Company Intelligence
      </h2>

      <MarkdownRenderer
        content={analysis}
      />
    </div>
  );
}