import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Clock,
  HeartIcon,
  MessageSquare,
  Star,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  List,
  Hammer,
  Info
} from 'lucide-react';
import TutorialSteps from '@/components/TutorialSteps';
import MaterialList from '@/components/MaterialList';
import CommentSection from '@/components/CommentSection';
import RelatedTutorials from '@/components/RelatedTutorials';

// Tutorial data - in a real app this would come from an API
const tutorialsData = [
  {
    id: "rustikaler-couchtisch",
    title: "Rustic Coffee Table",
    shortDescription: "A sturdy coffee table made from reclaimed wood with modern metal legs.",
    longDescription: "A DIY project that combines tradition with modern design. This coffee table combines the warmth of reclaimed wood with the clean lines of industrial design. The perfect piece of furniture for your living room - with history and personality.",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Intermediate",
    duration: "6 hours",
    price: "$80-$120",
    materials: [
      { name: "Reclaimed wood boards", amount: "4-5 pieces", description: "Ideally oak or pine, approx. 120x20cm", link: "#" },
      { name: "Hairpin table legs", amount: "4 pieces", description: "Metal, black, 40cm height", link: "#" },
      { name: "Sandpaper", amount: "1 sheet each", description: "Grit 80, 120 and 240", link: "#" },
      { name: "Wood glue", amount: "1 bottle", description: "Waterproof", link: "#" },
      { name: "Wood oil or wax", amount: "1 can", description: "Natural, suitable for furniture", link: "#" },
      { name: "Wood screws", amount: "16 pieces", description: "30mm length", link: "#" },
    ],
    tools: ["Sander", "Drill", "Measuring tape", "Jigsaw", "Brush", "Clamps"],
    steps: [
      {
        title: "Prepare the wood",
        description: "Clean the reclaimed wood boards thoroughly and sand them with 80 grit to remove old paint residue and splinters.",
        image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a",
        tips: "Pay attention to the direction of the wood grain when sanding."
      },
      {
        title: "Cut the boards",
        description: "Measure the desired table size (recommended: 120x60cm) and cut the boards accordingly. Make sure to create clean, straight edges.",
        image: "https://images.unsplash.com/photo-1622219809260-ce065fcce7c5",
        tips: "Use a guide rail for the jigsaw to achieve precise cuts."
      },
      {
        title: "Glue the boards",
        description: "Apply wood glue to the longitudinal edges of the boards and press them together with clamps. Let the glue dry for at least 24 hours.",
        image: "https://images.unsplash.com/photo-1541985498139-75a6919f5a35",
        tips: "Place the boards on a flat surface when gluing to avoid warping."
      },
      {
        title: "Fine sanding",
        description: "Sand the tabletop first with 120 grit, then with 240 grit. Pay special attention to the edges and corners.",
        image: "https://images.unsplash.com/photo-1556809944-7a8792d0d216",
        tips: "Vacuum dust regularly between sanding passes."
      },
      {
        title: "Mount the table legs",
        description: "Mark the positions for the table legs (approx. 10cm from each corner). Attach the hairpin legs to the underside of the tabletop with wood screws.",
        image: "https://images.unsplash.com/photo-1616464598261-27bf86f3f855",
        tips: "Pre-drill to prevent the wood from splitting."
      },
      {
        title: "Treat the surface",
        description: "Apply the wood oil or wax according to the manufacturer's instructions. For optimal protection, 2-3 layers are recommended.",
        image: "https://images.unsplash.com/photo-1508872528308-49c63d2e7b52",
        tips: "Allow each layer to dry completely and lightly sand with fine sandpaper between layers."
      }
    ],
    author: {
      name: "Thomas Weber",
      role: "Master Carpenter",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a"
    },
    publishDate: "2023-03-15",
    rating: 4.7,
    reviewCount: 156,
    comments: [
      {
        id: 1,
        author: "Julia M.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        date: "2 weeks ago",
        content: "Great tutorial! I built the table last weekend and am very happy with the result. One question: Which wood oil did you use exactly?",
        likes: 12
      },
      {
        id: 2,
        author: "Markus K.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        date: "5 days ago",
        content: "The instructions were very helpful, but I had problems gluing the boards. They didn't stay completely straight. Is there a trick?",
        likes: 3
      },
      {
        id: 3,
        author: "Thomas Weber",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        date: "4 days ago",
        content: "@Markus K. For straight boards, it's important to place them on an absolutely flat surface during gluing and tighten the clamps evenly. It also helps to place wood scraps between the clamps and the wood to avoid pressure marks.",
        likes: 8
      }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "mini-gewuerzregal",
    title: "Mini Spice Rack for the Kitchen",
    shortDescription: "A space-saving, wall-mounted spice rack for small kitchens.",
    longDescription: "This slim yet functional wall shelf is the perfect solution for small kitchens with limited storage space. With this DIY project, you can store your spices in an organized and accessible way without sacrificing valuable counter space.",
    image: "https://images.unsplash.com/photo-1509402308937-0240d9a4438e",
    category: "Beginner",
    duration: "2 hours",
    price: "$15-$25",
    materials: [
      { name: "Wooden board", amount: "1 piece", description: "Pine, approx. 60x15x2cm", link: "#" },
      { name: "Dowel", amount: "1 piece", description: "Diameter 12mm, length 60cm", link: "#" },
      { name: "Wall hooks", amount: "2 pieces", description: "For hanging the shelf", link: "#" },
      { name: "Wood glue", amount: "1 bottle", description: "Waterproof", link: "#" },
      { name: "Wood stain or paint", amount: "as needed", description: "In your desired color", link: "#" },
    ],
    tools: ["Power drill", "12mm wood drill bit", "Sandpaper", "Brush", "Measuring tape", "Pencil"],
    steps: [
      {
        title: "Prepare materials",
        description: "Sand the wooden board and dowel smooth with fine sandpaper. Pay special attention to the edges of the board.",
        image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a",
        tips: "Dowels often have rough spots that can cause splinters - sand these thoroughly."
      },
      {
        title: "Drill holes",
        description: "Mark points at regular intervals on the underside of the board for drilling (approx. 5cm from the edge and then every 10cm). Drill with the 12mm bit about 1cm deep.",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
        tips: "To prevent the wood from tearing, place a piece of wood underneath when drilling."
      },
      {
        title: "Cut the dowel",
        description: "Cut the dowel into pieces that are about 10cm longer than the depth of the shelf (approx. 25cm).",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        tips: "A fine saw gives particularly clean cuts."
      },
      {
        title: "Glue in the dowels",
        description: "Put some wood glue in the drill holes and insert the dowels. Make sure they are standing straight.",
        image: "https://images.unsplash.com/photo-1541985498139-75a6919f5a35",
        tips: "Remove excess glue immediately with a damp cloth."
      },
      {
        title: "Treat the surface",
        description: "After the glue has dried (approx. 24 hours), you can stain or paint the shelf as desired.",
        image: "https://images.unsplash.com/photo-1508872528308-49c63d2e7b52",
        tips: "A waterproof, food-safe treatment is recommended for kitchen furniture."
      },
      {
        title: "Mounting",
        description: "Attach the wall hooks to the back of the shelf and hang it at the desired location.",
        image: "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516",
        tips: "Use a level to hang the shelf straight."
      }
    ],
    author: {
      name: "Lisa Müller",
      role: "DIY Enthusiast",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    publishDate: "2023-06-22",
    rating: 4.9,
    reviewCount: 87,
    comments: [
      {
        id: 1,
        author: "Stefan R.",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
        date: "1 week ago",
        content: "Super easy to build and looks great! I painted mine mint green, fits perfectly in my kitchen.",
        likes: 9
      },
      {
        id: 2,
        author: "Anna W.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        date: "3 weeks ago",
        content: "Thanks for the instructions! I built it, but instead of dowels I used small metal rods. Looks chic too!",
        likes: 15
      }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

const TutorialDetail = () => {
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentRating, setCurrentRating] = useState(0);
  const [liked, setLiked] = useState(false);

  const tutorial = tutorialsData.find(t => t.id === id);

  if (!tutorial) {
    return (
      <>
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Tutorial not found</h1>
          <p className="mb-8">The requested tutorial could not be found.</p>
          <Button asChild>
            <a href="/tutorials">Back to all tutorials</a>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleSaveTutorial = () => {
    setSaved(!saved);
    toast({
      title: !saved ? "Tutorial saved" : "Tutorial removed",
      description: !saved 
        ? "The tutorial has been added to your favorites." 
        : "The tutorial has been removed from your favorites.",
      duration: 2000,
    });
  };

  const handleLikeTutorial = () => {
    setLiked(!liked);
    toast({
      title: !liked ? "Tutorial liked" : "Like removed",
      description: !liked ? "Thanks for your feedback!" : "Like has been removed.",
      duration: 2000,
    });
  };

  const handleRateTutorial = (rating: number) => {
    setCurrentRating(rating);
    toast({
      title: "Rating saved",
      description: `You rated this tutorial ${rating} stars.`,
      duration: 2000,
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast({
        title: "Comment submitted",
        description: "Your comment will be published after review.",
        duration: 2000,
      });
      setCommentText('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tutorial header */}
            <div>
              <div className="flex-align-center-gap-2 mb-2">
                <Badge variant="outline" className={
                  tutorial.category === "Beginner" 
                    ? "badge-green" 
                    : tutorial.category === "Intermediate"
                    ? "badge-amber"
                    : "badge-red"
                }>
                  {tutorial.category}
                </Badge>
                <div className="text-sm text-muted-foreground flex-items-center">
                  <Clock className="h-3 w-3 icon-margin-right" /> {tutorial.duration}
                </div>
                <div className="flex-items-center ml-auto">
                  <div className="flex-items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-4 w-4" 
                        fill={star <= Math.round(tutorial.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm ml-2">{tutorial.rating} ({tutorial.reviewCount})</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{tutorial.title}</h1>
              
              <div className="flex-align-center-gap-4 mb-6">
                <div className="flex-items-center">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={tutorial.author.avatar} alt={tutorial.author.name} />
                    <AvatarFallback>{tutorial.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{tutorial.author.name}</p>
                    <p className="text-xs text-muted-foreground">{tutorial.author.role}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Published on {tutorial.publishDate}
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden mb-6">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title} 
                    className="img-cover"
                  />
                </AspectRatio>
              </div>
              
              <p className="text-lg leading-relaxed mb-8">
                {tutorial.longDescription}
              </p>
              
              <div className="flex-wrap-gap-2 mb-6">
                <Button onClick={handleSaveTutorial} variant={saved ? "default" : "outline"} className="gap-2">
                  {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button onClick={handleLikeTutorial} variant={liked ? "default" : "outline"} className="gap-2">
                  <HeartIcon className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
                  {liked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <div className="ml-auto flex-items-center">
                  <span className="icon-margin-right text-sm">Rate:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRateTutorial(star)}
                        className="p-0 hover:scale-110 transition-transform"
                      >
                        <Star
                          className="h-5 w-5 text-amber-500"
                          fill={star <= currentRating ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Separator />
            </div>

            {/* Tutorial content */}
            <Tabs defaultValue="anleitung">
              <TabsList className="mb-4">
                <TabsTrigger value="anleitung">Step-by-Step Guide</TabsTrigger>
                <TabsTrigger value="materialien">Materials and Tools</TabsTrigger>
                <TabsTrigger value="video">Video Tutorial</TabsTrigger>
              </TabsList>
              
              <TabsContent value="anleitung" className="space-y-6">
                <TutorialSteps steps={tutorial.steps} />
              </TabsContent>
              
              <TabsContent value="materialien">
                <MaterialList materials={tutorial.materials} tools={tutorial.tools} price={tutorial.price} />
              </TabsContent>
              
              <TabsContent value="video">
                <div className="rounded-lg overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <iframe 
                      src={tutorial.videoUrl} 
                      title={`Video Tutorial: ${tutorial.title}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AspectRatio>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex-items-start-gap-3">
                    <Info className="h-5 w-5 text-craft-wood flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      If the video cannot be loaded, please refresh the page or 
                      try again later. You can also use the step-by-step guide 
                      which contains all necessary information.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Comments section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Comments ({tutorial.comments.length})</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Write a comment</h3>
                <form onSubmit={handleSubmitComment}>
                  <Textarea 
                    placeholder="Share your experiences and questions..." 
                    className="mb-4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit" disabled={!commentText.trim()}>Submit Comment</Button>
                </form>
              </div>
              
              <CommentSection comments={tutorial.comments} />
            </div>
          </div>
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-8">
            {/* Materials sidebar card */}
            <Card>
              <CardHeader>
                <CardTitle>Materials List</CardTitle>
                <CardDescription>
                  Everything you need for this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 flex-items-center">
                    <List className="h-4 w-4 icon-margin-right text-craft-wood" /> Materials
                  </h3>
                  <ul className="space-y-1.5">
                    {tutorial.materials.slice(0, 3).map((material, index) => (
                      <li key={index} className="flex-items-start-gap-2 text-sm">
                        <span className="text-craft-wood">•</span>
                        <span>{material.amount} {material.name}</span>
                      </li>
                    ))}
                    {tutorial.materials.length > 3 && (
                      <li className="text-sm text-craft-wood">
                        <Button variant="link" className="p-0 h-auto">
                          +{tutorial.materials.length - 3} more materials
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex-items-center">
                    <Hammer className="h-4 w-4 icon-margin-right text-craft-wood" /> Tools
                  </h3>
                  <ul className="space-y-1.5">
                    {tutorial.tools.slice(0, 3).map((tool, index) => (
                      <li key={index} className="flex-items-start-gap-2 text-sm">
                        <span className="text-craft-wood">•</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                    {tutorial.tools.length > 3 && (
                      <li className="text-sm text-craft-wood">
                        <Button variant="link" className="p-0 h-auto">
                          +{tutorial.tools.length - 3} more tools
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Estimated Cost:</span>
                    <span className="font-medium">{tutorial.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#materialien">
                    View Complete List
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Related tutorials */}
            <RelatedTutorials currentId={tutorial.id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TutorialDetail;
