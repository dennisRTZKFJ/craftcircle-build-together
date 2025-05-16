
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import UserDashboard from '@/components/UserDashboard';
import CreatorDashboard from '@/components/CreatorDashboard';
import PartnerDashboard from '@/components/PartnerDashboard';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  // In a real app, this would come from authentication/user profile
  const [userType, setUserType] = useState<'diy' | 'creator' | 'partner'>('diy');
  
  const handleSupportClick = () => {
    toast({
      title: "Support angefordert",
      description: "Ein Mitglied unseres Teams wird sich in Kürze bei dir melden.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Dashboard Type Selector (In a real app, this might be based on user role) */}
      <div className="container py-4 flex flex-wrap justify-between items-center">
        <Tabs 
          value={userType} 
          onValueChange={(value) => setUserType(value as 'diy' | 'creator' | 'partner')}
          className="w-full md:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diy">DIY Nutzer</TabsTrigger>
            <TabsTrigger value="creator">Creator</TabsTrigger>
            <TabsTrigger value="partner">Partner</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 mt-2 md:mt-0"
          onClick={handleSupportClick}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Support</span>
        </Button>
      </div>
      
      {/* Render the appropriate dashboard based on user type */}
      {userType === 'diy' && <UserDashboard />}
      {userType === 'creator' && <CreatorDashboard />}
      {userType === 'partner' && <PartnerDashboard />}
      
      <Footer />
    </div>
  );
};

export default Dashboard;
