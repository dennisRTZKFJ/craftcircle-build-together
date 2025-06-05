import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  image: string;
  tips?: string;
}

interface TutorialStepsProps {
  steps: Step[];
}

const TutorialSteps = ({ steps }: TutorialStepsProps) => {
  return (
    <div className="space-y-12">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-craft-wood text-white w-10 h-10 rounded-full-center font-bold flex-shrink-0">
              {index + 1}
            </div>
            <h3 className="header-md">{step.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-lg overflow-hidden">
              <AspectRatio ratio={4 / 3}>
                <img 
                  src={step.image} 
                  alt={`Step ${index + 1}: ${step.title}`} 
                  className="img-cover"
                />
              </AspectRatio>
            </div>
            
            <div className="space-y-4">
              <p className="leading-relaxed">{step.description}</p>
              
              {step.tips && (
                <Alert className="bg-craft-wood/10 border-craft-wood">
                  <Info className="h-4 w-4 text-craft-wood" />
                  <AlertDescription className="text-sm pl-2">
                    <strong>Tip:</strong> {step.tips}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="absolute left-5 top-16 bottom-0 w-0.5 bg-muted-foreground/20"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TutorialSteps;
