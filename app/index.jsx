import { Redirect } from 'expo-router';
import { useAuth } from './contexts/AuthContext';

export default function Index() {
  const { user } = useAuth();
  
  // Redirect based on auth state
  return <Redirect href={user ? "/home" : "/login"} />;
}