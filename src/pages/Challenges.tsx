
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy } from 'lucide-react';

// Mock data for challenges
const currentChallenge = {
  id: 1,
  title: "Upcycling-Wunder",
  description: "Verwandle alte Holzreste oder ausrangierte Möbel in etwas Neues und Nützliches. Sei kreativ und gib alten Materialien ein zweites Leben!",
  startDate: "15. Mai 2025",
  endDate: "22. Mai 2025",
  participants: 124,
  image: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828",
  prize: "Hornbach Gutschein im Wert von €50"
};

const pastChallenges = [
  {
    id: 2,
    title: "Mini-Budget Wunder",
    description: "Erstelle ein nützliches Möbelstück für unter €30",
    startDate: "1. Mai 2025",
    endDate: "8. Mai 2025",
    participants: 156,
    winner: "Sabine Müller",
    winnerImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    projectImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    likes: 283
  },
  {
    id: 3,
    title: "Balkon-Makeover",
    description: "Gestalte ein Balkonmöbel, das wenig Platz braucht aber viel hermacht",
    startDate: "15. April 2025",
    endDate: "22. April 2025",
    participants: 98,
    winner: "Thomas Weber",
    winnerImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    projectImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    likes: 211
  },
  {
    id: 4,
    title: "Ein-Werkzeug-Projekt",
    description: "Baue etwas Nützliches mit nur einem einzigen Werkzeug",
    startDate: "1. April 2025",
    endDate: "8. April 2025",
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
    user: "Markus Bauer",
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    projectTitle: "Zeitungsständer aus alten Skateboards",
    projectImage: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
    description: "Aus zwei kaputten Skateboards und ein paar Schrauben habe ich diesen Zeitungsständer gebaut.",
    likes: 48,
    comments: 12,
    date: "17. Mai 2025"
  },
  {
    id: 2,
    user: "Laura Fischer",
    userImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    projectTitle: "Couchtisch aus einer alten Tür",
    projectImage: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    description: "Diese Holztür habe ich auf einem Flohmarkt gefunden und in einen praktischen Couchtisch verwandelt.",
    likes: 37,
    comments: 8,
    date: "16. Mai 2025"
  },
  {
    id: 3,
    user: "Stefan Müller",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    projectTitle: "Garderobe aus alten Werkzeugen",
    projectImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    description: "Alte Werkzeuge neu gedacht: Diese Garderobe besteht aus gebrauchten Hämmern, Zangen und anderen Werkzeugen.",
    likes: 29,
    comments: 5,
    date: "16. Mai 2025"
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
              Baue. Teile. Gewinne. Bei unseren wöchentlichen DIY-Herausforderungen kannst du 
              deine Fähigkeiten unter Beweis stellen und von der Community Anerkennung bekommen.
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
                    <Badge className="bg-craft-wood text-white border-none mb-2">Aktuelle Challenge</Badge>
                    <h2 className="text-2xl font-bold text-white">{currentChallenge.title}</h2>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-muted-foreground mb-1">Zeitraum</p>
                      <p className="font-medium">{currentChallenge.startDate} - {currentChallenge.endDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Teilnehmer:innen</p>
                      <p className="font-medium">{currentChallenge.participants} Maker</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Zu gewinnen</p>
                      <p className="font-medium flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-craft-wood" />
                        {currentChallenge.prize}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Die Challenge</h3>
                    <p>{currentChallenge.description}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button>Teilnehmen</Button>
                    <Button variant="outline">Alle Details</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Aktuelle Einreichungen</h2>
                  <Button variant="outline" size="sm">Alle ansehen</Button>
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
                        <p className="text-sm text-muted-foreground line-clamp-2">{submission.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-craft-wood mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
                            </svg>
                            <span className="text-sm">{submission.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-craft-wood mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 13v5l-5-5H4a2 2 0 01-2-2V4a2 2 0 012-2h12a2 2 0 012 2v9z"></path>
                            </svg>
                            <span className="text-sm">{submission.comments}</span>
                          </div>
                        </div>
                        <Button size="sm">Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Hall of Fame</CardTitle>
                  <CardDescription>Vergangene Challenges und Gewinner:innen</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="winners">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="winners">Gewinner:innen</TabsTrigger>
                      <TabsTrigger value="challenges">Challenges</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="winners" className="space-y-4">
                      {pastChallenges.map((challenge) => (
                        <div key={challenge.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={challenge.winnerImage}
                              alt={challenge.winner}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{challenge.winner}</p>
                            <p className="text-sm text-muted-foreground">
                              {challenge.title}
                            </p>
                            <div className="flex items-center mt-1">
                              <Trophy className="h-3 w-3 text-craft-wood mr-1" />
                              <span className="text-xs">{challenge.likes} Likes</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="challenges" className="space-y-4">
                      {pastChallenges.map((challenge) => (
                        <div key={challenge.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={challenge.projectImage}
                              alt={challenge.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{challenge.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {challenge.startDate} - {challenge.endDate}
                            </p>
                            <div className="flex items-center mt-1">
                              <svg className="w-3 h-3 text-craft-wood mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                              </svg>
                              <span className="text-xs">{challenge.participants} Teilnehmer:innen</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Alle vergangenen Challenges</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Mach mit!</CardTitle>
                  <CardDescription>So funktionieren die CraftChallenges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <div className="bg-craft-teal text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                    <p className="text-sm">Melde dich für die aktuelle Challenge an</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-craft-teal text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                    <p className="text-sm">Baue dein Projekt und dokumentiere den Prozess</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-craft-teal text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                    <p className="text-sm">Reiche dein fertiges Projekt mit Fotos ein</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-craft-teal text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                    <p className="text-sm">Sammle Likes und Kommentare der Community</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-craft-teal text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">5</div>
                    <p className="text-sm">Die beliebtesten Projekte werden ausgezeichnet</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Jetzt teilnehmen</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
