import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  revenue: string;
  netIncome: string;
  assets: string;
  equity: string;
}

export default function FinancialDashboard({
  revenue,
  netIncome,
  assets,
  equity,
}: Props) {
  const cards = [
    {
      label: "Revenue",
      value: revenue,
      description:
        "Total reported revenue",
    },
    {
      label: "Net Income",
      value: netIncome,
      description:
        "Earnings after expenses",
    },
    {
      label: "Assets",
      value: assets,
      description:
        "Total reported assets",
    },
    {
      label: "Equity",
      value: equity,
      description:
        "Shareholder equity",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="
            group
            overflow-hidden
            border
            border-zinc-800
            bg-gradient-to-b
            from-zinc-950
            to-zinc-900
            transition-all
            duration-300
            hover:border-zinc-700
            hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]
          "
        >
          <CardContent className="p-6">

            <p
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-zinc-500
              "
            >
              {card.label}
            </p>

            <h3
              className="
                mt-4
                text-3xl
                font-semibold
                tracking-tight
                text-white
              "
            >
              {card.value}
            </h3>

            <div
              className="
                mt-4
                h-px
                bg-gradient-to-r
                from-zinc-800
                via-zinc-700
                to-transparent
              "
            />

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-zinc-500
              "
            >
              {card.description}
            </p>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}