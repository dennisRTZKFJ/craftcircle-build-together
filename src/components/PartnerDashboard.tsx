
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Store, MapPin, Link, DollarSign, UploadCloud, Brain, Support } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const PartnerDashboard = () => {
  const { toast } = useToast();
  
  // Mock data - in a real app this would come from an API
  const products = [
    { id: 1, name: "OSB-Platten 18mm", clicks: 687, sales: 43, trend: "up", regions: ["NRW", "Bayern"] },
    { id: 2, name: "Tischbeine Metall 80cm", clicks: 542, sales: 31, trend: "up", regions: ["Berlin", "Hamburg"] },
    { id: 3, name: "Schleifpapier Set", clicks: 423, sales: 29, trend: "down", regions: ["Hessen"] },
    { id: 4, name: "Holzlasur Eiche", clicks: 398, sales: 17, trend: "up", regions: ["Bayern", "Sachsen"] },
    { id: 5, name: "Kreissäge Bosch", clicks: 356, sales: 8, trend: "down", regions: ["NRW"] },
  ];
  
  const campaignRequests = [
    { id: 1, title: "Holzwerkstoffe im Fokus", status: "running", endDate: "2025-06-15" },
    { id: 2, title: "DIY Werkzeug-Special", status: "pending", endDate: "2025-07-01" },
  ];
  
  const handleContactSupport = () => {
    toast({
      title: "Support kontaktiert",
      description: "Ein Ansprechpartner wird sich in Kürze bei Ihnen melden.",
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Partner Dashboard</h1>
          <p className="text-muted-foreground">Produktdaten, Insights und Kampagnenmanagement</p>
        </div>
        
        <Button onClick={handleContactSupport} className="flex items-center gap-2">
          <Support className="h-4 w-4" />
          <span>Support kontaktieren</span>
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Link className="h-5 w-5 text-craft-wood" />
              Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2406</div>
            <p className="text-muted-foreground text-sm">Auf Affiliate-Links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Store className="h-5 w-5 text-craft-wood" />
              Verkäufe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-muted-foreground text-sm">Über Affiliate-Links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-craft-wood" />
              Umsatz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€4.328</div>
            <p className="text-muted-foreground text-sm">Diesen Monat</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-craft-wood" />
              Top-Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">NRW</div>
            <p className="text-muted-foreground text-sm">Meiste Verkäufe</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-4 max-w-lg mb-8">
          <TabsTrigger value="products">Produkte</TabsTrigger>
          <TabsTrigger value="campaigns">Kampagnen</TabsTrigger>
          <TabsTrigger value="regions">Regionen</TabsTrigger>
          <TabsTrigger value="recommendations">Empfehlungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Beliebteste Produkte</CardTitle>
              <CardDescription>Nach Klicks und Verkäufen sortiert</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produkt</TableHead>
                    <TableHead className="hidden md:table-cell">Klicks</TableHead>
                    <TableHead className="hidden md:table-cell">Verkäufe</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="hidden md:table-cell">Top-Regionen</TableHead>
                    <TableHead>Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.clicks}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.sales}</TableCell>
                      <TableCell>
                        {product.trend === "up" ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {product.regions.map((region) => (
                            <Badge key={region} variant="outline">{region}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Vollständige Produktliste anzeigen
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Laufende & geplante Kampagnen</CardTitle>
                <CardDescription>Status und Metriken</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kampagne</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enddatum</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignRequests.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.title}</TableCell>
                        <TableCell>
                          <Badge variant={campaign.status === "running" ? "default" : "outline"}>
                            {campaign.status === "running" ? "Aktiv" : "In Prüfung"}
                          </Badge>
                        </TableCell>
                        <TableCell>{campaign.endDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Verwalten</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Neue Kampagne anfragen</CardTitle>
                <CardDescription>Stellen Sie eine Anfrage für Produktplatzierungen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="mb-4">Starten Sie eine neue Kampagnenanfrage</p>
                  <Button>Kampagne erstellen</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regionale Nachfrage</CardTitle>
              <CardDescription>Nach Bundesländern aufgeschlüsselt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Hier würde eine interaktive Karte der regionalen Nachfrage angezeigt werden
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produktempfehlungen</CardTitle>
              <CardDescription>KI-gestützte Vorschläge für Promotions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-md">
                  <Brain className="h-8 w-8 text-craft-wood" />
                  <div>
                    <h4 className="font-medium">
                      {i === 1 ? "Heimwerker-Sets promoten" : i === 2 ? "Fokus auf Außenbereich" : "Werkzeug-Bundles"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 
                        ? "Starter-Sets sind aktuell sehr gefragt bei Anfängern" 
                        : i === 2 
                          ? "Gartenmöbel-Tutorials haben überdurchschnittliche Engagement-Raten"
                          : "Werkzeug-Bundles mit Grundausstattung könnten gut performen"}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto whitespace-nowrap">
                    Umsetzen
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerDashboard;
