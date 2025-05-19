
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  requiredRole?: 'diy' | 'creator' | 'partner' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth();
  const location = useLocation();

  // Validate authentication on route navigation
  // This helps ensure the token is still valid when navigating between protected routes
  useEffect(() => {
    // This will trigger token refresh if needed via the isAuthenticated() method
    // No action needed here as the AuthContext already handles token validation
  }, [location.pathname]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the location the user was trying to access for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if the user has it
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to dashboard if user doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the required role, render the child routes
  return <Outlet />;
};
