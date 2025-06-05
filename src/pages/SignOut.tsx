import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const SignOut = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout, isAuthenticated } = useAuth();
  
  // If user is not authenticated, redirect to home page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    
    try {
      // 🔧 INTEGRATION: In a real app, this would call API endpoint to invalidate tokens
      logout();
      
      // Show success message
      toast({
        title: "Successfully signed out",
        description: "You have been signed out from your account"
      });
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again."
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign Out</CardTitle>
            <CardDescription>Are you sure you want to sign out?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex-col-space-y4">
              <p className="text-center text-muted-foreground">
                Signing out will end your current session. You can always sign back in.
              </p>
              <div className="flex-gap2-w-full">
                <Button variant="outline" className="w-full" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className="w-full" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignOut;

