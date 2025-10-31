import Image from "next/image";
import voice_icon from "@/public/img/voice-icon.png";
import attach_icon from "@/public/img/attach.png";

export default function PromptBar() {
  return (
    <div className="mx-auto mt-10 max-w-4xl bg-[#BDD8FF] rounded-4xl">
      <div className="flex items-center gap-3 bg-cloud rounded-pill px-5 py-4 shadow-soft">
        {/* File upload button */}
        <label className="cursor-pointer flex items-center">
          <input
            type="file"
            aria-label="Attach"
            className="hidden"
          />
          <Image src={attach_icon} alt="attach" width={20} height={20} />
        </label>

        <input
          placeholder="Ask anything…"
          className="flex-1 bg-transparent outline-none placeholder:text-slate-500"
        />

        <button aria-label="Voice" className="cursor-pointer">
          <Image src={voice_icon} alt="voice" width={20} height={20} />
        </button>

        <button
          className="ml-1 cursor-pointer rounded-full bg-[#66A8FF] text-white px-4 py-2 flex items-center gap-2"
          aria-label="Send"
        >
          Send
        </button>
      </div>
    </div>
  );
}
