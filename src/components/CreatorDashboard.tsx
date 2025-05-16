
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  FileText, Upload, Star, Heart, Calendar, TrendingUp, 
  DollarSign, ArrowUpRight, MessageCircle, HelpCircle,
  Eye, Edit, Clock, Check, AlertCircle, ChevronDown
} from 'lucide-react';

const CreatorDashboard = () => {
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  // Mock data for tutorials
  const tutorials = [
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
  const analytics = {
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
  const topComments = [
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
  const monthlyEarnings = [
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
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Neues Tutorial hochladen</DialogTitle>
                <DialogDescription>
                  Erstelle ein neues DIY-Tutorial für die Community. Das Tutorial wird zunächst als Entwurf gespeichert.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input id="title" placeholder="z.B. Minimalistisches Bücherregal bauen" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Kurzbeschreibung</Label>
                  <Input id="description" placeholder="Eine kurze Beschreibung deines Tutorials..." />
                </div>
                <div className="grid gap-2">
                  <Label>Titelbild</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div className="mt-2">
                      <Button variant="secondary" size="sm">Bild auswählen</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">PNG, JPG or WEBP, max. 4MB</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Abbrechen</Button>
                <Button onClick={handleUploadTutorial}>Hochladen & Bearbeiten</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="flex items-center gap-2" onClick={handleSupportRequest}>
            <HelpCircle className="h-4 w-4" />
            <span>Creator Support</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-craft-wood" />
              Aufrufe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.views.total.toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {analytics.views.trend}
              </Badge>
              <span className="text-muted-foreground ml-2">im letzten Monat</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-craft-wood" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.engagement.total}</div>
            <div className="flex items-center text-sm">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {analytics.engagement.trend}
              </Badge>
              <span className="text-muted-foreground ml-2">im letzten Monat</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-craft-wood" />
              Einnahmen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.revenue.total}</div>
            <div className="flex items-center text-sm">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {analytics.revenue.trend}
              </Badge>
              <span className="text-muted-foreground ml-2">im letzten Monat</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-craft-wood" />
              Follower
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.followers.total.toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                {analytics.followers.trend}
              </Badge>
              <span className="text-muted-foreground ml-2">im letzten Monat</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deine Tutorials</CardTitle>
              <CardDescription>Verwalte deine veröffentlichten und geplanten Tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Datum</TableHead>
                    <TableHead className="hidden md:table-cell">Aufrufe</TableHead>
                    <TableHead className="hidden md:table-cell">Likes</TableHead>
                    <TableHead className="hidden md:table-cell">Kommentare</TableHead>
                    <TableHead className="hidden md:table-cell">Einnahmen</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tutorials.map((tutorial) => (
                    <TableRow key={tutorial.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden hidden sm:block">
                            <img 
                              src={tutorial.image} 
                              alt={tutorial.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="font-medium max-w-[200px] truncate">{tutorial.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tutorial.status === 'published' ? 'default' : 'outline'} className={
                          tutorial.status === 'published' ? '' : 'bg-amber-100 text-amber-800 border-amber-200'
                        }>
                          {tutorial.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{tutorial.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{tutorial.views.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">{tutorial.likes}</TableCell>
                      <TableCell className="hidden md:table-cell">{tutorial.comments}</TableCell>
                      <TableCell className="hidden md:table-cell">{tutorial.revenue}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditTutorial(tutorial.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Bearbeiten</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Zeige 4 von 4 Tutorials
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Tutorial-Ideen generieren
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Neues Tutorial
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Neues Tutorial hochladen</DialogTitle>
                      <DialogDescription>
                        Erstelle ein neues DIY-Tutorial für die Community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Titel</Label>
                        <Input id="title" placeholder="z.B. Minimalistisches Bücherregal bauen" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Kurzbeschreibung</Label>
                        <Input id="description" placeholder="Eine kurze Beschreibung deines Tutorials..." />
                      </div>
                      <div className="grid gap-2">
                        <Label>Titelbild</Label>
                        <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <div className="mt-2">
                            <Button variant="secondary" size="sm">Bild auswählen</Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">PNG, JPG or WEBP, max. 4MB</p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Abbrechen</Button>
                      <Button>Hochladen & Bearbeiten</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tutorial-Status</CardTitle>
                <CardDescription>Fortschritt deiner Projekte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorials.map((tutorial) => (
                    <div key={tutorial.id} className="space-y-2">
                      <div className="flex justify-between">
                        <div className="font-medium truncate">{tutorial.title}</div>
                        <div className="text-muted-foreground text-sm">
                          {tutorial.status === 'published' ? '100%' : '60%'}
                        </div>
                      </div>
                      <Progress 
                        value={tutorial.status === 'published' ? 100 : 60} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          {tutorial.status === 'published' ? (
                            <Check className="h-3 w-3 mr-1 text-green-600" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1 text-amber-600" />
                          )}
                          {tutorial.status === 'published' ? 'Veröffentlicht' : 'In Bearbeitung'}
                        </div>
                        <div>{tutorial.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Erfolgreiche Tutorials</CardTitle>
                <CardDescription>Deine beliebtesten Inhalte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorials
                    .filter(t => t.status === 'published')
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 3)
                    .map((tutorial, index) => (
                      <div key={tutorial.id} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-amber-100 text-amber-800' :
                          index === 1 ? 'bg-slate-100 text-slate-800' :
                          'bg-craft-wood/10 text-craft-wood'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 truncate">
                          <div className="font-medium truncate">{tutorial.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {tutorial.views.toLocaleString()} Aufrufe • {tutorial.likes} Likes
                          </div>
                        </div>
                        <Star className="h-5 w-5 text-amber-500" />
                      </div>
                    ))
                  }
                  
                  <div className="pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Vollständige Rangliste anzeigen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Zuschauerzahlen</CardTitle>
                <CardDescription>Entwicklung der Aufrufe über Zeit</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                  <div className="text-center p-4">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                    <p className="text-muted-foreground">
                      Hier wird der Verlauf deiner Aufrufe angezeigt
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Content-Performance</CardTitle>
                <CardDescription>Vergleich deiner Tutorials</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                  <div className="text-center p-4">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                    <p className="text-muted-foreground">
                      Hier wird die Performance deiner Tutorials verglichen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Detaillierte Statistiken</CardTitle>
                <CardDescription>Performance deiner Tutorials mit allen Metriken</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tutorial</TableHead>
                      <TableHead className="text-right">Aufrufe</TableHead>
                      <TableHead className="text-right">Likes</TableHead>
                      <TableHead className="text-right">Kommentare</TableHead>
                      <TableHead className="text-right">Abschlussrate</TableHead>
                      <TableHead className="text-right">Click-Through</TableHead>
                      <TableHead className="text-right">Durchschn. Sehzeit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tutorials
                      .filter(t => t.status === 'published')
                      .map((tutorial) => (
                        <TableRow key={tutorial.id}>
                          <TableCell className="font-medium">{tutorial.title}</TableCell>
                          <TableCell className="text-right">{tutorial.views.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{tutorial.likes}</TableCell>
                          <TableCell className="text-right">{tutorial.comments}</TableCell>
                          <TableCell className="text-right">
                            {Math.round(65 + Math.random() * 20)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {Math.round(10 + Math.random() * 15)}%
                          </TableCell>
                          <TableCell className="text-right">
                            {Math.round(3 + Math.random() * 7)}m {Math.round(Math.random() * 59)}s
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <Button variant="outline">
                    Performance-Bericht exportieren
                  </Button>
                </div>
                <div>
                  <Button variant="outline">
                    Weitere Metriken anzeigen <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Einnahmenübersicht</CardTitle>
              <CardDescription>Deine Einnahmen aus Tutorials und Affiliate-Links</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                <div className="text-center p-4">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                  <p className="text-muted-foreground">
                    Hier wird die Entwicklung deiner Einnahmen angezeigt
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monatliche Einnahmen</CardTitle>
                <CardDescription>Übersicht deiner Einnahmen nach Monat</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Monat</TableHead>
                      <TableHead>Tutorial-Verkäufe</TableHead>
                      <TableHead>Affiliate-Provisionen</TableHead>
                      <TableHead>Premium-Anteil</TableHead>
                      <TableHead className="text-right">Gesamt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyEarnings.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell>
                          €{(month.amount * 0.6).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          €{(month.amount * 0.25).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          €{(month.amount * 0.15).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          €{month.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-bold">Gesamt</TableCell>
                    <TableCell className="font-bold">
                      €{monthlyEarnings.reduce((sum, m) => sum + m.amount * 0.6, 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="font-bold">
                      €{monthlyEarnings.reduce((sum, m) => sum + m.amount * 0.25, 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="font-bold">
                      €{monthlyEarnings.reduce((sum, m) => sum + m.amount * 0.15, 0).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      €{monthlyEarnings.reduce((sum, m) => sum + m.amount, 0).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </Table>
              </CardContent>
              <CardFooter className="border-t">
                <div className="flex justify-between w-full items-center">
                  <Button variant="outline" size="sm">
                    Einnahmen exportieren
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Nächste Auszahlung: 01.06.2025
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Einnahmenquellen</CardTitle>
                <CardDescription>Aufschlüsselung nach Quelle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Tutorial-Verkäufe</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Affiliate-Provisionen</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Premium-Mitgliedschaften</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div className="bg-muted/40 rounded-lg p-4 mt-6">
                    <h4 className="font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-craft-wood" />
                      Tipp zur Optimierung
                    </h4>
                    <p className="text-sm mt-2 text-muted-foreground">
                      Deine Affiliate-Einnahmen könnten durch mehr gezielte Materialempfehlungen in deinen Tutorials gesteigert werden.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Mehr erfahren
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top-Kommentare</CardTitle>
              <CardDescription>Die beliebtesten Nutzer-Kommentare zu deinen Tutorials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {topComments.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{comment.user.name}</div>
                        <div className="text-sm text-muted-foreground">{comment.date}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{comment.tutorial}</div>
                      <div className="mt-2">{comment.comment}</div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-craft-wood" />
                          <span className="text-sm">{comment.likes}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 text-sm">
                          Antworten
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Alle Kommentare anzeigen
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Verbesserungsvorschläge</CardTitle>
                <CardDescription>Feedback von der Community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Projekt-Voraussetzungen</h4>
                    <p className="text-sm text-muted-foreground">
                      Einige Nutzer wünschen sich mehr Details zu benötigten Werkzeugen und Materialien am Anfang der Tutorials.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">14 Erwähnungen</Badge>
                      <Button variant="ghost" size="sm" className="h-8">
                        Details
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Alternative Materialien</h4>
                    <p className="text-sm text-muted-foreground">
                      Mehrere Anfänger bitten um kostengünstigere Alternativen zu den hochwertigen Materialien.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">8 Erwähnungen</Badge>
                      <Button variant="ghost" size="sm" className="h-8">
                        Details
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Video-Länge</h4>
                    <p className="text-sm text-muted-foreground">
                      Einige Nutzer wünschen sich kompaktere Tutorials mit weniger Wiederholungen.
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">5 Erwähnungen</Badge>
                      <Button variant="ghost" size="sm" className="h-8">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Feedback-Analyse durchführen
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Creator-Support</CardTitle>
                <CardDescription>Verbessere deine Tutorial-Qualität</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-4">
                  <Calendar className="h-10 w-10 text-craft-wood" />
                  <div>
                    <h4 className="font-medium">Creator-Sprechstunde</h4>
                    <p className="text-sm text-muted-foreground">
                      Vereinbare ein persönliches Gespräch mit unserem Creator-Team für individuelle Tipps und Feedback.
                    </p>
                    <Button className="mt-2" size="sm">
                      Termin buchen
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <h4 className="font-medium">Tutorial-Qualitätsscore</h4>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">87/100</div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Sehr gut
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Deine Tutorials schneiden im Vergleich zu ähnlichen Creators überdurchschnittlich gut ab.
                  </p>
                  
                  <div className="space-y-2 mt-4">
                    <h5 className="text-sm font-medium">Verbesserungspotenzial:</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-800 text-xs">!</span>
                        </div>
                        <span>Mehr Nahaufnahmen bei detaillierten Arbeitsschritten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-800 text-xs">!</span>
                        </div>
                        <span>Detailliertere Materialangaben mit Alternativen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSupportRequest}>
                  Support kontaktieren
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
