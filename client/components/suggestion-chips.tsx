export default function SuggestionChips() {
  const chips = ['Summarize a PDF', 'Draft an email', 'Plan a trip'];
  return (
    <div className="mx-auto mt-8 max-w-4xl flex flex-wrap gap-6 justify-center">
      {chips.map((c) => (
        <button
          key={c}
          className="bg-cloud rounded-pill px-8 py-4 shadow-soft hover:translate-y-[-1px] transition"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
