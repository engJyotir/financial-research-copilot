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
          max-w-[85%]

          ${
            isUser
              ? "rounded-2xl bg-zinc-800 px-5 py-4 text-white"
              : ""
          }
        `}
      >
        {!isUser && (
          <div className="mb-3">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
              AI Assistant
            </p>
          </div>
        )}

        <div
          className={`
            whitespace-pre-wrap
            text-sm
            leading-8

            ${
              isUser
                ? "text-white"
                : "text-zinc-300"
            }
          `}
        >
          {message.content}
        </div>

        {!isUser &&
          message.sources &&
          message.sources.length >
            0 && (
            <div className="mt-8">

              <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Sources
                </p>
              </div>

              <div className="space-y-3">

                {message.sources.map(
                  (
                    source: any,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-950
                        p-4
                      "
                    >
                      <div className="flex items-center justify-between">

                        <span className="text-sm font-medium text-white">
                          Source{" "}
                          {index + 1}
                        </span>

                        <span
                          className="
                            rounded-full
                            border
                            border-zinc-800
                            px-3
                            py-1
                            text-xs
                            text-zinc-500
                          "
                        >
                          Page{" "}
                          {source.page ??
                            0}
                        </span>

                      </div>

                      <p className="mt-3 text-sm leading-7 text-zinc-400">
                        {
                          source.preview
                        }
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>
          )}
      </div>
    </div>
  );
}