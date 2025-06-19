
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Lock, Bell, Eye, Globe, Shield, 
  Smartphone, Monitor, Moon, Sun 
} from 'lucide-react';

const PublicSettingsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: 'Max Mustermann',
    email: 'max.mustermann@email.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    browserNotifications: false,
    marketingEmails: true,
    weeklyDigest: true,
    challengeUpdates: true,
    tutorialComments: false
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProjects: true,
    showActivityStatus: false,
    allowMessaging: true
  });

  // Theme Settings
  const [theme, setTheme] = useState('light');

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated."
      });
    }, 1500);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast({
        title: "Password changed",
        description: "Your password has been successfully updated."
      });
    }, 1500);
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved."
    });
  };

  const handlePrivacyUpdate = () => {
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved."
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Profile</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Eye className="h-4 w-4" />
                  <span>Privacy</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Monitor className="h-4 w-4" />
                  <span>Appearance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Changing..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, emailNotifications: checked});
                      handleNotificationUpdate();
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="browser-notifications">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                  </div>
                  <Switch 
                    id="browser-notifications"
                    checked={notifications.browserNotifications}
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, browserNotifications: checked});
                      handleNotificationUpdate();
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional content and updates</p>
                  </div>
                  <Switch 
                    id="marketing-emails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, marketingEmails: checked});
                      handleNotificationUpdate();
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="challenge-updates">Challenge Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new challenges and results</p>
                  </div>
                  <Switch 
                    id="challenge-updates"
                    checked={notifications.challengeUpdates}
                    onCheckedChange={(checked) => {
                      setNotifications({...notifications, challengeUpdates: checked});
                      handleNotificationUpdate();
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control who can see your information and activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-profile">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch 
                    id="show-profile"
                    checked={privacy.showProfile}
                    onCheckedChange={(checked) => {
                      setPrivacy({...privacy, showProfile: checked});
                      handlePrivacyUpdate();
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-projects">Show Projects</Label>
                    <p className="text-sm text-muted-foreground">Display your projects publicly</p>
                  </div>
                  <Switch 
                    id="show-projects"
                    checked={privacy.showProjects}
                    onCheckedChange={(checked) => {
                      setPrivacy({...privacy, showProjects: checked});
                      handlePrivacyUpdate();
                    }}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="activity-status">Activity Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're online</p>
                  </div>
                  <Switch 
                    id="activity-status"
                    checked={privacy.showActivityStatus}
                    onCheckedChange={(checked) => {
                      setPrivacy({...privacy, showActivityStatus: checked});
                      handlePrivacyUpdate();
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how the interface looks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Card className={`cursor-pointer ${theme === 'light' ? 'border-primary' : ''}`} 
                          onClick={() => setTheme('light')}>
                      <CardContent className="p-4 text-center">
                        <Sun className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm">Light</span>
                        {theme === 'light' && <Badge className="mt-2">Active</Badge>}
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer ${theme === 'dark' ? 'border-primary' : ''}`} 
                          onClick={() => setTheme('dark')}>
                      <CardContent className="p-4 text-center">
                        <Moon className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm">Dark</span>
                        {theme === 'dark' && <Badge className="mt-2">Active</Badge>}
                      </CardContent>
                    </Card>
                    <Card className={`cursor-pointer ${theme === 'auto' ? 'border-primary' : ''}`} 
                          onClick={() => setTheme('auto')}>
                      <CardContent className="p-4 text-center">
                        <Smartphone className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm">Auto</span>
                        {theme === 'auto' && <Badge className="mt-2">Active</Badge>}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PublicSettingsPage;
