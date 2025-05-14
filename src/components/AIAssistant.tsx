
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const AIAssistant = () => {
  const [query, setQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setQuery('');
      }, 2000);
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Dein Bau-Assistent. Powered by KI.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unsere KI hilft dir bei all deinen DIY-Fragen, findet die perfekten Projekte für dein Können und unterstützt dich in jeder Phase deines Möbelbau-Abenteuers.
            </p>
            
            <div className="bg-background rounded-xl shadow-sm border border-border p-6 mb-8">
              <h3 className="font-bold mb-4">Was kann der KI-Assistent?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-craft-wood/20 rounded p-1 mt-1">
                    <svg className="w-5 h-5 text-craft-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Personalisierte Projektempfehlungen basierend auf deinem Können</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-craft-wood/20 rounded p-1 mt-1">
                    <svg className="w-5 h-5 text-craft-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Beantwortung technischer Fragen zum Möbelbau in Echtzeit</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-craft-wood/20 rounded p-1 mt-1">
                    <svg className="w-5 h-5 text-craft-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Anpassung bestehender Projekte an deine Bedürfnisse</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-craft-wood/20 rounded p-1 mt-1">
                    <svg className="w-5 h-5 text-craft-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>Problemlösungen bei Herausforderungen während des Baus</span>
                </li>
              </ul>
            </div>
            
            <form onSubmit={handleSubmit} className="relative">
              <Input 
                placeholder="Stelle eine Frage zu deinem Projekt..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-24"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-1 top-1 bottom-1"
              >
                Fragen
              </Button>
            </form>
          </div>
          
          <div className="relative h-[500px] bg-background rounded-xl shadow-lg overflow-hidden border border-border">
            <div className="absolute inset-0 bg-gradient-to-b from-craft-teal/5 to-craft-light-wood/10"></div>
            <div className="relative h-full p-6 flex flex-col">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-craft-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    KI
                  </div>
                  <span className="font-medium">CraftAssistant</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                <div className="flex gap-3">
                  <div className="bg-craft-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    KI
                  </div>
                  <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm max-w-[80%]">
                    Hallo! Ich bin dein CraftAssistant. Wie kann ich dir heute beim Möbelbau helfen?
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-craft-wood text-white rounded-lg rounded-tr-none p-3 text-sm max-w-[80%]">
                    Ich möchte ein Regal bauen, bin aber Anfänger. Wo soll ich beginnen?
                  </div>
                  <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    D
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-craft-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    KI
                  </div>
                  <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm max-w-[80%]">
                    Das ist ein perfektes Einstiegsprojekt! Für Anfänger empfehle ich unser "Einfaches Wandregal"-Projekt. Du brauchst nur einige Holzbretter, Schrauben und grundlegende Werkzeuge wie einen Bohrer und einen Schraubenzieher.
                    
                    <div className="mt-2">
                      Soll ich dir eine detaillierte Materialliste und Anleitung für ein Anfängerregal schicken?
                    </div>
                  </div>
                </div>
                
                <div className={cn(
                  "flex gap-3 justify-end transition-opacity duration-300",
                  isAnimating ? "opacity-100" : "opacity-0"
                )}>
                  <div className="bg-craft-wood text-white rounded-lg rounded-tr-none p-3 text-sm max-w-[80%]">
                    {query}
                  </div>
                  <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    D
                  </div>
                </div>
                
                {isAnimating && (
                  <div className="flex gap-3">
                    <div className="bg-craft-teal text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      KI
                    </div>
                    <div className="bg-muted rounded-lg rounded-tl-none p-3 text-sm max-w-[80%] flex items-center">
                      <span className="flex gap-1">
                        <span className="animate-bounce">·</span>
                        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
