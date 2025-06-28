import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <p className="text-red-500">Accesso negato</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">👤 Il Mio Profilo</h1>
      <UserProfile />
    </div>
  );
}
