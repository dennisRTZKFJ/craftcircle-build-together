
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  User, Bell, CreditCard, Trophy, Settings
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Manage your account data, payments, and subscriptions</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/account" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <User className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View and edit your personal information, bio, and profile picture.</p>
                <Button className="w-full mt-4" variant="outline">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/account/payments" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <CreditCard className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Payments & Subscriptions</CardTitle>
                <CardDescription>Manage your payment methods and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View and update your payment information, check billing history, and manage subscriptions.</p>
                <Button className="w-full mt-4" variant="outline">
                  Manage Payments
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/account/projects" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <Trophy className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Projects</CardTitle>
                <CardDescription>Manage your DIY projects</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View, edit, and organize all your DIY projects in one place.</p>
                <Button className="w-full mt-4" variant="outline">
                  Manage Projects
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/account/notifications" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <Bell className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Customize which notifications you receive and how you receive them.</p>
                <Button className="w-full mt-4" variant="outline">
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/account/settings" className="block">
            <Card className="h-full hover:border-primary transition-colors">
              <CardHeader>
                <Settings className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Change your password, update email preferences, and configure other account settings.</p>
                <Button className="w-full mt-4" variant="outline">
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/subscription" className="block">
            <Card className="h-full hover:border-primary transition-colors bg-craft-wood/5 border-craft-wood/30">
              <CardHeader>
                <div className="bg-craft-wood text-white p-2 rounded-full w-fit h-fit mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-crown"><path d="m2 17 10-9 4 4 6-7v14H2z" /><path d="M2 20h20" /></svg>
                </div>
                <CardTitle className="text-craft-wood">Premium Subscription</CardTitle>
                <CardDescription>Upgrade your DIY experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Get access to exclusive tutorials, unlimited projects, and premium features.</p>
                <Button className="w-full mt-4 bg-craft-wood hover:bg-craft-wood/90">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
