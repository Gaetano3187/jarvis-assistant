import { useAuth } from '../context/AuthContext';

export default function FinanzePage() {
  const { user } = useAuth();
  if (!user) return <p>Accesso negato</p>;

  return (
    <div>
      <h1>📊 Sezione Finanze</h1>
      <p>Benvenuto nella tua area finanziaria.</p>
    </div>
  );
}