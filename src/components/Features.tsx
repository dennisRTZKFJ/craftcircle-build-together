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
      <div className="container container-padding">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="header-xxl">Design Your Own Space</h2>
          <p className="large-muted-text">
            At CraftCircle, you'll find everything you need to realize your DIY furniture projects - no matter what level you're at.
          </p>
        </div>
        
        <div className="grid-cols-1-md-2-gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-hover-effect"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="header-md-card-title">{feature.title}</h3>
              <p className="muted-text mb-6">{feature.description}</p>
              
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
