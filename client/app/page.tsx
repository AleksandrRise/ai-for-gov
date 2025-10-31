import  AppShell  from '../components/app-shell';
import  Hero from '../components/hero';
import  PromptBar  from '../components/prompt-bar';
import  SuggestionChips  from '../components/suggestion-chips';
import  CTAArrow  from '../components/cta-arrow';
import  FooterTime  from '../components/footer-time';

export default function Page() {
  return (
    <AppShell>
      <main className="pb-28">
        <Hero />
        <PromptBar />
        <SuggestionChips />
        <CTAArrow />
        <FooterTime />
      </main>
    </AppShell>
  );
}

