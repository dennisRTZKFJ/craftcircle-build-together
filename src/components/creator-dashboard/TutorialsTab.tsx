
import React from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Edit, Star, Upload } from 'lucide-react';
import UploadTutorialDialog from './UploadTutorialDialog';
import { Link, useNavigate } from 'react-router-dom';

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

interface TutorialsTabProps {
  tutorials: Tutorial[];
  handleEditTutorial: (id: number) => void;
}

const TutorialsTab = ({ tutorials, handleEditTutorial }: TutorialsTabProps) => {
  const navigate = useNavigate();
  
  const handleEdit = (id: number) => {
    navigate(`/creator-dashboard/edit/${id}`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Tutorials</CardTitle>
          <CardDescription>Manage your published and planned tutorials</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Views</TableHead>
                <TableHead className="hidden md:table-cell">Likes</TableHead>
                <TableHead className="hidden md:table-cell">Comments</TableHead>
                <TableHead className="hidden md:table-cell">Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorials.map((tutorial) => (
                <TableRow key={tutorial.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded overflow-hidden hidden sm:block">
                        <img 
                          src={tutorial.image} 
                          alt={tutorial.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-medium max-w-[200px] truncate">{tutorial.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tutorial.status === 'published' ? 'default' : 'outline'} className={
                      tutorial.status === 'published' ? '' : 'bg-amber-100 text-amber-800 border-amber-200'
                    }>
                      {tutorial.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.date}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.views.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.likes}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.comments}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutorial.revenue}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(tutorial.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {tutorials.length} of {tutorials.length} tutorials
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Generate Tutorial Ideas
            </Button>
            <Link to="/creator-dashboard/upload">
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                New Tutorial
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tutorial Status</CardTitle>
            <CardDescription>Progress of your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium truncate">{tutorial.title}</div>
                    <div className="text-muted-foreground text-sm">
                      {tutorial.status === 'published' ? '100%' : '60%'}
                    </div>
                  </div>
                  <Progress 
                    value={tutorial.status === 'published' ? 100 : 60} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      {tutorial.status === 'published' ? (
                        <Check className="h-3 w-3 mr-1 text-green-600" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1 text-amber-600" />
                      )}
                      {tutorial.status === 'published' ? 'Published' : 'In Progress'}
                    </div>
                    <div>{tutorial.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Successful Tutorials</CardTitle>
            <CardDescription>Your most popular content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tutorials
                .filter(t => t.status === 'published')
                .sort((a, b) => b.likes - a.likes)
                .slice(0, 3)
                .map((tutorial, index) => (
                  <div key={tutorial.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-amber-100 text-amber-800' :
                      index === 1 ? 'bg-slate-100 text-slate-800' :
                      'bg-craft-wood/10 text-craft-wood'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 truncate">
                      <div className="font-medium truncate">{tutorial.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {tutorial.views.toLocaleString()} views • {tutorial.likes} likes
                      </div>
                    </div>
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                ))
              }
              
              <div className="pt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View full ranking
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorialsTab;
