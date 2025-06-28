import { supabase } from "@/lib/supabaseClient";

export default function BackupRestoreControls({ userId, datiLocali, setDatiLocali }) {
  const salva = async () => {
    for (const tipo in datiLocali) {
      await supabase
        .from("jarvis_data")
        .upsert(
          { user_id: userId, tipo, payload: datiLocali[tipo] },
          { onConflict: ["user_id", "tipo"] }
        );
    }
    alert("✅ Dati salvati nel cloud.");
  };

  const carica = async () => {
    const nuoviDati = {} as any;
    const tipi = ["spese", "profilo", "liste"];
    for (const tipo of tipi) {
      const { data } = await supabase
        .from("jarvis_data")
        .select("payload")
        .eq("user_id", userId)
        .eq("tipo", tipo)
        .single();
      if (data?.payload) nuoviDati[tipo] = data.payload;
    }
    setDatiLocali(nuoviDati);
    alert("📥 Dati caricati dal cloud.");
  };

  return (
    <div className="space-x-4 my-4">
      <button onClick={salva} className="p-2 border rounded-xl">
        📤 Salva in Cloud
      </button>
      <button onClick={carica} className="p-2 border rounded-xl">
        📥 Carica da Cloud
      </button>
    </div>
  );
}
