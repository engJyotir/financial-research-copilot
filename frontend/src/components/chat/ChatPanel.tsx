"use client";

import { useState } from "react";

import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import SummaryPanel from "./SummaryPanel";
import CompanyIntelligencePanel from "./CompanyIntelligencePanel";
import InvestmentMemoPanel from "./InvestmentMemoPanel";

import { Document } from "@/types/document";
import { ChatMessage } from "@/types/chat";

import { askQuestion } from "@/services/ask-service";
import { generateSummary } from "@/services/summary-service";
import { getFinancialAnalysis } from "@/services/financial-analysis-service";
import { generateInvestmentMemo } from "@/services/investment-memo-service";

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

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        role: "assistant",
        content:
          "Welcome to Financial Research Copilot.\n\nSelect a document from the sidebar and ask a question.",
      },
    ]);

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

      alert(
        "Failed to generate summary."
      );

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

    } catch (error) {

      console.error(error);

      alert(
        "Failed to analyze document."
      );

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

      alert(
        "Failed to generate investment memo."
      );

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
          content: response.answer,
          sources: response.sources,
        },
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while processing your request.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="flex h-screen flex-col bg-black">

      <div className="border-b border-zinc-800 px-8 py-6">

        <h1 className="text-5xl font-bold text-white">
          Financial Research Copilot
        </h1>

        <p className="mt-2 text-zinc-400">
          {selectedDocument
            ? selectedDocument.filename
            : "No document selected"}
        </p>

        {selectedDocument && (

          <div className="mt-6 flex flex-wrap gap-4">

            <button
              onClick={handleGenerateSummary}
              disabled={summaryLoading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              {summaryLoading
                ? "Generating..."
                : "Generate Executive Summary"}
            </button>

            <button
              onClick={handleFinancialAnalysis}
              disabled={analysisLoading}
              className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              {analysisLoading
                ? "Analyzing..."
                : "Analyze Financials"}
            </button>

            <button
              onClick={handleGenerateInvestmentMemo}
              disabled={memoLoading}
              className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
            >
              {memoLoading
                ? "Generating..."
                : "Generate Investment Memo"}
            </button>

          </div>

        )}

      </div>

      <div className="flex-1 overflow-y-auto p-8">

        <div className="mx-auto max-w-6xl space-y-8">

          {summary && (
            <SummaryPanel
              summary={summary}
            />
          )}

          {companyAnalysis && (
            <CompanyIntelligencePanel
              analysis={companyAnalysis}
            />
          )}

          {investmentMemo && (
            <InvestmentMemoPanel
              memo={investmentMemo}
            />
          )}

          <div className="flex flex-col gap-6">

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

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-400">
                Thinking...
              </div>

            )}

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