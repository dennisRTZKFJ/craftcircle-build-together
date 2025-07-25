import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Mock data for community members
const featuredCreators = [
  {
    id: 1,
    name: "Maria Schmidt",
    username: "@mariadesigns",
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    bio: "DIY enthusiast and interior designer. I love restoring old furniture and building new ones.",
    tutorials: 24,
    followers: 1240,
    badges: ["Top Creator", "Wood Expert", "Upcycling Master"],
    featured: true
  },
  {
    id: 2,
    name: "Thomas Weber",
    username: "@thomasbuilds",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    bio: "Carpenter by passion. Here you'll find professional tips and tricks for challenging projects.",
    tutorials: 18,
    followers: 980,
    badges: ["Pro Craftsman", "Innovator"],
    featured: true
  },
  {
    id: 3,
    name: "Julia Hoffmann",
    username: "@juliascreates",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    bio: "I transform small spaces into cozy havens. Specialized in space-saving furniture and multi-functional solutions.",
    tutorials: 15,
    followers: 870,
    badges: ["Newcomer of the Year", "Design Talent"],
    featured: true
  },
  {
    id: 4,
    name: "Markus Bauer",
    username: "@markuscraft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    bio: "From hobby to profession. I'll show you how to build impressive furniture with simple tools.",
    tutorials: 12,
    followers: 720,
    badges: ["Sustainability Champion", "Beginner-Friendly"],
    featured: true
  }
];

const recentUsers = [
  {
    id: 5,
    name: "Sophie Wagner",
    username: "@sophiedesign",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    bio: "Design student with a love for minimalism. My projects are simple, functional, and beautiful.",
    tutorials: 3,
    followers: 128,
    badges: ["Newcomer"],
    featured: false
  },
  {
    id: 6,
    name: "Lukas Meyer",
    username: "@lukascrafts",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    bio: "Hobby carpenter from Munich. Discover my first DIY projects and give me feedback!",
    tutorials: 2,
    followers: 64,
    badges: ["Newcomer"],
    featured: false
  },
  {
    id: 7,
    name: "Laura Schulz",
    username: "@laurabuilds",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "I love upcycling old furniture and giving them new life.",
    tutorials: 5,
    followers: 210,
    badges: ["Upcycling Talent"],
    featured: false
  },
  {
    id: 8,
    name: "Daniel Fischer",
    username: "@danielmakes",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "My specialty: Outdoor furniture for gardens and balconies from weather-resistant materials.",
    tutorials: 7,
    followers: 345,
    badges: ["Outdoor Expert"],
    featured: false
  }
];

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    user: {
      name: "Maria Schmidt",
      username: "@mariadesigns",
      avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56"
    },
    type: "tutorial",
    content: "published a new tutorial: \"Minimalist Coat Rack from Oak\"",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    time: "2 hours ago",
    likes: 34,
    comments: 7
  },
  {
    id: 2,
    user: {
      name: "Thomas Weber",
      username: "@thomasbuilds",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    },
    type: "comment",
    content: "left a comment on your project \"Coffee Table from Pallet Wood\"",
    text: "Great work! The surface looks very professional. What kind of wood stain did you use?",
    time: "3 hours ago",
    likes: 12,
    comments: 1
  },
  {
    id: 3,
    user: {
      name: "Julia Hoffmann",
      username: "@juliascreates",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    type: "challenge",
    content: "participated in the \"Upcycling Wonder\" challenge",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    time: "5 hours ago",
    likes: 56,
    comments: 14
  },
  {
    id: 4,
    user: {
      name: "Sophie Wagner",
      username: "@sophiedesign",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    type: "follow",
    content: "is now following you",
    time: "1 day ago",
    likes: 0,
    comments: 0
  }
];

const Community = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12">
        <div className="container px-4 md:px-6">
          <div className="flex-col-gap-8">
            <div>
              <h1 className="header-xl">DIY Community</h1>
              <p className="muted-text section-space">
                Discover talented DIY enthusiasts, share your projects, and connect with like-minded people.
                In our community, you'll find inspiration, feedback, and support for your furniture building projects.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="header-lg">Community Feed</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button size="sm">Create Post</Button>
                  </div>
                </div>
                <Tabs defaultValue="alle">
                  <TabsList className="section-space">
                    <TabsTrigger value="alle">All</TabsTrigger>
                    <TabsTrigger value="projekte">Projects</TabsTrigger>
                    <TabsTrigger value="fragen">Questions</TabsTrigger>
                    <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                  </TabsList>
                  <TabsContent value="alle" className="space-y-6">
                    {recentActivity.map((activity) => (
                      <Card key={activity.id}>
                        <CardHeader className="p-4 pb-0">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{activity.user.name}</div>
                              <div className="text-sm muted-text">{activity.user.username}</div>
                              <div className="text-sm mt-1">
                                {activity.content}
                              </div>
                              <div className="text-xs muted-text mt-1">{activity.time}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-3">
                          {activity.type === 'comment' && (
                            <div className="bg-muted p-3 rounded-md text-sm mt-2">
                              "{activity.text}"
                            </div>
                          )}
                          {(activity.type === 'tutorial' || activity.type === 'challenge') && activity.image && (
                            <div className="mt-2 rounded-md overflow-hidden h-48">
                              <img 
                                src={activity.image} 
                                alt="Project Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <div className="flex-gap4">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-craft-wood mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                              </svg>
                              <span className="text-sm">{activity.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-craft-wood mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path>
                              </svg>
                              <span className="text-sm">{activity.comments}</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                    <div className="text-center p-12 border rounded-lg">
                      <h3 className="header-md">Loading projects...</h3>
                      <p className="muted-text">
                        No projects to display at the moment. Check back later!
                      </p>
                    </div>
                    <div className="text-center p-12 border rounded-lg">
                      <h3 className="header-md">Loading questions...</h3>
                      <p className="muted-text">
                        No questions to display at the moment. Be the first to ask!
                      </p>
                    </div>
                    <div className="text-center p-12 border rounded-lg">
                      <h3 className="header-md">Loading tutorials...</h3>
                      <p className="muted-text">
                        No tutorials to display at the moment. Check back later!
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="projekte" className="space-y-6">
                    {/* Projects Content */}
                    <div className="text-center p-12 border rounded-lg">
                      <h3 className="header-md">Loading projects...</h3>
                      <p className="muted-text">
                        No projects to display at the moment. Check back later!
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="fragen" className="space-y-6">
                    {/* Questions Content */}
                    <div className="text-center p-12 border rounded-lg">
                      <h3 className="header-md">Loading questions...</h3>
                      <p className="muted-text">
                        No questions to display at the moment. Be the first to ask!
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="tutorials" className="space-y-6">
                    {/* Tutorials Content */}
                    <div className="text-center p-12 border rounded-lg">
                      <h3 className="header-md">Loading tutorials...</h3>
                      <p className="muted-text">
                        No tutorials to display at the moment. Check back later!
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Creators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {featuredCreators.map((creator) => (
                      <div key={creator.id} className="flex-gap3-p3-hover-muted-rounded">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center">
                            {creator.name}
                            {creator.featured && <Award className="h-3 w-3 ml-1 text-craft-wood" />}
                          </div>
                          <div className="text-sm muted-text">{creator.username}</div>
                          <div className="flex gap-3 mt-1">
                            <div className="text-xs">{creator.tutorials} Tutorials</div>
                            <div className="text-xs">{creator.followers} Followers</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">Discover All Creators</Button>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Join the Community</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex justify-center section-space">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=128&h=128&q=80" alt="Community Avatar" />
                        <AvatarFallback>CC</AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="header-md">Sign In or Register</h3>
                    <p className="muted-text section-space">
                      Become a part of our growing community and share your passion for DIY furniture.
                    </p>
                    <div className="flex-col-gap-2">
                      <Button onClick={() => alert('Navigating to Login')}>Sign In</Button>
                      <Button variant="outline" onClick={() => alert('Navigating to Register')}>Register Now</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Woodworking</Badge>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Upcycling</Badge>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Small Spaces</Badge>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Outdoor</Badge>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Beginner Friendly</Badge>
                      <Badge variant="outline" className="bg-pink-100 text-pink-800 border-pink-200">Modern Design</Badge>
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">Rustic</Badge>
                      <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">Storage</Badge>
                    </div>
                    <p className="text-xs muted-text mt-2">
                      Explore more topics in our forum!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;
