
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Upload, ArrowLeft, Save } from 'lucide-react';

const EditTutorialPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  // For this example, we're hardcoding the "Rustic Coffee Table" tutorial data
  // In a real app, you would fetch this based on the id parameter
  const [tutorial, setTutorial] = useState({
    id: 4,
    title: 'Rustic Dining Table with Epoxy Resin',
    category: 'furniture',
    difficulty: 'intermediate',
    description: 'Create a stunning dining table with a live edge and epoxy resin river running through the middle.',
    materials: '- 2 slabs of hardwood (walnut, oak, or maple)\n- Epoxy resin (2 gallons)\n- Resin colorant\n- Hairpin table legs (4)\n- Sandpaper (60-220 grit)\n- Wood finish oil or polyurethane',
    tools: '- Table saw or track saw\n- Orbital sander\n- Router with flatten bit\n- Clamps\n- Mixing buckets\n- Heat gun\n- Level\n- Measuring tape',
    steps: [
      { title: 'Prepare the Wood', content: 'Clean and dry your wood slabs. Remove bark and sand rough edges.' },
      { title: 'Create the Form', content: 'Build a mold for the resin pour using melamine boards.' },
      { title: 'Mix and Pour Resin', content: 'Mix resin according to manufacturer instructions and pour in layers.' },
      { title: 'Sand and Finish', content: 'After curing, sand the surface smooth and apply your chosen finish.' },
      { title: 'Attach Legs', content: 'Flip the table and attach your hairpin legs to complete the project.' }
    ],
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1604074131665-7a4b13870ab2'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Tutorial Updated",
      description: "Your changes have been saved successfully."
    });
    navigate('/creator-dashboard');
  };

  const updateTutorial = (field: string, value: string) => {
    setTutorial(prev => ({ ...prev, [field]: value }));
  };

  const updateStep = (index: number, field: string, value: string) => {
    const updatedSteps = [...tutorial.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setTutorial(prev => ({ ...prev, steps: updatedSteps }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Link to="/creator-dashboard">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Edit Tutorial</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Preview</Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Edit: {tutorial.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic">
                <TabsList className="mb-6">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="materials">Materials & Tools</TabsTrigger>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                </TabsList>
                
                {/* Basic Information Tab */}
                <TabsContent value="basic">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Tutorial Title</Label>
                      <Input 
                        id="title" 
                        value={tutorial.title}
                        onChange={(e) => updateTutorial('title', e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={tutorial.category}
                          onValueChange={(value) => updateTutorial('category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="woodworking">Woodworking</SelectItem>
                            <SelectItem value="home-decor">Home Decor</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="outdoor">Outdoor Projects</SelectItem>
                            <SelectItem value="restoration">Restoration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select 
                          value={tutorial.difficulty}
                          onValueChange={(value) => updateTutorial('difficulty', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        value={tutorial.description}
                        onChange={(e) => updateTutorial('description', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </form>
                </TabsContent>
                
                {/* Materials & Tools Tab */}
                <TabsContent value="materials">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="materials">Materials Needed</Label>
                      <Textarea 
                        id="materials" 
                        value={tutorial.materials}
                        onChange={(e) => updateTutorial('materials', e.target.value)}
                        rows={6}
                      />
                      <p className="text-sm text-muted-foreground">List one material per line with quantity and specifications</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tools">Tools Required</Label>
                      <Textarea 
                        id="tools" 
                        value={tutorial.tools}
                        onChange={(e) => updateTutorial('tools', e.target.value)}
                        rows={6}
                      />
                      <p className="text-sm text-muted-foreground">List all tools needed for this project</p>
                    </div>
                  </form>
                </TabsContent>
                
                {/* Instructions Tab */}
                <TabsContent value="instructions">
                  <div className="space-y-6">
                    <h3 className="font-medium text-lg">Tutorial Steps</h3>
                    
                    {tutorial.steps.map((step, index) => (
                      <div key={index} className="border rounded-md p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Step {index + 1}</h4>
                          <Button variant="ghost" size="sm" type="button">Remove</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`step-title-${index}`}>Step Title</Label>
                          <Input 
                            id={`step-title-${index}`} 
                            value={step.title}
                            onChange={(e) => updateStep(index, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`step-content-${index}`}>Instructions</Label>
                          <Textarea 
                            id={`step-content-${index}`} 
                            value={step.content}
                            onChange={(e) => updateStep(index, 'content', e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Step Image</Label>
                          <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                            <div className="mt-2">
                              <Button variant="secondary" size="sm" type="button">Upload Image</Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">PNG, JPG or WEBP, max. 4MB</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-center">
                      <Button variant="outline" type="button">
                        Add New Step
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Media Tab */}
                <TabsContent value="media">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Tutorial Thumbnail</Label>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="border rounded-md overflow-hidden w-full md:w-1/3">
                          <img
                            src={tutorial.image}
                            alt="Current thumbnail"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25 w-full md:w-2/3">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <div className="mt-2">
                            <Button variant="secondary" size="sm" type="button">Replace Image</Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">PNG, JPG or WEBP, max. 4MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Additional Images</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="mt-2">
                          <Button variant="secondary" size="sm" type="button">Upload Images</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Add images to illustrate your tutorial</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Video Tutorial (Optional)</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center border-muted-foreground/25">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="mt-2">
                          <Button variant="secondary" size="sm" type="button">Add Video Link</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Add a YouTube or Vimeo link</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="pt-6 flex justify-between mt-4 border-t">
                <Button variant="outline" onClick={() => navigate('/creator-dashboard')}>
                  Cancel
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary" type="button">Save as Draft</Button>
                  <Button onClick={handleSubmit}>Save & Publish</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditTutorialPage;
