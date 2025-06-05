import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const WeeklyChallenge = () => {
  // This would normally come from an API, using mock data for now
  const challengeData = {
    title: "Mini Plant Shelf from Scrap Wood",
    description: "Create a beautiful little shelf for your plants using wood scraps. Perfect for beginners and a great way to recycle leftover materials!",
    image: "https://images.unsplash.com/photo-1602123233898-9b027ca9a8da",
    deadline: "May 18, 2025",
    difficulty: "Beginner",
    participants: 47,
    duration: "2-3 hours"
  };

  return (
    <div className="section-y-space-xl bg-craft-wood/5">
      <div className="container">
        <div className="text-center section-space">
          <h2 className="header-xl">Weekly Challenge</h2>
          <p className="muted-text max-w-2xl mx-auto">
            Take on our weekly DIY challenge, share your result, and win prizes!
          </p>
        </div>
      
        <Card className="overflow-hidden border-2 border-craft-wood">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <Badge className="absolute top-4 left-4 bg-craft-wood border-none z-10 px-3 py-1.5">
                <Trophy className="h-4 w-4 mr-2" />
                Current
              </Badge>
              <img 
                src={challengeData.image} 
                alt={challengeData.title}
                className="img-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          
            <div>
              <CardHeader>
                <div className="flex-between mb-2">
                  <Badge variant="outline" className="badge-green">
                    {challengeData.difficulty}
                  </Badge>
                  <div className="flex gap-4">
                    <span className="text-sm muted-text flex items-center">
                      <Clock className="h-3 w-3 icon-margin-right" /> {challengeData.duration}
                    </span>
                    <span className="text-sm muted-text flex items-center">
                      <Users className="h-3 w-3 icon-margin-right" /> {challengeData.participants} Participants
                    </span>
                  </div>
                </div>
                <CardTitle className="header-lg">{challengeData.title}</CardTitle>
                <CardDescription>
                  <div className="flex-center-text-craft-wood">
                    <Calendar className="h-4 w-4 icon-margin-right" />
                    Submission deadline: {challengeData.deadline}
                  </div>
                </CardDescription>
              </CardHeader>
            
              <CardContent>
                <p className="section-space">{challengeData.description}</p>
              
                <div className="space-y-2">
                  <div className="bg-muted rounded-lg p-3">
                    <h4 className="font-medium mb-1">Prizes:</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex-baseline-gap2">
                        <span className="text-craft-wood">•</span>
                        <span>$50 gift certificate</span>
                      </li>
                      <li className="flex-baseline-gap2">
                        <span className="text-craft-wood">•</span>
                        <span>Featured spot on the CraftCircle homepage</span>
                      </li>
                      <li className="flex-baseline-gap2">
                        <span className="text-craft-wood">•</span>
                        <span>Exclusive "Challenge Master" badge</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            
              <CardFooter className="flex-between">
                <Button variant="outline">View Gallery</Button>
                <Button asChild>
                  <Link to="/challenges/weekly">
                    Participate <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyChallenge;
