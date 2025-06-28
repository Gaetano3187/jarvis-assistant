import { useState } from 'react';
import Head from 'next/head';

type Item = { id: string; name: string };

export default function Spese() {
  const [superList, setSuperList] = useState<Item[]>([]);
  const [onlineList, setOnlineList] = useState<Item[]>([]);
  const [inputSuper, setInputSuper] = useState('');
  const [inputOnline, setInputOnline] = useState('');
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');

  const addItem = (
    listSetter: React.Dispatch<React.SetStateAction<Item[]>>,
    value: string
  ) => {
    if (!value.trim()) return;
    listSetter((prev) => [...prev, { id: Date.now().toString(), name: value }]);
  };

  const updateItem = (
    listSetter: React.Dispatch<React.SetStateAction<Item[]>>,
    id: string,
    value: string
  ) => {
    listSetter((prev) => prev.map((i) => (i.id === id ? { ...i, name: value } : i)));
  };

  const deleteItem = (
    listSetter: React.Dispatch<React.SetStateAction<Item[]>>,
    id: string
  ) => {
    listSetter((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSendToJarvis = async () => {
    try {
      const res = await fetch('/api/send-to-jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: command }),
      });
      const data = await res.json();
      setResponse(data.reply || 'Nessuna risposta');
    } catch (e) {
      setResponse('Errore nella richiesta');
    }
  };

  return (
    <>
      <Head>
        <title>Spese</title>
      </Head>

      <div className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900">
        <h1 className="mb-6 text-center text-3xl font-bold">Gestione Spese</h1>

        {/* Comando vocale */}
        <div className="mx-auto mb-8 max-w-3xl space-y-4">
          <input
            type="text"
            placeholder='Esempio: "aggiungi latte alla lista supermercato"'
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3"
          />
          <button
            onClick={handleSendToJarvis}
            className="w-full rounded-md bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Invia a Jarvis
          </button>
          <textarea
            readOnly
            rows={4}
            value={response}
            placeholder="Risposta di Jarvis..."
            className="w-full resize-none rounded-md border border-gray-300 p-3"
          />
          <div className="rounded-md border border-dashed border-gray-400 p-3 text-center text-sm text-gray-500">
            <strong>Trascrizione vocale:</strong> (in attesa di integrazione microfono)
          </div>
        </div>

        {/* Liste */}
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          {/* Lista Supermercato */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">🛍️ Lista Supermercato</h2>
            <ul className="space-y-2">
              {superList.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(setSuperList, item.id, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 p-2"
                  />
                  <button
                    onClick={() => deleteItem(setSuperList, item.id)}
                    className="rounded-md bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-600"
                  >
                    Rimuovi
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Nuovo prodotto"
                value={inputSuper}
                onChange={(e) => setInputSuper(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 p-2"
              />
              <button
                onClick={() => {
                  addItem(setSuperList, inputSuper);
                  setInputSuper('');
                }}
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Aggiungi
              </button>
            </div>
          </div>

          {/* Lista Online */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">🌐 Lista Online</h2>
            <ul className="space-y-2">
              {onlineList.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(setOnlineList, item.id, e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 p-2"
                  />
                  <button
                    onClick={() => deleteItem(setOnlineList, item.id)}
                    className="rounded-md bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-600"
                  >
                    Rimuovi
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Nuovo prodotto"
                value={inputOnline}
                onChange={(e) => setInputOnline(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 p-2"
              />
              <button
                onClick={() => {
                  addItem(setOnlineList, inputOnline);
                  setInputOnline('');
                }}
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Aggiungi
              </button>
            </div>
          </div>
        </div>

        {/* Prodotti in esaurimento */}
        <div className="mx-auto mt-12 max-w-4xl">
          <h2 className="mb-4 text-xl font-semibold">📦 Prodotti in esaurimento / in scadenza</h2>
          <div className="rounded-lg bg-yellow-50 p-6 text-yellow-800 shadow">
            Placeholder per future integrazioni
          </div>
        </div>
      </div>
    </>
  );
}
