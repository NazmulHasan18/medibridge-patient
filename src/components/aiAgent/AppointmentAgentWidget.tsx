// features/ai-agent/components/AppointmentAgentWidget.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Bot, Send, X, Sparkles } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type Message = { role: "user" | "assistant"; content: string };

export function AppointmentAgentWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const token = session?.token || session?.user.token;
  // Display messages (role + string content only)
  const [displayMessages, setDisplayMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm MediBot 👋 I can help you find a doctor and book an appointment. What brings you in today?",
    },
  ]);
  // Full API message history (sent to backend each turn)
  const [apiMessages, setApiMessages] = useState<{ content: string; role: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (userText: string) => {
      const updatedApiMessages = [
        ...apiMessages,
        {
          role: "user",
          content: userText,
        },
      ];

      const { data } = await axiosInstance.post(
        "/ai-agent/chat",
        { messages: updatedApiMessages },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        assistant: data.data,
        updatedApiMessages,
      };
    },

    onSuccess: ({ assistant, updatedApiMessages }) => {
      console.log({ assistant, updatedApiMessages });
      setApiMessages([...updatedApiMessages, assistant]);

      setDisplayMessages((prev) => [
        ...prev,
        {
          role: assistant.role,
          content: assistant.content,
        },
      ]);
    },

    onError: () => {
      toast.error("MediBot ran into an issue, please try again.");
    },
  });

  const handleSend = () => {
    if (!input.trim() || isPending) return;
    const text = input.trim();
    setInput("");
    setDisplayMessages((prev) => [...prev, { role: "user", content: text }]);
    sendMessage(text);
  };

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">MediBot</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[300px] h-[500px] md:w-[380px] md:h-[560px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-600 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold text-sm">MediBot — Appointment Assistant</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4 opacity-80 hover:opacity-100" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="flex flex-col gap-3">
              {displayMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap
                      ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100  rounded-bl-sm"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isPending && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="e.g. I need a cardiologist next Monday..."
              className="focus-visible:ring-0 rounded-lg border-blue-400 bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-blue-400 hover:bg-accent"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={isPending || !input.trim()}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
