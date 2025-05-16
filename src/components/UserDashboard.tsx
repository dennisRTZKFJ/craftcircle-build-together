
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Trophy, BookOpen, Hammer, Calendar, Heart, Plus, Clock, Target, MessageCircle, List, Brain } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const UserDashboard = () => {
  const { toast } = useToast();
  const [weeklyGoal, setWeeklyGoal] = useState<string>("1 Projekt pro Woche");
  const [weeklyGoalProgress, setWeeklyGoalProgress] = useState<number>(67);

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
      { name: "Couchtisch", progress: 100, status: "Fertig", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90" },
      { name: "Bücherregal", progress: 70, status: "In Arbeit", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4" },
      { name: "Nachttisch", progress: 30, status: "In Arbeit", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8" },
      { name: "Garderobe", progress: 0, status: "Abgebrochen", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2" },
    ],
    recommendations: [
      { name: "Garderobe", difficulty: "Mittel", duration: "4 Stunden", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2" },
      { name: "Schreibtisch", difficulty: "Fortgeschritten", duration: "8 Stunden", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd" },
    ],
    feedbackReceived: [
      { project: "Couchtisch", comment: "Tolles Design! Wie hast du die Tischbeine befestigt?", user: "HolzFan23", likes: 8 },
      { project: "Bücherregal", comment: "Sieht super stabil aus. Welches Holz hast du verwendet?", user: "DIY_Meister", likes: 5 },
      { project: "Couchtisch", comment: "Ich habe es nachgebaut, vielen Dank für die Inspiration!", user: "BastlerIn", likes: 12 },
    ],
    materialLists: [
      { name: "Couchtisch", status: "Gekauft", items: 7, totalCost: 89.95 },
      { name: "Bücherregal", status: "Gespeichert", items: 5, totalCost: 64.50 },
      { name: "Gartenmöbel", status: "Gespeichert", items: 12, totalCost: 127.80 },
    ],
    aiRecommendations: [
      { title: "Schaukelstuhl", reason: "Passt zu deinen bisherigen Projekten", difficulty: "Fortgeschritten" },
      { title: "Weinregal", reason: "Viele nutzen ähnliche Materialien wie deine letzten Projekte", difficulty: "Mittel" },
      { title: "Pflanzenständer", reason: "Schnelles Projekt für Zwischendurch", difficulty: "Einfach" },
    ],
  };

  const handleWeeklyGoalEdit = () => {
    // In a real app, this would open a modal to edit the goal
    toast({
      title: "Ziel bearbeiten",
      description: "Hier könntest du dein Wochenziel anpassen.",
    });
  };

  const handleAiRecommendation = () => {
    toast({
      title: "Projektvorschlag gespeichert",
      description: "Der Vorschlag wurde zu deinen gespeicherten Projekten hinzugefügt.",
    });
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
          
          {/* Weekly Goal Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mein Wochenziel</CardTitle>
              <CardDescription>Dein aktueller Fortschritt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-craft-wood/10 p-1.5 rounded-full">
                    <Target className="h-5 w-5 text-craft-wood" />
                  </div>
                  <span className="font-medium">{weeklyGoal}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleWeeklyGoalEdit}>
                  <span className="sr-only">Ziel bearbeiten</span>
                  <span className="text-xs">✏️</span>
                </Button>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{weeklyGoalProgress}% geschafft</span>
                  <span className="text-sm font-medium">4/7 Tage</span>
                </div>
                <Progress value={weeklyGoalProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Badges Card */}
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
          
          {/* Feedback Received Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-craft-wood" />
                Feedback erhalten
              </CardTitle>
              <CardDescription>Kommentare zu deinen Projekten</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {userStats.feedbackReceived.map((feedback, index) => (
                <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{feedback.project}</span>
                    <span className="flex items-center text-muted-foreground">
                      <Heart className="h-3 w-3 mr-1 text-craft-wood" /> {feedback.likes}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">"{feedback.comment}"</p>
                  <div className="text-xs mt-1 text-muted-foreground">- {feedback.user}</div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Alle Kommentare anzeigen
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Middle and right columns */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="projects">Meine Projekte</TabsTrigger>
              <TabsTrigger value="saved">Gespeichert</TabsTrigger>
              <TabsTrigger value="recommended">Empfehlungen</TabsTrigger>
              <TabsTrigger value="materials">Materiallisten</TabsTrigger>
              <TabsTrigger value="ai">KI-Vorschläge</TabsTrigger>
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
                      <div className="absolute top-2 right-2">
                        <Badge className={`
                          ${project.status === "Fertig" ? "bg-green-500" : 
                            project.status === "In Arbeit" ? "bg-craft-wood" : "bg-red-500"} 
                          border-none
                        `}>
                          {project.status === "Fertig" ? <BookOpen className="h-3 w-3 mr-1" /> :
                           project.status === "In Arbeit" ? <Clock className="h-3 w-3 mr-1" /> :
                           <span className="text-xs mr-1">✕</span>}
                          {project.status}
                        </Badge>
                      </div>
                      
                      {project.progress > 0 && project.progress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Fortschritt</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-base">{project.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="p-3 pt-0">
                      <Button variant="link" className="text-sm text-craft-wood p-0">
                        {project.status === "Fertig" ? "Ansehen" : 
                          project.status === "In Arbeit" ? "Fortsetzen" : "Neustarten"}
                      </Button>
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
                <Button variant="default">
                  Tutorials entdecken
                </Button>
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
                      <Button className="mt-2 text-craft-wood text-sm hover:underline" variant="link" size="sm">
                        Ansehen
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* New Materials tab */}
            <TabsContent value="materials" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <List className="h-5 w-5 text-craft-wood" />
                  Materiallisten-Manager
                </h3>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Neue Liste
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projekt</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Anzahl</TableHead>
                        <TableHead className="hidden md:table-cell">Kosten</TableHead>
                        <TableHead>Aktion</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userStats.materialLists.map((list, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{list.name}</TableCell>
                          <TableCell>
                            <Badge variant={list.status === "Gekauft" ? "default" : "outline"}>
                              {list.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{list.items} Artikel</TableCell>
                          <TableCell className="hidden md:table-cell">€{list.totalCost.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Anzeigen</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* New AI Recommendations tab */}
            <TabsContent value="ai" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-craft-wood" />
                  KI-Projektempfehlungen
                </h3>
                <Button variant="outline" size="sm">Vorschläge aktualisieren</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userStats.aiRecommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{rec.title}</CardTitle>
                        <Badge variant="outline" className="ml-auto">
                          {rec.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="text-craft-wood" onClick={handleAiRecommendation}>
                        <Plus className="h-4 w-4 mr-1" />
                        Zur Liste hinzufügen
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Personalisierte Vorschläge</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Je mehr Projekte du abschließt, desto besser werden unsere Empfehlungen für dich.
                  </p>
                  <Button variant="outline">
                    Mehr über KI-Empfehlungen
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Import the Table component since we're using it
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default UserDashboard;
