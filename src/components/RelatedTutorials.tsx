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
    title: "Rustic Coffee Table",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Intermediate",
    duration: "6 hours"
  },
  {
    id: "mini-gewuerzregal",
    title: "Mini Spice Rack",
    image: "https://images.unsplash.com/photo-1509402308937-0240d9a4438e",
    category: "Beginner",
    duration: "2 hours"
  },
  {
    id: "wandgarderobe",
    title: "Modern Wall Coat Rack",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    category: "Beginner",
    duration: "3 hours"
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
        <h3 className="header-md">You might also like</h3>
        <div className="flex-col-gap-8">
          {relatedTutorials.map((tutorial) => (
            <div key={tutorial.id} className="flex-align-center-gap-3">
              <Link to={`/tutorials/${tutorial.id}`} className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title}
                  className="img-cover"
                />
              </Link>
              
              <div className="flex-1">
                <Link to={`/tutorials/${tutorial.id}`} className="hover:underline">
                  <h4 className="font-medium text-sm line-clamp-2">{tutorial.title}</h4>
                </Link>
                
                <div className="flex-align-center-gap-3 mt-1">
                  <Badge variant="outline" className={
                    tutorial.category === "Beginner" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : tutorial.category === "Intermediate"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }>
                    {tutorial.category}
                  </Badge>
                  <div className="text-xs muted-text flex-align-center-gap-3">
                    <Clock className="h-3 w-3 icon-margin-right" /> {tutorial.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/tutorials">View all tutorials</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RelatedTutorials;
