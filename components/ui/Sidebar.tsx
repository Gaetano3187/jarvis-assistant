import React from 'react';

const items = [
  '📄 Riconoscimento OCR',
  '📤 Esporta lista TXT',
  '📊 Elabora report spese',
  '💸 Inserisci stipendio',
  '💰 Soldi in tasca',
  '📈 Grafici mensili',
];

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 text-gray-100 md:h-screen md:w-60">
      <ul className="flex flex-row overflow-x-auto gap-2 p-4 md:flex-col md:gap-4">
        {items.map((label) => (
          <li key={label} className="flex-shrink-0">
            <button
              className="w-full whitespace-nowrap rounded-md px-4 py-2 text-left transition-colors hover:bg-gray-700 md:w-full"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
