import { useEffect, useState } from "react";
import { usePreferences } from "../context/PreferencesContext";

export default function UserProfile() {
  const [nome, setNome] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const { preferenze, setPreferenze } = usePreferences();

  useEffect(() => {
    const datiSalvati = JSON.parse(localStorage.getItem("jarvis_user") || '{}');
    if (datiSalvati) {
      setNome(datiSalvati.nome || "");
      setAvatarUrl(datiSalvati.avatarUrl || "");
      setPreferenze(datiSalvati.preferenze || { lingua: "it", voce: true });
    }
  }, []);

  const salva = () => {
    const dati = { nome, avatarUrl, preferenze };
    localStorage.setItem("jarvis_user", JSON.stringify(dati));
    alert("✅ Profilo salvato!");
  };

  return (
    <div className="p-4 border rounded-xl space-y-4 text-white">
      <div>
        <label>Nome:</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="ml-2 p-1 border"
        />
      </div>
      <div>
        <label>Avatar (URL):</label>
        <input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="ml-2 p-1 border"
        />
      </div>
      <div>
        <label>Lingua:</label>
        <select
          value={preferenze.lingua}
          onChange={(e) => setPreferenze({ ...preferenze, lingua: e.target.value as 'it' | 'en' })}

          className="ml-2 p-1 border"
        >
          <option value="it">🇮🇹 Italiano</option>
          <option value="en">🇬🇧 English</option>
        </select>
      </div>
      <div>
        <label>Modalità vocale attiva:</label>
        <input
          type="checkbox"
          checked={preferenze.voce}
          onChange={(e) => setPreferenze({ ...preferenze, voce: e.target.checked })}
          className="ml-2"
        />
      </div>
      <button onClick={salva} className="p-2 border rounded-xl">
        💾 Salva Profilo
      </button>
    </div>
  );
}
