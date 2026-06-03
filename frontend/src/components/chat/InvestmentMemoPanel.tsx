import ReactMarkdown from "react-markdown";

interface Props {
  memo: string;
}

export default function InvestmentMemoPanel({ memo }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="mb-8 text-4xl font-bold text-white">
        Investment Memo
      </h2>

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{memo}</ReactMarkdown>
      </div>
    </div>
  );
}