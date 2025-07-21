import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '@/services/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Dashboard } from './Dashboard'; 
import { User } from '@/core/models';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticatedUser = getAuthenticatedUser();
    setUser(authenticatedUser);
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    const authenticatedUser = getAuthenticatedUser();
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    console.log(user);
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {isLogin ? (
        <LoginForm 
          onSuccess={handleAuthSuccess} 
          onToggleMode={() => setIsLogin(false)} 
        />
      ) : (
        <SignupForm 
          onSuccess={handleAuthSuccess} 
          onToggleMode={() => setIsLogin(true)} 
        />
      )}
    </div>
  );
};

export default Index;
