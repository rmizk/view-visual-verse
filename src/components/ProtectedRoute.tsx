
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthFlow } from './auth/AuthFlow';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="text-slate-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthFlow />;
  }

  return <>{children}</>;
};
