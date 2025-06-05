import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SettingsPage = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [userType, setUserType] = useState<'diy' | 'creator' | 'partner'>('diy');
  
  // Settings state
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState('public');
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your account settings have been updated successfully."
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your general account settings</p>
          </div>
          <Link to="/account">
            <Button variant="outline">Back to Account</Button>
          </Link>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account Type</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="theme">Theme</Label>
                  <div className="flex-center-space-x4">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'} 
                      size="icon" 
                      onClick={() => setTheme('light')}
                      className="w-10 h-10 rounded-full"
                    >
                      <Sun className="h-5 w-5" />
                      <span className="sr-only">Light Mode</span>
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'} 
                      size="icon" 
                      onClick={() => setTheme('dark')}
                      className="w-10 h-10 rounded-full"
                    >
                      <Moon className="h-5 w-5" />
                      <span className="sr-only">Dark Mode</span>
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'outline'} 
                      size="icon" 
                      onClick={() => setTheme('system')}
                      className="w-10 h-10 rounded-full"
                    >
                      <Monitor className="h-5 w-5" />
                      <span className="sr-only">System Theme</span>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {theme === 'light' && 'Light mode is currently active.'}
                    {theme === 'dark' && 'Dark mode is currently active.'}
                    {theme === 'system' && 'Using your device theme preference.'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about activity related to you</p>
                  </div>
                  <Switch defaultChecked id="email-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="app-notifications">App Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                  </div>
                  <Switch defaultChecked id="app-notifications" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select defaultValue={privacy} onValueChange={setPrivacy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public Profile</SelectItem>
                      <SelectItem value="followers">Visible to Followers Only</SelectItem>
                      <SelectItem value="private">Private Profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-projects">Show My Projects</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your projects</p>
                  </div>
                  <Switch defaultChecked id="show-projects" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics-tracking">Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve the platform</p>
                  </div>
                  <Switch defaultChecked id="analytics-tracking" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <Select defaultValue="minimal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Share All Data</SelectItem>
                      <SelectItem value="minimal">Share Minimal Data</SelectItem>
                      <SelectItem value="none">Don't Share Data</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Control how your data is shared with our partners</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Privacy Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Type Settings</CardTitle>
                <CardDescription>Manage your account type and related settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Button 
                    variant={userType === 'diy' ? 'default' : 'outline'} 
                    onClick={() => setUserType('diy')}
                    className="w-full h-auto py-4 flex flex-col"
                  >
                    <div className="text-lg font-medium mb-2">DIY User</div>
                    <div className="text-sm font-normal">Access tutorials and track your projects</div>
                  </Button>
                  <Button 
                    variant={userType === 'creator' ? 'default' : 'outline'} 
                    onClick={() => setUserType('creator')}
                    className="w-full h-auto py-4 flex flex-col"
                  >
                    <div className="text-lg font-medium mb-2">Creator</div>
                    <div className="text-sm font-normal">Create and share tutorials, earn income</div>
                  </Button>
                  <Button 
                    variant={userType === 'partner' ? 'default' : 'outline'} 
                    onClick={() => setUserType('partner')}
                    className="w-full h-auto py-4 flex flex-col"
                  >
                    <div className="text-lg font-medium mb-2">Partner</div>
                    <div className="text-sm font-normal">Sell materials and tools to the community</div>
                  </Button>
                </div>
                
                {userType === 'diy' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">DIY User Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="skill-level">Skill Level</Label>
                      <Select defaultValue="beginner">
                        <SelectTrigger>
                          <SelectValue placeholder="Select skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests</Label>
                      <div className="flex-wrap-gap2-mt1">
                        <Button variant="outline" size="sm" className="border-craft-wood">Woodworking</Button>
                        <Button variant="outline" size="sm">Furniture</Button>
                        <Button variant="outline" size="sm">Home Decor</Button>
                        <Button variant="outline" size="sm">Restoration</Button>
                        <Button variant="outline" size="sm">Outdoor</Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {userType === 'creator' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Creator Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="creator-page">Creator Page</Label>
                      <Select defaultValue="public">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private (Link Only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="monetization">Monetization</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tutorial-review">Tutorial Review</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Automatic (Faster Publishing)</SelectItem>
                          <SelectItem value="manual">Manual (More Control)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {userType === 'partner' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Partner Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="shop-visibility">Shop Visibility</Label>
                      <Select defaultValue="public">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="members">Members Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="order-notifications">Order Notifications</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">For All Orders</SelectItem>
                          <SelectItem value="large">Only for Large Orders</SelectItem>
                          <SelectItem value="none">No Notifications</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-integration">API Integration</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Save Account Type Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
