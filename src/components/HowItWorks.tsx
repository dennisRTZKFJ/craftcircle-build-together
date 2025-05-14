
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Projekt auswählen",
    description: "Stöbere durch unsere kuratierte Sammlung von DIY-Möbelprojekten. Filter nach Schwierigkeitsgrad, benötigten Werkzeugen oder Möbeltyp."
  },
  {
    number: "02",
    title: "Materialien besorgen",
    description: "Jede Anleitung enthält eine detaillierte Materialliste. Du kannst die benötigten Materialien direkt bei unseren Partnern kaufen oder lokale Alternativen finden."
  },
  {
    number: "03",
    title: "Schritt für Schritt bauen",
    description: "Folge unseren detaillierten Anleitungen mit Bildern und Videos. Bei Fragen hilft dir unsere KI oder die Community weiter."
  },
  {
    number: "04",
    title: "Teilen & Inspirieren",
    description: "Zeige dein fertiges Projekt der Community, erhalte Feedback und inspiriere andere. Für besonders hilfreiche Beiträge erhältst du Belohnungen."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">So funktioniert's</h2>
          <p className="text-muted-foreground text-lg">
            Von der Idee zum fertigen Möbelstück in nur wenigen Schritten - mit CraftCircle wird DIY zum Kinderspiel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all group animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -top-3 -left-3 bg-craft-wood text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-craft-wood/30 hidden lg:block"></div>
              )}
              <h3 className="text-xl font-bold mt-4 mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="font-medium mb-6">
            Bereit, dein erstes Möbelstück zu bauen?
          </p>
          <Button size="lg">
            Jetzt starten
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
