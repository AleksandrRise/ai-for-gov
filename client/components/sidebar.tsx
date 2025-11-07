import Image from "next/image";
import CTAArrow from "../components/cta-arrow";

export default function Sidebar() {
  return (
    <aside className="bg-[#cfe0ff]/70 h-dvh px-4 py-6 flex flex-col items-center justify-between">
      {/* Top logo */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/img/ai-logo.png"
          alt="AI for Gov Logo"
          width={45}
          height={45}
          className="rounded-md"
          priority
        />
      </div>

      {/* Bottom floating arrow */}
      <CTAArrow />
    </aside>
  );
}