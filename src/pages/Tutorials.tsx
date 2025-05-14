
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Clock, DollarSign } from 'lucide-react';

// Temporary mock data for tutorials
const tutorials = [
  {
    id: 1,
    title: "Minimalistisches Regal",
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f",
    category: "Anfänger",
    duration: "3 Stunden",
    price: "€30-€50",
    likes: 214,
    author: "Maria Schmidt",
    description: "Ein einfaches, schwebendes Regal für Bücher, Pflanzen oder Deko-Objekte."
  },
  {
    id: 2,
    title: "Rustikaler Couchtisch",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Mittel",
    duration: "6 Stunden",
    price: "€80-€120",
    likes: 342,
    author: "Thomas Weber",
    description: "Ein robuster Couchtisch aus Altholz mit Metallbeinen."
  },
  {
    id: 3,
    title: "Modernes Sideboard",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    category: "Fortgeschritten",
    duration: "8 Stunden",
    price: "€150-€200",
    likes: 178,
    author: "Julia Hoffmann",
    description: "Ein elegantes Sideboard mit Schiebetüren und verstecktem Stauraum."
  },
  {
    id: 4,
    title: "Nachttisch mit Schublade",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    category: "Anfänger",
    duration: "4 Stunden",
    price: "€40-€60",
    likes: 156,
    author: "Markus Bauer",
    description: "Ein praktischer Nachttisch mit einer Schublade und einer offenen Ablage."
  },
  {
    id: 5,
    title: "Garderobe aus Palettenholz",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    category: "Anfänger",
    duration: "2 Stunden",
    price: "€20-€30",
    likes: 124,
    author: "Katrin Schmidt",
    description: "Eine einfache Wandgarderobe aus recyceltem Palettenholz."
  },
  {
    id: 6,
    title: "Bücherregal mit Leiter",
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
    category: "Fortgeschritten",
    duration: "10 Stunden",
    price: "€200-€300",
    likes: 289,
    author: "Stefan Müller",
    description: "Ein wandhohes Bücherregal mit einer Schiebeleiter für obere Fächer."
  },
];

const categoryColors = {
  "Anfänger": "bg-green-100 text-green-800 border-green-200",
  "Mittel": "bg-amber-100 text-amber-800 border-amber-200",
  "Fortgeschritten": "bg-red-100 text-red-800 border-red-200"
};

const Tutorials = () => {
  const [difficulty, setDifficulty] = useState<string[]>(["Anfänger", "Mittel", "Fortgeschritten"]);
  const [maxDuration, setMaxDuration] = useState(10); // in hours
  const [maxPrice, setMaxPrice] = useState(300); // in euros
  
  const filteredTutorials = tutorials.filter(tutorial => {
    const durationHours = parseInt(tutorial.duration.split(' ')[0]);
    const averagePrice = (parseInt(tutorial.price.split('€')[1].split('-')[0]) + 
                         parseInt(tutorial.price.split('-')[1].replace('€', ''))) / 2;
    
    return difficulty.includes(tutorial.category) && 
           durationHours <= maxDuration &&
           averagePrice <= maxPrice;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">DIY-Möbel Tutorials</h1>
            <p className="text-muted-foreground mb-6">
              Entdecke Schritt-für-Schritt-Anleitungen für deine nächsten DIY-Möbelprojekte, 
              von einfachen Anfängerprojekten bis zu anspruchsvollen Designstücken.
            </p>
          </div>

          <Tabs defaultValue="alle" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="alle">Alle Tutorials</TabsTrigger>
                <TabsTrigger value="beliebt">Beliebt</TabsTrigger>
                <TabsTrigger value="neu">Neueste</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
              <Card className="col-span-1 md:col-span-3 lg:col-span-1 h-fit">
                <CardHeader>
                  <CardTitle>Filter</CardTitle>
                  <CardDescription>Finde das perfekte Projekt für dich</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Schwierigkeitsgrad</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Anfänger", "Mittel", "Fortgeschritten"].map((level) => (
                        <Badge 
                          key={level}
                          variant="outline" 
                          className={`cursor-pointer ${categoryColors[level as keyof typeof categoryColors]} ${difficulty.includes(level) ? 'ring-1 ring-black' : 'opacity-60'}`}
                          onClick={() => {
                            if (difficulty.includes(level)) {
                              setDifficulty(difficulty.filter(d => d !== level));
                            } else {
                              setDifficulty([...difficulty, level]);
                            }
                          }}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Dauer</h3>
                      <span className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" /> 
                        Max. {maxDuration} Stunden
                      </span>
                    </div>
                    <Slider 
                      defaultValue={[maxDuration]} 
                      max={12} 
                      step={1}
                      onValueChange={(value) => setMaxDuration(value[0])} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Materialkosten</h3>
                      <span className="text-sm text-muted-foreground">
                        <DollarSign className="h-3 w-3 inline mr-1" /> 
                        Bis {maxPrice}€
                      </span>
                    </div>
                    <Slider 
                      defaultValue={[maxPrice]} 
                      max={500} 
                      step={10}
                      onValueChange={(value) => setMaxPrice(value[0])} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    setDifficulty(["Anfänger", "Mittel", "Fortgeschritten"]);
                    setMaxDuration(10);
                    setMaxPrice(300);
                  }}>
                    Filter zurücksetzen
                  </Button>
                </CardFooter>
              </Card>
              
              <TabsContent value="alle" className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-0">
                {filteredTutorials.length > 0 ? filteredTutorials.map(tutorial => (
                  <Card key={tutorial.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={tutorial.image} 
                        alt={tutorial.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={categoryColors[tutorial.category as keyof typeof categoryColors]}>
                          {tutorial.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
                        </span>
                      </div>
                      <CardTitle className="text-lg mb-1">{tutorial.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {tutorial.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          Von <span className="font-medium">{tutorial.author}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tutorial.price}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-craft-wood mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
                        </svg>
                        <span className="text-sm">{tutorial.likes}</span>
                      </div>
                      <Button size="sm">Tutorial ansehen</Button>
                    </CardFooter>
                  </Card>
                )) : (
                  <div className="col-span-3 flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-xl font-medium mb-2">Keine passenden Tutorials gefunden</h3>
                    <p className="text-muted-foreground mb-4">
                      Versuche, deine Filtereinstellungen anzupassen, um mehr Ergebnisse zu sehen.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setDifficulty(["Anfänger", "Mittel", "Fortgeschritten"]);
                        setMaxDuration(10);
                        setMaxPrice(300);
                      }}
                    >
                      Alle Filter zurücksetzen
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="beliebt" className="col-span-1 md:col-span-3">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium">Beliebte Tutorials werden geladen...</h3>
                </div>
              </TabsContent>
              
              <TabsContent value="neu" className="col-span-1 md:col-span-3">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium">Neueste Tutorials werden geladen...</h3>
                </div>
              </TabsContent>
              
              <TabsContent value="featured" className="col-span-1 md:col-span-3">
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium">Featured Tutorials werden geladen...</h3>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
