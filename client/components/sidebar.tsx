import Image from "next/image";
import CTAArrow from "../components/cta-arrow";
import Logo from "@/public/img/ai-logo.png";

export default function Sidebar() {
  return (
    <aside className="bg-[#cfe0ff]/70 h-dvh px-4 py-6 flex flex-col items-center justify-between">
      {/* Top logo */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src={Logo}
          alt="AI for Gov Logo"
          width={36}
          height={36}
          className="rounded-md"
          priority
        />
      </div>

      {/* Bottom floating arrow */}
      <CTAArrow />
    </aside>
  );
}