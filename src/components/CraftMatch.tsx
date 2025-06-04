import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Hammer, CheckCircle } from 'lucide-react';

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
    <div className="section-container-padding-y">
      <div className="craftmatch-header-layout">
        <div>
          <h2 className="header-xl-mb-2">CraftMatch</h2>
          <p className="muted-text max-w-xl">
            Basierend auf deinem Skill-Level, deinen Werkzeugen und deinen bisherigen Projekten 
            haben wir diese Projekte für dich ausgewählt.
          </p>
        </div>
        <div className="flex-align-center-gap-2">
          <span className="muted-text">Filter:</span>
          <Badge variant="outline" className="cursor-pointer">Alles</Badge>
          <Badge variant="outline" className="cursor-pointer">Anfänger</Badge>
          <Badge variant="outline" className="cursor-pointer">Unter 3h</Badge>
        </div>
      </div>
      
      <div className="grid-cols-craftmatch">
        {recommendedProjects.map((project) => (
          <Card key={project.id} className="card-flex-col-h-full">
            <div className="relative h-48 card-overflow-hidden">
              <div className="absolute-top-right">
                <Badge className="badge-craft-wood">
                  {project.match}% Match
                </Badge>
              </div>
              <img 
                src={project.image} 
                alt={project.title}
                className="img-cover image-hover-scale"
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex-between mb-1">
                <Badge variant="outline" className={project.difficulty === "Anfänger" ? "badge-difficulty-beginner" : project.difficulty === "Mittel" ? "badge-difficulty-medium" : "badge-difficulty-advanced"}>
                  {project.difficulty}
                </Badge>
                <span className="small-muted-text flex-items-center">
                  <Clock className="h-3 w-3 icon-margin-right" /> {project.duration}
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
                  <h4 className="small-muted-text flex-items-center feature-title">
                    <Hammer className="h-4 w-4 icon-margin-right text-craft-wood" /> Benötigte Werkzeuge
                  </h4>
                  <div className="flex-wrap-gap-1">
                    {project.tools.map((tool, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 icon-margin-right text-green-500" /> {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="small-muted-text feature-title">Materialien</h4>
                  <div className="flex-wrap-gap-1">
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
