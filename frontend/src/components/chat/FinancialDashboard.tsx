interface Props {
    data: any;
  }
  
  export default function FinancialDashboard({ data }: Props) {
    if (!data) {
      return null;
    }
  
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h2 className="mb-8 text-4xl font-bold text-white">
          Company Intelligence
        </h2>
  
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="text-sm text-zinc-400">Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {data.revenue || "N/A"}
            </p>
          </div>
  
          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="text-sm text-zinc-400">Net Income</h3>
            <p className="mt-2 text-3xl font-bold text-blue-400">
              {data.net_income || "N/A"}
            </p>
          </div>
  
          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="text-sm text-zinc-400">Sentiment</h3>
            <p className="mt-2 text-2xl font-bold text-yellow-400">
              {data.sentiment || "Neutral"}
            </p>
          </div>
  
          <div className="rounded-xl bg-zinc-800 p-6">
            <h3 className="text-sm text-zinc-400">Recommendation</h3>
            <p className="mt-2 text-2xl font-bold text-purple-400">
              {data.recommendation || "HOLD"}
            </p>
          </div>
        </div>
  
        <div className="mt-10">
          <h3 className="mb-4 text-2xl font-semibold text-white">
            Strengths
          </h3>
  
          <ul className="space-y-2 text-zinc-300">
            {(data.strengths || []).map((item: string, index: number) => (
              <li key={index}>✓ {item}</li>
            ))}
          </ul>
        </div>
  
        <div className="mt-10">
          <h3 className="mb-4 text-2xl font-semibold text-white">
            Risks
          </h3>
  
          <ul className="space-y-2 text-zinc-300">
            {(data.risks || []).map((item: string, index: number) => (
              <li key={index}>⚠ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }