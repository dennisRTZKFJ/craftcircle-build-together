
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// This would normally come from an API or props, using mock data for now
const tutorialsData = [
  {
    id: "rustikaler-couchtisch",
    title: "Rustikaler Couchtisch aus Altholz",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Mittel",
    duration: "6 Stunden"
  },
  {
    id: "mini-gewuerzregal",
    title: "Mini-Gewürzregal für die Küche",
    image: "https://images.unsplash.com/photo-1509402308937-0240d9a4438e",
    category: "Anfänger",
    duration: "2 Stunden"
  },
  {
    id: "wandgarderobe",
    title: "Moderne Wandgarderobe",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    category: "Anfänger",
    duration: "3 Stunden"
  }
];

interface RelatedTutorialsProps {
  currentId: string;
}

const RelatedTutorials = ({ currentId }: RelatedTutorialsProps) => {
  const relatedTutorials = tutorialsData.filter(tutorial => tutorial.id !== currentId);
  
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-bold mb-4">Das könnte dich auch interessieren</h3>
        <div className="space-y-4">
          {relatedTutorials.map((tutorial) => (
            <div key={tutorial.id} className="flex items-start gap-3">
              <Link to={`/tutorials/${tutorial.id}`} className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              
              <div className="flex-1">
                <Link to={`/tutorials/${tutorial.id}`} className="hover:underline">
                  <h4 className="font-medium text-sm line-clamp-2">{tutorial.title}</h4>
                </Link>
                
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className={
                    tutorial.category === "Anfänger" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : tutorial.category === "Mittel"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }>
                    {tutorial.category}
                  </Badge>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/tutorials">Alle Tutorials ansehen</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RelatedTutorials;
