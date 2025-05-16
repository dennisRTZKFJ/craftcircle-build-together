
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, Mail, MessageCircle, Award, MapPin, Link, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock user data
const userData = {
  id: 'user1',
  name: 'Thomas Weber',
  username: '@thomasbuilds',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  bio: 'Schreiner aus Leidenschaft. Bei mir findest du professionelle Tipps und Tricks für anspruchsvolle Projekte.',
  location: 'München, Deutschland',
  website: 'thomasbuilds.de',
  joinedDate: 'April 2024',
  following: 86,
  followers: 980,
  tutorials: 18,
  projects: 32,
  badges: [
    { id: 'badge1', name: 'Profi-Handwerker', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'badge2', name: 'Innovator', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'badge3', name: 'Top-Helfer', color: 'bg-green-100 text-green-800 border-green-200' },
  ],
  stats: {
    projectsCompleted: 45,
    tutorialsCreated: 18,
    commentsReceived: 342,
    communitySince: '1 Jahr, 3 Monate',
    challengesWon: 2
  }
};

// Mock activity data
const recentActivity = [
  { 
    id: 'act1', 
    type: 'tutorial', 
    title: 'Modulares Regalsystem aus Massivholz', 
    date: 'vor 2 Tagen',
    image: 'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5'
  },
  { 
    id: 'act2', 
    type: 'comment', 
    title: 'Kommentar zu "Erste Schritte mit der Tischkreissäge"', 
    date: 'vor 3 Tagen' 
  },
  { 
    id: 'act3', 
    type: 'forum', 
    title: 'Neuer Thread: "Richtige Pflege von Holzwerkzeugen"', 
    date: 'vor 4 Tagen' 
  },
  { 
    id: 'act4', 
    type: 'project', 
    title: 'Projekt abgeschlossen: Couchtisch aus Nussbaum', 
    date: 'vor 1 Woche',
    image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90'
  },
  { 
    id: 'act5', 
    type: 'challenge', 
    title: 'Teilnahme an der Challenge "Europaletten-Upcycling"', 
    date: 'vor 2 Wochen' 
  },
];

// Mock tutorial data
const userTutorials = [
  { 
    id: 'tut1', 
    title: 'Couchtisch aus Nussbaum bauen', 
    image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90',
    likes: 145, 
    comments: 32, 
    difficulty: 'Fortgeschritten' 
  },
  { 
    id: 'tut2', 
    title: 'Wandregale mit unsichtbaren Befestigungen', 
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f',
    likes: 98, 
    comments: 18, 
    difficulty: 'Mittel' 
  },
  { 
    id: 'tut3', 
    title: 'Modulares Regalsystem aus Massivholz', 
    image: 'https://images.unsplash.com/photo-1588200618450-3a5b1d3b9aa5',
    likes: 203, 
    comments: 45, 
    difficulty: 'Fortgeschritten' 
  },
];

const UserProfile = () => {
  const { toast } = useToast();
  
  const handleFollow = () => {
    toast({
      title: "Nutzer gefolgt",
      description: `Du folgst jetzt ${userData.name}`
    });
  };
  
  const handleMessage = () => {
    toast({
      title: "Nachricht",
      description: `Nachrichtenfunktion wird bald verfügbar sein`
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="h-40 bg-gradient-to-r from-craft-wood/20 to-craft-light-green/20"></div>
        <div className="px-6 -mt-12 pb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 pt-12 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-muted-foreground">{userData.username}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleMessage}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Nachricht
                  </Button>
                  <Button onClick={handleFollow}>Folgen</Button>
                </div>
              </div>
              
              <p className="mt-4">{userData.bio}</p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center">
                  <Link className="h-4 w-4 mr-1 text-muted-foreground" />
                  <a href={`https://${userData.website}`} className="text-craft-wood hover:underline">
                    {userData.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Mitglied seit {userData.joinedDate}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {userData.badges.map((badge) => (
                  <Badge key={badge.id} variant="outline" className={badge.color}>
                    {badge.name}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="text-center">
                  <div className="font-bold">{userData.tutorials}</div>
                  <div className="text-sm text-muted-foreground">Tutorials</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{userData.projects}</div>
                  <div className="text-sm text-muted-foreground">Projekte</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{userData.followers}</div>
                  <div className="text-sm text-muted-foreground">Follower</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{userData.following}</div>
                  <div className="text-sm text-muted-foreground">Folgt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="tutorials">
        <TabsList className="mb-6">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="projects">Projekte</TabsTrigger>
          <TabsTrigger value="activity">Aktivität</TabsTrigger>
          <TabsTrigger value="stats">Statistiken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <Badge className="bg-craft-wood border-craft-wood">
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg hover:text-craft-wood cursor-pointer">
                    {tutorial.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{tutorial.likes} Likes</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{tutorial.comments} Kommentare</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button variant="outline" size="sm" className="w-full">Tutorial ansehen</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline">Alle Tutorials anzeigen</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card className="p-6 text-center">
            <div className="py-8">
              <Award className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
              <h3 className="text-lg font-medium mb-2">Projektgalerie in Entwicklung</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Hier werden bald die abgeschlossenen DIY-Projekte des Nutzers angezeigt.
                Nutzer können ihre Projekte dokumentieren, Fotos hochladen und den Fortschritt teilen.
              </p>
              <Button className="mt-4" variant="outline">Benachrichtigen, wenn verfügbar</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          {recentActivity.map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <div className="flex">
                {activity.image && (
                  <div className="w-1/4 md:w-1/6">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover min-h-[100px]"
                    />
                  </div>
                )}
                <div className={`flex-1 p-4 ${!activity.image ? 'w-full' : ''}`}>
                  <div className="flex items-center">
                    <Badge variant="outline" className={
                      activity.type === 'tutorial' 
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : activity.type === 'project'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : activity.type === 'challenge'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : activity.type === 'forum'
                              ? 'bg-purple-100 text-purple-800 border-purple-200'
                              : 'bg-pink-100 text-pink-800 border-pink-200'
                    }>
                      {activity.type === 'tutorial' ? 'Tutorial' : 
                       activity.type === 'project' ? 'Projekt' :
                       activity.type === 'challenge' ? 'Challenge' :
                       activity.type === 'forum' ? 'Forum' : 'Kommentar'}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-2">{activity.date}</span>
                  </div>
                  <h3 className="font-medium mt-2">{activity.title}</h3>
                </div>
              </div>
            </Card>
          ))}
          <div className="flex justify-center">
            <Button variant="outline">Mehr Aktivitäten laden</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-craft-wood" />
                  Community-Beteiligung
                </CardTitle>
                <CardDescription>Statistiken zur Aktivität</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Abgeschlossene Projekte</dt>
                    <dd className="text-2xl font-bold">{userData.stats.projectsCompleted}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Erstellte Tutorials</dt>
                    <dd className="text-2xl font-bold">{userData.stats.tutorialsCreated}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Erhaltene Kommentare</dt>
                    <dd className="text-2xl font-bold">{userData.stats.commentsReceived}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Gewonnene Challenges</dt>
                    <dd className="text-2xl font-bold">{userData.stats.challengesWon}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-craft-wood" />
                  Community-Rang
                </CardTitle>
                <CardDescription>Fortschritt und Engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold">Gold</div>
                        <div className="text-muted-foreground">Level</div>
                      </div>
                    </div>
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#e2e8f0" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#d4a22c" 
                        strokeWidth="8" 
                        strokeDasharray="283" 
                        strokeDashoffset="70" 
                        transform="rotate(-90 50 50)" 
                      />
                    </svg>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm">
                      <span className="font-medium">{userData.name}</span> ist seit {userData.stats.communitySince} Mitglied der CraftCircle Community
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Nur noch 150 Engagement-Punkte bis zum Platin-Level!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
