import { useEffect, useState } from 'react';

export default function VoiceSave() {
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [saved, setSaved] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';

    recognition.onstart = () => {
      setTranscript('');
      setSaved(false);
      setListening(true);
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setListening(false);

      const response = await fetch('/api/save-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text }),
      });

      if (response.ok) {
        setSaved(true);
      }
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎤 Voice + Salvataggio Supabase</h1>
      {!isSupported ? (
        <p style={{ color: 'red' }}>❌ Il tuo browser non supporta la Web Speech API.</p>
      ) : (
        <>
          <button onClick={startRecognition} disabled={listening} style={{ padding: '1rem', fontSize: '1rem' }}>
            {listening ? 'Ascoltando...' : 'Avvia registrazione'}
          </button>
          <p><strong>Testo rilevato:</strong> {transcript}</p>
          {saved && <p style={{ color: 'green' }}>✅ Salvataggio riuscito</p>}
        </>
      )}
    </div>
  );
}
