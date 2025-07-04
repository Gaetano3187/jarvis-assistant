import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import QuickVoiceButton from '../components/QuickVoiceButton';
import AgentResponseBox from '../components/AgentResponseBox';
import { blobToBase64 } from '../lib/blobToBase64';

export default function Dashboard() {
  const { user } = useAuth();
  const [lastAssistantReply, setLastAssistantReply] = useState<string | null>(null);
  const [lastUserPrompt, setLastUserPrompt] = useState<string | null>(null);

  const handleVoiceCommand = async (audioBlob: Blob) => {
    setLastUserPrompt('[comando vocale inviato]');

    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        func: 'finanzeVocale',
        audio: await blobToBase64(audioBlob),
      }),
    });

    const data = await res.json();
    setLastAssistantReply(data.reply ?? 'Nessuna risposta.');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Benvenuto {user?.email}</h1>

      {/* Pulsante vocale */}
      <QuickVoiceButton onResult={handleVoiceCommand} />

      {/* Box chat con storico */}
      <AgentResponseBox
        lastAssistantReply={lastAssistantReply}
        lastUserPrompt={lastUserPrompt}
      />
    </div>
  );
}
