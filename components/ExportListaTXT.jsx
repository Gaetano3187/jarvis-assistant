export default function ExportListaTXT({ titolo = "lista", voci = [] }) {
  const handleExport = () => {
    if (!voci.length) {
      alert("Nessuna voce da esportare.");
      return;
    }

    const contenuto = [`\ud83d\udccb ${titolo.toUpperCase()}`, "", ...voci.map((item, i) => `${i + 1}. ${item}`)].join("\n");
    const blob = new Blob([contenuto], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${titolo.replace(/\s+/g, "_").toLowerCase()}.txt`;
    link.click();
  };

  return (
    <button onClick={handleExport} className="p-2 border rounded-xl">
      \ud83d\udcc4 Esporta TXT
    </button>
  );
}
