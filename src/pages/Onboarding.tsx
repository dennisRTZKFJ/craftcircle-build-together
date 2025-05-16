
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
import { Check, ArrowRight, Star } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const interests = [
    { id: 'furniture', name: 'Möbelbau', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'outdoor', name: 'Outdoor & Garten', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'decor', name: 'Dekoration', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'storage', name: 'Stauraum & Organisation', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'renovation', name: 'Renovierung', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'upcycling', name: 'Upcycling', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { id: 'kids', name: 'Kindermöbel', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'small', name: 'Kleine Wohnungen', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' }
  ];
  
  const suggestedProjects = {
    beginner: [
      { id: 'b1', name: 'Einfaches Wandregal', image: 'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0' },
      { id: 'b2', name: 'Schlüsselboard', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92' },
      { id: 'b3', name: 'Pflanzentisch', image: 'https://images.unsplash.com/photo-1617104678098-de229db51175' },
      { id: 'b4', name: 'Stiftehalter', image: 'https://images.unsplash.com/photo-1507955987999-16c7252dfede' },
    ],
    intermediate: [
      { id: 'i1', name: 'Couchtisch', image: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975' },
      { id: 'i2', name: 'Garderobe', image: 'https://images.unsplash.com/photo-1609799529593-38cd08a93427' },
      { id: 'i3', name: 'Hängeregal', image: 'https://images.unsplash.com/photo-1600607686527-daf21308b35b' },
      { id: 'i4', name: 'Schreibtisch', image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a' },
    ],
    advanced: [
      { id: 'a1', name: 'Bett mit Stauraum', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
      { id: 'a2', name: 'Kleiderschrank', image: 'https://images.unsplash.com/photo-1606152536277-5aa1fd33e150' },
      { id: 'a3', name: 'Sitzbank', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03' },
      { id: 'a4', name: 'Wickelkommode', image: 'https://images.unsplash.com/photo-1580229769680-56e5612c380e' },
    ]
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const toggleProject = (id: string) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter(item => item !== id));
    } else {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Onboarding abgeschlossen!",
        description: "Deine DIY-Reise beginnt jetzt.",
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Willkommen bei CraftCircle!</h1>
          <p className="text-muted-foreground">Lass uns dein Erlebnis personalisieren</p>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`h-2 w-16 rounded-full ${currentStep === 1 ? 'bg-craft-wood' : 'bg-craft-wood/30'}`}></div>
            <div className={`h-2 w-16 rounded-full ${currentStep === 2 ? 'bg-craft-wood' : 'bg-craft-wood/30'}`}></div>
            <div className={`h-2 w-16 rounded-full ${currentStep === 3 ? 'bg-craft-wood' : 'bg-craft-wood/30'}`}></div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold">Was interessiert dich?</h2>
            <p className="text-muted-foreground">Wähle deine DIY-Interessen aus, damit wir dir passende Inhalte zeigen können</p>
            
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
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Überspringen</Button>
              <Button onClick={handleNext}>Weiter <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold">Wie viel Erfahrung hast du?</h2>
            <p className="text-muted-foreground">Wir passen die Projektvorschläge und Tutorials an dein Niveau an</p>
            
            <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel} className="space-y-4">
              <div className={`flex items-start space-x-4 border rounded-lg p-4 transition-all ${experienceLevel === 'beginner' ? 'border-craft-wood bg-craft-wood/10' : 'border-border'}`}>
                <RadioGroupItem value="beginner" id="beginner" />
                <div className="flex flex-col">
                  <Label htmlFor="beginner" className="text-base font-medium">Anfänger</Label>
                  <p className="text-sm text-muted-foreground">Ich bin neu beim Heimwerken und habe wenig oder keine Erfahrung mit Werkzeugen.</p>
                </div>
              </div>
              
              <div className={`flex items-start space-x-4 border rounded-lg p-4 transition-all ${experienceLevel === 'intermediate' ? 'border-craft-wood bg-craft-wood/10' : 'border-border'}`}>
                <RadioGroupItem value="intermediate" id="intermediate" />
                <div className="flex flex-col">
                  <Label htmlFor="intermediate" className="text-base font-medium">Fortgeschritten</Label>
                  <p className="text-sm text-muted-foreground">Ich habe bereits einige Projekte umgesetzt und kenne mich mit den grundlegenden Werkzeugen aus.</p>
                </div>
              </div>
              
              <div className={`flex items-start space-x-4 border rounded-lg p-4 transition-all ${experienceLevel === 'advanced' ? 'border-craft-wood bg-craft-wood/10' : 'border-border'}`}>
                <RadioGroupItem value="advanced" id="advanced" />
                <div className="flex flex-col">
                  <Label htmlFor="advanced" className="text-base font-medium">Profi</Label>
                  <p className="text-sm text-muted-foreground">Ich bin ein erfahrener DIY-Enthusiast und kann auch komplexe Projekte umsetzen.</p>
                </div>
              </div>
            </RadioGroup>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrev}>Zurück</Button>
              <Button onClick={handleNext}>Weiter <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold">Erste Projekte für dich</h2>
            <p className="text-muted-foreground">Wähle Projekte aus, die dich interessieren. Du kannst später weitere hinzufügen.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedProjects[experienceLevel as keyof typeof suggestedProjects].map((project) => (
                <div
                  key={project.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedProjects.includes(project.id) 
                      ? 'border-craft-wood shadow-sm' 
                      : 'border-border hover:border-craft-wood/50'
                  }`}
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="relative h-40">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                    />
                    {selectedProjects.includes(project.id) && (
                      <div className="absolute inset-0 bg-craft-wood/20 flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          <Check className="h-4 w-4 mr-1" /> Ausgewählt
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="font-medium">{project.name}</div>
                    <Star className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrev}>Zurück</Button>
              <Button onClick={completeOnboarding} disabled={loading}>
                {loading ? "Wird eingerichtet..." : "Fertig"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Onboarding;
