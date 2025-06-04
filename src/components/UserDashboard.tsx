import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  User, CheckCircle, Calendar, Clock, MessageCircle, Heart,
  Award, Package, FileText, Star, Brain, Target, 
  ArrowRight, Crown, Check
} from 'lucide-react';

const UserDashboard = () => {
  const { toast } = useToast();
  const [weeklyGoal, setWeeklyGoal] = useState(1);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  
  // Mock data for user projects
  const projects = [
    { 
      id: 1, 
      name: 'Oak Coffee Table', 
      status: 'completed', 
      progress: 100, 
      date: '05/10/2025',
      image: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975'
    },
    { 
      id: 2, 
      name: 'Children\'s Bookshelf', 
      status: 'in-progress', 
      progress: 75, 
      date: '05/13/2025',
      image: 'https://images.unsplash.com/photo-1617104678098-de229db51175'
    },
    { 
      id: 3, 
      name: 'Reclaimed Wood Coat Rack', 
      status: 'in-progress', 
      progress: 30, 
      date: '05/16/2025',
      image: 'https://images.unsplash.com/photo-1609799529593-38cd08a93427'
    },
    { 
      id: 4, 
      name: 'Desk with Drawers', 
      status: 'planned', 
      progress: 0, 
      date: '05/20/2025',
      image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a'
    },
    { 
      id: 5, 
      name: 'Side Table Project', 
      status: 'abandoned', 
      progress: 40, 
      date: '05/02/2025',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90'
    },
  ];
  
  // Mock data for user comments
  const comments = [
    {
      id: 1,
      content: 'Great idea with the hidden connection! Worked perfectly in my project.',
      likes: 24,
      tutorial: 'Minimalist Coat Rack',
      date: '2 days ago'
    },
    {
      id: 2,
      content: 'Thank you for the detailed instructions. As a beginner, this was very helpful.',
      likes: 17,
      tutorial: 'Oak Coffee Table',
      date: '1 week ago'
    },
    {
      id: 3,
      content: 'What tool did you use for the edges? Mine don\'t look as even.',
      likes: 5,
      tutorial: 'Bookshelf with Invisible Mounts',
      date: '2 weeks ago'
    },
  ];
  
  // Mock data for material lists
  const materialLists = [
    {
      id: 1,
      name: 'Oak Coffee Table',
      items: 8,
      purchased: true,
      date: '05/05/2025',
      totalCost: '$147.80'
    },
    {
      id: 2,
      name: 'Children\'s Room Shelf',
      items: 12,
      purchased: true,
      date: '05/10/2025',
      totalCost: '$84.95'
    },
    {
      id: 3,
      name: 'Coat Rack',
      items: 6,
      purchased: false,
      date: '05/15/2025',
      totalCost: '$62.50'
    },
    {
      id: 4,
      name: 'Desk',
      items: 15,
      purchased: false,
      date: '05/20/2025',
      totalCost: '$219.30'
    },
  ];
  
  // Mock data for AI recommendations
  const aiRecommendations = [
    {
      id: 1,
      title: 'Nightstand with Integrated Charging Station',
      difficulty: 'Intermediate',
      tools: 'Saw, Drill, Sandpaper',
      image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e'
    },
    {
      id: 2,
      title: 'Key Holder with Storage',
      difficulty: 'Easy',
      tools: 'Saw, Drill, Screwdriver',
      image: 'https://images.unsplash.com/photo-1596079890701-dd42edf0b7d4'
    },
    {
      id: 3,
      title: 'Floating Bookshelf',
      difficulty: 'Advanced',
      tools: 'Circular Saw, Drill, Level, Doweling Jig',
      image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe'
    },
  ];
  
  // Mock data for badges/achievements
  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Completed first DIY project',
      icon: <Award className="h-8 w-8" />,
      earned: true,
      date: '04/02/2025'
    },
    {
      id: 2,
      name: 'Busy Bee',
      description: 'Completed 5 projects',
      icon: <CheckCircle className="h-8 w-8" />,
      earned: false,
      progress: 20
    },
    {
      id: 3,
      name: 'Wood Expert',
      description: 'Viewed 10 woodworking tutorials',
      icon: <FileText className="h-8 w-8" />,
      earned: true,
      date: '04/28/2025'
    },
    {
      id: 4,
      name: 'Helpful Craftsperson',
      description: 'Posted 10 helpful comments',
      icon: <MessageCircle className="h-8 w-8" />,
      earned: false,
      progress: 30
    },
    {
      id: 5,
      name: 'Tool Collector',
      description: 'Acquired all basic tools',
      icon: <Package className="h-8 w-8" />,
      earned: true,
      date: '04/15/2025'
    },
    {
      id: 6,
      name: 'Challenger',
      description: 'Participated in a weekly challenge',
      icon: <Target className="h-8 w-8" />,
      earned: false,
      progress: 0
    },
  ];
  
  const setGoal = (goal: number) => {
    setWeeklyGoal(goal);
    toast({
      title: "Weekly goal set",
      description: `You've set a goal to complete ${goal} project(s) per week.`
    });
  };
  
  const startProject = () => {
    toast({
      title: "New Project",
      description: "You can now start a new project."
    });
  };
  
  const viewAllProjects = () => {
    toast({
      title: "Project History",
      description: "Here you'll find a complete overview of your projects."
    });
  };
  
  const handleSubscribe = () => {
    setSubscriptionDialogOpen(false);
    toast({
      title: "Subscription",
      description: "Thank you for your interest! You will be redirected to the payment page."
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row flex-between items-start gap-6 mb-8">
        <div>
          <h1 className="header-xl">My Workshop</h1>
          <p className="muted-text">Welcome back to your personal DIY hub</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button onClick={startProject} className="whitespace-nowrap">
            <FileText className="mr-2 h-4 w-4" />
            Start New Project
          </Button>
          
          <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <Crown className="mr-2 h-4 w-4" />
                Subscribe to Premium
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex-align-center-gap-3 text-craft-wood">
                  <Crown className="h-5 w-5" />
                  DIY Premium
                </DialogTitle>
                <DialogDescription>
                  Expand your capabilities and get access to exclusive premium features
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-col-gap-8">
                <div className="flex flex-col gap-3">
                  <div className="flex-align-center-gap-3">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">Unlimited Projects</h4>
                      <p className="small-muted-text">Create and manage as many projects as you want</p>
                    </div>
                  </div>
                  
                  <div className="flex-align-center-gap-3">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Project Assistant</h4>
                      <p className="small-muted-text">Get personalized suggestions and guidance for your projects</p>
                    </div>
                  </div>
                  
                  <div className="flex-align-center-gap-3">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">Exclusive Tutorials</h4>
                      <p className="small-muted-text">Access to premium content from top creators</p>
                    </div>
                  </div>
                  
                  <div className="flex-align-center-gap-3">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">Priority Support</h4>
                      <p className="small-muted-text">Get faster responses to your questions and issues</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex-between mb-2">
                    <div className="text-sm">Monthly Price</div>
                    <div className="text-lg font-bold">$9.99</div>
                  </div>
                  <div className="text-xs muted-text">Cancel anytime. 14-day money-back guarantee.</div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setSubscriptionDialogOpen(false)}>
                  Decide Later
                </Button>
                <Button onClick={handleSubscribe} className="gap-2">
                  <Crown className="h-4 w-4" />
                  Subscribe Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Welcome & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex-between items-start">
              <div>
                <CardTitle>Welcome to your Workshop</CardTitle>
                <CardDescription>Your personal DIY space</CardDescription>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex-col-gap-8">
              <div>
                <div className="flex-between mb-2">
                  <div className="text-sm font-medium">Your progress this week</div>
                  <div className="text-sm muted-text">{weeklyProgress} of {weeklyGoal} projects</div>
                </div>
                <Progress value={weeklyProgress / weeklyGoal * 100} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setGoal(1)} className={weeklyGoal === 1 ? "border-craft-wood" : ""}>
                  1 Project / Week
                </Button>
                <Button variant="outline" size="sm" onClick={() => setGoal(2)} className={weeklyGoal === 2 ? "border-craft-wood" : ""}>
                  2 Projects / Week
                </Button>
                <Button variant="outline" size="sm" onClick={() => setGoal(3)} className={weeklyGoal === 3 ? "border-craft-wood" : ""}>
                  3 Projects / Week
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="flex-align-center-gap-3">
                <div className="h-10 w-10 rounded-full bg-craft-wood/10 flex-center">
                  <CheckCircle className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <div className="text-xl font-bold">3</div>
                  <div className="text-xs muted-text">Completed Projects</div>
                </div>
              </div>
              <div className="flex-align-center-gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">2</div>
                  <div className="text-xs muted-text">Active Projects</div>
                </div>
              </div>
              <div className="flex-align-center-gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex-center">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">3</div>
                  <div className="text-xs muted-text">Earned Badges</div>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>What Should I Build Next?</CardTitle>
            <CardDescription>AI Project Recommendations for You</CardDescription>
          </CardHeader>
          <CardContent className="flex-col-gap-8">
            <div className="relative h-36 rounded-md overflow-hidden">
              <img 
                src={aiRecommendations[0].image} 
                alt={aiRecommendations[0].title}
                className="img-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex-center">
                <div className="text-center text-white p-4">
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium text-sm">{aiRecommendations[0].title}</div>
                  <div className="text-xs mt-1">Difficulty: {aiRecommendations[0].difficulty}</div>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              More Suggestions
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid grid-cols-5 max-w-3xl mb-8">
          <TabsTrigger value="projects">
            <FileText className="h-4 w-4 icon-margin-right" /> Project History
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageCircle className="h-4 w-4 icon-margin-right" /> Comments
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Package className="h-4 w-4 icon-margin-right" /> Material Lists
          </TabsTrigger>
          <TabsTrigger value="ideas">
            <Brain className="h-4 w-4 icon-margin-right" /> AI Recommendations
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="h-4 w-4 icon-margin-right" /> Achievements
          </TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="flex-col-gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className={`overflow-hidden ${project.status === 'abandoned' ? 'opacity-70' : ''}`}>
                <div className="h-40 relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="img-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={
                      project.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      project.status === 'planned' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      'bg-red-100 text-red-800 border-red-200'
                    }>
                      {project.status === 'completed' ? 'Completed' :
                       project.status === 'in-progress' ? 'In Progress' :
                       project.status === 'planned' ? 'Planned' : 'Abandoned'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{project.name}</h3>
                  <div className="small-muted-text mt-1">Due: {project.date}</div>
                  
                  <div className="mt-4">
                    <div className="flex-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                </CardContent>
                <CardFooter className="flex-between p-4 pt-0">
                  <Button variant="ghost" size="sm">Details</Button>
                  {project.status !== 'completed' && project.status !== 'abandoned' && (
                    <Button size="sm">Continue</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center h-[258px]">
              <div className="text-center p-4">
                <div className="h-10 w-10 rounded-full bg-muted flex-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-medium">New Project</h3>
                <p className="small-muted-text mt-1">
                  Start a new DIY adventure
                </p>
                <Button className="mt-4" onClick={startProject}>Create Project</Button>
              </div>
            </Card>
          </div>
          
          <div className="flex-center">
            <Button variant="outline" onClick={viewAllProjects}>
              View All Projects
            </Button>
          </div>
        </TabsContent>
        
        {/* Comments Tab */}
        <TabsContent value="comments" className="flex-col-gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex-between">
                    <CardTitle className="text-base">"{comment.tutorial}"</CardTitle>
                    <div className="flex-align-center-gap-3 muted-text">
                      <Calendar className="h-4 w-4 icon-margin-right" />
                      {comment.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex-between w-full items-center">
                    <div className="flex-align-center-gap-3">
                      <Heart className="h-4 w-4 text-craft-wood" />
                      <span className="text-sm">{comment.likes} Likes</span>
                    </div>
                    <Button variant="ghost" size="sm">Go to Tutorial</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col flex-center h-[180px]">
              <div className="text-center p-8">
                <MessageCircle className="h-8 w-8 mx-auto mb-4 muted-text" />
                <p className="muted-text">
                  Share your experiences and thoughts with the community
                </p>
                <Button variant="outline" className="mt-4">Browse Tutorials</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Materials Tab */}
        <TabsContent value="materials" className="flex-col-gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Material Lists</CardTitle>
              <CardDescription>Manage your shopping lists and saved materials</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Number of Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materialLists.map((list) => (
                    <TableRow key={list.id}>
                      <TableCell className="font-medium">{list.name}</TableCell>
                      <TableCell>{list.items} items</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={list.purchased ? 
                          'bg-green-100 text-green-800 border-green-200' : 
                          'bg-amber-100 text-amber-800 border-amber-200'}>
                          {list.purchased ? 'Purchased' : 'Saved'}
                        </Badge>
                      </TableCell>
                      <TableCell>{list.date}</TableCell>
                      <TableCell>{list.totalCost}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex-between">
              <Button variant="outline">Create New List</Button>
              <Button>Order from Partner</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Ideas Tab */}
        <TabsContent value="ideas" className="flex-col-gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.title}
                    className="img-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <Badge className="bg-craft-wood border-craft-wood mb-1">
                        {recommendation.difficulty}
                      </Badge>
                      <h3 className="font-bold">{recommendation.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex-align-center-gap-3">
                    <Brain className="h-4 w-4 text-craft-wood" />
                    <div className="text-sm font-medium">AI Recommendation</div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm muted-text">
                      <span className="font-medium text-foreground">Tools needed:</span> {recommendation.tools}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex-between p-4 pt-0">
                  <Button variant="outline" size="sm">Find Tutorial</Button>
                  <Button size="sm">Start Project</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col flex-center h-[338px]">
              <div className="text-center p-8">
                <div className="h-16 w-16 rounded-full bg-craft-wood/10 flex-center">
                  <Brain className="h-8 w-8 text-craft-wood" />
                </div>
                <h3 className="font-medium mb-2">Discover More Ideas</h3>
                <p className="muted-text">
                  Tell the AI more about your interests and skills for better suggestions
                </p>
                <Button className="mt-4">Customize Interests</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Achievements Tab */}
        <TabsContent value="achievements" className="flex-col-gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${!achievement.earned ? 'opacity-60' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className={`h-20 w-20 rounded-full flex-center mx-auto mb-4 ${
                    achievement.earned ? 'bg-craft-wood/10' : 'bg-muted'
                  }`}>
                    <div className={`h-16 w-16 rounded-full flex-center ${
                      achievement.earned ? 'text-craft-wood' : 'muted-text'
                    }`}>
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                  <p className="small-muted-text">
                    {achievement.description}
                  </p>
                  <div className="mt-4">
                    {achievement.earned ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Earned on {achievement.date}
                      </Badge>
                    ) : (
                      <div>
                        <div className="text-xs muted-text mb-1">
                          {achievement.progress}% completed
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline">
              View All Achievements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
