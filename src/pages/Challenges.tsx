
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy } from 'lucide-react';

// Mock data for challenges
const currentChallenge = {
  id: 1,
  title: "Upcycling Wonder",
  description: "Transform old wood scraps or discarded furniture into something new and useful. Be creative and give old materials a second life!",
  startDate: "May 15, 2025",
  endDate: "May 22, 2025",
  participants: 124,
  image: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828",
  prize: "Hornbach voucher worth €50"
};

const pastChallenges = [
  {
    id: 2,
    title: "Mini-Budget Wonder",
    description: "Create a useful piece of furniture for under €30",
    startDate: "May 1, 2025",
    endDate: "May 8, 2025",
    participants: 156,
    winner: "Sabine Müller",
    winnerImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    projectImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    likes: 283
  },
  {
    id: 3,
    title: "Balcony Makeover",
    description: "Design a balcony piece of furniture that needs little space but has a big impact",
    startDate: "April 15, 2025",
    endDate: "April 22, 2025",
    participants: 98,
    winner: "Thomas Weber",
    winnerImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    projectImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    likes: 211
  },
  {
    id: 4,
    title: "One-Tool Project",
    description: "Build something useful with just one single tool",
    startDate: "April 1, 2025",
    endDate: "April 8, 2025",
    participants: 112,
    winner: "Jana Schmidt",
    winnerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    projectImage: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    likes: 195
  },
];

// Mock submissions for the current challenge
const submissions = [
  {
    id: 1,
    user: "Mark Bauer",
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    projectTitle: "Magazine Rack from Old Skateboards",
    projectImage: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
    description: "From two broken skateboards and a few screws, I built this magazine rack.",
    likes: 48,
    comments: 12,
    date: "May 17, 2025"
  },
  {
    id: 2,
    user: "Laura Fischer",
    userImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    projectTitle: "Coffee Table from an Old Door",
    projectImage: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    description: "I found this wooden door at a flea market and transformed it into a practical coffee table.",
    likes: 37,
    comments: 8,
    date: "May 16, 2025"
  },
  {
    id: 3,
    user: "Stefan Müller",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    projectTitle: "Coat Rack from Old Tools",
    projectImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    description: "Old tools reimagined: This coat rack consists of used hammers, pliers, and other tools.",
    likes: 29,
    comments: 5,
    date: "May 16, 2025"
  },
];

const Challenges = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">CraftChallenges</h1>
            <p className="text-muted-foreground mb-6">
              Build. Share. Win. In our weekly DIY challenges, you can showcase your skills and get
              recognition from the community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img 
                    src={currentChallenge.image} 
                    alt={currentChallenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <Badge className="bg-craft-wood text-white border-none mb-2">Current Challenge</Badge>
                    <h2 className="text-2xl font-bold text-white">{currentChallenge.title}</h2>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-muted-foreground mb-1">Period</p>
                      <p className="font-medium">{currentChallenge.startDate} - {currentChallenge.endDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Participants</p>
                      <p className="font-medium">{currentChallenge.participants} Makers</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Prize</p>
                      <p className="font-medium flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-craft-wood" />
                        {currentChallenge.prize}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">The Challenge</h3>
                    <p>{currentChallenge.description}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button>Participate</Button>
                    <Button variant="outline">All Details</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Current Submissions</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={submission.projectImage} 
                          alt={submission.projectTitle}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                              src={submission.userImage}
                              alt={submission.user}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{submission.user}</p>
                            <p className="text-xs text-muted-foreground">{submission.date}</p>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{submission.projectTitle}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{submission.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-craft-wood" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
                            </svg>
                            <span className="ml-1 text-sm">{submission.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1H4v8.5h12V6zm-6 7a1 1 0 100-2 1 1 0 000 2z"></path>
                            </svg>
                            <span className="ml-1 text-sm">{submission.comments}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Past Challenges</CardTitle>
                  <CardDescription>See previous challenges and winners</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {pastChallenges.map((challenge) => (
                    <div key={challenge.id} className="border-b pb-6 last:border-0">
                      <div className="aspect-[16/9] overflow-hidden rounded-md mb-3">
                        <img 
                          src={challenge.projectImage} 
                          alt={challenge.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold mb-2">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <img 
                              src={challenge.winnerImage} 
                              alt={challenge.winner}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-sm">
                            Winner: <span className="font-medium">{challenge.winner}</span>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {challenge.participants} participants
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Past Challenges
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Rewards</CardTitle>
                    <CardDescription>What you can win by participating</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-10 w-10 text-amber-500" />
                      <div>
                        <h4 className="font-medium">Material Vouchers</h4>
                        <p className="text-sm text-muted-foreground">Gift cards from our partners for your next projects</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-10 w-10 text-craft-wood" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                        <path d="M15 8h-3v4H8v3h7z"></path>
                      </svg>
                      <div>
                        <h4 className="font-medium">Featured Projects</h4>
                        <p className="text-sm text-muted-foreground">Your project showcased on our homepage and social media</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-10 w-10 text-craft-wood" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                      </svg>
                      <div>
                        <h4 className="font-medium">Community Recognition</h4>
                        <p className="text-sm text-muted-foreground">Gain followers and reputation in the DIY community</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Join This Week's Challenge
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
