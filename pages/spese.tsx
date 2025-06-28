import { useState } from 'react';

export default function Spese() {
  const [transcript, setTranscript] = useState('');
  const [supermercato, setSupermercato] = useState<string[]>([]);
  const [online, setOnline] = useState<string[]>([]);
  const [newSuper, setNewSuper] = useState('');
  const [newOnline, setNewOnline] = useState('');

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const startVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Browser non supporta il riconoscimento vocale');

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT';
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);

      if (spoken.includes('supermercato')) {
        const cleaned = spoken.replace(/.*supermercato/i, '').trim();
        const items = cleaned.split(/,| e /).map(x => x.trim()).filter(Boolean);
        setSupermercato(prev => [...prev, ...items]);
      }

      if (spoken.includes('online')) {
        const cleaned = spoken.replace(/.*online/i, '').trim();
        const items = cleaned.split(/,| e /).map(x => x.trim()).filter(Boolean);
        setOnline(prev => [...prev, ...items]);
      }
    };

    recognition.start();
  };

  const removeItem = (list: string[], setList: (l: string[]) => void, index: number) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const updateItem = (list: string[], setList: (l: string[]) => void, index: number) => {
    const updated = [...list];
    updated[index] = editText;
    setList(updated);
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">🛒 Sezione Spese</h1>

      <button onClick={startVoiceRecognition} className="bg-blue-600 px-4 py-2 rounded text-white">
        🎙️ Attiva riconoscimento vocale
      </button>

      {transcript && (
        <div className="bg-black p-4 rounded border border-gray-600">
          <p className="mb-2 font-semibold">📋 Trascrizione:</p>
          <p className="text-green-400">{transcript}</p>
        </div>
      )}

      {/* Lista Supermercato */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-2">🛒 Lista Supermercato</h2>

        <ul className="space-y-1">
          {supermercato.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {editIndex === i ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="text-black p-1 rounded"
                  />
                  <button onClick={() => updateItem(supermercato, setSupermercato, i)} className="text-green-400">💾</button>
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <button onClick={() => { setEditIndex(i); setEditText(item); }} className="text-yellow-400">✏️</button>
                  <button onClick={() => removeItem(supermercato, setSupermercato, i)} className="text-red-500">❌</button>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex gap-2">
          <input
            value={newSuper}
            onChange={(e) => setNewSuper(e.target.value)}
            className="text-black p-1 rounded w-full"
            placeholder="Aggiungi prodotto..."
          />
          <button
            onClick={() => { if (newSuper.trim()) setSupermercato([...supermercato, newSuper.trim()]); setNewSuper(''); }}
            className="bg-green-600 px-2 rounded"
          >
            ➕
          </button>
        </div>
      </div>

      {/* Lista Online */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-lg font-bold mb-2">🛍️ Lista Online</h2>

        <ul className="space-y-1">
          {online.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {editIndex === 1000 + i ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="text-black p-1 rounded"
                  />
                  <button onClick={() => updateItem(online, setOnline, i)} className="text-green-400">💾</button>
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <button onClick={() => { setEditIndex(1000 + i); setEditText(item); }} className="text-yellow-400">✏️</button>
                  <button onClick={() => removeItem(online, setOnline, i)} className="text-red-500">❌</button>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex gap-2">
          <input
            value={newOnline}
            onChange={(e) => setNewOnline(e.target.value)}
            className="text-black p-1 rounded w-full"
            placeholder="Aggiungi prodotto..."
          />
          <button
            onClick={() => { if (newOnline.trim()) setOnline([...online, newOnline.trim()]); setNewOnline(''); }}
            className="bg-green-600 px-2 rounded"
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
}
