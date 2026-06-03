"use client";

import { ArrowUp } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
}: Props) {
  return (
    <div className="border-t border-zinc-800 bg-[#09090b] px-6 py-5">

      <div className="mx-auto max-w-6xl">

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            px-4
            py-3
          "
        >

          <input
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Ask about revenue, risks, growth drivers, valuation..."
            className="
              flex-1
              bg-transparent
              text-sm
              text-white
              outline-none
              placeholder:text-zinc-500
            "
          />

          <button
            onClick={onSend}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-white
              text-black
              transition
              hover:bg-zinc-200
            "
          >
            <ArrowUp
              size={16}
            />
          </button>

        </div>

        <p className="mt-3 text-center text-xs text-zinc-600">
          AI responses are generated from the selected document.
        </p>

      </div>

    </div>
  );
}