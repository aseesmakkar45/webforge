"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface Message {
  id: string;
  sender: "user" | "model";
  text: string;
  attachment?: {
    name: string;
    type: string;
  };
  timestamp: Date;
}

const suggestedPrompts = [
  { title: "Review Resume Copy", prompt: "Evaluate the structure and metrics of my resume copy for readability." },
  { title: "Build Study Schedule", prompt: "Create a 6-week progressive study plan for learning Next.js App Router." },
  { title: "Draft Medical Advisory", prompt: "Summarize common indicators and precautions regarding high blood pressure warnings." },
  { title: "Clean JSON Data Structure", prompt: "Take this messy text and format it into a standardized JSON API envelope." },
];

export default function AIWorkspacePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "model",
      text: "Hello! I am your abstract AI Assistant. Select one of the suggested prompt templates or enter your query below to get started. You can also drag or upload code/documents.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: "msg_" + Math.random().toString(36).substr(2, 9),
      sender: "user",
      text: textToSend,
      attachment: selectedFile ? { name: selectedFile.name, type: selectedFile.type } : undefined,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setSelectedFile(null);
    setGenerating(true);

    // Mock AI response loop
    setTimeout(() => {
      const modelMessage: Message = {
        id: "msg_" + Math.random().toString(36).substr(2, 9),
        sender: "model",
        text: `Here is a template-driven mock response confirming your input: "${textToSend}". Under a live setting, this gets posted to the POST /api/v1/ai/chat endpoint on your backend branch.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, modelMessage]);
      setGenerating(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleExport = () => {
    const chatLog = messages
      .map((m) => `[${m.sender === "user" ? "USER" : "AI"}] - ${m.text}`)
      .join("\n\n");
    const blob = new Blob([chatLog], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `saas_chat_export_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Sidebar>
      <div className="flex h-[calc(100vh-8rem)] flex-col lg:flex-row gap-6">
        
        {/* Left column: Suggested templates & Chat Actions */}
        <div className="flex w-full lg:w-80 flex-col gap-5 flex-shrink-0">
          <div className="glass-panel p-6 rounded-xl border border-zinc-900">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Suggested Prompts</h3>
            <p className="text-xs text-text-muted mt-1 mb-4">Quick inserts to customize the context</p>
            
            <div className="space-y-3">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(p.prompt);
                    handleSend(p.prompt);
                  }}
                  className="w-full text-left p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70 text-xs transition-colors"
                >
                  <p className="font-semibold text-white truncate">{p.title}</p>
                  <p className="text-text-secondary line-clamp-2 mt-1 leading-relaxed">{p.prompt}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl border border-zinc-900 flex justify-between items-center">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Conversation Log</h4>
              <p className="text-[11px] text-text-muted mt-0.5">Export chat context locally</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export Chat
            </Button>
          </div>
        </div>

        {/* Right column: Main chat area */}
        <div className="glass-panel rounded-xl border border-zinc-900 flex-1 flex flex-col overflow-hidden relative">
          
          {/* Messages Scrolling Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xl rounded-xl p-4 text-sm leading-relaxed border ${
                      msg.sender === "user"
                        ? "bg-primary text-white border-primary/20 shadow-md shadow-primary-glow"
                        : "bg-zinc-900/60 text-zinc-100 border-zinc-800"
                    }`}
                  >
                    {msg.attachment && (
                      <div className="mb-2 flex items-center gap-2 rounded-lg bg-black/30 p-2 text-xs border border-white/5">
                        <span>📎</span>
                        <span className="truncate max-w-[150px] font-semibold">{msg.attachment.name}</span>
                      </div>
                    )}
                    <p>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {generating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 flex items-center gap-2 text-xs text-text-muted">
                  <div className="flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-75">●</span>
                    <span className="animate-bounce delay-150">●</span>
                  </div>
                  <span>AI Workspace generating response...</span>
                </div>
              </motion.div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Entry Form */}
          <div className="border-t border-zinc-900 bg-zinc-950/40 p-4">
            <div className="flex flex-col gap-3">
              
              {/* File Attachment bar */}
              {selectedFile && (
                <div className="flex items-center justify-between rounded-lg bg-zinc-900/80 px-3 py-1.5 text-xs border border-zinc-800">
                  <span className="truncate max-w-[200px]">Selected: {selectedFile.name}</span>
                  <button onClick={() => setSelectedFile(null)} className="text-text-secondary hover:text-white">✕</button>
                </div>
              )}

              <div className="flex items-center gap-3">
                {/* File Upload Selector */}
                <label className="cursor-pointer rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 p-3 hover:bg-zinc-900/70 transition-colors flex-shrink-0 flex items-center justify-center">
                  <span className="text-base">📎</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>

                {/* Input Text Box */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Enter custom instruction or prompt..."
                  className="flex-1 rounded-lg bg-zinc-900/60 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-text-muted focus:border-primary focus:outline-none transition-colors"
                />

                {/* Send Button */}
                <Button size="md" onClick={() => handleSend()} className="flex-shrink-0">
                  Send
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Sidebar>
  );
}
