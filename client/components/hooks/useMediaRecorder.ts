import { useRef, useState } from "react";

export function useMediaRecorder() {
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    chunksRef.current = [];
    mr.ondataavailable = (e) => e.data && chunksRef.current.push(e.data);
    mr.onstop = () => stream.getTracks().forEach((t) => t.stop());
    mr.start();
    mediaRef.current = mr;
    setRecording(true);
  };

  const stop = async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const mr = mediaRef.current;
      if (!mr) return resolve(null);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecording(false);
        resolve(blob);
      };
      mr.stop();
    });
  };

  return { recording, start, stop };
}