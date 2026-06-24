"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

const storageKey = "city-memory-candles-chat";
const greeting: ChatMessage = {
  role: "assistant",
  content: "Chào bạn, mình có thể tư vấn nến theo mùi hương, thành phố, giá hoặc tình trạng còn hàng."
};

function trimMemory(messages: ChatMessage[]) {
  const persistedMessages = messages.filter((message) => message !== greeting);
  return persistedMessages.slice(-6);
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedMessages = window.localStorage.getItem(storageKey);
    if (!storedMessages) return;

    try {
      const parsedMessages = JSON.parse(storedMessages) as ChatMessage[];
      if (Array.isArray(parsedMessages) && parsedMessages.length) {
        setMessages([greeting, ...parsedMessages.slice(-6)]);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(trimMemory(messages)));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const canSubmit = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  async function handleSubmit(event?: FormEvent<HTMLFormElement>, quickMessage?: string) {
    event?.preventDefault();
    const content = (quickMessage ?? input).trim();
    if (!content || isSending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: trimMemory(nextMessages) })
      });
      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            response.ok && data.success
              ? data.reply
              : data.message || "Mình chưa thể trả lời lúc này, bạn thử lại sau nhé."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "Kết nối chatbot đang lỗi, bạn thử lại sau nhé." }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {isOpen ? (
        <section className="mb-4 flex h-[min(620px,calc(100vh-6rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-md border border-cocoa/15 bg-porcelain shadow-soft">
          <header className="flex items-center justify-between border-b border-cocoa/10 bg-cocoa px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/12">
                <Bot size={20} />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Tư vấn nến thơm</h2>
                <p className="text-xs text-white/70">Dựa trên dữ liệu sản phẩm của shop</p>
              </div>
            </div>
            <button
              type="button"
              className="focus-ring grid h-9 w-9 place-items-center rounded-full text-white transition hover:bg-white/12"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "max-w-[86%] rounded-md px-3 py-2 text-sm leading-6",
                  message.role === "user"
                    ? "ml-auto bg-cocoa text-white"
                    : "mr-auto border border-cocoa/10 bg-white text-cocoa"
                )}
              >
                {message.content}
              </div>
            ))}
            {isSending ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-md border border-cocoa/10 bg-white px-3 py-2 text-sm text-cocoa/65">
                <Loader2 size={16} className="animate-spin" />
                Đang trả lời...
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-cocoa/10 bg-white/70 p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {["Nến nào còn hàng?", "Giá sản phẩm?", "Tư vấn mùi nhẹ"].map((quickMessage) => (
                <button
                  key={quickMessage}
                  type="button"
                  className="rounded-full border border-cocoa/15 bg-white px-3 py-1.5 text-xs font-medium text-cocoa transition hover:border-cocoa"
                  onClick={() => handleSubmit(undefined, quickMessage)}
                  disabled={isSending}
                >
                  {quickMessage}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={1}
                placeholder="Nhập câu hỏi..."
                className="focus-ring max-h-24 min-h-11 flex-1 resize-none rounded-md border border-cocoa/15 bg-white px-3 py-2 text-sm text-cocoa placeholder:text-cocoa/40"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-cocoa text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-cocoa/35"
                aria-label="Gửi tin nhắn"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        className="focus-ring relative grid h-14 w-14 place-items-center rounded-full bg-cocoa text-white shadow-soft transition hover:bg-ink"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Mở chatbot"
      >
        <MessageCircle size={25} />
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-porcelain bg-clay" />
      </button>
    </div>
  );
}
