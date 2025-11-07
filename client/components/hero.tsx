type HeroType = {
  hasBegun: boolean
}

export default function Hero({ hasBegun }: HeroType) {
  const h1Classes = `text-4xl md:text-5xl font-semibold text-center transition-opacity duration-400 ease-out 
    ${hasBegun ? "opacity-0" : "opacity-100"}`;

  return (
    <h1 className={h1Classes}>
      How can I help?
    </h1>
  );
}
