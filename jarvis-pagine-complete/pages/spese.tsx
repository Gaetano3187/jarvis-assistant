import { useAuth } from '../context/AuthContext';

export default function SpesePage() {
  const { user } = useAuth();
  if (!user) return <p>Accesso negato</p>;

  return (
    <div>
      <h1>🛒 Sezione Spese</h1>
      <p>Qui puoi gestire le tue spese.</p>
    </div>
  );
}