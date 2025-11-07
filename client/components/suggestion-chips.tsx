type SuggestionChipsType = {
  setInput: React.Dispatch<React.SetStateAction<string>>
}

export default function SuggestionChips({setInput}: SuggestionChipsType) {
  const chips = ['Recent Civic Issues', 'Evaluate Overall State', 'View Dataset Summary'];
  
  return (
    <div className="mx-auto mt-8 max-w-4xl flex flex-wrap justify-center items-start gap-6">
      {chips.map((c, i) => (
        <button
          key={c}
          className={`bg-[#BDD8FF] rounded-4xl px-8 py-4 shadow-soft hover:translate-y-[-1px] transition
            cursor-pointer
            ${i === 1 ? 'mt-20' : ''}
          `}
          onClick={() => setInput(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
