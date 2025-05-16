import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, User, Bell, CreditCard, Download, Tag, Trophy, 
  Settings, ArrowRight, Trash2, Edit, Save
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Account = () => {
  const { toast } = useToast();
  
  // Mock data
  const subscriptionStatus = "active";
  const subscriptionPlan = "DIY Premium";
  const nextBillingDate = "15.06.2025";
  const paymentMethod = "**** **** **** 4242";
  
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'diy' | 'creator' | 'partner'>('diy');
  
  // User profile data
  const [profile, setProfile] = useState({
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    bio: "Ich bin ein leidenschaftlicher DIY-Enthusiast mit Fokus auf Holzarbeiten und Heimwerker-Projekten.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    projects: 12,
    followers: 45,
    following: 32
  });
  
  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  
  // Delete account dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Projects state
  const [projects, setProjects] = useState([
    { id: 1, name: "Couchtisch", status: "completed" },
    { id: 2, name: "Wandregal", status: "in-progress" }
  ]);
  
  // New project dialog
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  
  // Edit project dialog
  const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);
  const [editedProject, setEditedProject] = useState({ id: 0, name: "", description: "" });
  
  // Mock transactions
  const transactions = [
    { id: 'tx1', date: '10.05.2025', type: 'payment', description: 'Monatliches Abo', amount: '€9.99' },
    { id: 'tx2', date: '21.04.2025', type: 'income', description: 'Tutorial-Verkauf', amount: '€15.50' },
    { id: 'tx3', date: '15.04.2025', type: 'payment', description: 'Monatliches Abo', amount: '€9.99' },
    { id: 'tx4', date: '03.04.2025', type: 'income', description: 'Materialprovision', amount: '€2.75' },
    { id: 'tx5', date: '15.03.2025', type: 'payment', description: 'Monatliches Abo', amount: '€9.99' },
  ];
  
  const handleUpdatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Zahlungsmethode aktualisiert",
        description: "Deine Zahlungsinformationen wurden erfolgreich aktualisiert."
      });
    }, 1500);
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Abonnement gekündigt",
      description: "Dein Abonnement bleibt bis zum Ende der aktuellen Abrechnungsperiode aktiv."
    });
  };
  
  const handleUpdateProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profil aktualisiert",
      description: "Deine Profildaten wurden erfolgreich aktualisiert."
    });
  };
  
  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast({
      title: "Konto gelöscht",
      description: "Dein Konto wurde erfolgreich gelöscht. Du wirst zur Startseite weitergeleitet."
    });
    // In a real app, redirect to home after account deletion
    // window.location.href = "/";
  };
  
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
      title: "Projekt erstellt",
      description: `Dein Projekt "${project.name}" wurde erfolgreich erstellt.`
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
      title: "Projekt aktualisiert",
      description: `Dein Projekt wurde erfolgreich aktualisiert.`
    });
  };
  
  const handleDeleteProject = (index: number) => {
    const updatedProjects = [...projects];
    const deletedProject = updatedProjects[index];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    
    toast({
      title: "Projekt gelöscht",
      description: `Das Projekt "${deletedProject.name}" wurde erfolgreich gelöscht.`
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mein Konto</h1>
            <p className="text-muted-foreground">Verwalte deine Kontodaten, Zahlungen und Abonnements</p>
          </div>
          
          <div className="flex gap-2">
            <Tabs 
              value={userType} 
              onValueChange={(value) => setUserType(value as 'diy' | 'creator' | 'partner')}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="diy">DIY Nutzer</TabsTrigger>
                <TabsTrigger value="creator">Creator</TabsTrigger>
                <TabsTrigger value="partner">Partner</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" /> Profil
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="h-4 w-4 mr-2" /> Zahlungen
            </TabsTrigger>
            <TabsTrigger value="projects">
              <Trophy className="h-4 w-4 mr-2" /> Projekte
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" /> Benachrichtigungen
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" /> Einstellungen
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Profileinstellungen</CardTitle>
                  <CardDescription>Verwalte deine Profildaten und Kontoinformationen</CardDescription>
                </div>
                
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditedProfile(profile);
                      }}
                    >
                      Abbrechen
                    </Button>
                    <Button size="sm" onClick={handleUpdateProfile}>
                      <Save className="h-4 w-4 mr-2" />
                      Speichern
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Bearbeiten
                  </Button>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative h-32 w-32 rounded-full overflow-hidden">
                        <img 
                          src={profile.avatar} 
                          alt="Profilbild" 
                          className="object-cover w-full h-full"
                        />
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Button size="sm" variant="secondary">Ändern</Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      {isEditing ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name</Label>
                              <Input 
                                id="name" 
                                value={editedProfile.name}
                                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">E-Mail</Label>
                              <Input 
                                id="email" 
                                value={editedProfile.email}
                                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bio">Über mich</Label>
                            <Textarea 
                              id="bio" 
                              value={editedProfile.bio}
                              onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                              rows={4}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h3 className="font-bold text-xl">{profile.name}</h3>
                            <p className="text-sm text-muted-foreground">{profile.email}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Über mich</h4>
                            <p className="text-sm">{profile.bio}</p>
                          </div>
                          
                          <div className="flex gap-6">
                            <div>
                              <div className="font-bold">{profile.projects}</div>
                              <div className="text-xs text-muted-foreground">Projekte</div>
                            </div>
                            <div>
                              <div className="font-bold">{profile.followers}</div>
                              <div className="text-xs text-muted-foreground">Follower</div>
                            </div>
                            <div>
                              <div className="font-bold">{profile.following}</div>
                              <div className="text-xs text-muted-foreground">Folgt</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t flex justify-between pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Mitglied seit Mai 2025</p>
                </div>
                
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Konto löschen
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konto wirklich löschen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden. Alle deine Daten, Projekte und Einstellungen werden unwiderruflich gelöscht.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground">
                        Konto löschen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Meine Projekte</CardTitle>
                  <CardDescription>Verwalte deine DIY-Projekte</CardDescription>
                </div>
                
                <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">Neues Projekt</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Neues Projekt erstellen</DialogTitle>
                      <DialogDescription>
                        Erstelle ein neues DIY-Projekt für deine Sammlung.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-name">Projektname</Label>
                        <Input 
                          id="project-name" 
                          value={newProject.name}
                          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="project-description">Beschreibung</Label>
                        <Textarea 
                          id="project-description" 
                          value={newProject.description}
                          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>Abbrechen</Button>
                      <Button onClick={handleCreateProject}>Projekt erstellen</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-medium text-lg">Keine Projekte gefunden</h3>
                      <p className="text-muted-foreground mt-1">
                        Du hast noch keine Projekte erstellt. Starte dein erstes DIY-Projekt!
                      </p>
                      <Button className="mt-4" onClick={() => setShowNewProjectDialog(true)}>
                        Erstes Projekt erstellen
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
                                'bg-amber-100 text-amber-800 border-amber-200'
                              }>
                                {project.status === 'completed' ? 'Fertig' :
                                 project.status === 'in-progress' ? 'In Arbeit' : 'Neu'}
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
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Projekt bearbeiten</DialogTitle>
                                </DialogHeader>
                                
                                <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-project-name">Projektname</Label>
                                    <Input 
                                      id="edit-project-name" 
                                      value={editedProject.name}
                                      onChange={(e) => setEditedProject({...editedProject, name: e.target.value})}
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-project-description">Beschreibung</Label>
                                    <Textarea 
                                      id="edit-project-description" 
                                      value={editedProject.description}
                                      onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                                      rows={4}
                                    />
                                  </div>
                                </div>
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setEditProjectIndex(null)}>Abbrechen</Button>
                                  <Button onClick={handleUpdateProject}>Aktualisieren</Button>
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
                                  <AlertDialogTitle>Projekt löschen?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Möchtest du dieses Projekt wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteProject(index)}
                                    className="bg-destructive text-destructive-foreground"
                                  >
                                    Löschen
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
          </TabsContent>
          
          {/* Payment Tab - Keep existing payment tab but update the tab value */}
          <TabsContent value="payment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Abonnement</CardTitle>
                  <CardDescription>Dein aktuelles Abonnement und Status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          {subscriptionStatus === 'active' ? 'Aktiv' : 'Inaktiv'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Plan</div>
                      <div className="font-medium mt-1">{subscriptionPlan}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Nächste Abrechnung</div>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{nextBillingDate}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" onClick={handleCancelSubscription}>
                        Abonnement kündigen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Zahlungsmethode</CardTitle>
                  <CardDescription>Deine gespeicherte Zahlungsmethode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-white text-xs mr-3">
                            VISA
                          </div>
                          <div>
                            <div className="font-medium">{paymentMethod}</div>
                            <div className="text-xs text-muted-foreground">Gültig bis 12/27</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Button size="sm" onClick={handleUpdatePayment} disabled={loading}>
                        {loading ? "Wird aktualisiert..." : "Zahlungsmethode aktualisieren"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Creator-Einnahmen</CardTitle>
                  <CardDescription>Deine Einnahmen als Creator</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Aktueller Monat</div>
                      <div className="text-2xl font-bold">€68,50</div>
                      <div className="text-xs text-green-600">+12% im Vergleich zum Vormonat</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Gesamteinnahmen</div>
                      <div className="font-medium">€427,75</div>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Umsatzübersicht (PDF)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Transaktionen</CardTitle>
                <CardDescription>Deine letzten Zahlungen und Einnahmen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'payment' ? 'bg-amber-100' : 'bg-green-100'
                        }`}>
                          {transaction.type === 'payment' ? (
                            <CreditCard className={`h-5 w-5 text-amber-800`} />
                          ) : (
                            <Tag className={`h-5 w-5 text-green-800`} />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : ''
                      }`}>
                        {transaction.type === 'income' ? '+' : ''}{transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Button variant="ghost" className="w-full justify-between">
                    Alle Transaktionen anzeigen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Benachrichtigungseinstellungen</CardTitle>
                <CardDescription>Konfiguriere deine Benachrichtigungspräferenzen</CardDescription>
              </CardHeader>
              <CardContent>
                {userType === 'diy' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">DIY Nutzer-Benachrichtigungen</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Projekt-Erinnerungen</h4>
                          <p className="text-sm text-muted-foreground">Erhalte Erinnerungen zu deinen laufenden Projekten</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="project-reminders" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Neue Tutorials</h4>
                          <p className="text-sm text-muted-foreground">Benachrichtigungen über neue Tutorials, die zu deinen Interessen passen</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="new-tutorials" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Wöchentliche Herausforderungen</h4>
                          <p className="text-sm text-muted-foreground">Informationen zu neuen wöchentlichen DIY-Herausforderungen</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="weekly-challenges" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {userType === 'creator' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Creator-Benachrichtigungen</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Kommentare zu Tutorials</h4>
                          <p className="text-sm text-muted-foreground">Benachrichtigungen über neue Kommentare zu deinen Tutorials</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="tutorial-comments" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Einnahmen-Updates</h4>
                          <p className="text-sm text-muted-foreground">Benachrichtigungen über neue Einnahmen durch deine Tutorials</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="earnings-updates" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Neue Follower</h4>
                          <p className="text-sm text-muted-foreground">Benachrichtigungen wenn dir jemand neues folgt</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="new-followers" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {userType === 'partner' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Partner-Benachrichtigungen</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Neue Bestellungen</h4>
                          <p className="text-sm text-muted-foreground">Benachrichtigungen über neue Bestellungen aus deinem Shop</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="new-orders" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Produkt-Erwähnungen</h4>
                          <p className="text-sm text-muted-foreground">Benachrichtigungen wenn deine Produkte in Tutorials verwendet werden</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="product-mentions" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Umsatzberichte</h4>
                          <p className="text-sm text-muted-foreground">Wöchentliche und monatliche Umsatzberichte</p>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="sales-reports" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button>Einstellungen speichern</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Kontoeinstellungen</CardTitle>
                <CardDescription>Verwalte deine allgemeinen Kontoeinstellungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userType === 'diy' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">DIY Nutzer-Einstellungen</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="privacy">Privatsphäre</Label>
                          <select id="privacy" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="public">Öffentliches Profil</option>
                            <option value="followers">Nur für Follower sichtbar</option>
                            <option value="private">Privates Profil</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="skill-level">Fähigkeitsstufe</Label>
                          <select id="skill-level" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="beginner">Anfänger</option>
                            <option value="intermediate">Fortgeschritten</option>
                            <option value="expert">Experte</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {userType === 'creator' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Creator-Einstellungen</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="creator-page">Creator-Seite</Label>
                          <select id="creator-page" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="public">Öffentlich</option>
                            <option value="private">Privat (nur mit Link)</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="monetization">Monetarisierung</Label>
                          <select id="monetization" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="enabled">Aktiviert</option>
                            <option value="disabled">Deaktiviert</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="tutorial-review">Tutorial-Überprüfung</Label>
                          <select id="tutorial-review" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="auto">Automatisch (schnellere Veröffentlichung)</option>
                            <option value="manual">Manuell (mehr Kontrolle)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {userType === 'partner' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Partner-Einstellungen</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="shop-visibility">Shop-Sichtbarkeit</Label>
                          <select id="shop-visibility" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="public">Öffentlich</option>
                            <option value="private">Nur für Mitglieder</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="order-notifications">Bestellbenachrichtigungen</Label>
                          <select id="order-notifications" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="all">Für alle Bestellungen</option>
                            <option value="large">Nur für große Bestellungen</option>
                            <option value="none">Keine Benachrichtigungen</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="api-integration">API-Integration</Label>
                          <select id="api-integration" className="w-full rounded-md border border-input bg-background px-3 py-2">
                            <option value="enabled">Aktiviert</option>
                            <option value="disabled">Deaktiviert</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Änderungen speichern</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
