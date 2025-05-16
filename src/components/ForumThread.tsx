
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, ThumbsDown, Flag, MessageCircle, Award, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

// Mock data for the thread
const threadData = {
  id: 'thread1',
  title: 'Welche Säge für Anfänger?',
  content: `<p>Hallo liebe Community,</p>
            <p>ich möchte mit dem Heimwerken beginnen und brauche eine gute Säge für erste Projekte. Ich habe ein Budget von etwa 150 €.</p>
            <p>Was würdet ihr empfehlen? Eine Handkreissäge, Stichsäge oder doch eine Kapp- und Gehrungssäge?</p>
            <p>Welche Marken sind zuverlässig, aber nicht zu teuer für Anfänger?</p>
            <p>Vielen Dank für eure Hilfe!</p>`,
  author: {
    id: 'user1',
    name: 'Max Müller',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79',
    level: 'Anfänger',
    joinDate: 'Mai 2024',
    posts: 12
  },
  createdAt: '15.05.2025, 14:35',
  categories: ['Werkzeuge', 'Anfängerfragen'],
  views: 342,
  likes: 18,
  solved: false
};

// Mock replies data
const repliesData = [
  {
    id: 'reply1',
    content: `<p>Hallo Max,</p>
              <p>als Anfänger würde ich dir zu einer Stichsäge raten. Sie ist vielseitig einsetzbar und du kannst damit gerade und kurvige Schnitte machen.</p>
              <p>Die Bosch PST 700 E ist eine gute Einsteigermaschine für etwa 70 €. Damit bleibst du gut im Budget und hast noch etwas übrig für Zubehör wie Sägeblätter oder eine Führungsschiene.</p>
              <p>Später kannst du deine Werkzeugsammlung um eine Handkreissäge erweitern, wenn du mehr gerade Schnitte machen möchtest.</p>`,
    author: {
      id: 'user2',
      name: 'Laura Schmidt',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      level: 'Fortgeschritten',
      joinDate: 'Januar 2023',
      posts: 87,
      isModerator: true
    },
    createdAt: '15.05.2025, 15:10',
    likes: 23
  },
  {
    id: 'reply2',
    content: `<p>Ich stimme Laura teilweise zu, aber möchte noch ergänzen:</p>
              <p>Eine Stichsäge ist gut für den Anfang, aber wenn du vorhast, viele gerade Schnitte zu machen, könnte eine Handkreissäge besser sein. Die Bosch PKS 55 ist in deinem Budget (ca. 120 €) und sehr zuverlässig.</p>
              <p>Kapp- und Gehrungssägen sind erst sinnvoll, wenn du spezifische Projekte wie Bilderrahmen oder Fußleisten bearbeiten möchtest.</p>
              <p>Wichtig ist auch eine gute Werkbank oder Sägetisch, damit du sicher arbeiten kannst!</p>`,
    author: {
      id: 'user3',
      name: 'Thomas Weber',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      level: 'Profi',
      joinDate: 'März 2022',
      posts: 254
    },
    createdAt: '15.05.2025, 16:22',
    likes: 15
  },
  {
    id: 'reply3',
    content: `<p>Danke für die tollen Antworten!</p>
              <p>Ich denke, ich werde mit einer Stichsäge anfangen und später in eine Handkreissäge investieren. Die Bosch PST 700 E klingt nach einer guten Option.</p>
              <p>@Thomas: Guter Punkt mit der Werkbank, das hatte ich tatsächlich noch nicht bedacht. Habt ihr Empfehlungen für einfache DIY-Lösungen als Sägetisch?</p>`,
    author: {
      id: 'user1',
      name: 'Max Müller',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79',
      level: 'Anfänger',
      joinDate: 'Mai 2024',
      posts: 12
    },
    createdAt: '15.05.2025, 18:05',
    likes: 7
  }
];

const ForumThread = () => {
  const { toast } = useToast();
  const [replyContent, setReplyContent] = useState('');
  
  const handleLike = (id: string) => {
    toast({
      description: `Antwort wurde positiv bewertet`
    });
  };
  
  const handleDislike = (id: string) => {
    toast({
      description: `Antwort wurde negativ bewertet`
    });
  };
  
  const handleReport = (id: string) => {
    toast({
      title: "Meldung eingereicht",
      description: "Ein Moderator wird sich diesen Inhalt ansehen."
    });
  };
  
  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      toast({
        title: "Antwort gesendet",
        description: "Deine Antwort wurde erfolgreich veröffentlicht."
      });
      setReplyContent('');
    } else {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte gib einen Text ein."
      });
    }
  };
  
  const handleMarkAsSolution = (replyId: string) => {
    toast({
      title: "Als Lösung markiert",
      description: "Diese Antwort wurde als Lösung markiert."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Zurück zum Forum
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex gap-1">
          {threadData.categories.map((category, i) => (
            <Badge key={i} variant="outline" className="bg-muted">{category}</Badge>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="hidden md:block">
              <Avatar className="h-10 w-10">
                <AvatarImage src={threadData.author.avatar} alt={threadData.author.name} />
                <AvatarFallback>{threadData.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{threadData.title}</h1>
                {threadData.solved && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Gelöst
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <div className="flex md:hidden items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={threadData.author.avatar} alt={threadData.author.name} />
                    <AvatarFallback>{threadData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{threadData.author.name}</span>
                </div>
                <div className="text-muted-foreground">{threadData.createdAt}</div>
                <div className="text-muted-foreground">{threadData.views} Aufrufe</div>
                <div className="text-muted-foreground">{repliesData.length} Antworten</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="border-b">
          <div className="md:flex gap-6">
            <div className="hidden md:block w-40 flex-shrink-0">
              <div className="text-center">
                <h3 className="font-medium">{threadData.author.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {threadData.author.level}
                </Badge>
                <div className="text-xs text-muted-foreground mt-3">
                  <div>Mitglied seit {threadData.author.joinDate}</div>
                  <div>{threadData.author.posts} Beiträge</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: threadData.content}}></div>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex gap-1 items-center text-muted-foreground"
                    onClick={() => handleLike(threadData.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{threadData.likes}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground"
                    onClick={() => handleDislike(threadData.id)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground"
                  onClick={() => handleReport(threadData.id)}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Melden
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{repliesData.length} Antworten</h2>
        <Button variant="outline" size="sm">
          <MessageCircle className="h-4 w-4 mr-1" />
          Abonnieren
        </Button>
      </div>
      
      {repliesData.map((reply, index) => (
        <Card key={reply.id} id={reply.id}>
          <CardContent className="pt-6 border-b">
            <div className="md:flex gap-6">
              <div className="hidden md:block w-40 flex-shrink-0">
                <div className="text-center">
                  <Avatar className="h-12 w-12 mx-auto">
                    <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium mt-2">{reply.author.name}</h3>
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <Badge variant="outline" className={
                      reply.author.level === 'Profi' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      reply.author.level === 'Fortgeschritten' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      'bg-green-100 text-green-800 border-green-200'
                    }>
                      {reply.author.level}
                    </Badge>
                    {reply.author.isModerator && (
                      <Badge>Moderator</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-3">
                    <div>Mitglied seit {reply.author.joinDate}</div>
                    <div>{reply.author.posts} Beiträge</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex md:hidden items-center gap-2 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                    <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{reply.author.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs py-0 h-5">{reply.author.level}</Badge>
                      {reply.author.isModerator && <Badge className="text-xs py-0 h-5">Moderator</Badge>}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mb-3">
                  {reply.createdAt}
                </div>
                
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: reply.content}}></div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex gap-1 items-center text-muted-foreground"
                      onClick={() => handleLike(reply.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{reply.likes}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground"
                      onClick={() => handleDislike(reply.id)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    {index === 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-craft-wood ml-2"
                        onClick={() => handleMarkAsSolution(reply.id)}
                      >
                        <Award className="h-4 w-4 mr-1" />
                        Als Lösung markieren
                      </Button>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground"
                    onClick={() => handleReport(reply.id)}
                  >
                    <Flag className="h-4 w-4 mr-1" />
                    Melden
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Deine Antwort</h3>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Schreibe deine Antwort hier..." 
            className="min-h-[150px] resize-y"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline">Abbrechen</Button>
          <Button onClick={handleSubmitReply}>Antwort senden</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForumThread;
