
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BookOpen, PlusCircle, Share2, Clock, User, ChevronRight, Star } from 'lucide-react';

const TutorialPlaylist = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Mock data - in a real app this would come from a database/API
  const playlists = [
    {
      id: 1,
      name: "Wohnzimmer Renovation",
      creator: "Markus",
      tutorials: [
        { id: 101, title: "Couchtisch aus Altholz", duration: "6 Stunden", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90" },
        { id: 102, title: "Wandregal mit Beleuchtung", duration: "4 Stunden", image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f" },
        { id: 103, title: "TV-Bank mit Schubladen", duration: "5 Stunden", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126" },
      ]
    },
    {
      id: 2,
      name: "Projekte für Anfänger",
      creator: "Julia",
      tutorials: [
        { id: 201, title: "Einfaches Regal", duration: "2 Stunden", image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f" },
        { id: 202, title: "Garderobe aus Palettenholz", duration: "3 Stunden", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2" },
      ]
    }
  ];

  const popularTutorials = [
    { id: 301, title: "Rustikaler Esstisch", image: "https://images.unsplash.com/photo-1615066390971-01957b368ee1" },
    { id: 302, title: "Gartenbank", image: "https://images.unsplash.com/photo-1568021735466-efd8a4c435af" },
    { id: 303, title: "Schreibtisch", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd" },
    { id: 304, title: "Gewürzregal", image: "https://images.unsplash.com/photo-1509402308937-0240d9a4438e" },
  ];
  
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Tutorial-Playlisten</h2>
          <p className="text-muted-foreground max-w-xl">
            Erstelle und entdecke Sammlungen von Tutorials, die perfekt zusammenpassen.
            Plane deine nächsten Projekte oder teile deine Favoriten mit der Community.
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Playlist erstellen
        </Button>
      </div>
      
      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Neue Playlist erstellen</CardTitle>
            <CardDescription>
              Sammle deine Lieblings-Tutorials in einer Playlist und teile sie mit anderen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="playlist-name" className="text-sm font-medium mb-1 block">
                Playlist-Name
              </label>
              <Input id="playlist-name" placeholder="z.B. Meine Balkon-Projekte" />
            </div>
            <div>
              <label htmlFor="playlist-description" className="text-sm font-medium mb-1 block">
                Beschreibung (optional)
              </label>
              <textarea 
                id="playlist-description" 
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Worum geht es in dieser Sammlung?"
              ></textarea>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Tutorials hinzufügen
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {popularTutorials.map((tutorial) => (
                  <div 
                    key={tutorial.id} 
                    className="border rounded-md p-2 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={tutorial.image} 
                        alt={tutorial.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm truncate">{tutorial.title}</div>
                    <div className="ml-auto">
                      <PlusCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>Abbrechen</Button>
            <Button>Playlist erstellen</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden">
            <div className="grid grid-cols-2 grid-rows-2 h-36 overflow-hidden">
              {playlist.tutorials.slice(0, 3).map((tutorial, i) => (
                <div 
                  key={tutorial.id} 
                  className={`overflow-hidden ${i === 0 ? 'row-span-2' : ''}`}
                >
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {playlist.tutorials.length > 3 && (
                <div className="bg-craft-wood/80 flex items-center justify-center text-white font-medium">
                  +{playlist.tutorials.length - 3} mehr
                </div>
              )}
              {playlist.tutorials.length <= 2 && (
                <div className="bg-muted flex items-center justify-center">
                  <PlusCircle className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-craft-wood/10">
                  <BookOpen className="h-3 w-3 mr-1" /> {playlist.tutorials.length} Tutorials
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="h-3 w-3 mr-1" /> {playlist.creator}
                </div>
              </div>
              <CardTitle className="mt-2">{playlist.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {playlist.tutorials.slice(0, 2).map((tutorial) => (
                  <div key={tutorial.id} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={tutorial.image} 
                        alt={tutorial.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm truncate flex-1">{tutorial.title}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="h-3 w-3 inline mr-1" /> {tutorial.duration}
                    </div>
                  </div>
                ))}
                {playlist.tutorials.length > 2 && (
                  <button className="text-sm text-craft-wood flex items-center">
                    Alle anzeigen
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                )}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Speichern
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Teilen
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TutorialPlaylist;
