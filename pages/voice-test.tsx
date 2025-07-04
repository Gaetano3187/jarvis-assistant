import { useState } from 'react';
import QuickVoiceButton from '../components/QuickVoiceButton';
import { blobToBase64 } from '../lib/blobToBase64';

export default function VoiceTest() {
  const [lastAssistantReply, setLastAssistantReply] = useState<string | null>(null);
  const [lastUserPrompt, setLastUserPrompt] = useState<string | null>(null);

  const handleVoiceCommand = async (audioBlob: Blob) => {
    setLastUserPrompt('[comando vocale inviato]');
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ func: 'finanzeVocale', audio: await blobToBase64(audioBlob) }),
    });
    const data = await res.json();
    setLastAssistantReply(data.reply ?? '');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Voice Test</h1>
      <QuickVoiceButton onResult={handleVoiceCommand} />
      {lastAssistantReply && (
        <div className="border rounded p-4 bg-gray-50">
          <h2 className="font-semibold mb-2">Risposta</h2>
          <p>{lastAssistantReply}</p>
        </div>
      )}
    </div>
  );
}
