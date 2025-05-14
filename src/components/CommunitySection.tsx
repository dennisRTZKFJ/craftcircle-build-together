
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Dank CraftCircle habe ich mein erstes Möbelstück gebaut! Die Schritt-für-Schritt-Anleitung war so klar, dass es selbst für mich als Anfängerin super einfach war.",
    author: "Lisa Meyer",
    role: "DIY-Einsteigerin",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "Als Tischler schätze ich die Qualität der Anleitungen auf CraftCircle. Die Community gibt mir immer wieder neue Ideen und Feedback zu meinen eigenen Projekten.",
    author: "Martin Schmidt",
    role: "Hobby-Tischler",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "Die KI-Hilfe von CraftCircle hat mir enorm geholfen, als ich bei meinem Schreibtisch-Projekt nicht weiterkam. In Sekundenschnelle hatte ich die perfekte Lösung!",
    author: "Sophia Wagner",
    role: "Innenarchitektur-Studentin",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=faces"
  },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-24 bg-craft-wood/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Für dich gemacht – von Menschen wie dir.</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Finde personalisierte Empfehlungen, entdecke neue Lieblingsideen und lasse dich von echten DIY-Profis inspirieren. Oder werde selbst Creator:in und verdiene mit deinen Projekten Geld.
            </p>
            <div className="space-y-6 mt-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm italic mb-2">{testimonial.quote}</p>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button>
                Community beitreten
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-craft-wood/10 rounded-2xl -rotate-2"></div>
            <div className="absolute inset-0 -z-10 bg-craft-light-green/10 rounded-2xl rotate-2"></div>
            <div className="bg-background rounded-xl overflow-hidden shadow-lg p-6">
              <div className="pb-5 border-b border-border mb-5">
                <h3 className="font-bold text-xl">Community Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">10k+</p>
                  <p className="text-sm text-muted-foreground">Aktive Mitglieder</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">5k+</p>
                  <p className="text-sm text-muted-foreground">DIY-Projekte</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">98%</p>
                  <p className="text-sm text-muted-foreground">Positive Bewertungen</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">24/7</p>
                  <p className="text-sm text-muted-foreground">Community-Support</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-craft-light-green/10 rounded-lg">
                <p className="text-sm text-center">
                  "Zusammen haben unsere Mitglieder über 5.000 einzelne Möbelstücke gebaut und dabei mehr als 250.000 kg CO₂ eingespart!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
