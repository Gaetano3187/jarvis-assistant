import { useState } from 'react';
import QuickVoiceButton from '../components/QuickVoiceButton';
import { blobToBase64 } from '../lib/blobToBase64';

export default function Spese() {
  const [query, setQuery] = useState('');
  const [report, setReport] = useState('');
  const [lastAssistantReply, setLastAssistantReply] = useState<string | null>(null);
  const [lastUserPrompt, setLastUserPrompt] = useState<string | null>(null);

  const handleManualSubmit = async () => {
    if (!query.trim()) return;
    setLastUserPrompt(query);
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ func: 'reportFinanze', query }),
    });
    const data = await res.json();
    setLastAssistantReply(data.reply ?? '');
    setReport(data.reply ?? '');
  };

  const handleVoiceCommand = async (audioBlob: Blob) => {
    setLastUserPrompt('[comando vocale inviato]');
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ func: 'finanzeVocale', audio: await blobToBase64(audioBlob) }),
    });
    const data = await res.json();
    setLastAssistantReply(data.reply ?? '');
    setReport(data.reply ?? '');
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sezione Spese</h1>

      {/* Input manuale */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Esempio: Quanto ho speso per cene a marzo?"
          className="flex-1 border rounded px-3 py-2"
        />
        <button onClick={handleManualSubmit} className="btn-primary px-4">Invia</button>
      </div>

      {/* Pulsante vocale */}
      <QuickVoiceButton onResult={handleVoiceCommand} />

      {/* Report */}
      {report && (
        <div className="border rounded p-4 bg-gray-50">
          <h2 className="font-semibold mb-2">Risultato</h2>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
}
