import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Benvenuto {user?.email}</h1>
      <p>Questa è la tua dashboard personale.</p>
    </div>
  );
}