import React from 'react';

type Expense = {
  data: string;
  esercizio: string;
  descrizione: string;
  importo: number;
};

type Props = {
  supermarketList: string[];
  onlineList: string[];
  spese: Expense[];
};

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportTools({
  supermarketList,
  onlineList,
  spese,
}: Props) {
  const handleExportSuper = () => {
    downloadFile('lista-supermercato.txt', supermarketList.join('\n'));
  };

  const handleExportOnline = () => {
    downloadFile('lista-online.txt', onlineList.join('\n'));
  };

  const handleExportSpese = () => {
    const header = 'Data,Esercizio,Descrizione,Importo';
    const rows = spese
      .map((s) =>
        [s.data, s.esercizio, s.descrizione, s.importo.toFixed(2)].join(',')
      )
      .join('\n');
    downloadFile('spese-mensili.csv', `${header}\n${rows}`);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleExportSuper}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Esporta Lista Supermercato (.txt)
      </button>

      <button
        onClick={handleExportOnline}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Esporta Lista Online (.txt)
      </button>

      <button
        onClick={handleExportSpese}
        className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
      >
        Esporta Spese Mensili (.csv)
      </button>
    </div>
  );
}
