import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';

// Mock data for materials
const materials = [
  {
    id: 1,
    name: "Eichenholz-Bretter",
    image: "https://images.unsplash.com/photo-1611124500946-58659419e181",
    price: 24.99,
    rating: 4.8,
    reviews: 124,
    store: "Hornbach",
    category: "Holz",
    description: "Hochwertige Eichenholz-Bretter, ideal für Regale und Tischplatten.",
    affiliateLink: "#"
  },
  {
    id: 2,
    name: "Paletten-Holz-Set",
    image: "https://images.unsplash.com/photo-1616320645339-96b205f68131",
    price: 15.99,
    rating: 4.5,
    reviews: 86,
    store: "OBI",
    category: "Holz",
    description: "Set aus aufbereiteten Palettenbrettern, fertig geschliffen und einsatzbereit.",
    affiliateLink: "#"
  },
  {
    id: 3,
    name: "Hairpin Tischbeine",
    image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941",
    price: 29.99,
    rating: 4.7,
    reviews: 112,
    store: "Bauhaus",
    category: "Metallteile",
    description: "Moderne Hairpin Tischbeine aus Stahl, schwarz pulverbeschichtet.",
    affiliateLink: "#"
  },
  {
    id: 4,
    name: "Premium Holzleim",
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee",
    price: 8.99,
    rating: 4.9,
    reviews: 203,
    store: "Hornbach",
    category: "Werkzeug & Zubehör",
    description: "Wasserfester Holzleim für dauerhafte und belastbare Verbindungen.",
    affiliateLink: "#"
  },
  {
    id: 5,
    name: "Schleifpapier-Set",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407",
    price: 12.49,
    rating: 4.6,
    reviews: 94,
    store: "OBI",
    category: "Werkzeug & Zubehör",
    description: "Sortiment aus verschiedenen Körnungen für optimale Oberflächenbearbeitung.",
    affiliateLink: "#"
  },
  {
    id: 6,
    name: "Holzöl (Natur)",
    image: "https://images.unsplash.com/photo-1621371532451-e4549e7273d5",
    price: 18.99,
    rating: 4.7,
    reviews: 138,
    store: "Bauhaus",
    category: "Farben & Öle",
    description: "Natürliches Holzöl für Möbel, schützt und betont die Holzmaserung.",
    affiliateLink: "#"
  },
  {
    id: 7,
    name: "Akazie Massivholzplatte",
    image: "https://images.unsplash.com/photo-1579463148228-138296ac3b98",
    price: 79.99,
    rating: 4.9,
    reviews: 67,
    store: "Hornbach",
    category: "Holz",
    description: "Massive Akazienholzplatte, ideal für Esstische und Arbeitsplatten.",
    affiliateLink: "#"
  },
  {
    id: 8,
    name: "Kreissägeblatt Set",
    image: "https://images.unsplash.com/photo-1586864387789-628af9feed72",
    price: 34.95,
    rating: 4.5,
    reviews: 74,
    store: "OBI",
    category: "Werkzeug & Zubehör",
    description: "Set mit verschiedenen Kreissägeblättern für unterschiedliche Materialien.",
    affiliateLink: "#"
  }
];

// Mock data for tool kits/starter sets
const toolKits = [
  {
    id: 101,
    name: "DIY-Einsteiger Set",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb4dc",
    price: 99.99,
    rating: 4.8,
    reviews: 156,
    store: "Hornbach",
    description: "Das perfekte Starter-Set mit allen wichtigen Werkzeugen für deine ersten DIY-Projekte.",
    items: ["Hammer", "Schraubendreher-Set", "Zollstock", "Handsäge", "Schleifpapier", "Holzleim"],
    affiliateLink: "#"
  },
  {
    id: 102,
    name: "Möbelbau Basis-Kit",
    image: "https://images.unsplash.com/photo-1567361672830-f7aa558027a4",
    price: 149.99,
    rating: 4.7,
    reviews: 89,
    store: "OBI",
    description: "Hochwertige Werkzeuge speziell für den Möbelbau zusammengestellt.",
    items: ["Akkuschrauber", "Holzbohrer-Set", "Winkel", "Zwingen", "Schleifklotz", "Wasserwaage"],
    affiliateLink: "#"
  },
  {
    id: 103,
    name: "Profi Finish-Kit",
    image: "https://images.unsplash.com/photo-1535121911776-23fedc6a3638",
    price: 129.99,
    rating: 4.9,
    reviews: 72,
    store: "Bauhaus",
    description: "Alles was du brauchst, um deinen Projekten ein professionelles Finish zu verleihen.",
    items: ["Schleifmaschine", "Feinschleifpapier-Set", "Pinsel-Set", "Holzöl", "Holzwachs", "Poliertücher"],
    affiliateLink: "#"
  }
];

// Mock data for tutorial-specific material packages
const tutorialPackages = [
  {
    id: 201,
    name: "Minimalistisches Regal - Materialpaket",
    tutorial: "Minimalistisches Regal",
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f",
    price: 49.99,
    rating: 4.8,
    reviews: 42,
    store: "Hornbach",
    description: "Alle Materialien, die du für unser beliebtes Tutorial 'Minimalistisches Regal' benötigst.",
    items: ["Eichenholzbretter (2 Stück)", "Wandhalterungen", "Schrauben", "Dübel", "Holzöl"],
    affiliateLink: "#"
  },
  {
    id: 202,
    name: "Rustikaler Couchtisch - Materialpaket",
    tutorial: "Rustikaler Couchtisch",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    price: 119.99,
    rating: 4.7,
    reviews: 36,
    store: "OBI",
    description: "Das komplette Materialpaket für unseren rustikalen Couchtisch aus Altholz mit Metallbeinen.",
    items: ["Altholzbretter", "Hairpin Tischbeine (4 Stück)", "Verbindungselemente", "Schleifpapier", "Holzöl"],
    affiliateLink: "#"
  },
  {
    id: 203,
    name: "Nachttisch mit Schublade - Materialpaket",
    tutorial: "Nachttisch mit Schublade",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    price: 89.99,
    rating: 4.6,
    reviews: 28,
    store: "Bauhaus",
    description: "Alle Materialien für den praktischen Nachttisch mit Schublade aus unserem Tutorial.",
    items: ["Kiefernholzplatten", "Schubladenführungen", "Griff", "Schrauben", "Holzleim", "Holzwachs"],
    affiliateLink: "#"
  }
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<number>(0);
  
  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="min-h-screen py-12-util">
      <div className="container px-4-md-6-util">
        <div className="flex-col-gap-8">
          <div>
            <h1 className="text-header-3xl mb-4-util">Material-Marktplatz</h1>
            <p className="text-muted mb-6-util">
              Finde alle Materialien, die du für deine DIY-Projekte benötigst. Von Holz über Metallteile bis hin zu Werkzeugen und Farben – alles an einem Ort.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6-util">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted h-4 w-4" />
              <input
                type="text"
                placeholder="Suche nach Materialien, Werkzeugen..."
                className="pl-8 pr-4 py-2 rounded-md border w-full focus:outline-none focus:ring-2 focus:ring-craft-wood"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-row-gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-craft-wood text-white rounded-full text-xs w-5 h-5 flex-center-both">
                    {cartItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="materialien">
            <TabsList className="mb-6-util">
              <TabsTrigger value="materialien">Materialien</TabsTrigger>
              <TabsTrigger value="werkzeug-sets">Werkzeug-Sets</TabsTrigger>
              <TabsTrigger value="tutorial-pakete">Tutorial-Pakete</TabsTrigger>
              <TabsTrigger value="angebote">Angebote</TabsTrigger>
            </TabsList>
            
            <TabsContent value="materialien">
              <div className="grid-cols-1-4-gap-6">
                {materials.map((material) => (
                  <Card key={material.id} className="card-overflow-hidden">
                    <div className="h-48 card-overflow-hidden">
                      <img 
                        src={material.image} 
                        alt={material.name}
                        className="img-object-cover img-hover-scale"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex-between-center items-start">
                        <Badge variant="outline" className="badge-blue">
                          {material.category}
                        </Badge>
                        <Badge variant="outline" className="badge-amber">
                          {material.store}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2-util">{material.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {material.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex-between-center text-header-lg mb-4-util">
                        <span>€{material.price.toFixed(2)}</span>
                        <Button size="sm" onClick={addToCart}>In den Warenkorb</Button>
                      </div>
                      <div className="flex-align-center-gap-2 text-sm text-muted">
                        <Star className="h-4 w-4 icon-amber-500" />
                        <span>{material.rating} ({material.reviews} Bewertungen)</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="werkzeug-sets">
              <div className="grid-cols-1-4-gap-6">
                {toolKits.map((kit) => (
                  <Card key={kit.id} className="card-overflow-hidden">
                    <div className="h-48 card-overflow-hidden">
                      <img 
                        src={kit.image} 
                        alt={kit.name}
                        className="img-object-cover img-hover-scale"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex-between-center items-start">
                        <Badge variant="outline" className="badge-green">
                          Werkzeug-Set
                        </Badge>
                        <Badge variant="outline" className="badge-amber">
                          {kit.store}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2-util">{kit.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {kit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex-between-center text-header-lg mb-4-util">
                        <span>€{kit.price.toFixed(2)}</span>
                        <Button size="sm" onClick={addToCart}>In den Warenkorb</Button>
                      </div>
                      <div className="text-sm text-muted mb-2-util">Enthält:</div>
                      <ul className="text-sm list-disc pl-5">
                        {kit.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tutorial-pakete">
              <div className="grid-cols-1-4-gap-6">
                {tutorialPackages.map((pkg) => (
                  <Card key={pkg.id} className="card-overflow-hidden">
                    <div className="h-48 card-overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name}
                        className="img-object-cover img-hover-scale"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex-between-center">
                        <Badge variant="outline" className="badge-green">
                          Tutorial-Paket
                        </Badge>
                        <Badge variant="outline" className="badge-amber">
                          {pkg.store}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-2-util">{pkg.name}</CardTitle>
                      <CardDescription className="text-sm mt-1-util">
                        Für Tutorial: <span className="font-medium">{pkg.tutorial}</span>
                      </CardDescription>
                      <CardDescription className="line-clamp-2 mt-1-util">
                        {pkg.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex-between-center text-header-lg mb-4-util">
                        <span>€{pkg.price.toFixed(2)}</span>
                        <Button size="sm" onClick={addToCart}>In den Warenkorb</Button>
                      </div>
                      <div className="text-sm text-muted mb-2-util">Enthaltene Materialien:</div>
                      <ul className="text-sm list-disc pl-5">
                        {pkg.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="angebote">
              <div className="grid-cols-1-4-gap-6">
                {materials.filter(m => m.price < 20).map((material) => (
                  <Card key={material.id} className="card-overflow-hidden">
                    <div className="h-48 card-overflow-hidden">
                      <img 
                        src={material.image} 
                        alt={material.name}
                        className="img-object-cover img-hover-scale"
                      />
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <div className="flex-between-center items-start">
                        <Badge variant="outline" className="badge-blue">
                          {material.category}
                        </Badge>
                        <Badge variant="outline" className="badge-amber">
                          {material.store}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2-util">{material.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {material.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex-between-center text-header-lg mb-4-util">
                        <span>€{material.price.toFixed(2)}</span>
                        <Button size="sm" onClick={addToCart}>In den Warenkorb</Button>
                      </div>
                      <div className="flex-align-center-gap-2 text-sm text-muted">
                        <Star className="h-4 w-4 icon-amber-500" />
                        <span>{material.rating} ({material.reviews} Bewertungen)</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
