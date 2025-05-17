
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, ArrowRight, Star, ArrowLeft } from 'lucide-react';

const FirstProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Get experienceLevel from location state or default to 'beginner'
  const experienceLevel = location.state?.experienceLevel || 'beginner';

  // Mock data for project suggestions based on experience level
  const suggestedProjects = {
    beginner: [
      { id: 'b1', name: 'Simple Wall Shelf', image: 'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0' },
      { id: 'b2', name: 'Key Holder', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92' },
      { id: 'b3', name: 'Plant Stand', image: 'https://images.unsplash.com/photo-1617104678098-de229db51175' },
      { id: 'b4', name: 'Pencil Holder', image: 'https://images.unsplash.com/photo-1507955987999-16c7252dfede' },
    ],
    intermediate: [
      { id: 'i1', name: 'Coffee Table', image: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975' },
      { id: 'i2', name: 'Coat Rack', image: 'https://images.unsplash.com/photo-1609799529593-38cd08a93427' },
      { id: 'i3', name: 'Hanging Shelf', image: 'https://images.unsplash.com/photo-1600607686527-daf21308b35b' },
      { id: 'i4', name: 'Desk', image: 'https://images.unsplash.com/photo-1593476550610-87baa860004a' },
    ],
    advanced: [
      { id: 'a1', name: 'Bed with Storage', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
      { id: 'a2', name: 'Wardrobe', image: 'https://images.unsplash.com/photo-1606152536277-5aa1fd33e150' },
      { id: 'a3', name: 'Bench', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03' },
      { id: 'a4', name: 'Changing Table', image: 'https://images.unsplash.com/photo-1580229769680-56e5612c380e' },
    ]
  };

  const toggleProject = (id: string) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter(item => item !== id));
    } else {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Projects selected!",
        description: "Your DIY journey begins now.",
      });

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">First Projects For You</h1>
          <p className="text-muted-foreground">Choose projects that interest you. You can add more later.</p>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
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
                        <Check className="h-4 w-4 mr-1" /> Selected
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
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleComplete} disabled={loading}>
              {loading ? "Setting up..." : "Finish"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FirstProjects;
