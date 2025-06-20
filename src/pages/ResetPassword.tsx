/**
 * Password Reset Page
 * 
 * Allows users to request a password reset by providing their email.
 * An email with reset instructions is sent to the user.
 * 
 * Integration with Spring Boot:
 * - Connects to /auth/reset-password endpoint
 * - Handles success/error messages
 * - Provides UI feedback on submission
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Password Reset Page Component
 * 
 * Handles password reset request flow:
 * 1. User enters email address
 * 2. System validates email format
 * 3. Request is sent to backend API
 * 4. User receives success message or error
 * 
 * Production implementation:
 * - Backend sends password reset email with secure token link
 * - User follows link to set new password
 */
const ResetPassword = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // Hooks
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetPassword, loading } = useAuth();

  /**
   * Handle Password Reset Form Submission
   * 
   * Validates email and submits reset request.
   * 
   * Production implementation:
   * - Validates email format
   * - Sends request to Spring Boot endpoint
   * - Backend generates reset token and sends email
   * - Updates UI to show success message
   * 
   * @param e Form event
   */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Validate email
      if (!email || !email.includes('@')) {
        setError('Invalid email address. Please check your input.');
        return;
      }
      
      // 🔧 INTEGRATION: This calls the real password reset endpoint via AuthContext
      await resetPassword(email);
      
      setSubmitted(true);
      toast({
        title: "Email sent",
        description: "Please check your inbox for further instructions.",
      });
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter your email address to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Success state after submission */}
            {submitted ? (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    We have sent you an email with a link to reset your password. 
                    Please check your inbox and follow the instructions.
                  </AlertDescription>
                </Alert>
                <Button
                  className="w-full"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                >
                  Send again
                </Button>
              </div>
            ) : (
              // Form for email input
              <form onSubmit={handleResetPassword} className="space-y-4">
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex-col-space-y4">
            <div className="text-sm text-center text-muted-foreground">
              Remember your password?{' '}
              <Link to="/login" className="text-craft-wood hover:underline">
                Back to login
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

export default ResetPassword;
