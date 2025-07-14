
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NoAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <ShieldX className="h-24 w-24 text-destructive" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Access Denied</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            You don't have permission to access this resource. Please contact an administrator if you believe this is an error.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
