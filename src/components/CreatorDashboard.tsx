
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadCloud, Star, TrendingUp, MessageCircle, DollarSign, Users, FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CreatorDashboard = () => {
  const { toast } = useToast();
  
  // Mock data - in a real app this would come from an API
  const tutorials = [
    { id: 1, title: "DIY Regal aus Europaletten", status: "published", views: 1243, likes: 89, comments: 34, sales: 12 },
    { id: 2, title: "Couchtisch im Industrial Style", status: "published", views: 976, likes: 67, comments: 21, sales: 8 },
    { id: 3, title: "Kopfteil fürs Bett selbst bauen", status: "draft", views: 0, likes: 0, comments: 0, sales: 0 },
    { id: 4, title: "Gartenbank aus Holzresten", status: "published", views: 2158, likes: 176, comments: 43, sales: 27 },
  ];
  
  const handleUploadClick = () => {
    toast({
      title: "Tutorial-Upload",
      description: "Das Upload-Formular wird vorbereitet...",
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-muted-foreground">Verwalte deine Tutorials und analysiere deren Performance</p>
        </div>
        
        <Button onClick={handleUploadClick} className="flex items-center gap-2">
          <UploadCloud className="h-4 w-4" />
          <span>Neues Tutorial hochladen</span>
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-craft-wood" />
              Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tutorials.filter(t => t.status === "published").length}</div>
            <p className="text-muted-foreground text-sm">Veröffentlicht</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-craft-wood" />
              Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tutorials.reduce((sum, t) => sum + t.views, 0)}</div>
            <p className="text-muted-foreground text-sm">Gesamt</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-craft-wood" />
              Likes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tutorials.reduce((sum, t) => sum + t.likes, 0)}</div>
            <p className="text-muted-foreground text-sm">Gesamt</p>
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
            <div className="text-3xl font-bold">€{(tutorials.reduce((sum, t) => sum + t.sales, 0) * 5.99).toFixed(2)}</div>
            <p className="text-muted-foreground text-sm">Diesen Monat</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="tutorials" className="w-full">
        <TabsList className="grid grid-cols-3 max-w-md mb-8">
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutorials" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutorial</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Views</TableHead>
                <TableHead className="hidden md:table-cell">Likes</TableHead>
                <TableHead className="hidden md:table-cell">Kommentare</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorials.map((tutorial) => (
                <TableRow key={tutorial.id}>
                  <TableCell className="font-medium">{tutorial.title}</TableCell>
                  <TableCell>
                    <Badge variant={tutorial.status === "published" ? "default" : "outline"}>
                      {tutorial.status === "published" ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.views}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.likes}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.comments}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Bearbeiten</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance-Übersicht</CardTitle>
              <CardDescription>Interaktions- und Verkaufsdaten deiner Tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Hier würden Charts zur Performance deiner Tutorials angezeigt werden
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Erfolgreichstes Tutorial</CardTitle>
              <CardDescription>Nach Views, Likes und Kommentaren</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 aspect-video bg-muted rounded-md flex items-center justify-center">
                Tutorialbild
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Gartenbank aus Holzresten</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-lg font-semibold">2158</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">176</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">43</div>
                    <div className="text-sm text-muted-foreground">Kommentare</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Zum Tutorial</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Community-Feedback</CardTitle>
              <CardDescription>Neueste Kommentare zu deinen Tutorials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between mb-1">
                    <div className="font-medium">Benutzer{i}</div>
                    <div className="text-sm text-muted-foreground">vor {i} Tagen</div>
                  </div>
                  <div className="text-sm">Tolles Tutorial! Ich habe {i === 1 ? "die Gartenbank" : "das Regal"} nachgebaut und bin sehr zufrieden.</div>
                  <div className="text-sm text-muted-foreground mt-1">Zu: {i === 1 ? "Gartenbank aus Holzresten" : "DIY Regal aus Europaletten"}</div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Alle Kommentare anzeigen
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Support-Anfragen</CardTitle>
              <CardDescription>Hilfestellungen zu deinen Tutorials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="mb-4">Aktuell keine offenen Support-Anfragen</p>
                <Button variant="outline">Support-Center öffnen</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
