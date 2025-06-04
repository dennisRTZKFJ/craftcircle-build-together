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
    <div className="min-h-screen section-y-space-lg">
      <div className="container container-padding">
        <div className="flex-col-gap-8">
          <div>
            <h1 className="header-xl">CraftChallenges</h1>
            <p className="muted-text section-space">
              Build. Share. Win. In our weekly DIY challenges, you can showcase your skills and get
              recognition from the community.
            </p>
          </div>

          <div className="grid-cols-1-3-gap-8">
            <div className="lg:col-span-2">
              <Card className="card-overflow-hidden">
                <div className="h-64 card-overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img 
                    src={currentChallenge.image} 
                    alt={currentChallenge.title}
                    className="img-object-cover"
                  />
                  <div className="absolute-bottom-left-z-20">
                    <Badge className="badge-craft-wood mb-2-util">Current Challenge</Badge>
                    <h2 className="header-lg-white">{currentChallenge.title}</h2>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex-responsive-header-layout section-space">
                    <div>
                      <p className="muted-text mb-1-util">Period</p>
                      <p className="font-medium">{currentChallenge.startDate} - {currentChallenge.endDate}</p>
                    </div>
                    <div>
                      <p className="muted-text mb-1-util">Participants</p>
                      <p className="font-medium">{currentChallenge.participants} Makers</p>
                    </div>
                    <div>
                      <p className="muted-text mb-1-util">Prize</p>
                      <p className="font-medium flex-items-center">
                        <Trophy className="h-4 w-4 icon-margin-right icon-craft-wood" />
                        {currentChallenge.prize}
                      </p>
                    </div>
                  </div>
                  
                  <div className="section-space">
                    <h3 className="header-md">The Challenge</h3>
                    <p>{currentChallenge.description}</p>
                  </div>
                  
                  <div className="flex flex-row-gap-4">
                    <Button>Participate</Button>
                    <Button variant="outline">All Details</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8-util">
                <div className="flex-between section-space">
                  <h2 className="header-lg">Current Submissions</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid-cols-1-2-gap-6">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="card-overflow-hidden">
                      <div className="h-48 card-overflow-hidden">
                        <img 
                          src={submission.projectImage} 
                          alt={submission.projectTitle}
                          className="img-object-cover img-hover-scale"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex-align-center-gap-3 mb-2-util">
                          <div className="avatar-sm">
                            <img 
                              src={submission.userImage}
                              alt={submission.user}
                              className="img-object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{submission.user}</p>
                            <p className="small-muted-text">{submission.date}</p>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{submission.projectTitle}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="small-muted-text">{submission.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex-between">
                        <div className="flex flex-row-gap-4">
                          <div className="flex-items-center">
                            <svg className="h-4 w-4 icon-craft-wood icon-margin-right" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
                            </svg>
                            <span className="text-sm-ml-1">{submission.likes}</span>
                          </div>
                          <div className="flex-items-center">
                            <svg className="h-4 w-4 icon-muted-foreground icon-margin-right" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-sm-ml-1">{submission.comments}</span>
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
                      <div className="aspect-[16/9] card-overflow-hidden rounded-md mb-3-util">
                        <img 
                          src={challenge.projectImage} 
                          alt={challenge.title}
                          className="img-object-cover"
                        />
                      </div>
                      <h3 className="header-card-title">{challenge.title}</h3>
                      <p className="small-muted-text section-space">{challenge.description}</p>
                      <div className="flex-between">
                        <div className="flex-align-center-gap-2">
                          <div className="avatar-xs">
                            <img 
                              src={challenge.winnerImage} 
                              alt={challenge.winner}
                              className="img-object-cover"
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
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" className="btn-full-width">View All Past Challenges</Button>
                </CardFooter>
              </Card>

              <Card className="mt-8 p-6">
                <CardTitle className="header-md mb-4">Challenge Rules</CardTitle>
                <ul className="list-disc list-inside space-y-2 small-muted-text">
                  <li>Only one submission per challenge.</li>
                  <li>Projects must be original and not previously published.</li>
                  <li>Use at least 80% recycled or upcycled materials.</li>
                  <li>Projects must be safe and functional.</li>
                  <li>The community votes on the winners.</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
