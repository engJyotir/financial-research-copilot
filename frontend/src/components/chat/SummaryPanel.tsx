interface Props {
    summary: string;
  }
  
  export default function SummaryPanel({
    summary,
  }: Props) {
    return (
      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
  
        <h2 className="mb-4 text-xl font-semibold text-white">
          Executive Summary
        </h2>
  
        <div className="whitespace-pre-wrap text-zinc-300">
          {summary}
        </div>
  
      </div>
    );
  }