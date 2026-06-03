"use client";

import { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-5
          py-4
          shadow-md
          ${
            isUser
              ? "bg-blue-600 text-white"
              : "border border-zinc-800 bg-zinc-900 text-white"
          }
        `}
      >
        <p className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-5 border-t border-zinc-700 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Sources
            </p>

            <div className="grid gap-3">
              {message.sources.map((source: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-700 bg-black p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Source {index + 1}
                    </span>

                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      Page {source.page ?? 0}
                    </span>
                  </div>

                  <p className="line-clamp-4 text-sm leading-relaxed text-zinc-400">
                    {source.preview}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}