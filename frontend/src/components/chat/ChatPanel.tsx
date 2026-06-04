"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import SummaryPanel from "./SummaryPanel";
import CompanyIntelligencePanel from "./CompanyIntelligencePanel";
import InvestmentMemoPanel from "./InvestmentMemoPanel";
import FinancialDashboard from "./FinancialDashboard";

import { Document } from "@/types/document";
import { ChatMessage } from "@/types/chat";

import { askQuestion } from "@/services/ask-service";
import { generateSummary } from "@/services/summary-service";
import { getFinancialAnalysis } from "@/services/financial-analysis-service";
import { generateInvestmentMemo } from "@/services/investment-memo-service";
import { getChatHistory } from "@/services/chat-history-service";

interface Props {
  selectedDocument: Document | null;
}

export default function ChatPanel({
  selectedDocument,
}: Props) {
  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [summaryLoading, setSummaryLoading] =
    useState(false);

  const [analysisLoading, setAnalysisLoading] =
    useState(false);

  const [memoLoading, setMemoLoading] =
    useState(false);

  const [summary, setSummary] =
    useState("");

  const [companyAnalysis, setCompanyAnalysis] =
    useState("");

  const [investmentMemo, setInvestmentMemo] =
    useState("");

  const [dashboardData, setDashboardData] =
    useState({
      revenue: "Not Found",
      netIncome: "Not Found",
      assets: "Not Found",
      equity: "Not Found",
    });

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        role: "assistant",
        content:
          "Welcome to Financial Research Copilot. Upload or select a financial document and begin your analysis.",
      },
    ]);

  const chatBottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadChatHistory() {
      if (!selectedDocument) return;

      try {
        const history =
          await getChatHistory(
            selectedDocument.document_id
          );

        if (
          history &&
          history.length > 0
        ) {
          setMessages(history);
        } else {
          setMessages([
            {
              role: "assistant",
              content:
                "Welcome to Financial Research Copilot. Upload or select a financial document and begin your analysis.",
            },
          ]);
        }
      } catch (error) {
        console.error(error);

        setMessages([
          {
            role: "assistant",
            content:
              "Welcome to Financial Research Copilot. Upload or select a financial document and begin your analysis.",
          },
        ]);
      }
    }

    loadChatHistory();
  }, [selectedDocument]);

  useEffect(() => {
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, [messages, loading]);

  async function handleGenerateSummary() {
    if (!selectedDocument) {
      alert("Select a document first.");
      return;
    }

    try {
      setSummaryLoading(true);

      const response =
        await generateSummary(
          selectedDocument.document_id
        );

      setSummary(
        response.summary
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSummaryLoading(false);
    }
  }

  async function handleFinancialAnalysis() {
    if (!selectedDocument) {
      alert("Select a document first.");
      return;
    }

    try {
      setAnalysisLoading(true);

      const response =
        await getFinancialAnalysis(
          selectedDocument.document_id
        );

      setCompanyAnalysis(
        response.analysis
      );

      if (
        response.metrics
      ) {
        setDashboardData({
          revenue:
            response.metrics.revenue ??
            "Not Found",

          netIncome:
            response.metrics.net_income ??
            "Not Found",

          assets:
            response.metrics.assets ??
            "Not Found",

          equity:
            response.metrics.equity ??
            "Not Found",
        });
      }

    } catch (error) {
      console.error(error);
    } finally {
      setAnalysisLoading(false);
    }
  }

  async function handleGenerateInvestmentMemo() {
    if (!selectedDocument) {
      alert("Select a document first.");
      return;
    }

    try {
      setMemoLoading(true);

      const response =
        await generateInvestmentMemo(
          selectedDocument.document_id
        );

      setInvestmentMemo(
        response.memo
      );
    } catch (error) {
      console.error(error);
    } finally {
      setMemoLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim()) return;

    if (!selectedDocument) {
      alert(
        "Please select a document first."
      );

      return;
    }

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setInput("");

    try {
      setLoading(true);

      const response =
        await askQuestion(
          selectedDocument.document_id,
          question
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.answer,
          sources:
            response.sources,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to process request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#09090b]">

      <div className="border-b border-zinc-800 bg-[#09090b]">

        <div className="mx-auto max-w-7xl px-10 py-8">

          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Institutional Research Platform
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            Financial Research Copilot
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
            Analyze financial statements,
            filings, investment reports and
            research documents using AI.
          </p>

          {selectedDocument && (
            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={
                  handleGenerateSummary
                }
                disabled={
                  summaryLoading
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-900
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-zinc-800
                "
              >
                {summaryLoading
                  ? "Generating..."
                  : "Executive Summary"}
              </button>

              <button
                onClick={
                  handleFinancialAnalysis
                }
                disabled={
                  analysisLoading
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-900
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-zinc-800
                "
              >
                {analysisLoading
                  ? "Analyzing..."
                  : "Financial Analysis"}
              </button>

              <button
                onClick={
                  handleGenerateInvestmentMemo
                }
                disabled={
                  memoLoading
                }
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-900
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-zinc-800
                "
              >
                {memoLoading
                  ? "Generating..."
                  : "Investment Memo"}
              </button>

            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">

        <div className="mx-auto max-w-7xl space-y-8 px-10 py-8">

          {companyAnalysis && (
            <FinancialDashboard
              revenue={
                dashboardData.revenue
              }
              netIncome={
                dashboardData.netIncome
              }
              assets={
                dashboardData.assets
              }
              equity={
                dashboardData.equity
              }
            />
          )}

          {summary && (
            <SummaryPanel
              summary={summary}
            />
          )}

          {companyAnalysis && (
            <CompanyIntelligencePanel
              analysis={
                companyAnalysis
              }
            />
          )}

          {investmentMemo && (
            <InvestmentMemoPanel
              memo={investmentMemo}
            />
          )}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950">

            <div className="border-b border-zinc-800 px-6 py-5">

              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Research Assistant
              </p>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Research Chat
              </h2>

            </div>

            <div
              className="
                max-h-[600px]
                overflow-y-auto
                p-6
              "
            >

              <div className="flex flex-col gap-5">

                {messages.map(
                  (
                    message,
                    index
                  ) => (
                    <MessageBubble
                      key={index}
                      message={message}
                    />
                  )
                )}

                {loading && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
                    Thinking...
                  </div>
                )}

                <div
                  ref={chatBottomRef}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />

    </div>
  );
}