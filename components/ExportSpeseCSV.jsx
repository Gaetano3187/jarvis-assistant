import { saveAs } from 'file-saver';

export default function ExportSpeseCSV({ spese }) {
  const handleExport = () => {
    if (!spese || spese.length === 0) return alert("Nessuna spesa da esportare.");

    const header = Object.keys(spese[0]).join(";");
    const rows = spese.map((riga) => Object.values(riga).join(";"));
    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "spese_export.csv");
  };

  return (
    <button onClick={handleExport} className="p-2 border rounded-xl">
      📤 Esporta CSV
    </button>
  );
}
