import { useState } from 'react';

interface Props {
  onResult: (audioBlob: Blob) => void;
}

export default function QuickVoiceButton({ onResult }: Props) {
  const [recording, setRecording] = useState(false);
  const [mediaRec, setMediaRec] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      onResult(blob);
    };

    rec.start();
    setMediaRec(rec);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRec?.stop();
    setRecording(false);
  };

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className="btn-primary mt-4 px-4 py-2"
    >
      {recording ? '🛑 Ferma' : '🎤 Vocale'}
    </button>
  );
}
