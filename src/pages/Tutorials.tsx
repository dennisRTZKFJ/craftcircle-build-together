import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Filter, 
  Clock, 
  DollarSign, 
  Search,
  SlidersHorizontal,
  X,
  Star,
  Info
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Temporary mock data for tutorials
const tutorials = [
  {
    id: "rustikaler-couchtisch",
    title: "Rustic Coffee Table",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Intermediate",
    duration: "6 hours",
    price: "$80-$120",
    likes: 342,
    author: "Thomas Weber",
    description: "A sturdy coffee table made from reclaimed wood with metal legs."
  },
  {
    id: "mini-gewuerzregal",
    title: "Mini Spice Rack",
    image: "https://images.unsplash.com/photo-1509402308937-0240d9a4438e",
    category: "Beginner",
    duration: "2 hours",
    price: "$15-$25",
    likes: 124,
    author: "Lisa Müller",
    description: "A space-saving, wall-mounted spice rack for small kitchens."
  },
  {
    id: "minimalistisches-regal",
    title: "Minimalist Shelf",
    image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f",
    category: "Beginner",
    duration: "3 hours",
    price: "$30-$50",
    likes: 214,
    author: "Maria Schmidt",
    description: "A simple, floating shelf for books, plants, or decorative items."
  },
  {
    id: "modernes-sideboard",
    title: "Modern Sideboard",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    category: "Advanced",
    duration: "8 hours",
    price: "$150-$200",
    likes: 178,
    author: "Julia Hoffmann",
    description: "An elegant sideboard with sliding doors and hidden storage."
  },
  {
    id: "nachttisch-mit-schublade",
    title: "Nightstand with Drawer",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    category: "Beginner",
    duration: "4 hours",
    price: "$40-$60",
    likes: 156,
    author: "Markus Bauer",
    description: "A practical nightstand with a drawer and an open shelf."
  },
  {
    id: "garderobe-palettenholz",
    title: "Coat Rack from Pallet Wood",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    category: "Beginner",
    duration: "2 hours",
    price: "$20-$30",
    likes: 124,
    author: "Katrin Schmidt",
    description: "A simple wall-mounted coat rack made from recycled pallet wood."
  },
  {
    id: "buecherregal-mit-leiter",
    title: "Bookshelf with Ladder",
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4",
    category: "Advanced",
    duration: "10 hours",
    price: "$200-$300",
    likes: 289,
    author: "Stefan Müller",
    description: "A wall-height bookshelf with a sliding ladder for upper shelves."
  },
];

const categoryColors = {
  "Beginner": "bg-green-100 text-green-800 border-green-200",
  "Intermediate": "bg-amber-100 text-amber-800 border-amber-200",
  "Advanced": "bg-red-100 text-red-800 border-red-200"
};

const Tutorials = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<string[]>(["Beginner", "Intermediate", "Advanced"]);
  const [maxDuration, setMaxDuration] = useState(10); // in hours
  const [maxPrice, setMaxPrice] = useState(300); // in dollars
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter tutorials based on all criteria
  const filteredTutorials = tutorials.filter(tutorial => {
    const durationHours = parseInt(tutorial.duration.split(' ')[0]);
    const averagePrice = (parseInt(tutorial.price.split('$')[1].split('-')[0]) + 
                         parseInt(tutorial.price.split('-')[1].replace('$', ''))) / 2;
    
    const matchesSearch = searchQuery === "" || 
                        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tutorial.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return difficulty.includes(tutorial.category) && 
           durationHours <= maxDuration &&
           averagePrice <= maxPrice &&
           matchesSearch;
  });

  // Handle tutorial click
  const handleTutorialClick = (tutorialId: string) => {
    navigate(`/tutorials/${tutorialId}`);
  };

  // Toggle mobile filter visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    // Add body class to prevent scrolling when filter is open on mobile
    if (isFilterOpen) {
      document.body.classList.add('overflow-hidden', 'md:overflow-auto');
    } else {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    }

    return () => {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    };
  }, [isFilterOpen]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12">
        <div className="container px-4 md:px-6">
          <div className="flex-col-gap-8">
            <div>
              <h1 className="header-xl">DIY Furniture Tutorials</h1>
              <p className="muted-text section-space">
                Discover step-by-step guides for your next DIY furniture projects, 
                from simple beginner projects to sophisticated design pieces.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tutorials..."
                className="pl-10 pr-10"
              />
              <Button
                variant="ghost"
                onClick={() => setSearchQuery("")}
                className="icon-pos-top-right-hover"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Tabs defaultValue="alle" className="w-full">
              <div className="flex-col-md-row-between-start-md-center-gap4-mb6">
                <TabsList>
                  <TabsTrigger value="alle">All Tutorials</TabsTrigger>
                  <TabsTrigger value="beliebt">Popular</TabsTrigger>
                  <TabsTrigger value="neu">Newest</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleFilter}
                    className="md:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {isFilterOpen ? 'Close' : 'Open'} Filter
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
                <div className={`
                  fixed inset-0 bg-background z-40 md:hidden transform transition-transform duration-300
                  ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}
                `}>
                  <div className="h-full overflow-y-auto p-6">
                    <div className="flex-between section-space">
                      <h3 className="header-md">Filter</h3>
                      <Button variant="ghost" size="sm" onClick={toggleFilter}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Difficulty Level</h3>
                        <div className="flex flex-wrap gap-2">
                          {["Beginner", "Intermediate", "Advanced"].map((level) => (
                            <Badge 
                              key={level}
                              variant="outline" 
                              className={`cursor-pointer ${categoryColors[level as keyof typeof categoryColors]} ${difficulty.includes(level) ? 'ring-1 ring-black' : 'opacity-60'}`}
                              onClick={() => {
                                if (difficulty.includes(level)) {
                                  setDifficulty(difficulty.filter(d => d !== level));
                                } else {
                                  setDifficulty([...difficulty, level]);
                                }
                              }}
                            >
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex-between mb-2">
                          <h3 className="font-medium">Duration</h3>
                          <span className="text-sm muted-text">
                            <Clock className="h-3 w-3 inline mr-1" /> {maxDuration} hours
                          </span>
                        </div>
                        <Slider
                          value={[maxDuration]}
                          onValueChange={(val) => setMaxDuration(val[0])}
                          max={20}
                          step={1}
                          className="w-[60%]"
                        />
                      </div>
                      <div>
                        <div className="flex-between mb-2">
                          <h3 className="font-medium">Material Cost</h3>
                          <span className="text-sm muted-text">
                            <DollarSign className="h-3 w-3 inline mr-1" /> ${maxPrice}
                          </span>
                        </div>
                        <Slider
                          value={[maxPrice]}
                          onValueChange={(val) => setMaxPrice(val[0])}
                          max={500}
                          step={10}
                          className="w-[60%]"
                        />
                      </div>
                      <Button className="w-full mt-4" onClick={toggleFilter}>Apply Filters</Button>
                    </div>
                  </div>
                </div>
                <Card className="col-span-1 md:col-span-3 lg:col-span-1 h-fit hidden md:block">
                  <CardHeader>
                    <div className="flex-between">
                      <h3 className="header-md">Filter</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={toggleFilter}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Difficulty Level</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                          <Badge 
                            key={level}
                            variant="outline" 
                            className={`cursor-pointer ${categoryColors[level as keyof typeof categoryColors]} ${difficulty.includes(level) ? 'ring-1 ring-black' : 'opacity-60'}`}
                            onClick={() => {
                              if (difficulty.includes(level)) {
                                setDifficulty(difficulty.filter(d => d !== level));
                              } else {
                                setDifficulty([...difficulty, level]);
                              }
                            }}
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex-between mb-2">
                        <h3 className="font-medium">Duration</h3>
                        <span className="text-sm muted-text">
                          <Clock className="h-3 w-3 inline mr-1" /> {maxDuration} hours
                        </span>
                      </div>
                      <Slider
                        value={[maxDuration]}
                        onValueChange={(val) => setMaxDuration(val[0])}
                        max={20}
                        step={1}
                        className="w-[60%]"
                      />
                    </div>
                    <div>
                      <div className="flex-between mb-2">
                        <h3 className="font-medium">Material Cost</h3>
                        <span className="text-sm muted-text">
                          <DollarSign className="h-3 w-3 inline mr-1" /> ${maxPrice}
                        </span>
                      </div>
                      <Slider
                        value={[maxPrice]}
                        onValueChange={(val) => setMaxPrice(val[0])}
                        max={500}
                        step={10}
                        className="w-[60%]"
                      />
                    </div>
                    <Button className="w-full" onClick={toggleFilter}>Apply Filters</Button>
                  </CardContent>
                </Card>
                {/* Tutorial List */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutorials.map((tutorial) => (
                    <Card 
                      key={tutorial.id} 
                      className="flex-col-h-full-shadow-hover"
                      onClick={() => handleTutorialClick(tutorial.id)}
                    >
                      <img 
                        src={tutorial.image} 
                        alt={tutorial.title} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-4 flex-grow">
                        <Badge variant="outline" className={categoryColors[tutorial.category as keyof typeof categoryColors]}>
                          {tutorial.category}
                        </Badge>
                        <div className="flex-center-text-sm-muted-mt2">
                          <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
                        </div>
                        <CardTitle className="text-lg mb-1">{tutorial.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                          {tutorial.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="text-sm muted-text">
                          By <span className="font-medium">{tutorial.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-sm">{tutorial.likes}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tutorials;
