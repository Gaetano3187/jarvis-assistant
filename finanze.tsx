import { useState } from 'react';
import Head from 'next/head';

// Tipologia di voce di spesa
type Expense = {
  id: string;
  date: string;
  shop: string;
  description: string;
  amount: string;
};

const categories = [
  { key: 'casa', label: '🏠 Spese Casa' },
  { key: 'vestiti', label: '👕 Vestiti e Altro' },
  { key: 'divertimento', label: '🎉 Divertimento' },
  { key: 'varie', label: '📦 Varie' },
];

export default function Finanze() {
  const [selected, setSelected] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, Expense[]>>({
    casa: [],
    vestiti: [],
    divertimento: [],
    varie: [],
  });

  const handleAdd = () => {
    if (!selected) return;
    setData((prev) => ({
      ...prev,
      [selected]: [
        ...prev[selected],
        {
          id: Date.now().toString(),
          date: '',
          shop: '',
          description: '',
          amount: '',
        },
      ],
    }));
  };

  const handleChange = (
    field: keyof Expense,
    value: string,
    id: string
  ) => {
    if (!selected) return;
    setData((prev) => ({
      ...prev,
      [selected]: prev[selected].map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    }));
  };

  const handleDelete = (id: string) => {
    if (!selected) return;
    setData((prev) => ({
      ...prev,
      [selected]: prev[selected].filter((e) => e.id !== id),
    }));
  };

  return (
    <>
      <Head>
        <title>Finanze</title>
      </Head>

      <div className="min-h-screen bg-gray-900 px-4 py-10 text-gray-100">
        <h1 className="mb-8 text-center text-3xl font-bold">Sezione Finanze</h1>

        {/* Griglia categorie */}
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelected(cat.key)}
              className={`flex h-32 items-center justify-center rounded-xl border-2 p-4 text-center text-lg font-semibold transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selected === cat.key ? 'border-blue-500 bg-gray-800' : 'border-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tabella spese */}
        {selected && (
          <div className="mx-auto mt-10 max-w-5xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="px-3 py-2">Data</th>
                  <th className="px-3 py-2">Esercizio</th>
                  <th className="px-3 py-2">Descrizione</th>
                  <th className="px-3 py-2">Importo</th>
                  <th className="px-3 py-2 text-center">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {data[selected].map((row) => (
                  <tr key={row.id} className="hover:bg-gray-800/60">
                    <td className="px-3 py-2">
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => handleChange('date', e.target.value, row.id)}
                        className="w-full rounded-md bg-gray-800 p-2 text-gray-100 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.shop}
                        onChange={(e) => handleChange('shop', e.target.value, row.id)}
                        placeholder="Esercizio"
                        className="w-full rounded-md bg-gray-800 p-2 text-gray-100 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => handleChange('description', e.target.value, row.id)}
                        placeholder="Descrizione"
                        className="w-full rounded-md bg-gray-800 p-2 text-gray-100 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={row.amount}
                        onChange={(e) => handleChange('amount', e.target.value, row.id)}
                        placeholder="0.00"
                        className="w-full rounded-md bg-gray-800 p-2 text-gray-100 focus:outline-none"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium hover:bg-red-700"
                      >
                        Rimuovi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <button
                onClick={handleAdd}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700"
              >
                Aggiungi voce
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
