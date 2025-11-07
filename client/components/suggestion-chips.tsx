type SuggestionChipsType = {
  setInput: React.Dispatch<React.SetStateAction<string>>,
  hasBegun: boolean
}

export default function SuggestionChips({setInput, hasBegun}: SuggestionChipsType) {
  const chips = ['Recent Civic Issues', 'Evaluate Overall State', 'View Dataset Summary'];

  const chipsClasses = `mx-auto mt-8 max-w-4xl flex flex-wrap justify-center items-start gap-6
    ${hasBegun ? "opacity-0" : "opacity-100"} transition-opacity duration-400 ease-out`
  
  return (
    <div className={chipsClasses}>
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
