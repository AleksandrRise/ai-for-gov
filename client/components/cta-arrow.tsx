import Image from "next/image";
// Use public path for images under `public/` instead of importing from the public folder.

export default function CTAArrow() {
  return (
    <button
      className="cursor-pointer size-14 rounded-full bg-white shadow-soft grid place-items-center border"
      aria-label="Get started"
    >
      <Image
        src="/img/arrow-icon.png"
        alt="Arrow"
        width={20}
        height={20}
      />  
    </button>
  );
}
