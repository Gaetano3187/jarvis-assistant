import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  quantity: number;
  purchaseDate: string; // ISO
  expiryDate: string;   // ISO
  percent: number;
};

const initial: Product[] = [
  {
    id: '1',
    name: 'Latte',
    quantity: 2,
    purchaseDate: '2025-06-20',
    expiryDate: '2025-07-05',
    percent: 0,
  },
  {
    id: '2',
    name: 'Pane',
    quantity: 1,
    purchaseDate: '2025-06-25',
    expiryDate: '2025-06-30',
    percent: 0,
  },
  {
    id: '3',
    name: 'Uova',
    quantity: 12,
    purchaseDate: '2025-06-18',
    expiryDate: '2025-07-10',
    percent: 0,
  },
];

export default function ScorteStatus() {
  const [products, setProducts] = useState<Product[]>(initial);

  useEffect(() => {
    const updated = products.map((p) => {
      const total =
        (new Date(p.expiryDate).getTime() - new Date(p.purchaseDate).getTime()) /
        (1000 * 60 * 60 * 24);
      const passed =
        (Date.now() - new Date(p.purchaseDate).getTime()) /
        (1000 * 60 * 60 * 24);
      const percent = Math.min(100, Math.max(0, Math.round((passed / total) * 100)));
      return { ...p, percent };
    });
    setProducts(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getColor = (percent: number) => {
    if (percent < 50) return 'bg-green-500';
    if (percent < 80) return 'bg-yellow-500';
    return 'bg-red-600';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Prodotto</th>
            <th className="px-3 py-2 text-left">Quantità</th>
            <th className="px-3 py-2 text-left">Acquisto</th>
            <th className="px-3 py-2 text-left">Scadenza</th>
            <th className="w-40 px-3 py-2 text-left">Consumo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p) => (
            <tr key={p.id} className="bg-white">
              <td className="px-3 py-2 whitespace-nowrap">{p.name}</td>
              <td className="px-3 py-2">{p.quantity}</td>
              <td className="px-3 py-2 whitespace-nowrap">{p.purchaseDate}</td>
              <td className="px-3 py-2 whitespace-nowrap">{p.expiryDate}</td>
              <td className="px-3 py-2">
                <div className="h-3 w-full rounded bg-gray-200">
                  <div
                    className={`h-full rounded ${getColor(p.percent)}`}
                    style={{ width: `${p.percent}%` }}
                  />
                </div>
                <span className="text-xs">{p.percent}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
