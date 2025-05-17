
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  
  const interests = [
    { id: 'furniture', name: 'Furniture Building', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'outdoor', name: 'Outdoor & Garden', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'decor', name: 'Decoration', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'storage', name: 'Storage & Organization', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'renovation', name: 'Renovation', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'upcycling', name: 'Upcycling', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { id: 'kids', name: 'Kids Furniture', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'small', name: 'Small Apartments', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Instead of showing the third step, navigate to the FirstProjects page
      navigate('/first-projects', { state: { experienceLevel } });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to CraftCircle!</h1>
          <p className="text-muted-foreground">Let's personalize your experience</p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`h-2 w-16 rounded-full ${currentStep === 1 ? 'bg-craft-wood' : 'bg-craft-wood/30'}`}></div>
            <div className={`h-2 w-16 rounded-full ${currentStep === 2 ? 'bg-craft-wood' : 'bg-craft-wood/30'}`}></div>
            <div className={`h-2 w-16 rounded-full bg-craft-wood/30`}></div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold">What are you interested in?</h2>
            <p className="text-muted-foreground">Choose your DIY interests so we can show you relevant content</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div
                  key={interest.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedInterests.includes(interest.id) 
                      ? 'border-craft-wood bg-craft-wood/10 shadow-sm' 
                      : 'border-border hover:border-craft-wood/50'
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className={interest.color}>{interest.name}</Badge>
                    </div>
                    {selectedInterests.includes(interest.id) && (
                      <Check className="h-5 w-5 text-craft-wood" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Skip</Button>
              <Button onClick={handleNext}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
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
              <Button variant="outline" onClick={handlePrev}>Back</Button>
              <Button onClick={handleNext}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Onboarding;
