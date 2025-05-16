
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Calendar, User, Bell, CreditCard, Download, Tag, Trophy, 
  Settings, ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Account = () => {
  const { toast } = useToast();
  
  // Mock data
  const subscriptionStatus = "active";
  const subscriptionPlan = "Creator Pro";
  const nextBillingDate = "15.06.2025";
  const paymentMethod = "**** **** **** 4242";
  
  const [loading, setLoading] = useState(false);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mein Konto</h1>
            <p className="text-muted-foreground">Verwalte deine Kontodaten, Zahlungen und Abonnements</p>
          </div>
        </div>
        
        <Tabs defaultValue="payment">
          <TabsList className="mb-6">
            <TabsTrigger value="payment">
              <CreditCard className="h-4 w-4 mr-2" /> Zahlungen
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" /> Profil
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" /> Benachrichtigungen
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" /> Einstellungen
            </TabsTrigger>
          </TabsList>
          
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
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profileinstellungen</CardTitle>
                <CardDescription>Verwalte deine Profildaten und Kontoinformationen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-amber-500" />
                    <h3 className="text-lg font-medium mb-2">Profilbereich in Entwicklung</h3>
                    <p className="text-muted-foreground">
                      Wir arbeiten gerade an der Implementierung vollständiger Profilmanagement-Features. 
                      Dieser Bereich wird bald verfügbar sein.
                    </p>
                  </div>
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
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                    <h3 className="text-lg font-medium mb-2">Benachrichtigungseinstellungen in Entwicklung</h3>
                    <p className="text-muted-foreground">
                      Wir arbeiten gerade an erweiterten Benachrichtigungseinstellungen.
                      Diese Funktion wird in Kürze verfügbar sein.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Kontoeinstellungen</CardTitle>
                <CardDescription>Verwalte deine allgemeinen Kontoeinstellungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-craft-wood" />
                    <h3 className="text-lg font-medium mb-2">Einstellungsbereich in Entwicklung</h3>
                    <p className="text-muted-foreground">
                      Wir arbeiten gerade an erweiterten Kontoeinstellungen.
                      Diese Funktion wird in Kürze verfügbar sein.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
