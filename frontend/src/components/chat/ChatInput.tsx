"use client";

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
    <div className="border-t border-zinc-800 bg-zinc-950 px-8 py-5">
      <div className="mx-auto flex max-w-5xl gap-3">
        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
          placeholder="Ask a question about the selected document..."
          className="
            flex-1
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-900
            text-white
            px-5
            py-4
            outline-none
            placeholder:text-zinc-500
            focus:border-blue-500
            transition
          "
        />

        <button
          onClick={onSend}
          className="
            rounded-2xl
            bg-blue-600
            px-8
            py-4
            font-medium
            text-white
            transition
            hover:bg-blue-500
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}