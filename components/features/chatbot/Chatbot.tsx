"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming";

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Button — clears mobile bottom nav */}
      <motion.div
        className="fixed bottom-24 right-4 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative p-3 rounded-full bg-ctp-base/60 border border-ctp-surface0/60 backdrop-blur-xl text-ctp-mauve shadow-lg hover:border-ctp-surface1 transition-colors"
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open AI assistant"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-ctp-red rounded-full" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-ctp-crust/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-md"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-112 max-h-[70vh] rounded-2xl border border-ctp-surface0/60 bg-ctp-base/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-3.5 border-b border-ctp-surface0/60">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-ctp-mauve/10 rounded-lg">
                      <Bot className="w-4 h-4 text-ctp-mauve" />
                    </div>
                    <div>
                      <h3 className="text-sm font-display font-semibold text-ctp-text">
                        AI Assistant
                      </h3>
                      <p className="text-[11px] text-ctp-overlay0">
                        Ask me about Sharif
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-ctp-surface0/60 rounded-lg transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 text-ctp-overlay0" />
                  </button>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-3 space-y-3"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {messages.length === 0 && (
                    <div className="text-center mt-10">
                      <Bot className="w-10 h-10 mx-auto mb-2 text-ctp-mauve/60" />
                      <p className="text-sm text-ctp-text font-medium mb-1">
                        Hi! I&apos;m SharifdotG&apos;s AI assistant
                      </p>
                      <p className="text-xs text-ctp-overlay0 max-w-xs mx-auto">
                        Ask me about his skills, projects, experience, or
                        anything else!
                      </p>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="shrink-0 w-6 h-6 bg-ctp-mauve/10 rounded-full flex items-center justify-center mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-ctp-mauve" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-ctp-mauve text-ctp-crust rounded-br-sm"
                            : "bg-ctp-surface0/50 text-ctp-text rounded-bl-sm"
                        }`}
                      >
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div
                                key={index}
                                className="space-y-1.5 wrap-break-word [&_code]:bg-ctp-crust/40 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_pre]:bg-ctp-crust/60 [&_pre]:p-2 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_li]:ml-4 [&_li]:list-disc"
                              >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {part.text}
                                </ReactMarkdown>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      {message.role === "user" && (
                        <div className="shrink-0 w-6 h-6 bg-ctp-surface0/50 rounded-full flex items-center justify-center mt-0.5">
                          <User className="w-3.5 h-3.5 text-ctp-text" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="shrink-0 w-6 h-6 bg-ctp-mauve/10 rounded-full flex items-center justify-center">
                        <Bot className="w-3.5 h-3.5 text-ctp-mauve" />
                      </div>
                      <div className="bg-ctp-surface0/50 px-3 py-2 rounded-xl rounded-bl-sm flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 bg-ctp-mauve rounded-full"
                            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleFormSubmit}
                  className="p-3 border-t border-ctp-surface0/60"
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-ctp-surface0/30 border border-ctp-surface0/60 rounded-lg text-ctp-text placeholder-ctp-overlay0 focus:outline-none focus:ring-2 focus:ring-ctp-mauve/50 focus:border-ctp-mauve transition-all text-sm disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input?.trim()}
                      className="shrink-0 p-2 bg-ctp-mauve hover:bg-ctp-pink text-ctp-crust rounded-lg transition-colors disabled:opacity-50"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
