import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePreferences } from '../context/PreferencesContext';

export default function VoiceCommand() {
  const router = useRouter();
  const { preferenze } = usePreferences();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition || !preferenze.voce) return;

    const recognition = new SpeechRecognition();
    recognition.lang = preferenze.lingua === 'en' ? 'en-US' : 'it-IT';
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
      if (text.includes('vai a finanze') || text.includes('go to finance')) router.push('/finanze');
      if (text.includes('vai a spese') || text.includes('go to expenses')) router.push('/spese');
      if (text.includes('assistente') || text.includes('assistant')) router.push('/assistant');
      if (text.includes('logout')) router.push('/login');
    };

    recognition.start();

    return () => recognition.stop();
  }, [preferenze]);

  return null;
}
