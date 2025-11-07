// "@/components/hooks/useSpeechRecognition.ts"
import { useEffect, useRef, useState } from "react";

type StartArgs = {
  onResult: (finalText: string, interimText: string) => void;
  onEnd?: () => void;
  lang?: string;
  interim?: boolean;
};

export function useSpeechRecognition() {
  const [supported, setSupported] = useState(false);
  const recRef = useRef<any | null>(null);

  // Detect support AFTER mount to avoid touching window during SSR
  useEffect(() => {
    if (typeof window === "undefined") return;
    // @ts-ignore
    const sup = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setSupported(!!sup);
  }, []);

  const start = ({ onResult, onEnd, lang = "en-US", interim = true }: StartArgs) => {
    if (!supported || typeof window === "undefined") return () => {};

    // @ts-ignore
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.interimResults = interim;
    recognition.continuous = true;

    let finalText = "";
    recognition.onresult = (e: any) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += chunk + " ";
        else interimText += chunk;
      }
      onResult(finalText.trim(), interimText.trim());
    };
    recognition.onend = () => onEnd?.();
    recognition.onerror = () => onEnd?.();

    recRef.current = recognition;
    recognition.start();

    // stop fn
    return () => {
      try {
        recognition.stop();
      } catch {}
      recRef.current = null;
    };
  };

  return { supported, start };
}
