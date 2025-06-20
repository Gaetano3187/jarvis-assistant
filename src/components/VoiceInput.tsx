'use client';
import { useEffect, useState } from 'react';

export default function VoiceInput({ onResult }: { onResult: (txt: string) => void }) {
  const [listening, setListening] = useState(false);
  const [ready, setReady] = useState(false);
  let recognition: SpeechRecognition | null = null;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setReady(true);
      const SpeechRec = (window as any).webkitSpeechRecognition || window.SpeechRecognition;
      recognition = new SpeechRec();
      recognition.lang = 'it-IT';
      recognition.onresult = e => {
        const txt = e.results[0][0].transcript;
        onResult(txt);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
    }
  }, []);

  if (!ready) return null;

  return (
    <button
      onClick={() => {
        if (!recognition) return;
        listening ? recognition.stop() : recognition.start();
        setListening(!listening);
      }}
      className={`btn btn-circle ${listening ? 'btn-error' : 'btn-primary'}`}
    >
      <i className="bi bi-mic-fill" />
    </button>
  );
}
