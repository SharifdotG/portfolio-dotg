"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "streaming";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative p-4 bg-ctp-mauve text-ctp-crust rounded-full shadow-2xl hover:bg-ctp-pink transition-all hover:scale-110 active:scale-95 group"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 0, opacity: 0 }}
              aria-label="Open AI assistant"
            >
              <MessageCircle className="w-6 h-6" />

              {/* Notification Pulse */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-ctp-red rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-ctp-crust/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            />

            {/* Chat Panel */}
            <motion.div
              className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="flex flex-col h-150 max-h-[80vh]" variant="elevated">
                {/* Header */}
                <motion.div
                  className="flex items-center justify-between p-4 border-b border-ctp-surface0 bg-linear-to-r from-ctp-mauve/10 to-ctp-pink/10"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 bg-ctp-mauve/20 rounded-full"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Bot className="w-5 h-5 text-ctp-mauve" />
                    </motion.div>
                    <div>
                      <h3 className="font-display font-semibold text-ctp-text">
                        AI Assistant
                      </h3>
                      <p className="text-xs text-ctp-subtext0">
                        Ask me about Sharif
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-ctp-surface0 rounded-lg transition-colors group"
                    aria-label="Close chat"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-ctp-subtext0 group-hover:text-ctp-text transition-colors" />
                  </motion.button>
                </motion.div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {messages.length === 0 && (
                    <motion.div
                      className="text-center mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Bot className="w-12 h-12 mx-auto mb-3 text-ctp-mauve" />
                      </motion.div>
                      <p className="text-ctp-text font-medium mb-2">
                        Hi! I&apos;m SharifdotG&apos;s AI assistant
                      </p>
                      <p className="text-sm text-ctp-subtext0 max-w-xs mx-auto">
                        Ask me about his skills, projects, experience, or anything else!
                      </p>
                    </motion.div>
                  )}

                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <motion.div
                          className="shrink-0 w-8 h-8 bg-ctp-mauve/20 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Bot className="w-4 h-4 text-ctp-mauve" />
                        </motion.div>
                      )}

                      <motion.div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-ctp-mauve text-ctp-crust rounded-br-sm"
                            : "bg-ctp-surface0 text-ctp-text rounded-bl-sm"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <ReactMarkdown
                                key={index}
                                remarkPlugins={[remarkGfm]}
                                className="text-sm leading-relaxed space-y-2 wrap-break-word [&_code]:bg-ctp-crust/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_pre]:bg-ctp-crust/60 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_li]:ml-4 [&_li]:list-disc"
                              >
                                {part.text}
                              </ReactMarkdown>
                            );
                          }
                          return null;
                        })}
                      </motion.div>

                      {message.role === "user" && (
                        <motion.div
                          className="shrink-0 w-8 h-8 bg-ctp-surface0 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                        >
                          <User className="w-4 h-4 text-ctp-text" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="shrink-0 w-8 h-8 bg-ctp-mauve/20 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-ctp-mauve" />
                      </div>
                      <div className="bg-ctp-surface0 p-3 rounded-2xl rounded-bl-sm">
                        <motion.div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-2 h-2 bg-ctp-mauve rounded-full"
                              animate={{
                                y: [0, -6, 0],
                                opacity: [0.4, 1, 0.4],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <motion.form
                  onSubmit={handleFormSubmit}
                  className="p-4 border-t border-ctp-surface0 bg-ctp-base/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-ctp-surface0 border border-ctp-surface1 rounded-xl text-ctp-text placeholder-ctp-subtext1 focus:outline-none focus:ring-2 focus:ring-ctp-mauve focus:border-transparent transition-all text-sm disabled:opacity-50"
                    />
                    <motion.button
                      type="submit"
                      disabled={isLoading || !input || !input.trim()}
                      className="shrink-0 p-2.5 bg-ctp-mauve hover:bg-ctp-pink text-ctp-crust rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
