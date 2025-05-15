
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
    title: "Rustikaler Couchtisch aus Altholz",
    shortDescription: "Ein robuster Couchtisch aus wiederverwendetem Holz mit modernen Metallbeinen.",
    longDescription: "Ein DIY-Projekt, das Tradition mit modernem Design verbindet. Dieser Couchtisch kombiniert die Wärme von wiederverwendetem Holz mit der klaren Linienführung von Industriedesign. Das perfekte Möbelstück für dein Wohnzimmer - mit Geschichte und Persönlichkeit.",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90",
    category: "Mittel",
    duration: "6 Stunden",
    price: "€80-€120",
    materials: [
      { name: "Altholzbretter", amount: "4-5 Stück", description: "Idealerweise Eiche oder Kiefer, ca. 120x20cm", link: "#" },
      { name: "Hairpin-Tischbeine", amount: "4 Stück", description: "Metall, schwarz, 40cm Höhe", link: "#" },
      { name: "Holzschleifpapier", amount: "je 1 Bogen", description: "Körnung 80, 120 und 240", link: "#" },
      { name: "Holzleim", amount: "1 Flasche", description: "Wasserfest", link: "#" },
      { name: "Holzöl oder Wachs", amount: "1 Dose", description: "Natürlich, für Möbel geeignet", link: "#" },
      { name: "Holzschrauben", amount: "16 Stück", description: "30mm Länge", link: "#" },
    ],
    tools: ["Schleifmaschine", "Akkuschrauber", "Maßband", "Stichsäge", "Pinsel", "Schraubzwingen"],
    steps: [
      {
        title: "Holz vorbereiten",
        description: "Reinige die Altholzbretter gründlich und schleife sie mit Körnung 80 ab, um alte Farbreste und Splitter zu entfernen.",
        image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a",
        tips: "Achte beim Schleifen auf die Richtung der Holzmaserung."
      },
      {
        title: "Bretter zuschneiden",
        description: "Miss die gewünschte Tischgröße aus (empfohlen: 120x60cm) und schneide die Bretter entsprechend zu. Achte auf saubere, gerade Kanten.",
        image: "https://images.unsplash.com/photo-1622219809260-ce065fcce7c5",
        tips: "Verwende eine Führungsschiene für die Stichsäge, um präzise Schnitte zu erzielen."
      },
      {
        title: "Bretter verleimen",
        description: "Trage Holzleim auf die Längskanten der Bretter auf und presse sie mit Schraubzwingen zusammen. Lasse den Leim mindestens 24 Stunden trocknen.",
        image: "https://images.unsplash.com/photo-1541985498139-75a6919f5a35",
        tips: "Lege die Bretter beim Verleimen auf eine ebene Fläche, um Verzug zu vermeiden."
      },
      {
        title: "Feinschliff",
        description: "Schleife die Tischplatte zunächst mit Körnung 120, dann mit 240 glatt. Achte besonders auf die Kanten und Ecken.",
        image: "https://images.unsplash.com/photo-1556809944-7a8792d0d216",
        tips: "Staub regelmäßig zwischen den Schleifgängen absaugen."
      },
      {
        title: "Tischbeine montieren",
        description: "Markiere die Positionen für die Tischbeine (ca. 10cm von jeder Ecke entfernt). Befestige die Hairpin-Beine mit den Holzschrauben an der Unterseite der Tischplatte.",
        image: "https://images.unsplash.com/photo-1616464598261-27bf86f3f855",
        tips: "Bohre vor, um ein Splittern des Holzes zu vermeiden."
      },
      {
        title: "Oberfläche behandeln",
        description: "Trage das Holzöl oder Wachs nach Herstelleranweisung auf. Für optimalen Schutz empfehlen sich 2-3 Schichten.",
        image: "https://images.unsplash.com/photo-1508872528308-49c63d2e7b52",
        tips: "Lasse jede Schicht vollständig trocknen und schleife leicht mit feinem Schleifpapier zwischen den Schichten."
      }
    ],
    author: {
      name: "Thomas Weber",
      role: "Tischlermeister",
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
        date: "vor 2 Wochen",
        content: "Tolles Tutorial! Ich habe den Tisch letztes Wochenende gebaut und bin super zufrieden mit dem Ergebnis. Eine Frage: Welches Holzöl hast du genau verwendet?",
        likes: 12
      },
      {
        id: 2,
        author: "Markus K.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        date: "vor 5 Tagen",
        content: "Die Anleitung war sehr hilfreich, aber ich hatte Probleme beim Verleimen der Bretter. Sie sind nicht ganz gerade geblieben. Gibt es einen Trick?",
        likes: 3
      },
      {
        id: 3,
        author: "Thomas Weber",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
        date: "vor 4 Tagen",
        content: "@Markus K. Für gerade Bretter ist es wichtig, dass du sie während des Leimens auf eine absolut ebene Fläche legst und die Zwingen gleichmäßig anziehst. Außerdem hilft es, zwischen den Zwingen und dem Holz Holzreste zu legen, um Druckstellen zu vermeiden.",
        likes: 8
      }
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "mini-gewuerzregal",
    title: "Mini-Gewürzregal für die Küche",
    shortDescription: "Ein platzsparendes, wandmontiertes Gewürzregal für kleine Küchen.",
    longDescription: "Dieses schlanke, aber funktionale Wandregal ist die perfekte Lösung für kleine Küchen mit begrenztem Stauraum. Mit diesem DIY-Projekt kannst du deine Gewürze übersichtlich und griffbereit aufbewahren, ohne wertvollen Platz auf der Arbeitsplatte zu opfern.",
    image: "https://images.unsplash.com/photo-1509402308937-0240d9a4438e",
    category: "Anfänger",
    duration: "2 Stunden",
    price: "€15-€25",
    materials: [
      { name: "Holzbrett", amount: "1 Stück", description: "Kiefer, ca. 60x15x2cm", link: "#" },
      { name: "Rundholz", amount: "1 Stück", description: "Durchmesser 12mm, Länge 60cm", link: "#" },
      { name: "Wandhaken", amount: "2 Stück", description: "Zum Aufhängen des Regals", link: "#" },
      { name: "Holzleim", amount: "1 Flasche", description: "Wasserfest", link: "#" },
      { name: "Holzlasur oder Farbe", amount: "nach Bedarf", description: "In deiner Wunschfarbe", link: "#" },
    ],
    tools: ["Bohrmaschine", "Holzbohrer 12mm", "Schleifpapier", "Pinsel", "Maßband", "Bleistift"],
    steps: [
      {
        title: "Material vorbereiten",
        description: "Schleife das Holzbrett und das Rundholz mit feinem Schleifpapier glatt. Achte besonders auf die Kanten des Bretts.",
        image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a",
        tips: "Rundhölzer haben oft raue Stellen, die zu Splittern führen können - hier gründlich schleifen."
      },
      {
        title: "Löcher bohren",
        description: "Markiere auf der Unterseite des Bretts in regelmäßigen Abständen Punkte für die Bohrungen (ca. 5cm vom Rand und dann alle 10cm). Bohre mit dem 12mm Bohrer ca. 1cm tief.",
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
        tips: "Um ein Ausreißen des Holzes zu vermeiden, lege beim Bohren ein Holzstück unter."
      },
      {
        title: "Rundholz zuschneiden",
        description: "Schneide das Rundholz in Stücke, die etwa 10cm länger als die Tiefe des Regals sind (also ca. 25cm).",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        tips: "Eine Feinsäge gibt besonders saubere Schnitte."
      },
      {
        title: "Rundholz einkleben",
        description: "Gib etwas Holzleim in die Bohrlöcher und stecke die Rundhölzer hinein. Achte darauf, dass sie gerade stehen.",
        image: "https://images.unsplash.com/photo-1541985498139-75a6919f5a35",
        tips: "Überschüssigen Leim sofort mit einem feuchten Tuch entfernen."
      },
      {
        title: "Oberfläche behandeln",
        description: "Nach dem Trocknen des Leims (ca. 24 Stunden) kannst du das Regal nach Wunsch lasieren oder streichen.",
        image: "https://images.unsplash.com/photo-1508872528308-49c63d2e7b52",
        tips: "Für Küchenmöbel empfiehlt sich eine wasserfeste, lebensmittelechte Behandlung."
      },
      {
        title: "Aufhängen",
        description: "Bringe die Wandhaken an der Rückseite des Regals an und hänge es an der gewünschten Stelle auf.",
        image: "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516",
        tips: "Verwende eine Wasserwaage, um das Regal gerade aufzuhängen."
      }
    ],
    author: {
      name: "Lisa Müller",
      role: "DIY-Enthusiastin",
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
        date: "vor 1 Woche",
        content: "Super einfach nachzubauen und sieht toll aus! Ich habe meins in Mintgrün gestrichen, passt perfekt in meine Küche.",
        likes: 9
      },
      {
        id: 2,
        author: "Anna W.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        date: "vor 3 Wochen",
        content: "Danke für die Anleitung! Hab's nachgebaut, aber statt Rundhölzern habe ich kleine Metallstangen verwendet. Sieht auch schick aus!",
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
          <h1 className="text-3xl font-bold mb-4">Tutorial nicht gefunden</h1>
          <p className="mb-8">Das gesuchte Tutorial konnte nicht gefunden werden.</p>
          <Button asChild>
            <a href="/tutorials">Zurück zu allen Tutorials</a>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleSaveTutorial = () => {
    setSaved(!saved);
    toast({
      title: !saved ? "Tutorial gespeichert" : "Tutorial entfernt",
      description: !saved 
        ? "Das Tutorial wurde zu deinen Favoriten hinzugefügt." 
        : "Das Tutorial wurde aus deinen Favoriten entfernt.",
      duration: 2000,
    });
  };

  const handleLikeTutorial = () => {
    setLiked(!liked);
    toast({
      title: !liked ? "Tutorial geliked" : "Like entfernt",
      description: !liked ? "Danke für dein Feedback!" : "Like wurde entfernt.",
      duration: 2000,
    });
  };

  const handleRateTutorial = (rating: number) => {
    setCurrentRating(rating);
    toast({
      title: "Bewertung gespeichert",
      description: `Du hast dieses Tutorial mit ${rating} Sternen bewertet.`,
      duration: 2000,
    });
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast({
        title: "Kommentar gesendet",
        description: "Dein Kommentar wird nach Überprüfung veröffentlicht.",
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
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={
                  tutorial.category === "Anfänger" 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : tutorial.category === "Mittel"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }>
                  {tutorial.category}
                </Badge>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
                </div>
                <div className="flex items-center ml-auto">
                  <div className="flex items-center text-amber-500">
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
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
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
                  Veröffentlicht am {tutorial.publishDate}
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden mb-6">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              <p className="text-lg leading-relaxed mb-8">
                {tutorial.longDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Button onClick={handleSaveTutorial} variant={saved ? "default" : "outline"} className="gap-2">
                  {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  {saved ? "Gespeichert" : "Speichern"}
                </Button>
                <Button onClick={handleLikeTutorial} variant={liked ? "default" : "outline"} className="gap-2">
                  <HeartIcon className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
                  {liked ? "Gefällt mir" : "Gefällt mir"}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Teilen
                </Button>
                <div className="ml-auto flex items-center">
                  <span className="mr-2 text-sm">Bewerten:</span>
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
                <TabsTrigger value="anleitung">Schritt-für-Schritt-Anleitung</TabsTrigger>
                <TabsTrigger value="materialien">Materialien und Werkzeuge</TabsTrigger>
                <TabsTrigger value="video">Video-Anleitung</TabsTrigger>
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
                      title={`Video-Anleitung: ${tutorial.title}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AspectRatio>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-craft-wood flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Falls das Video nicht geladen werden kann, aktualisiere bitte die Seite oder 
                      versuche es später noch einmal. Du kannst auch die Schritt-für-Schritt-Anleitung 
                      verwenden, die alle notwendigen Informationen enthält.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Comments section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Kommentare ({tutorial.comments.length})</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Schreibe einen Kommentar</h3>
                <form onSubmit={handleSubmitComment}>
                  <Textarea 
                    placeholder="Teile deine Erfahrungen und Fragen..." 
                    className="mb-4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                  />
                  <Button type="submit" disabled={!commentText.trim()}>Kommentar senden</Button>
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
                <CardTitle>Materialliste</CardTitle>
                <CardDescription>
                  Alles was du für dieses Projekt brauchst.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <List className="h-4 w-4 mr-2 text-craft-wood" /> Materialien
                  </h3>
                  <ul className="space-y-1.5">
                    {tutorial.materials.slice(0, 3).map((material, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-craft-wood">•</span>
                        <span>{material.amount} {material.name}</span>
                      </li>
                    ))}
                    {tutorial.materials.length > 3 && (
                      <li className="text-sm text-craft-wood">
                        <Button variant="link" className="p-0 h-auto">
                          +{tutorial.materials.length - 3} weitere Materialien
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Hammer className="h-4 w-4 mr-2 text-craft-wood" /> Werkzeuge
                  </h3>
                  <ul className="space-y-1.5">
                    {tutorial.tools.slice(0, 3).map((tool, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-craft-wood">•</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                    {tutorial.tools.length > 3 && (
                      <li className="text-sm text-craft-wood">
                        <Button variant="link" className="p-0 h-auto">
                          +{tutorial.tools.length - 3} weitere Werkzeuge
                        </Button>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Geschätzte Kosten:</span>
                    <span className="font-medium">{tutorial.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#materialien">
                    Vollständige Liste ansehen
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
