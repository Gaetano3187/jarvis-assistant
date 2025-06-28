import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VoiceCommand() {
  const router = useRouter();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (text.includes('vai a finanze')) router.push('/finanze');
      if (text.includes('vai a spese')) router.push('/spese');
      if (text.includes('vai a assistente')) router.push('/assistant');
      if (text.includes('logout')) router.push('/login');
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return null;
}