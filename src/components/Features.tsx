
import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    icon: "🔨",
    title: "Baue deine Möbel selbst",
    description: "Klar strukturierte Schritt-für-Schritt-Guides, Materialempfehlungen und Einkaufsmöglichkeiten direkt beim Anbieter - Selbstbauen wird einfach, ganz ohne Vorkenntnisse.",
    benefits: ["Detaillierte Anleitungen", "Materiallisten", "Werkzeugempfehlungen"]
  },
  {
    icon: "🌱",
    title: "Nachhaltig & Individuell",
    description: "Spare Geld. Sei nachhaltig. Erschaffe mit Herz. CraftCircle steht für kreative Freiheit und verantwortungsvolles Handeln.",
    benefits: ["Langlebige Möbel", "Nachhaltiges Design", "Einzigartige Stücke"]
  },
  {
    icon: "🤝",
    title: "Gemeinschaft erleben",
    description: "Tausche dich mit Gleichgesinnten aus, teile deine Projekte, erhalte Feedback und wachse über dich hinaus. Jeder Beitrag macht unsere Community stärker.",
    benefits: ["Hilfreiche Community", "Projektteilungen", "DIY-Events"]
  },
  {
    icon: "🧠",
    title: "Dein Bau-Assistent. Powered by KI.",
    description: "Unsere AI hilft dir, passende Projekte für dein Level zu finden und gibt dir Antworten, wenn du mal nicht weiterkommst.",
    benefits: ["Personalisierte Empfehlungen", "Sofortige Hilfe", "Skill-Level Anpassung"]
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gestalte deinen eigenen Raum</h2>
          <p className="text-muted-foreground text-lg">
            Bei CraftCircle findest du alles, was du brauchst, um deine DIY-Möbelprojekte zu verwirklichen - egal auf welchem Level du bist.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1 duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-craft-teal" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
