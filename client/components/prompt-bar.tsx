export default function PromptBar() {
  return (
    <div className="mx-auto mt-10 max-w-4xl bg-[#BDD8FF] rounded-4xl">
      <div className="flex items-center gap-3 bg-cloud rounded-pill px-5 py-4 shadow-soft">
        <button aria-label="Attach">Attach</button>
        <input
          placeholder="Ask anything…"
          className="flex-1 bg-transparent outline-none placeholder:text-slate-500"
        />
        <button aria-label="Voice">Voice</button>
        <button
          className="ml-1 rounded-full bg-[#66A8FF] text-white px-4 py-2 flex items-center gap-2"
          aria-label="Send"
        >
          Send
        </button>
      </div>
    </div>
  );
}
