
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Tool, CircleCheck } from 'lucide-react';

const CraftMatch = () => {
  // Mock data - in a real app this would come from a database/API
  const recommendedProjects = [
    {
      id: 1,
      title: "Wandregal mit versteckter Schublade",
      image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f",
      difficulty: "Mittel",
      duration: "5 Stunden",
      tools: ["Säge", "Bohrer", "Schleifpapier"],
      materials: ["Eichenholz", "Scharniere", "Schrauben"],
      match: 92,
    },
    {
      id: 2,
      title: "Modulares Bücherregal",
      image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
      difficulty: "Anfänger",
      duration: "3 Stunden",
      tools: ["Bohrer", "Schraubendreher"],
      materials: ["Kiefernholz", "Metallwinkel", "Schrauben"],
      match: 86,
    },
    {
      id: 3,
      title: "Hängender Nachttisch",
      image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
      difficulty: "Anfänger",
      duration: "2 Stunden",
      tools: ["Säge", "Schleifpapier", "Bohrer"],
      materials: ["Sperrholz", "Seil", "Holzlasur"],
      match: 78,
    }
  ];

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">CraftMatch</h2>
          <p className="text-muted-foreground max-w-xl">
            Basierend auf deinem Skill-Level, deinen Werkzeugen und deinen bisherigen Projekten 
            haben wir diese Projekte für dich ausgewählt.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Filter:</span>
          <Badge variant="outline" className="cursor-pointer">Alles</Badge>
          <Badge variant="outline" className="cursor-pointer">Anfänger</Badge>
          <Badge variant="outline" className="cursor-pointer">Unter 3h</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-craft-wood border-none">
                  {project.match}% Match
                </Badge>
              </div>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between mb-1">
                <Badge variant="outline" className={`
                  ${project.difficulty === "Anfänger" ? "bg-green-100 text-green-800 border-green-200" : ""}
                  ${project.difficulty === "Mittel" ? "bg-amber-100 text-amber-800 border-amber-200" : ""}
                  ${project.difficulty === "Fortgeschritten" ? "bg-red-100 text-red-800 border-red-200" : ""}
                `}>
                  {project.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {project.duration}
                </span>
              </div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                Ein perfektes Projekt für dich basierend auf deinen vorhandenen Materialien und Werkzeugen.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center">
                    <Tool className="h-4 w-4 mr-1 text-craft-wood" /> Benötigte Werkzeuge
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tools.map((tool, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        <CircleCheck className="h-3 w-3 mr-1 text-green-500" /> {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Materialien</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.materials.map((material, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Projekt ansehen</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CraftMatch;
