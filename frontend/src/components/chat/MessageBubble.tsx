"use client";

import { ChatMessage } from "@/types/chat";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({
  message,
}: Props) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
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

        {!isUser &&
          message.sources &&
          message.sources.length >
            0 && (
            <div className="mt-4 border-t border-zinc-700 pt-3">
              <p className="mb-2 text-xs font-semibold text-zinc-400">
                Sources
              </p>

              {message.sources.map(
                (
                  source: any,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="mb-2 rounded-lg bg-zinc-800 p-3"
                  >
                    <p className="text-xs font-semibold text-zinc-200">
                      Page{" "}
                      {source.page ??
                        0}
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {
                        source.preview
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}