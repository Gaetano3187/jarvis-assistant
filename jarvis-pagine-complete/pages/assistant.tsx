import { useState } from 'react';

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  const askAssistant = async () => {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply || 'Nessuna risposta.');
  };

  return (
    <div>
      <h1>🤖 Assistant</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Chiedi qualcosa..."
      />
      <button onClick={askAssistant}>Invia</button>
      <p>Risposta: {reply}</p>
    </div>
  );
}