import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <p>Accesso negato</p>;

  return (
    <div>
      <h1>👤 Profilo Utente</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

  const salva = () => {
    const dati = { nome, avatarUrl, preferenze };
    localStorage.setItem("jarvis_user", JSON.stringify(dati));
    alert("✅ Profilo salvato!");
  };

  return (
    <div className="p-4 border rounded-xl space-y-4">
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
          onChange={(e) => setPreferenze({ ...preferenze, lingua: e.target.value })}
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
