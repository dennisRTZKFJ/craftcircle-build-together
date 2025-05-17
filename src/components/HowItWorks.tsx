
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Choose a Project",
    description: "Browse through our curated collection of DIY furniture projects. Filter by difficulty level, required tools, or furniture type."
  },
  {
    number: "02",
    title: "Gather Materials",
    description: "Each guide includes a detailed materials list. You can buy the required materials directly from our partners or find local alternatives."
  },
  {
    number: "03",
    title: "Build Step by Step",
    description: "Follow our detailed instructions with images and videos. If you have questions, our AI or the community will help you."
  },
  {
    number: "04",
    title: "Share & Inspire",
    description: "Show your finished project to the community, get feedback and inspire others. You'll earn rewards for particularly helpful contributions."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-craft-wood/5">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            From idea to finished furniture piece in just a few steps - with CraftCircle, DIY becomes child's play.
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
            Ready to build your first piece of furniture?
          </p>
          <Button size="lg">
            Start now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
