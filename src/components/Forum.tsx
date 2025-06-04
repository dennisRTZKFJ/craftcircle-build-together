import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Users, Calendar, ArrowRight, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const forumCategories = [
  { id: 'cat1', name: 'Holzbearbeitung', count: 145, color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'cat2', name: 'Möbelbau', count: 98, color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'cat3', name: 'Werkzeuge', count: 76, color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'cat4', name: 'Upcycling', count: 54, color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'cat5', name: 'Anfängerfragen', count: 112, color: 'bg-pink-100 text-pink-800 border-pink-200' }
];

const forumThreads = [
  { 
    id: 'thread1', 
    title: 'Welche Säge für Anfänger?', 
    author: { name: 'Max Müller', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79' },
    replies: 23, 
    views: 342, 
    lastActivity: 'vor 2 Stunden',
    categories: ['Werkzeuge', 'Anfängerfragen']
  },
  { 
    id: 'thread2', 
    title: 'Holzverbindungen ohne Spezialwerkzeug', 
    author: { name: 'Laura Schmidt', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    replies: 45, 
    views: 621, 
    lastActivity: 'vor 5 Stunden',
    categories: ['Holzbearbeitung', 'Anfängerfragen']
  },
  { 
    id: 'thread3', 
    title: 'Europaletten in Gartenmöbel verwandeln', 
    author: { name: 'Tom Weber', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
    replies: 18, 
    views: 290, 
    lastActivity: 'vor 1 Tag',
    categories: ['Upcycling', 'Möbelbau']
  },
  { 
    id: 'thread4', 
    title: 'Bester Holzlack für Außenmöbel?', 
    author: { name: 'Sarah König', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
    replies: 31, 
    views: 475, 
    lastActivity: 'vor 2 Tagen',
    categories: ['Holzbearbeitung', 'Möbelbau']
  },
  { 
    id: 'thread5', 
    title: 'Erste Erfahrungen mit der Oberfräse', 
    author: { name: 'Martin Bauer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
    replies: 12, 
    views: 188, 
    lastActivity: 'vor 3 Tagen',
    categories: ['Werkzeuge']
  }
];

const popularTags = [
  { id: 'tag1', name: 'Einsteiger', count: 342 },
  { id: 'tag2', name: 'Holzverbindungen', count: 256 },
  { id: 'tag3', name: 'Akkuschrauber', count: 187 },
  { id: 'tag4', name: 'Palettenmöbel', count: 165 },
  { id: 'tag5', name: 'Tipps', count: 142 },
  { id: 'tag6', name: 'Lackieren', count: 138 },
  { id: 'tag7', name: 'Nachhaltigkeit', count: 124 },
  { id: 'tag8', name: 'Werkzeugkauf', count: 119 },
];

const Forum = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleCreateThread = () => {
    toast({
      title: "Neuer Thread",
      description: "Das Forum-Feature wird bald vollständig verfügbar sein!"
    });
  };
  
  return (
    <div className="flex-col-gap-8">
      <div className="flex flex-col md:flex-row flex-between md:items-center gap-4">
        <div>
          <h2 className="header-lg">Community-Forum</h2>
          <p className="muted-text">Diskutiere mit anderen DIY-Begeisterten</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 muted-text" />
            <Input
              placeholder="Suchen..."
              className="pl-9 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateThread}>Neuen Thread erstellen</Button>
        </div>
      </div>
      
      <Tabs defaultValue="latest">
        <TabsList>
          <TabsTrigger value="latest">Neueste</TabsTrigger>
          <TabsTrigger value="popular">Beliebt</TabsTrigger>
          <TabsTrigger value="unanswered">Unbeantwortet</TabsTrigger>
          <TabsTrigger value="solved">Gelöst</TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="md:col-span-3">
            <TabsContent value="latest" className="m-0">
              <div className="flex-col-gap-8">
                {forumThreads.map((thread) => (
                  <Card key={thread.id}>
                    <CardHeader className="pb-2">
                      <div className="flex-between items-start">
                        <div className="flex-1">
                          <CardTitle className="header-md-lg hover:text-craft-wood cursor-pointer">
                            {thread.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {thread.categories.map((category, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className={
                                  category === 'Werkzeuge' ? 'badge-blue' :
                                  category === 'Möbelbau' ? 'badge-green' :
                                  category === 'Upcycling' ? 'badge-purple' :
                                  category === 'Anfängerfragen' ? 'badge-pink' :
                                  'badge-amber'
                                }
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Avatar className="avatar-md">
                          <AvatarImage src={thread.author.avatar} alt={thread.author.name} />
                          <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-3">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        <div className="flex-align-center-gap-3">
                          <User className="h-4 w-4 icon-margin-right muted-text" />
                          <span>{thread.author.name}</span>
                        </div>
                        <div className="flex-align-center-gap-3">
                          <MessageCircle className="h-4 w-4 icon-margin-right muted-text" />
                          <span>{thread.replies} Antworten</span>
                        </div>
                        <div className="flex-align-center-gap-3">
                          <Users className="h-4 w-4 icon-margin-right muted-text" />
                          <span>{thread.views} Aufrufe</span>
                        </div>
                        <div className="flex-align-center-gap-3">
                          <Calendar className="h-4 w-4 icon-margin-right muted-text" />
                          <span>Letzte Aktivität {thread.lastActivity}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 border-t">
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Thread öffnen <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <div className="flex-center">
                  <Button variant="outline">Weitere Threads laden</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="m-0">
              <Card className="p-6 text-center">
                <p className="muted-text">
                  Hier werden die beliebtesten Threads angezeigt. Dieser Bereich ist in Entwicklung.
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="unanswered" className="m-0">
              <Card className="p-6 text-center">
                <p className="muted-text">
                  Hier werden unbeantwortete Threads angezeigt. Dieser Bereich ist in Entwicklung.
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="solved" className="m-0">
              <Card className="p-6 text-center">
                <p className="muted-text">
                  Hier werden gelöste Threads angezeigt. Dieser Bereich ist in Entwicklung.
                </p>
              </Card>
            </TabsContent>
          </div>
          
          <div className="flex-col-gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Forum-Kategorien</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forumCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex-between p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                  >
                    <Badge variant="outline" className={category.color.includes('amber') ? 'badge-amber' : category.color.includes('green') ? 'badge-green' : category.color.includes('blue') ? 'badge-blue' : category.color.includes('purple') ? 'badge-purple' : 'badge-pink'}>
                      {category.name}
                    </Badge>
                    <span className="small-muted-text">{category.count} Threads</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">Alle Kategorien</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Beliebte Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <div key={tag.id} className="text-sm">
                      <Button variant="outline" size="sm" className="h-7">
                        #{tag.name}
                        <span className="ml-1 text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                          {tag.count}
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Community-Regeln</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 small-muted-text">
                <p className="muted-text">• Bleib freundlich und respektvoll</p>
                <p className="muted-text">• Keine Werbung oder Spam</p>
                <p className="muted-text">• Teile hilfreiche und relevante Inhalte</p>
                <p className="muted-text">• Sei konstruktiv in deinem Feedback</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Forum;
