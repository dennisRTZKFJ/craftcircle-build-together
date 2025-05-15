
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Clock, ArrowRight } from 'lucide-react';

const WeeklyChallenge = () => {
  // This would normally come from an API, using mock data for now
  const challengeData = {
    title: "Mini Pflanzenregal aus Restholz",
    description: "Erschaffe ein schönes kleines Regal für deine Pflanzen aus Holzresten. Perfekt für Anfänger und eine tolle Möglichkeit, Materialreste zu verwerten!",
    image: "https://images.unsplash.com/photo-1602123233898-9b027ca9a8da",
    deadline: "18. Mai 2025",
    difficulty: "Anfänger",
    participants: 47,
    duration: "2-3 Stunden"
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Challenge der Woche</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stelle dich unserer wöchentlichen DIY-Herausforderung, teile dein Ergebnis und gewinne Preise!
        </p>
      </div>
      
      <Card className="overflow-hidden border-2 border-craft-wood">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <Badge className="absolute top-4 left-4 bg-craft-wood border-none z-10 px-3 py-1.5">
              <Trophy className="h-4 w-4 mr-2" />
              Aktuell
            </Badge>
            <img 
              src={challengeData.image} 
              alt={challengeData.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  {challengeData.difficulty}
                </Badge>
                <div className="flex gap-4">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {challengeData.duration}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Users className="h-3 w-3 mr-1" /> {challengeData.participants} Teilnehmer
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl">{challengeData.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center text-craft-wood">
                  <Calendar className="h-4 w-4 mr-1" />
                  Einsendeschluss: {challengeData.deadline}
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="mb-6">{challengeData.description}</p>
              
              <div className="space-y-2">
                <div className="bg-muted rounded-lg p-3">
                  <h4 className="font-medium mb-1">Zu gewinnen:</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-baseline gap-2">
                      <span className="text-craft-wood">•</span>
                      <span>Geschenkgutschein im Wert von €50</span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-craft-wood">•</span>
                      <span>Feature-Platz auf der CraftCircle Homepage</span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-craft-wood">•</span>
                      <span>Exklusives "Challenge-Meister" Abzeichen</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline">Gallerie ansehen</Button>
              <Button asChild>
                <Link to="/challenges/weekly">
                  Teilnehmen <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeeklyChallenge;
