import { useEffect, useState } from "react";

const VoiceOnlyMode = ({ onCommand }) => {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Il tuo browser non supporta il riconoscimento vocale.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "it-IT";

    rec.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Comando vocale:", transcript);
      onCommand(transcript);
    };

    setRecognition(rec);
  }, []);

  const toggleListening = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="p-4">
      <button onClick={toggleListening} className="rounded-xl p-2 bg-gray-100 border">
        {listening ? "🔇 Ferma Voce" : "🎤 Attiva Solo Voce"}
      </button>
    </div>
  );
};

export default VoiceOnlyMode;
