"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSpeechRecognition } from "@/components/hooks/useSpeechRecognition";
import { useMediaRecorder } from "@/components/hooks/useMediaRecorder";

export default function VoiceButton({
  setInput,
  onConfirm,
}: {
  setInput: (v: string) => void;
  onConfirm?: () => void;
}) {
  const { supported, start } = useSpeechRecognition();
  const rec = useMediaRecorder();
  const stopSRRef = useRef<null | (() => void)>(null);
  const [recording, setRecording] = useState(false);

  // ✅ NEW: ensure SSR and first client render match
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Main toggle
  const toggleRecording = async () => {
    if (!mounted) return; // avoid running before client mount

    if (recording) {
      // --- STOP recording ---
      if (supported && stopSRRef.current) {
        stopSRRef.current();
        stopSRRef.current = null;
        setRecording(false);
        onConfirm?.();
        return;
      }
      const blob = await rec.stop();
      setRecording(false);
      if (!blob) return;
      const form = new FormData();
      form.append("file", blob, "recording.webm");
      const r = await fetch("/api/stt-deepgram", { method: "POST", body: form });
      const j = await r.json();
      const text = j?.text || "";
      if (text) setInput(text);
      onConfirm?.();
    } else {
      // --- START recording ---
      setRecording(true);
      if (supported) {
        stopSRRef.current = start({
          onResult: (finalText, interimText) => {
            setInput(finalText || interimText);
          },
          onEnd: () => setRecording(false),
        });
      } else {
        await rec.start();
      }
    }
  };

  // ✅ NEW: stable title for SSR/first render; swap after mount
  const title = !mounted
    ? "Voice"
    : supported
    ? "Click to start / stop recording"
    : "Click to record (fallback)";

  return (
    <button
      type="button"
      aria-label="Voice"
      onClick={toggleRecording}
      className="cursor-pointer flex items-center justify-center rounded-full p-2 transition-transform active:scale-95"
      title={title}
      // If you still ever see warnings, add: suppressHydrationWarning
    >
      <Image
        src={recording ? "/img/recording.png" : "/img/voice-icon.png"}
        alt={recording ? "Recording" : "Voice"}
        width={24}
        height={24}
        className={recording ? "animate-pulse" : ""}
      />
    </button>
  );
}
