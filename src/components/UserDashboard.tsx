
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trophy, BookOpen, Hammer, Calendar, Heart, Plus, Clock } from 'lucide-react';

const UserDashboard = () => {
  // Mock data - in a real app this would come from a database/API
  const userStats = {
    projectsCompleted: 7,
    projectsSaved: 12,
    totalHoursWorking: 32,
    averageRating: 4.7,
    skillLevel: 65, // percentage
    badges: [
      { name: "Holzfäller", description: "5 Holzprojekte abgeschlossen", icon: <Hammer className="h-3 w-3" /> },
      { name: "Frühaufsteher", description: "Vor 8 Uhr aktiv", icon: <Calendar className="h-3 w-3" /> },
      { name: "Beliebter Creator", description: "Über 100 Likes", icon: <Heart className="h-3 w-3" /> },
    ],
    recentProjects: [
      { name: "Couchtisch", progress: 100, image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90" },
      { name: "Bücherregal", progress: 70, image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4" },
      { name: "Nachttisch", progress: 30, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8" },
    ],
    recommendations: [
      { name: "Garderobe", difficulty: "Mittel", duration: "4 Stunden", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2" },
      { name: "Schreibtisch", difficulty: "Fortgeschritten", duration: "8 Stunden", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd" },
    ]
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Meine Werkstatt</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - User stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meine Statistiken</CardTitle>
              <CardDescription>Dein DIY-Fortschritt im Überblick</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Abgeschlossene Projekte</span>
                <span className="font-semibold">{userStats.projectsCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Gespeicherte Anleitungen</span>
                <span className="font-semibold">{userStats.projectsSaved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Werkstatt-Stunden</span>
                <span className="font-semibold">{userStats.totalHoursWorking}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Durchschnittliche Bewertung</span>
                <div className="flex items-center">
                  <span className="font-semibold mr-1">{userStats.averageRating}</span>
                  <Star className="h-4 w-4 text-craft-wood" fill="currentColor" />
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">DIY-Level</span>
                  <span className="text-sm font-medium">Fortgeschritten</span>
                </div>
                <Progress value={userStats.skillLevel} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Meine Abzeichen</CardTitle>
              <CardDescription>Deine Erfolge und Auszeichnungen</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {userStats.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 p-1 pr-3">
                  <span className="bg-craft-wood/20 p-1 rounded-sm mr-1">
                    {badge.icon}
                  </span>
                  {badge.name}
                </Badge>
              ))}
              <Badge variant="outline" className="border-dashed">
                <Trophy className="h-3 w-3 mr-1" /> Weiter so!
              </Badge>
            </CardContent>
            <CardFooter>
              <button className="text-sm text-muted-foreground hover:text-craft-wood transition-colors">
                Alle Abzeichen anzeigen
              </button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Middle and right columns */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="projects">Meine Projekte</TabsTrigger>
              <TabsTrigger value="saved">Gespeichert</TabsTrigger>
              <TabsTrigger value="recommended">Empfehlungen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userStats.recentProjects.map((project, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="h-36 overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.progress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Fortschritt</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-1" />
                        </div>
                      )}
                      {project.progress === 100 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-craft-wood border-none">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Fertig
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base">{project.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-3 pt-0">
                      <button className="text-sm text-craft-wood">Fortsetzen</button>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="overflow-hidden border-dashed flex flex-col items-center justify-center h-[172px]">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-craft-wood/10 flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-6 w-6 text-craft-wood" />
                    </div>
                    <p className="text-muted-foreground">Neues Projekt starten</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Deine gespeicherten Tutorials</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Hier findest du alle Anleitungen, die du für später gespeichert hast. 
                  So hast du sie immer griffbereit.
                </p>
                <button className="text-craft-wood hover:underline">
                  Tutorials entdecken
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="space-y-4">
              <p className="text-sm text-muted-foreground italic">
                Basierend auf deinen abgeschlossenen Projekten und Fähigkeiten
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userStats.recommendations.map((rec, index) => (
                  <Card key={index} className="overflow-hidden flex">
                    <div className="w-24 h-auto overflow-hidden">
                      <img 
                        src={rec.image} 
                        alt={rec.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <h3 className="font-medium mb-1">{rec.name}</h3>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          {rec.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {rec.duration}
                        </span>
                      </div>
                      <button className="mt-2 text-craft-wood text-sm hover:underline">
                        Ansehen
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
