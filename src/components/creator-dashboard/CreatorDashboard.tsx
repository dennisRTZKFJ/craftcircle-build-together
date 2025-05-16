
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
      title: 'Couchtisch aus Nussbaum bauen', 
      status: 'published',
      views: 2456,
      likes: 145, 
      comments: 32,
      revenue: '€124,50',
      date: '10.04.2025',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90'
    },
    { 
      id: 2, 
      title: 'Wandregale mit unsichtbaren Befestigungen', 
      status: 'published',
      views: 1845,
      likes: 98, 
      comments: 18, 
      revenue: '€78,20',
      date: '25.04.2025',
      image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f'
    },
    { 
      id: 3, 
      title: 'Modulares Regalsystem aus Massivholz', 
      status: 'published',
      views: 3210,
      likes: 203, 
      comments: 45, 
      revenue: '€187,90',
      date: '02.05.2025',
      image: 'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5'
    },
    { 
      id: 4, 
      title: 'Rustikaler Esstisch mit Epoxidharz', 
      status: 'draft',
      views: 0,
      likes: 0, 
      comments: 0, 
      revenue: '€0,00',
      date: '14.05.2025',
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
      comment: 'Deine Anleitung zum Couchtisch war super detailliert - ich habe es auch als Anfängerin geschafft! Danke für die genauen Maße und Material-Angaben.',
      tutorial: 'Couchtisch aus Nussbaum bauen',
      date: 'vor 2 Tagen',
      likes: 28
    },
    {
      id: 'c2',
      user: {
        name: 'Markus Weber',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      comment: 'Die Idee mit den unsichtbaren Befestigungen ist genial! Habe dadurch ein viel saubereres Ergebnis bekommen als bei meinen früheren Projekten.',
      tutorial: 'Wandregale mit unsichtbaren Befestigungen',
      date: 'vor 3 Tagen',
      likes: 16
    },
    {
      id: 'c3',
      user: {
        name: 'Laura Schulz',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      comment: 'Könnte man das modulare System auch für eine Raumteiler-Lösung verwenden? Welche Holzart würdest du für größere Belastungen empfehlen?',
      tutorial: 'Modulares Regalsystem aus Massivholz',
      date: 'vor 1 Woche',
      likes: 7
    },
  ];
  
  // Mock data for earnings
  const monthlyEarnings: MonthlyEarning[] = [
    { month: 'Januar', amount: 580.40 },
    { month: 'Februar', amount: 645.20 },
    { month: 'März', amount: 790.90 },
    { month: 'April', amount: 950.30 },
    { month: 'Mai', amount: 1245.80 }
  ];
  
  // Function to handle new tutorial upload
  const handleUploadTutorial = () => {
    setUploadDialogOpen(false);
    toast({
      title: "Tutorial hochgeladen",
      description: "Dein Tutorial wurde als Entwurf gespeichert und wird nun überprüft."
    });
  };
  
  // Function to handle tutorial edit
  const handleEditTutorial = (id: number) => {
    toast({
      title: "Tutorial bearbeiten",
      description: `Tutorial ID: ${id} wird zum Bearbeiten geöffnet.`
    });
  };
  
  // Function to handle support request
  const handleSupportRequest = () => {
    toast({
      title: "Support-Anfrage gesendet",
      description: "Ein Mitglied unseres Creator-Teams wird sich in Kürze bei dir melden."
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">Verwalte deine Tutorials, Einnahmen und Community</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Tutorial hochladen</span>
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
            <HelpCircle className="h-4 w-4" />
            <span>Creator Support</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <StatsOverview analytics={analytics} />
      
      {/* Main Content */}
      <Tabs defaultValue="tutorials" className="w-full">
        <TabsList className="grid grid-cols-4 max-w-2xl mb-8">
          <TabsTrigger value="tutorials">
            <FileText className="h-4 w-4 mr-2" />
            Tutorials
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Statistiken
          </TabsTrigger>
          <TabsTrigger value="earnings">
            <DollarSign className="h-4 w-4 mr-2" />
            Einnahmen
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageCircle className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
        </TabsList>
        
        {/* Tutorials Tab */}
        <TabsContent value="tutorials">
          <TutorialsTab 
            tutorials={tutorials} 
            handleEditTutorial={handleEditTutorial} 
          />
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <AnalyticsTab tutorials={tutorials} />
        </TabsContent>
        
        {/* Earnings Tab */}
        <TabsContent value="earnings">
          <EarningsTab monthlyEarnings={monthlyEarnings} />
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <FeedbackTab 
            topComments={topComments} 
            handleSupportRequest={handleSupportRequest}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
