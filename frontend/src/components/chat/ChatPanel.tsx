"use client";

import {
  useEffect,
  useState,
} from "react";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

import { Document } from "@/types/document";
import { ChatMessage } from "@/types/chat";

import { askQuestion } from "@/services/ask-service";

interface Props {
  selectedDocument: Document | null;
}

const DEFAULT_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "📄 Upload a PDF\n🔍 Ask questions\n📚 View cited sources\n💬 Chat with your documents",
};

export default function ChatPanel({
  selectedDocument,
}: Props) {
  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>([
      DEFAULT_MESSAGE,
    ]);

  useEffect(() => {
    if (!selectedDocument) {
      setMessages([
        DEFAULT_MESSAGE,
      ]);
      return;
    }

    const savedChat =
      localStorage.getItem(
        `chat_${selectedDocument.document_id}`
      );

    if (savedChat) {
      setMessages(
        JSON.parse(savedChat)
      );
    } else {
      setMessages([
        DEFAULT_MESSAGE,
      ]);
    }
  }, [selectedDocument]);

  useEffect(() => {
    if (!selectedDocument) return;

    localStorage.setItem(
      `chat_${selectedDocument.document_id}`,
      JSON.stringify(messages)
    );
  }, [
    messages,
    selectedDocument,
  ]);

  const handleSend =
    async () => {
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
              "Something went wrong while processing your request.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

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
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6">

            <ChatMessages
              messages={messages}
            />

            {loading && (
              <div className="flex gap-2 px-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.2s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.4s]" />
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