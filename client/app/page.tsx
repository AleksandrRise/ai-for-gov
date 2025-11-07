"use client"

import { useState } from 'react';
import  AppShell  from '../components/app-shell';
import  Hero from '../components/hero';
import  PromptBar  from '../components/prompt-bar-client';
import  SuggestionChips  from '../components/suggestion-chips';

export default function Page() {

  const [input, setInput] = useState<string>("");

  return (
    <AppShell>
      <main className="flex flex-col justify-center items-center min-h-screen text-slate-900">
        <div className="flex flex-col items-center text-center space-y-8">
          <Hero />
          <PromptBar input={input} setInput={setInput}/>
          <SuggestionChips setInput={setInput} />
        </div>
        
      </main>
    </AppShell>
  );
}

