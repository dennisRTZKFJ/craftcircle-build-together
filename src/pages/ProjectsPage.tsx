import React, { useState, useEffect } from 'react';
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
import { projectService, Project } from '@/services/project.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ProjectsPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Project state
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  
  // Edit project dialog
  const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
  const [editedProject, setEditedProject] = useState({ id: 0, name: "", description: "" });

  // Fetch projects using React Query
  const { 
    data: projects = [],
    isLoading: loadingProjects,
    error
  } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getProjects
  });

  // Mutations for project operations
  const createProjectMutation = useMutation({
    mutationFn: (project: Omit<Project, 'id'>) => projectService.createProject(project),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowNewProjectDialog(false);
      setNewProject({ name: "", description: "" });
      toast({
        title: "Project Created",
        description: `Your project "${data.name}" has been successfully created.`
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to create project. Please try again."
      });
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) => 
      projectService.updateProject(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditProjectIndex(null);
      toast({
        title: "Project Updated",
        description: `Your project has been successfully updated.`
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to update project. Please try again."
      });
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Deleted",
        description: `The project has been successfully deleted.`
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Failed to delete project. Please try again."
      });
    }
  });
  
  const handleCreateProject = () => {
    if (!newProject.name) return;
    
    createProjectMutation.mutate({
      name: newProject.name,
      description: newProject.description,
      status: 'new'
    });
  };
  
  const handleUpdateProject = () => {
    if (editProjectIndex === null) return;
    
    const projectToUpdate = projects[editProjectIndex];
    updateProjectMutation.mutate({
      id: projectToUpdate.id,
      data: {
        name: editedProject.name,
        description: editedProject.description
      }
    });
  };
  
  const handleDeleteProject = (id: number) => {
    deleteProjectMutation.mutate(id);
  };

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="text-center py-8">
            <h3 className="font-medium text-lg">Error loading projects</h3>
            <p className="text-muted-foreground mt-1">
              There was a problem loading your projects. Please try again later.
            </p>
            <Button className="mt-4" onClick={() => queryClient.invalidateQueries({ queryKey: ['projects'] })}>
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              {loadingProjects ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                </div>
              ) : projects.length === 0 ? (
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
                        {project.description && (
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        )}
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className={
                            project.status === 'completed' ? 'badge-green' :
                            project.status === 'in-progress' ? 'badge-blue' :
                            project.status === 'planned' ? 'badge-amber' :
                            'badge-red'
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
                                id: project.id,
                                name: project.name,
                                description: project.description || ""
                              });
                            } else {
                              setEditProjectIndex(null);
                            }
                          }}
                        >
                          <Button variant="ghost" size="sm" onClick={() => {
                            setEditProjectIndex(index);
                            setEditedProject({
                              id: project.id,
                              name: project.name,
                              description: project.description || ""
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
                              <Button 
                                variant="outline" 
                                onClick={() => setEditProjectIndex(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                onClick={handleUpdateProject}
                                disabled={updateProjectMutation.isPending}
                              >
                                {updateProjectMutation.isPending ? "Updating..." : "Update"}
                              </Button>
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
                                onClick={() => handleDeleteProject(project.id)}
                                className="bg-destructive text-destructive-foreground"
                                disabled={deleteProjectMutation.isPending}
                              >
                                {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
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
              <Button 
                variant="outline" 
                onClick={() => setShowNewProjectDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateProject}
                disabled={createProjectMutation.isPending || !newProject.name.trim()}
              >
                {createProjectMutation.isPending ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

