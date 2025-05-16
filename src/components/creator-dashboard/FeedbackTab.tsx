
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, Calendar } from 'lucide-react';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  comment: string;
  tutorial: string;
  date: string;
  likes: number;
}

interface FeedbackTabProps {
  topComments: Comment[];
  handleSupportRequest: () => void;
}

const FeedbackTab = ({ topComments, handleSupportRequest }: FeedbackTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Top-Kommentare</CardTitle>
          <CardDescription>Die beliebtesten Nutzer-Kommentare zu deinen Tutorials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {topComments.map((comment) => (
            <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">{comment.user.name}</div>
                    <div className="text-sm text-muted-foreground">{comment.date}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{comment.tutorial}</div>
                  <div className="mt-2">{comment.comment}</div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-craft-wood" />
                      <span className="text-sm">{comment.likes}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-sm">
                      Antworten
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Alle Kommentare anzeigen
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verbesserungsvorschläge</CardTitle>
            <CardDescription>Feedback von der Community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Projekt-Voraussetzungen</h4>
                <p className="text-sm text-muted-foreground">
                  Einige Nutzer wünschen sich mehr Details zu benötigten Werkzeugen und Materialien am Anfang der Tutorials.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">14 Erwähnungen</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Alternative Materialien</h4>
                <p className="text-sm text-muted-foreground">
                  Mehrere Anfänger bitten um kostengünstigere Alternativen zu den hochwertigen Materialien.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">8 Erwähnungen</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Video-Länge</h4>
                <p className="text-sm text-muted-foreground">
                  Einige Nutzer wünschen sich kompaktere Tutorials mit weniger Wiederholungen.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">5 Erwähnungen</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Feedback-Analyse durchführen
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Creator-Support</CardTitle>
            <CardDescription>Verbessere deine Tutorial-Qualität</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-4">
              <Calendar className="h-10 w-10 text-craft-wood" />
              <div>
                <h4 className="font-medium">Creator-Sprechstunde</h4>
                <p className="text-sm text-muted-foreground">
                  Vereinbare ein persönliches Gespräch mit unserem Creator-Team für individuelle Tipps und Feedback.
                </p>
                <Button className="mt-2" size="sm">
                  Termin buchen
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Tutorial-Qualitätsscore</h4>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">87/100</div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Sehr gut
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Deine Tutorials schneiden im Vergleich zu ähnlichen Creators überdurchschnittlich gut ab.
              </p>
              
              <div className="space-y-2 mt-4">
                <h5 className="text-sm font-medium">Verbesserungspotenzial:</h5>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-800 text-xs">!</span>
                    </div>
                    <span>Mehr Nahaufnahmen bei detaillierten Arbeitsschritten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-800 text-xs">!</span>
                    </div>
                    <span>Detailliertere Materialangaben mit Alternativen</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSupportRequest}>
              Support kontaktieren
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackTab;
