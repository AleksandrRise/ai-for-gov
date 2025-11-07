"use client"

import { useState } from 'react';
import  AppShell  from '../components/app-shell';
import  Hero from '../components/hero';
import  PromptBar  from '../components/prompt-bar-client';
import  SuggestionChips  from '../components/suggestion-chips';

export default function Page() {

  const [hasBegun, setHasBegun] = useState<boolean>(false)
  const [input, setInput] = useState<string>("");

  const mainClasses = `flex flex-col p-5 items-center min-h-screen text-slate-900 justify-center`

  return (
    <AppShell>
      <main className={mainClasses}>
        <div className="flex flex-col items-center text-center space-y-8">
          <Hero hasBegun={hasBegun} />
          <PromptBar input={input} setInput={setInput} hasBegun={hasBegun} setHasBegun={setHasBegun} />
          <SuggestionChips setInput={setInput} hasBegun={hasBegun} />
        </div>
        
      </main>
    </AppShell>
  );
}

