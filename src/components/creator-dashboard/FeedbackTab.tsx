
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
          <CardTitle>Top Comments</CardTitle>
          <CardDescription>The most popular user comments on your tutorials</CardDescription>
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
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View all comments
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Improvement Suggestions</CardTitle>
            <CardDescription>Feedback from the community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Project Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  Some users would like more details on the required tools and materials at the beginning of tutorials.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">14 mentions</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Alternative Materials</h4>
                <p className="text-sm text-muted-foreground">
                  Several beginners ask for less expensive alternatives to the high-quality materials.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">8 mentions</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium">Video Length</h4>
                <p className="text-sm text-muted-foreground">
                  Some users would prefer more compact tutorials with fewer repetitions.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">5 mentions</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Run feedback analysis
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Creator Support</CardTitle>
            <CardDescription>Improve your tutorial quality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-4">
              <Calendar className="h-10 w-10 text-craft-wood" />
              <div>
                <h4 className="font-medium">Creator Office Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Schedule a personal call with our creator team for individual tips and feedback.
                </p>
                <Button className="mt-2" size="sm">
                  Book appointment
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Tutorial Quality Score</h4>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">87/100</div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Very good
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your tutorials perform above average compared to similar creators.
              </p>
              
              <div className="space-y-2 mt-4">
                <h5 className="text-sm font-medium">Room for improvement:</h5>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-800 text-xs">!</span>
                    </div>
                    <span>More close-ups during detailed work steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-800 text-xs">!</span>
                    </div>
                    <span>More detailed material specifications with alternatives</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSupportRequest}>
              Contact support
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackTab;
