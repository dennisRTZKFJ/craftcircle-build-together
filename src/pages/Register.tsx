/**
 * Registration Page
 * 
 * Allows new users to create an account with:
 * - Basic information (name, email)
 * - Password creation and confirmation
 * - Terms acceptance
 * - Social login options
 * 
 * Integration with Spring Boot:
 * - Connects to /auth/register endpoint
 * - Handles JWT token response
 * - Redirects to onboarding flow on success
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Github, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authService } from '@/services/auth.service';
import { AppConfig } from '@/config/app.config';

/**
 * Registration Page Component
 * 
 * Handles user registration flow and form validation.
 */
const Register = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * Handle Registration Form Submission
   * 
   * Validates form data and submits registration request.
   * 
   * Production implementation:
   * - Validates input client-side
   * - Sends registration data to Spring Boot backend
   * - Handles success/failure responses
   * - Redirects to onboarding on success
   * 
   * @param e Form event
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validation - passwords must match
      if (password !== passwordConfirm) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      
      // Validation - terms must be accepted
      if (!agreedToTerms) {
        setError('Please agree to the terms of use.');
        setLoading(false);
        return;
      }
      
      if (AppConfig.useMockData) {
        // MOCK: Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // MOCK: Basic validation
        if (name && email && email.includes('@') && password.length >= 6) {
          toast({
            title: "Registration successful!",
            description: "Please check your email for the confirmation link.",
          });
          navigate('/onboarding');
        } else {
          setError('Invalid input. Please check your data.');
        }
      } else {
        // REAL API: Register user with Spring Boot backend
        await authService.register({
          name,
          email,
          password
        });

        toast({
          title: "Registration successful!",
          description: "Please check your email for the confirmation link.",
        });
        
        // Redirect to onboarding page
        navigate('/onboarding');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Social Login
   * 
   * Initiates OAuth flow with selected provider.
   * 
   * Production implementation:
   * - Redirects to OAuth provider
   * - Provider redirects back with auth code
   * - Backend exchanges code for user info
   * - Creates or logs in user
   * 
   * @param provider OAuth provider name
   */
  const handleSocialLogin = (provider: string) => {
    // 🔧 INTEGRATION: Replace with actual social login implementation
    // This would typically redirect to OAuth provider URL
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
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Create an account and start your DIY journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name field */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
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
              
              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Password confirmation */}
              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input 
                  id="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              
              {/* Terms acceptance */}
              <div className="flex-center-space-x2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the <Link to="/terms" className="text-craft-wood hover:underline">Terms of Use</Link> and <Link to="/privacy" className="text-craft-wood hover:underline">Privacy Policy</Link>
                </label>
              </div>
              
              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Sign up"}
              </Button>
            </form>

            {/* Social login options */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  or register with
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
          
          {/* Footer with login link */}
          <CardFooter className="flex-col-space-y4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-craft-wood hover:underline">
                Sign in
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

export default Register;
