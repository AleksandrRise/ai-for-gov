import  AppShell  from '../components/app-shell';
import  Hero from '../components/hero';
import  PromptBar  from '../components/prompt-bar';
import  SuggestionChips  from '../components/suggestion-chips';
import  FooterTime  from '../components/footer-time';

export default function Page() {
  return (
    <AppShell>
      <main className="flex flex-col justify-center items-center min-h-screen text-slate-900">
        <div className="flex flex-col items-center text-center space-y-8">
          <Hero />
          <PromptBar />
          <SuggestionChips />
        </div>

        <FooterTime />
      </main>
    </AppShell>
  );
}

