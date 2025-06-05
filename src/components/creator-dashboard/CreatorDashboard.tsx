import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, TrendingUp, DollarSign, MessageCircle, HelpCircle } from 'lucide-react';

// Import components 
import StatsOverview from './StatsOverview';
import TutorialsTab from './TutorialsTab';
import AnalyticsTab from './AnalyticsTab';
import EarningsTab from './EarningsTab';
import FeedbackTab from './FeedbackTab';
import UploadTutorialDialog from './UploadTutorialDialog';

// Import types
import { Tutorial, Comment, MonthlyEarning, AnalyticsData } from './types';

const CreatorDashboard = () => {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  // Mock data for tutorials
  const tutorials: Tutorial[] = [
    { 
      id: 1, 
      title: 'Building a Walnut Coffee Table', 
      status: 'published',
      views: 2456,
      likes: 145, 
      comments: 32,
      revenue: '€124,50',
      date: '04/10/2025',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90'
    },
    { 
      id: 2, 
      title: 'Wall Shelves with Invisible Mounts', 
      status: 'published',
      views: 1845,
      likes: 98, 
      comments: 18, 
      revenue: '€78,20',
      date: '04/25/2025',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f'
    },
    { 
      id: 3, 
      title: 'Modular Solid Wood Shelving System', 
      status: 'published',
      views: 3210,
      likes: 203, 
      comments: 45, 
      revenue: '€187,90',
      date: '05/02/2025',
      image: 'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5'
    },
    { 
      id: 4, 
      title: 'Rustic Dining Table with Epoxy Resin', 
      status: 'draft',
      views: 0,
      likes: 0, 
      comments: 0, 
      revenue: '€0,00',
      date: '05/14/2025',
      image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2'
    },
  ];
  
  // Mock data for analytics
  const analytics: AnalyticsData = {
    views: {
      total: 24560,
      trend: '+12%',
      data: [1200, 1380, 1640, 1510, 1800, 2100, 2450]
    },
    revenue: {
      total: '€1,245.80',
      trend: '+18%',
      data: [80, 120, 95, 140, 160, 170, 190]
    },
    followers: {
      total: 1240,
      trend: '+5%',
      data: [850, 920, 980, 1010, 1080, 1150, 1240]
    },
    engagement: {
      total: '8.4%',
      trend: '+2%',
      data: [6.2, 6.8, 7.1, 7.5, 7.8, 8.2, 8.4]
    }
  };
  
  // Mock data for comments
  const topComments: Comment[] = [
    {
      id: 'c1',
      user: {
        name: 'Julia Bauer',
        avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56'
      },
      comment: 'Your coffee table instructions were super detailed - I managed to make it as a beginner! Thanks for the precise measurements and material specifications.',
      tutorial: 'Building a Walnut Coffee Table',
      date: '2 days ago',
      likes: 28
    },
    {
      id: 'c2',
      user: {
        name: 'Mark Weber',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      comment: 'The idea with the invisible mounts is genius! It gave me a much cleaner result than my previous projects.',
      tutorial: 'Wall Shelves with Invisible Mounts',
      date: '3 days ago',
      likes: 16
    },
    {
      id: 'c3',
      user: {
        name: 'Laura Schulz',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      comment: 'Could the modular system also be used as a room divider? What wood type would you recommend for heavier loads?',
      tutorial: 'Modular Solid Wood Shelving System',
      date: '1 week ago',
      likes: 7
    },
  ];
  
  // Mock data for earnings
  const monthlyEarnings: MonthlyEarning[] = [
    { month: 'January', amount: 580.40 },
    { month: 'February', amount: 645.20 },
    { month: 'March', amount: 790.90 },
    { month: 'April', amount: 950.30 },
    { month: 'May', amount: 1245.80 }
  ];
  
  // Function to handle new tutorial upload
  const handleUploadTutorial = () => {
    setUploadDialogOpen(false);
    toast({
      title: "Tutorial uploaded",
      description: "Your tutorial has been saved as a draft and is now being reviewed."
    });
  };
  
  // Function to handle tutorial edit
  const handleEditTutorial = (id: number) => {
    toast({
      title: "Edit Tutorial",
      description: `Tutorial ID: ${id} is being opened for editing.`
    });
  };
  
  // Function to handle support request
  const handleSupportRequest = () => {
    toast({
      title: "Support request sent",
      description: "A member of our creator team will contact you shortly."
    });
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header-layout">
        <div>
          <h1 className="header-xl">Creator Dashboard</h1>
          <p className="muted-text">Manage your tutorials, earnings and community</p>
        </div>
        
        <div className="dashboard-button-group">
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4 icon-margin-right" />
                <span>Upload Tutorial</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <UploadTutorialDialog 
                onClose={() => setUploadDialogOpen(false)}
                onUpload={handleUploadTutorial}
              />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSupportRequest}>
            <HelpCircle className="h-4 w-4 icon-margin-right" />
            <span>Creator Support</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <StatsOverview analytics={analytics} />
      
      {/* Main Content */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-5 h-12 rounded-md">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Tutorials</span>
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Earnings</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Feedback</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <StatsOverview analytics={analytics} />
        </TabsContent>
        <TabsContent value="tutorials">
          <TutorialsTab tutorials={tutorials} handleEditTutorial={handleEditTutorial} />
        </TabsContent>
        <TabsContent value="earnings">
          <EarningsTab monthlyEarnings={monthlyEarnings} />
        </TabsContent>
        <TabsContent value="feedback">
          <FeedbackTab topComments={topComments} handleSupportRequest={handleSupportRequest} />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab tutorials={tutorials} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
