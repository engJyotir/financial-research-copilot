import {
    Card,
    CardContent,
  } from "@/components/ui/card";
  
  import MarkdownRenderer from "./MarkdownRenderer";
  
  interface Props {
    analysis: string;
  }
  
  export default function CompanyIntelligencePanel({
    analysis,
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
  
          {/* Header */}
  
          <div className="mb-10">
  
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              Research Report
            </p>
  
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Company Intelligence
            </h2>
  
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
              AI-generated institutional research analysis
              based on the selected financial document.
            </p>
  
          </div>
  
          {/* Divider */}
  
          <div className="mb-10 border-t border-zinc-800" />
  
          {/* Report */}
  
          <MarkdownRenderer
            content={analysis}
          />
  
        </CardContent>
      </Card>
    );
  }