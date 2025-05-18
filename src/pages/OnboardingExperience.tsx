
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const OnboardingExperience = () => {
  const navigate = useNavigate();
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  
  const handleNext = () => {
    navigate('/first-projects', { state: { experienceLevel } });
  };

  const handlePrev = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to CraftCircle!</h1>
          <p className="text-muted-foreground">Let's personalize your experience</p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-2 w-16 rounded-full bg-craft-wood/30"></div>
            <div className="h-2 w-16 rounded-full bg-craft-wood"></div>
            <div className="h-2 w-16 rounded-full bg-craft-wood/30"></div>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold">How much experience do you have?</h2>
          <p className="text-muted-foreground">We'll adapt project suggestions and tutorials to your level</p>
          
          <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel} className="space-y-4">
            <div className={`flex items-start space-x-4 border rounded-lg p-4 transition-all ${experienceLevel === 'beginner' ? 'border-craft-wood bg-craft-wood/10' : 'border-border'}`}>
              <RadioGroupItem value="beginner" id="beginner" />
              <div className="flex flex-col">
                <Label htmlFor="beginner" className="text-base font-medium">Beginner</Label>
                <p className="text-sm text-muted-foreground">I'm new to DIY and have little or no experience with tools.</p>
              </div>
            </div>
            
            <div className={`flex items-start space-x-4 border rounded-lg p-4 transition-all ${experienceLevel === 'intermediate' ? 'border-craft-wood bg-craft-wood/10' : 'border-border'}`}>
              <RadioGroupItem value="intermediate" id="intermediate" />
              <div className="flex flex-col">
                <Label htmlFor="intermediate" className="text-base font-medium">Intermediate</Label>
                <p className="text-sm text-muted-foreground">I've completed a few projects and am familiar with basic tools.</p>
              </div>
            </div>
            
            <div className={`flex items-start space-x-4 border rounded-lg p-4 transition-all ${experienceLevel === 'advanced' ? 'border-craft-wood bg-craft-wood/10' : 'border-border'}`}>
              <RadioGroupItem value="advanced" id="advanced" />
              <div className="flex flex-col">
                <Label htmlFor="advanced" className="text-base font-medium">Advanced</Label>
                <p className="text-sm text-muted-foreground">I'm an experienced DIY enthusiast and can tackle complex projects.</p>
              </div>
            </div>
          </RadioGroup>

          <div className="pt-4 flex justify-between">
            <Button variant="outline" onClick={handlePrev}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OnboardingExperience;
