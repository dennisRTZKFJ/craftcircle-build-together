
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface Material {
  name: string;
  amount: string;
  description: string;
  link: string;
}

interface MaterialListProps {
  materials: Material[];
  tools: string[];
  price: string;
}

const MaterialList = ({ materials, tools, price }: MaterialListProps) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Materialliste</h2>
          <Badge variant="outline" className="bg-craft-wood/10 border-craft-wood">
            Geschätzte Kosten: {price}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((material, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{material.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{material.amount}</p>
                    <p className="text-sm">{material.description}</p>
                  </div>
                  {material.link !== "#" && (
                    <Button size="sm" variant="outline" className="flex-shrink-0" asChild>
                      <a href={material.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" /> Link
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Alle Materialien kaufen
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="text-xl font-bold mb-4">Benötigte Werkzeuge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <Badge key={index} variant="secondary" className="py-2 px-3 justify-start">
              {tool}
            </Badge>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-center">
          <strong>Hinweis:</strong> Die genauen Kosten können je nach Region und Einkaufsquelle variieren. 
          Die angegebenen Links sind Beispiele und keine Kaufempfehlungen.
        </p>
      </div>
    </div>
  );
};

export default MaterialList;
