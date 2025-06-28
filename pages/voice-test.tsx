import { useEffect, useState } from 'react';

export default function VoiceTest() {
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
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
      setListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setTranscript(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎤 Voice Test</h1>
      {!isSupported ? (
        <p style={{ color: 'red' }}>❌ Il browser non supporta la Web Speech API.</p>
      ) : (
        <>
          <button onClick={startRecognition} disabled={listening}>
            {listening ? 'Ascoltando...' : 'Avvia riconoscimento vocale'}
          </button>
          <p><strong>Risultato:</strong> {transcript}</p>
        </>
      )}
    </div>
  );
}
