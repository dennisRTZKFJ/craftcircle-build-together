import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Users, MessageCircle, Award, Flag, Calendar, User, Search,
  ArrowUpRight, TrendingUp, TrendingDown, Star, ArrowDownRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for stats
  const stats = {
    totalUsers: 1247,
    userGrowth: '+12%',
    activeCreators: 83,
    creatorGrowth: '+8%',
    totalTutorials: 215,
    tutorialGrowth: '+15%',
    totalTransactions: 743,
    transactionGrowth: '+24%',
  };
  
  // Mock data for recent users
  const recentUsers = [
    { id: 'u1', name: 'Anna Schmidt', email: 'anna.schmidt@example.com', date: '12.05.2025', type: 'Creator', status: 'active' },
    { id: 'u2', name: 'Thomas Weber', email: 'thomas.weber@example.com', date: '11.05.2025', type: 'DIY', status: 'active' },
    { id: 'u3', name: 'Julia Bauer', email: 'julia.bauer@example.com', date: '10.05.2025', type: 'Partner', status: 'active' },
    { id: 'u4', name: 'Marcel Hoffmann', email: 'marcel.hoffmann@example.com', date: '09.05.2025', type: 'DIY', status: 'pending' },
    { id: 'u5', name: 'Sophie Wagner', email: 'sophie.wagner@example.com', date: '08.05.2025', type: 'Creator', status: 'active' },
  ];
  
  // Mock data for reported content
  const reports = [
    { id: 'r1', content: 'Tutorial: Wandregal bauen', reporter: 'Thomas Weber', reason: 'Fehlerhafte Anleitung', date: '11.05.2025', status: 'pending' },
    { id: 'r2', content: 'Kommentar von Julia Bauer', reporter: 'Anna Schmidt', reason: 'Unangemessene Sprache', date: '10.05.2025', status: 'resolved' },
    { id: 'r3', content: 'Forum-Beitrag: Hilfe bei Lackierung', reporter: 'Marcel Hoffmann', reason: 'Werbung', date: '09.05.2025', status: 'pending' },
  ];
  
  // Mock data for recent transactions
  const transactions = [
    { id: 't1', user: 'Anna Schmidt', amount: '€15.99', date: '12.05.2025', type: 'Tutorial-Kauf', status: 'completed' },
    { id: 't2', user: 'Thomas Weber', amount: '€9.99', date: '11.05.2025', type: 'Abonnement', status: 'completed' },
    { id: 't3', user: 'Marcel Hoffmann', amount: '€12.99', date: '10.05.2025', type: 'Tutorial-Kauf', status: 'pending' },
    { id: 't4', user: 'Bauhaus GmbH', amount: '€250.00', date: '09.05.2025', type: 'Partner-Gebühr', status: 'completed' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex-wrap-between-center-gap4-mb8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Übersicht und Verwaltung der CraftCircle-Plattform</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input
                placeholder="Search users, tutorials, or projects..."
                className="pl-10 pr-4"
              />
              <Search className="icon-pos-top-left-muted" />
            </div>
            <Button>
              Export
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-craft-wood" />
                Nutzer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
              <div className="flex-center-text-sm">
                <Badge variant="outline" className="badge-green">
                  {stats.userGrowth}
                </Badge>
                <span className="text-muted-foreground ml-2">im letzten Monat</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-craft-wood" />
                Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeCreators}</div>
              <div className="flex-center-text-sm">
                <Badge variant="outline" className="badge-green">
                  {stats.creatorGrowth}
                </Badge>
                <span className="text-muted-foreground ml-2">im letzten Monat</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-craft-wood" />
                Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalTutorials}</div>
              <div className="flex-center-text-sm">
                <Badge variant="outline" className="badge-green">
                  {stats.tutorialGrowth}
                </Badge>
                <span className="text-muted-foreground ml-2">im letzten Monat</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-craft-wood" />
                Transaktionen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalTransactions}</div>
              <div className="flex-center-text-sm">
                <Badge variant="outline" className="badge-green">
                  {stats.transactionGrowth}
                </Badge>
                <span className="text-muted-foreground ml-2">im letzten Monat</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="users">
          <TabsList className="mb-8">
            <TabsTrigger value="users">
              <User className="h-4 w-4 mr-2" /> Nutzer
            </TabsTrigger>
            <TabsTrigger value="content">
              <MessageCircle className="h-4 w-4 mr-2" /> Inhalte
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Flag className="h-4 w-4 mr-2" /> Meldungen
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Calendar className="h-4 w-4 mr-2" /> Transaktionen
            </TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Neue Nutzer</CardTitle>
                <CardDescription>Kürzlich registrierte Nutzerkonten</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nutzer</TableHead>
                      <TableHead>E-Mail</TableHead>
                      <TableHead>Registriert am</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            user.type === 'Creator' 
                              ? 'badge-amber'
                              : user.type === 'Partner'
                                ? 'badge-blue'
                                : 'badge-green'
                          }>
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                            {user.status === 'active' ? 'Aktiv' : 'Ausstehend'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => 
                            toast({
                              title: "Nutzeraktion", 
                              description: `Aktion für Nutzer ${user.name} ausgeführt`
                            })
                          }>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Alle Nutzer anzeigen</Button>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nutzeraktivität</CardTitle>
                  <CardDescription>Aktive Nutzer nach Typ und Zeitraum</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                    <div className="text-center p-4">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                      <p className="text-muted-foreground">
                        Nutzungsstatistiken werden hier dargestellt
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regionale Verteilung</CardTitle>
                  <CardDescription>Nutzerverteilung nach Region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                    <div className="text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-craft-wood/20 flex items-center justify-center mx-auto mb-4">
                        <span className="font-bold text-craft-wood">DE</span>
                      </div>
                      <p className="text-muted-foreground">
                        Regionale Nutzerverteilung wird hier angezeigt
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Inhaltsübersicht</CardTitle>
                <CardDescription>Management aller Inhaltstypen der Plattform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex-center-p12">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                    <h3 className="text-lg font-medium mb-2">Inhaltsmanagement</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Das umfassende Inhaltsmanagement-System ist in Entwicklung. 
                      Hier können Sie bald Tutorials, Forum-Beiträge, Kommentare und andere Inhalte verwalten.
                    </p>
                    <Button className="mt-4" onClick={() => 
                      toast({
                        title: "In Entwicklung", 
                        description: "Diese Funktion wird in Kürze verfügbar sein."
                      })
                    }>
                      Benachrichtigung bei Verfügbarkeit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Gemeldete Inhalte</CardTitle>
                <CardDescription>Von Nutzern gemeldete Inhalte zur Überprüfung</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Inhalt</TableHead>
                      <TableHead>Gemeldet von</TableHead>
                      <TableHead>Grund</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.content}</TableCell>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === 'pending' ? 'outline' : 'default'} className={
                            report.status === 'pending' 
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-green-100 text-green-800 border-green-200'
                          }>
                            {report.status === 'pending' ? 'Ausstehend' : 'Erledigt'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => 
                              toast({
                                title: "Meldung bestätigt", 
                                description: `Meldung für ${report.content} wurde als bearbeitet markiert.`
                              })
                            }>
                              {report.status === 'pending' ? 'Bearbeiten' : 'Details'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Alle Meldungen anzeigen</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Aktuelle Transaktionen</CardTitle>
                <CardDescription>Kürzlich durchgeführte Zahlungen und Abonnements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nutzer</TableHead>
                      <TableHead>Betrag</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.user}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>
                          <Badge variant={transaction.status === 'pending' ? 'outline' : 'default'} className={
                            transaction.status === 'pending' 
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-green-100 text-green-800 border-green-200'
                          }>
                            {transaction.status === 'pending' ? 'Ausstehend' : 'Abgeschlossen'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => 
                            toast({
                              title: "Transaktionsdetails", 
                              description: `Details für Transaktion ${transaction.id} werden angezeigt.`
                            })
                          }>
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Alle Transaktionen anzeigen</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
