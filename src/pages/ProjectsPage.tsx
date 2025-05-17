
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const { toast } = useToast();
  
  // Projects state
  const [projects, setProjects] = useState([
    { id: 1, name: "Coffee Table", status: "completed" },
    { id: 2, name: "Wall Shelf", status: "in-progress" },
    { id: 3, name: "Oak Desk", status: "in-progress" },
    { id: 4, name: "Coat Rack", status: "planned" },
    { id: 5, name: "Side Table", status: "abandoned" }
  ]);
  
  // New project dialog
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  
  // Edit project dialog
  const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
  const [editedProject, setEditedProject] = useState({ id: 0, name: "", description: "" });
  
  const handleCreateProject = () => {
    if (!newProject.name) return;
    
    const project = {
      id: projects.length + 1,
      name: newProject.name,
      status: "new"
    };
    
    setProjects([...projects, project]);
    setNewProject({ name: "", description: "" });
    setShowNewProjectDialog(false);
    
    toast({
      title: "Project Created",
      description: `Your project "${project.name}" has been successfully created.`
    });
  };
  
  const handleUpdateProject = () => {
    if (editProjectIndex === null) return;
    
    const updatedProjects = [...projects];
    updatedProjects[editProjectIndex] = {
      ...updatedProjects[editProjectIndex],
      name: editedProject.name
    };
    
    setProjects(updatedProjects);
    setEditProjectIndex(null);
    
    toast({
      title: "Project Updated",
      description: `Your project has been successfully updated.`
    });
  };
  
  const handleDeleteProject = (index: number) => {
    const updatedProjects = [...projects];
    const deletedProject = updatedProjects[index];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    
    toast({
      title: "Project Deleted",
      description: `The project "${deletedProject.name}" has been successfully deleted.`
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Manage your DIY projects</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowNewProjectDialog(true)}>New Project</Button>
            <Link to="/account">
              <Button variant="outline">Back to Account</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Project List</CardTitle>
              <CardDescription>All your DIY projects in one place</CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium text-lg">No projects found</h3>
                  <p className="text-muted-foreground mt-1">
                    You haven't created any projects yet. Start your first DIY project!
                  </p>
                  <Button className="mt-4" onClick={() => setShowNewProjectDialog(true)}>
                    Create First Project
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  {projects.map((project, index) => (
                    <div key={project.id} className="py-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className={
                            project.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                            project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            project.status === 'planned' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }>
                            {project.status === 'completed' ? 'Completed' :
                             project.status === 'in-progress' ? 'In Progress' : 
                             project.status === 'planned' ? 'Planned' : 'Abandoned'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog 
                          open={editProjectIndex === index} 
                          onOpenChange={(open) => {
                            if (open) {
                              setEditProjectIndex(index);
                              setEditedProject({
                                ...project,
                                description: ""
                              });
                            } else {
                              setEditProjectIndex(null);
                            }
                          }}
                        >
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditProjectIndex(index);
                            setEditedProject({
                              ...project,
                              description: ""
                            });
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-project-name">Project Name</Label>
                                <Input 
                                  id="edit-project-name" 
                                  value={editedProject.name}
                                  onChange={(e) => setEditedProject({...editedProject, name: e.target.value})}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="edit-project-description">Description</Label>
                                <Textarea 
                                  id="edit-project-description" 
                                  value={editedProject.description}
                                  onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                                  rows={4}
                                />
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditProjectIndex(null)}>Cancel</Button>
                              <Button onClick={handleUpdateProject}>Update</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Do you really want to delete this project? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteProject(index)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* New Project Dialog */}
        <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Create a new DIY project for your collection.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea 
                  id="project-description" 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
