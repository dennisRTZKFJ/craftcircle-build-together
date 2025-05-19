
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserDashboard from '@/components/UserDashboard';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HelpCircle, User } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Get user role from auth context, or default to 'diy'
  const defaultRole = user?.role || 'diy';
  const [userType, setUserType] = useState<'diy' | 'creator' | 'partner'>(
    defaultRole === 'admin' ? 'diy' : defaultRole as 'diy' | 'creator' | 'partner'
  );
  
  const handleSupportClick = () => {
    // 🔧 INTEGRATION: Replace with actual support request API call
    toast({
      title: "Support requested",
      description: "A member of our team will contact you shortly."
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Dashboard Type Selector */}
      <div className="container py-4 flex flex-wrap justify-between items-center">
        <Tabs 
          value={userType} 
          onValueChange={(value) => setUserType(value as 'diy' | 'creator' | 'partner')}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diy">DIY User</TabsTrigger>
            <TabsTrigger value="creator">Creator</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 mt-2 md:mt-0">
          <Link to="/account">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>My Account</span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleSupportClick}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </Button>
        </div>
      </div>
      
      {/* Render the appropriate dashboard based on user type */}
      {userType === 'diy' && <UserDashboard />}
      {userType === 'creator' && (
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Creator Dashboard</h2>
          <p className="mb-6">Manage your tutorials, view analytics, and track your earnings as a creator.</p>
          <Link to="/creator-dashboard">
            <Button size="lg">Go to Creator Dashboard</Button>
          </Link>
        </div>
      )}
      {userType === 'partner' && (
        <div className="container py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Partner Dashboard</h2>
          <p className="mb-6">Manage your products, orders, and integrations as a partner.</p>
          <Link to="/partner-dashboard">
            <Button size="lg">Go to Partner Dashboard</Button>
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Dashboard;

