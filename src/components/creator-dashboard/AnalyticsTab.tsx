import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, TrendingUp } from 'lucide-react';

interface Tutorial {
  id: number;
  title: string;
  status: string;
  views: number;
  likes: number;
  comments: number;
  revenue: string;
  date: string;
  image: string;
}

interface AnalyticsTabProps {
  tutorials: Tutorial[];
}

const AnalyticsTab = ({ tutorials }: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid-cols-1-md-2-gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Viewer Numbers</CardTitle>
            <CardDescription>View count development over time</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex-center-h-300-bg-muted-rounded">
              <div className="text-center p-4">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 muted-text" />
                <p className="muted-text">
                  Your views history will be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
            <CardDescription>Comparison of your tutorials</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex-center-h-300-bg-muted-rounded">
              <div className="text-center p-4">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 muted-text" />
                <p className="muted-text">
                  Performance comparison of your tutorials will be shown here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detailed Statistics</CardTitle>
            <CardDescription>Performance of your tutorials with all metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tutorial</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Likes</TableHead>
                  <TableHead className="text-right">Comments</TableHead>
                  <TableHead className="text-right">Completion Rate</TableHead>
                  <TableHead className="text-right">Click-Through</TableHead>
                  <TableHead className="text-right">Avg. Viewing Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tutorials
                  .filter(t => t.status === 'published')
                  .map((tutorial) => (
                    <TableRow key={tutorial.id}>
                      <TableCell className="font-medium">{tutorial.title}</TableCell>
                      <TableCell className="text-right">{tutorial.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{tutorial.likes}</TableCell>
                      <TableCell className="text-right">{tutorial.comments}</TableCell>
                      <TableCell className="text-right">
                        {Math.round(65 + Math.random() * 20)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {Math.round(10 + Math.random() * 15)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {Math.round(3 + Math.random() * 59)}m {Math.round(Math.random() * 59)}s
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex-between">
            <div>
              <Button variant="outline">
                Export Performance Report
              </Button>
            </div>
            <div>
              <Button variant="outline">
                Show More Metrics <ChevronDown className="icon-margin-left h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
