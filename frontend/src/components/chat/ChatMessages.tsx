"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

import { ChatMessage } from "@/types/chat";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessages({
  messages,
}: Props) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="space-y-8">

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

      <div ref={bottomRef} />

    </div>
  );
}