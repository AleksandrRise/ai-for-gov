"use client";

import React, { useState } from "react";
import Image from "next/image";

type Message = { from: "user" | "ai"; text: string };
type PromptBarClientType = {
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>
  hasBegun: boolean,
  setHasBegun: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PromptBarClient({input, setInput, hasBegun, setHasBegun}: PromptBarClientType) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const send = async () => {
  setHasBegun(true);
  const prompt = input.trim();
  if (!prompt) return;

  setMessages(m => [...m, { from: "user", text: prompt }]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      let serverMsg = "";
      try {
        const errJson = await res.json();
        serverMsg = errJson?.error || JSON.stringify(errJson);
      } catch {
        serverMsg = await res.text();
      }
      setMessages(m => [...m, { from: "ai", text: `Error ${res.status}: ${serverMsg || "Request failed"}` }]);
      return;
    }

    const data = await res.json();
    const aiText: string = data?.text ?? "(no response)";
    setMessages(m => [...m, { from: "ai", text: aiText }]);
  } catch (err: any) {
    setMessages(m => [...m, { from: "ai", text: `Network error: ${err?.message || err}` }]);
  } finally {
    setLoading(false);
  }
};


  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  const promptClasses = `bg-[#BDD8FF] rounded-4xl px-4 py-3 shadow-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    transform transition-all duration-1000 ease-in-out w-1/2
  ${hasBegun ? "translate-y-[30vh]" : ""}`

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <div className="space-y-4 mb-4">
        {messages.map((m: Message, i: number) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                m.from === "user" ? "bg-white text-slate-900" : "bg-[#BDD8FF] text-slate-900"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className={promptClasses}>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center">
            <input type="file" aria-label="Attach" className="hidden" />
            <Image src="/img/attach.png" alt="attach" width={20} height={20} />
          </label>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask anything…"
            className="flex-1 w-fit bg-transparent outline-none placeholder:text-slate-500"
          />

          <button aria-label="Voice" className="cursor-pointer">
            <Image src="/img/voice-icon.png" alt="voice" width={20} height={20} />
          </button>

          <button
            onClick={send}
            disabled={loading}
            className="ml-1 cursor-pointer rounded-full bg-[#66A8FF] text-white px-4 py-2 flex items-center gap-2 disabled:opacity-50"
            aria-label="Send"
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
