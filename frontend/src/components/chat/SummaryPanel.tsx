import {
  Card,
  CardContent,
} from "@/components/ui/card";

import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  summary: string;
}

export default function SummaryPanel({
  summary,
}: Props) {
  return (
    <Card
      className="
        border-zinc-800
        bg-zinc-950
        shadow-none
      "
    >
      <CardContent className="p-10">

        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Executive Briefing
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Executive Summary
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
            High-level overview of the selected document,
            generated to help analysts quickly understand
            key business, financial and investment insights.
          </p>

        </div>

        <div className="mb-10 border-t border-zinc-800" />

        {summary ? (
          <MarkdownRenderer
            content={summary}
          />
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="text-zinc-400">
              Generate an executive summary to view key insights.
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}