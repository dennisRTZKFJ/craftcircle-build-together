
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const { toast } = useToast();
  const [userType, setUserType] = useState<'diy' | 'creator' | 'partner'>('diy');
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    // DIY User notifications
    projectReminders: true,
    newTutorials: true,
    weeklyChallenge: true,
    
    // Creator notifications
    tutorialComments: true,
    earningsUpdates: true,
    newFollowers: true,
    
    // Partner notifications
    newOrders: true,
    productMentions: true,
    salesReports: true,
  });
  
  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting]
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated."
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notification Settings</h1>
            <p className="text-muted-foreground">Configure your notification preferences</p>
          </div>
          <div className="flex gap-2">
            <Link to="/account">
              <Button variant="outline">Back to Account</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Button 
            variant={userType === 'diy' ? 'default' : 'outline'} 
            onClick={() => setUserType('diy')}
            className="w-full"
          >
            DIY User
          </Button>
          <Button 
            variant={userType === 'creator' ? 'default' : 'outline'} 
            onClick={() => setUserType('creator')}
            className="w-full"
          >
            Creator
          </Button>
          <Button 
            variant={userType === 'partner' ? 'default' : 'outline'} 
            onClick={() => setUserType('partner')}
            className="w-full"
          >
            Partner
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {userType === 'diy' && 'DIY User Notifications'}
              {userType === 'creator' && 'Creator Notifications'}
              {userType === 'partner' && 'Partner Notifications'}
            </CardTitle>
            <CardDescription>
              Configure which notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userType === 'diy' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Project Reminders</h4>
                    <p className="text-sm text-muted-foreground">Get reminders about your ongoing projects</p>
                  </div>
                  <Switch 
                    checked={notifications.projectReminders}
                    onCheckedChange={() => handleNotificationChange('projectReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Tutorials</h4>
                    <p className="text-sm text-muted-foreground">Notifications about new tutorials matching your interests</p>
                  </div>
                  <Switch 
                    checked={notifications.newTutorials}
                    onCheckedChange={() => handleNotificationChange('newTutorials')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Challenges</h4>
                    <p className="text-sm text-muted-foreground">Information about new weekly DIY challenges</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyChallenge}
                    onCheckedChange={() => handleNotificationChange('weeklyChallenge')}
                  />
                </div>
              </div>
            )}
            
            {userType === 'creator' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Tutorial Comments</h4>
                    <p className="text-sm text-muted-foreground">Notifications about new comments on your tutorials</p>
                  </div>
                  <Switch 
                    checked={notifications.tutorialComments}
                    onCheckedChange={() => handleNotificationChange('tutorialComments')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Earnings Updates</h4>
                    <p className="text-sm text-muted-foreground">Notifications about new earnings from your tutorials</p>
                  </div>
                  <Switch 
                    checked={notifications.earningsUpdates}
                    onCheckedChange={() => handleNotificationChange('earningsUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Followers</h4>
                    <p className="text-sm text-muted-foreground">Notifications when someone new follows you</p>
                  </div>
                  <Switch 
                    checked={notifications.newFollowers}
                    onCheckedChange={() => handleNotificationChange('newFollowers')}
                  />
                </div>
              </div>
            )}
            
            {userType === 'partner' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Orders</h4>
                    <p className="text-sm text-muted-foreground">Notifications about new orders from your shop</p>
                  </div>
                  <Switch 
                    checked={notifications.newOrders}
                    onCheckedChange={() => handleNotificationChange('newOrders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Product Mentions</h4>
                    <p className="text-sm text-muted-foreground">Notifications when your products are used in tutorials</p>
                  </div>
                  <Switch 
                    checked={notifications.productMentions}
                    onCheckedChange={() => handleNotificationChange('productMentions')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sales Reports</h4>
                    <p className="text-sm text-muted-foreground">Weekly and monthly sales reports</p>
                  </div>
                  <Switch 
                    checked={notifications.salesReports}
                    onCheckedChange={() => handleNotificationChange('salesReports')}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
            <CardDescription>Configure how you receive email notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Digest</h4>
                  <p className="text-sm text-muted-foreground">Receive a daily digest of all notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-muted-foreground">Receive information about special offers and new features</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Unsubscribe from All</Button>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
