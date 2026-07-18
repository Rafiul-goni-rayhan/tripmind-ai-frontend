"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, Trash2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { fetchChatHistory, sendChatMessage, clearChatHistory, ChatMessage } from "@/lib/api";

export default function ChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  useEffect(() => {
    if (isOpen && session?.user && messages.length === 0) {
      loadHistory();
    }
  }, [isOpen, session]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetchChatHistory();
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to load chat history", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride || input).trim();
    if (!text || sending) return;

    setInput("");
    setSuggestions([]);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);

    try {
      const res = await sendChatMessage(text);
      setMessages((prev) => [...prev, res.data]);
      setSuggestions(res.suggestions || []);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "দুঃখিত, উত্তর দিতে সমস্যা হয়েছে। আবার চেষ্টা করো।" },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("পুরো chat history মুছে ফেলতে চাও?")) return;
    await clearChatHistory();
    setMessages([]);
    setSuggestions([]);
  };

  if (!session?.user) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Open AI Chat Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[500px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-teal-600 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">TripMind AI Assistant</span>
            </div>
            <button onClick={handleClear} title="Clear chat" className="text-teal-100 hover:text-white">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {loadingHistory && (
              <p className="text-center text-xs text-slate-400">Loading conversation...</p>
            )}

            {!loadingHistory && messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center text-sm text-slate-400">
                <Sparkles className="mb-2 h-8 w-8 text-teal-300" />
                <p>হ্যালো! আমি TripMind AI Assistant।</p>
                <p>ট্রিপ প্ল্যানিং নিয়ে কিছু জিজ্ঞেস করো।</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Follow-up suggestions */}
          {suggestions.length > 0 && !sending && (
            <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 py-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="rounded-full bg-teal-50 px-3 py-1 text-xs text-teal-700 hover:bg-teal-100"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="তোমার প্রশ্ন লিখো..."
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={sending || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}