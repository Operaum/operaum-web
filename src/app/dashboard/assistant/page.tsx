"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Send } from "lucide-react";
import { ChatMessage } from "@/types/message";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi, I'm your Operaum AI assistant. Ask me about your leads, listings, or schedule — I can help you prioritize your day.",
    timestamp: "9:00 AM",
  },
];

const mockResponses = [
  "Based on your pipeline, Sarah Mitchell and David Kim are your newest leads — I'd recommend reaching out to them first today.",
  "You have 3 showings scheduled this week across Langley and White Rock. Want me to draft follow-up emails for after each one?",
  "Your listing at 27 Harbor Point has had strong interest — consider scheduling an open house this weekend.",
  "I can help you draft a follow-up message, summarize a lead's history, or check your calendar. What would be most useful right now?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const response: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, response]);
    }, 700);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardContent
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto p-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="mt-1 h-8 w-8">
                <AvatarFallback
                  className={
                    message.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }
                >
                  {message.role === "assistant" ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    "You"
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p>{message.content}</p>
                <p className="mt-1 text-xs opacity-60">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="flex items-center gap-2 border-t border-border p-3">
          <Input
            placeholder="Ask about leads, listings, or your schedule..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}