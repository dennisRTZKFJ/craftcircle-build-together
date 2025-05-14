
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-24 lg:pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-craft-light-green/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-craft-light-wood/30 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Wo deine Ideen <span className="text-craft-dark-wood">Gestalt</span> annehmen
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
              CraftCircle ist deine kreative Werkstatt im Netz. Finde hochwertige, leicht verständliche 
              Anleitungen zum Möbelbau, die dich inspirieren, anleiten und befähigen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-base font-medium">
                Jetzt entdecken
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base font-medium">
                Wie es funktioniert
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <span className="font-medium text-xs">{i}K+</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Über <span className="font-bold text-foreground">10.000</span> DIY-Enthusiasten bereits dabei
              </p>
            </div>
          </div>

          <div className="relative lg:h-[600px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-craft-wood/20 to-craft-light-green/20 rounded-lg"></div>
            <div className="relative h-full grid grid-cols-2 grid-rows-2 gap-4 p-4">
              <div className="bg-craft-wood/20 rounded-lg overflow-hidden hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" 
                  alt="Woodworking project" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-craft-light-green/20 rounded-lg overflow-hidden row-span-2 hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1540103711724-ebf833bde8d1" 
                  alt="Finished furniture piece" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-craft-teal/20 rounded-lg overflow-hidden hover-lift">
                <img 
                  src="https://images.unsplash.com/photo-1581612222497-018b5accd0c4" 
                  alt="DIY tools" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
