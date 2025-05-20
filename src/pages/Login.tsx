
/**
 * Login Page
 * 
 * Allows existing users to sign in with:
 * - Email and password authentication
 * - Social login options
 * - Password reset link
 * 
 * Integration with Spring Boot:
 * - Connects to /auth/login endpoint
 * - Handles JWT token response
 * - Redirects to appropriate page on success
 */

import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Github, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Login Page Component
 * 
 * Handles user authentication flow and form validation.
 */
const Login = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, loading } = useAuth();
  
  // Get the redirect path from location state, or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  /**
   * Handle Login Form Submission
   * 
   * Validates credentials and attempts authentication.
   * 
   * Production implementation:
   * - Sends login request to Spring Boot backend
   * - Stores JWT token on success
   * - Redirects to original destination or dashboard
   * 
   * @param e Form event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // 🔧 INTEGRATION: This will call the real login endpoint via AuthContext
      await login(email, password);
      
      toast({
        title: "Successfully logged in",
        description: "Welcome back to CraftCircle!",
      });
      
      // Redirect to the page user tried to visit or dashboard
      navigate(from);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Invalid credentials. Please check your email and password.');
    }
  };

  /**
   * Handle Social Login
   * 
   * Initiates OAuth flow with selected provider.
   * 
   * Production implementation:
   * - Redirects to OAuth provider (GitHub, Google, etc.)
   * - Provider redirects back to application with auth code
   * - Backend validates code and returns user info with JWT
   * 
   * @param provider OAuth provider name
   */
  const handleSocialLogin = (provider: string) => {
    // 🔧 INTEGRATION: Replace with actual OAuth implementation for social login
    // This would typically redirect to provider's OAuth URL
    toast({ 
      description: `${provider} login is not implemented yet`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {/* Password field with reset link */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/reset-password" className="text-sm text-craft-wood hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Social login options */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => handleSocialLogin('GitHub')}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </CardContent>
          
          {/* Footer with registration link */}
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-craft-wood hover:underline">
                Sign up
              </Link>
            </div>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/')}>
              Back to homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
