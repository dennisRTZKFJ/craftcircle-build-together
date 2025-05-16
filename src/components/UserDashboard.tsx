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
      name: 'Kaffeetisch aus Eichenholz', 
      status: 'completed', 
      progress: 100, 
      date: '10.05.2025',
      image: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975'
    },
    { 
      id: 2, 
      name: 'Regal für Kinderzimmer', 
      status: 'in-progress', 
      progress: 75, 
      date: '13.05.2025',
      image: 'https://images.unsplash.com/photo-1617104678098-de229db51175'
    },
    { 
      id: 3, 
      name: 'Garderobe aus Altholz', 
      status: 'in-progress', 
      progress: 30, 
      date: '16.05.2025',
      image: 'https://images.unsplash.com/photo-1609799529593-38cd08a93427'
    },
    { 
      id: 4, 
      name: 'Schreibtisch mit Schubladen', 
      status: 'planned', 
      progress: 0, 
      date: '20.05.2025',
      image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a'
    },
    { 
      id: 5, 
      name: 'Beistelltisch Projekt', 
      status: 'abandoned', 
      progress: 40, 
      date: '02.05.2025',
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90'
    },
  ];
  
  // Mock data for user comments
  const comments = [
    {
      id: 1,
      content: 'Großartige Idee mit der versteckten Verbindung! Hat bei meinem Projekt super funktioniert.',
      likes: 24,
      tutorial: 'Minimalistische Garderobe',
      date: 'vor 2 Tagen'
    },
    {
      id: 2,
      content: 'Vielen Dank für die detaillierte Anleitung. Als Anfänger hat mir das sehr geholfen.',
      likes: 17,
      tutorial: 'Couchtisch aus Eichenholz',
      date: 'vor 1 Woche'
    },
    {
      id: 3,
      content: 'Welches Werkzeug hast du für die Kanten verwendet? Meine sehen nicht so gleichmäßig aus.',
      likes: 5,
      tutorial: 'Bücherregal mit unsichtbaren Befestigungen',
      date: 'vor 2 Wochen'
    },
  ];
  
  // Mock data for material lists
  const materialLists = [
    {
      id: 1,
      name: 'Couchtisch Eiche',
      items: 8,
      purchased: true,
      date: '05.05.2025',
      totalCost: '€147,80'
    },
    {
      id: 2,
      name: 'Kinderzimmerregal',
      items: 12,
      purchased: true,
      date: '10.05.2025',
      totalCost: '€84,95'
    },
    {
      id: 3,
      name: 'Garderobe',
      items: 6,
      purchased: false,
      date: '15.05.2025',
      totalCost: '€62,50'
    },
    {
      id: 4,
      name: 'Schreibtisch',
      items: 15,
      purchased: false,
      date: '20.05.2025',
      totalCost: '€219,30'
    },
  ];
  
  // Mock data for AI recommendations
  const aiRecommendations = [
    {
      id: 1,
      title: 'Nachttisch mit integrierter Ladestation',
      difficulty: 'Mittel',
      tools: 'Säge, Bohrmaschine, Schleifpapier',
      image: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e'
    },
    {
      id: 2,
      title: 'Schlüsselboard mit Ablage',
      difficulty: 'Einfach',
      tools: 'Säge, Bohrmaschine, Schraubendreher',
      image: 'https://images.unsplash.com/photo-1596079890701-dd42edf0b7d4'
    },
    {
      id: 3,
      title: 'Schwebendes Bücherregal',
      difficulty: 'Anspruchsvoll',
      tools: 'Kreissäge, Bohrmaschine, Wasserwaage, Dübelfräse',
      image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe'
    },
  ];
  
  // Mock data for badges/achievements
  const achievements = [
    {
      id: 1,
      name: 'Erste Schritte',
      description: 'Erstes DIY-Projekt abgeschlossen',
      icon: <Award className="h-8 w-8" />,
      earned: true,
      date: '02.04.2025'
    },
    {
      id: 2,
      name: 'Fleißige Biene',
      description: '5 Projekte abgeschlossen',
      icon: <CheckCircle className="h-8 w-8" />,
      earned: false,
      progress: 20
    },
    {
      id: 3,
      name: 'Holzexperte',
      description: '10 Tutorials zum Thema Holzbearbeitung angesehen',
      icon: <FileText className="h-8 w-8" />,
      earned: true,
      date: '28.04.2025'
    },
    {
      id: 4,
      name: 'Hilfsbereiter Handwerker',
      description: '10 hilfreiche Kommentare verfasst',
      icon: <MessageCircle className="h-8 w-8" />,
      earned: false,
      progress: 30
    },
    {
      id: 5,
      name: 'Werkzeugsammler',
      description: 'Alle grundlegenden Werkzeuge erworben',
      icon: <Package className="h-8 w-8" />,
      earned: true,
      date: '15.04.2025'
    },
    {
      id: 6,
      name: 'Herausforderer',
      description: 'An einer wöchentlichen Challenge teilgenommen',
      icon: <Target className="h-8 w-8" />,
      earned: false,
      progress: 0
    },
  ];
  
  const setGoal = (goal: number) => {
    setWeeklyGoal(goal);
    toast({
      title: "Wochenziel gesetzt",
      description: `Du hast dir vorgenommen, ${goal} Projekt(e) pro Woche abzuschließen.`
    });
  };
  
  const startProject = () => {
    toast({
      title: "Neues Projekt",
      description: "Du kannst jetzt ein neues Projekt starten."
    });
  };
  
  const viewAllProjects = () => {
    toast({
      title: "Projektverlauf",
      description: "Hier findest du eine vollständige Übersicht deiner Projekte."
    });
  };
  
  const handleSubscribe = () => {
    setSubscriptionDialogOpen(false);
    toast({
      title: "Abonnement",
      description: "Danke für dein Interesse! Du wirst zur Zahlungsseite weitergeleitet."
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meine Werkstatt</h1>
          <p className="text-muted-foreground">Willkommen zurück in deiner persönlichen DIY-Zentrale</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button onClick={startProject} className="whitespace-nowrap">
            <FileText className="mr-2 h-4 w-4" />
            Neues Projekt starten
          </Button>
          
          <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <Crown className="mr-2 h-4 w-4" />
                Premium abonnieren
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-craft-wood">
                  <Crown className="h-5 w-5" />
                  DIY Premium
                </DialogTitle>
                <DialogDescription>
                  Erweitere deine Möglichkeiten und erhalte Zugang zu exklusiven Premium-Features
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">Unbegrenzte Projekte</h4>
                      <p className="text-sm text-muted-foreground">Erstelle und verwalte so viele Projekte wie du möchtest</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">KI-Projektassistent</h4>
                      <p className="text-sm text-muted-foreground">Erhalte personalisierte Vorschläge und Anleitungen für deine Projekte</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">Exklusive Tutorials</h4>
                      <p className="text-sm text-muted-foreground">Zugang zu Premium-Inhalten von Top-Creatorn</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">
                      <Check className="h-4 w-4 text-craft-wood" />
                    </div>
                    <div>
                      <h4 className="font-medium">Priorisierter Support</h4>
                      <p className="text-sm text-muted-foreground">Erhalte schnellere Antworten bei Fragen und Problemen</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">Monatlicher Preis</div>
                    <div className="text-lg font-bold">€9,99</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Jederzeit kündbar. 14 Tage Geld-zurück-Garantie.</div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setSubscriptionDialogOpen(false)}>
                  Später entscheiden
                </Button>
                <Button onClick={handleSubscribe} className="gap-2">
                  <Crown className="h-4 w-4" />
                  Jetzt abonnieren
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
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Willkommen in deiner Werkstatt</CardTitle>
                <CardDescription>Dein persönlicher DIY-Bereich</CardDescription>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Dein Fortschritt diese Woche</div>
                  <div className="text-sm text-muted-foreground">{weeklyProgress} von {weeklyGoal} Projekten</div>
                </div>
                <Progress value={weeklyProgress / weeklyGoal * 100} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => setGoal(1)} className={weeklyGoal === 1 ? "border-craft-wood" : ""}>
                  1 Projekt / Woche
                </Button>
                <Button variant="outline" size="sm" onClick={() => setGoal(2)} className={weeklyGoal === 2 ? "border-craft-wood" : ""}>
                  2 Projekte / Woche
                </Button>
                <Button variant="outline" size="sm" onClick={() => setGoal(3)} className={weeklyGoal === 3 ? "border-craft-wood" : ""}>
                  3 Projekte / Woche
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-craft-wood/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-craft-wood" />
                </div>
                <div>
                  <div className="text-xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Abgeschlossene Projekte</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">2</div>
                  <div className="text-xs text-muted-foreground">Laufende Projekte</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">3</div>
                  <div className="text-xs text-muted-foreground">Verdiente Abzeichen</div>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Was baue ich als Nächstes?</CardTitle>
            <CardDescription>KI-Projektempfehlungen für dich</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-36 rounded-md overflow-hidden">
              <img 
                src={aiRecommendations[0].image} 
                alt={aiRecommendations[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <Brain className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium text-sm">{aiRecommendations[0].title}</div>
                  <div className="text-xs mt-1">Schwierigkeit: {aiRecommendations[0].difficulty}</div>
                </div>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Mehr Vorschläge
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid grid-cols-5 max-w-3xl mb-8">
          <TabsTrigger value="projects">
            <FileText className="h-4 w-4 mr-2" /> Projektverlauf
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageCircle className="h-4 w-4 mr-2" /> Kommentare
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Package className="h-4 w-4 mr-2" /> Materiallisten
          </TabsTrigger>
          <TabsTrigger value="ideas">
            <Brain className="h-4 w-4 mr-2" /> KI-Empfehlungen
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="h-4 w-4 mr-2" /> Erfolge
          </TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className={`overflow-hidden ${project.status === 'abandoned' ? 'opacity-70' : ''}`}>
                <div className="h-40 relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={
                      project.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      project.status === 'planned' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      'bg-red-100 text-red-800 border-red-200'
                    }>
                      {project.status === 'completed' ? 'Fertig' :
                       project.status === 'in-progress' ? 'In Arbeit' :
                       project.status === 'planned' ? 'Geplant' : 'Abgebrochen'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{project.name}</h3>
                  <div className="text-sm text-muted-foreground mt-1">Fällig am: {project.date}</div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fortschritt</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Button variant="ghost" size="sm">Details</Button>
                  {project.status !== 'completed' && project.status !== 'abandoned' && (
                    <Button size="sm">Fortsetzen</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center h-[258px]">
              <div className="text-center p-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Neues Projekt</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Starte ein neues DIY-Abenteuer
                </p>
                <Button className="mt-4" onClick={startProject}>Projekt erstellen</Button>
              </div>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={viewAllProjects}>
              Alle Projekte anzeigen
            </Button>
          </div>
        </TabsContent>
        
        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">"{comment.tutorial}"</CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {comment.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-craft-wood" />
                      <span className="text-sm">{comment.likes} Likes</span>
                    </div>
                    <Button variant="ghost" size="sm">Zum Tutorial</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col items-center justify-center h-[180px]">
              <div className="text-center p-8">
                <MessageCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Teile deine Erfahrungen und Gedanken mit der Community
                </p>
                <Button variant="outline" className="mt-4">Tutorials durchstöbern</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deine Materiallisten</CardTitle>
              <CardDescription>Verwalte deine Einkaufslisten und gespeicherten Materialien</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projekt</TableHead>
                    <TableHead>Anzahl Materialien</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Kosten</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materialLists.map((list) => (
                    <TableRow key={list.id}>
                      <TableCell className="font-medium">{list.name}</TableCell>
                      <TableCell>{list.items} Teile</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={list.purchased ? 
                          'bg-green-100 text-green-800 border-green-200' : 
                          'bg-amber-100 text-amber-800 border-amber-200'}>
                          {list.purchased ? 'Gekauft' : 'Gespeichert'}
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
            <CardFooter className="flex justify-between">
              <Button variant="outline">Neue Liste erstellen</Button>
              <Button>Bei Partner bestellen</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Ideas Tab */}
        <TabsContent value="ideas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.title}
                    className="w-full h-full object-cover"
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
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-craft-wood" />
                    <div className="text-sm font-medium">KI-Empfehlung</div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Benötigte Werkzeuge:</span> {recommendation.tools}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Button variant="outline" size="sm">Tutorial finden</Button>
                  <Button size="sm">Projekt starten</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="flex flex-col items-center justify-center h-[338px]">
              <div className="text-center p-8">
                <div className="h-16 w-16 rounded-full bg-craft-wood/10 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-craft-wood" />
                </div>
                <h3 className="font-medium mb-2">Mehr Ideen entdecken</h3>
                <p className="text-muted-foreground">
                  Erzähle der KI mehr über deine Interessen und Fähigkeiten für bessere Vorschläge
                </p>
                <Button className="mt-4">Interessen anpassen</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${!achievement.earned ? 'opacity-60' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    achievement.earned ? 'bg-craft-wood/10' : 'bg-muted'
                  }`}>
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'text-craft-wood' : 'text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <div className="mt-4">
                    {achievement.earned ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Verdient am {achievement.date}
                      </Badge>
                    ) : (
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {achievement.progress}% abgeschlossen
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
              Alle Erfolge anzeigen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
