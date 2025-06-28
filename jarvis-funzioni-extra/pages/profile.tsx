import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <p>Accesso negato</p>;

  return (
    <div>
      <h1>👤 Profilo Utente</h1>
      <p>Email: {user.email}</p>
      <p>Modifica email e password disponibile a breve.</p>
    </div>
  );
}