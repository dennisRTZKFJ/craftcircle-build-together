
import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    icon: "🔨",
    title: "Build Your Own Furniture",
    description: "Clearly structured step-by-step guides, material recommendations, and shopping options directly from suppliers - DIY becomes easy, no prior knowledge required.",
    benefits: ["Detailed Instructions", "Materials Lists", "Tool Recommendations"]
  },
  {
    icon: "🌱",
    title: "Sustainable & Individual",
    description: "Save money. Be sustainable. Create with heart. CraftCircle stands for creative freedom and responsible action.",
    benefits: ["Long-lasting Furniture", "Sustainable Design", "Unique Pieces"]
  },
  {
    icon: "🤝",
    title: "Experience Community",
    description: "Exchange ideas with like-minded people, share your projects, receive feedback, and grow beyond yourself. Every contribution makes our community stronger.",
    benefits: ["Helpful Community", "Project Sharing", "DIY Events"]
  },
  {
    icon: "🧠",
    title: "Your Building Assistant. Powered by AI.",
    description: "Our AI helps you find suitable projects for your level and gives you answers when you get stuck.",
    benefits: ["Personalized Recommendations", "Instant Help", "Skill Level Adaptation"]
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Design Your Own Space</h2>
          <p className="text-muted-foreground text-lg">
            At CraftCircle, you'll find everything you need to realize your DIY furniture projects - no matter what level you're at.
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
