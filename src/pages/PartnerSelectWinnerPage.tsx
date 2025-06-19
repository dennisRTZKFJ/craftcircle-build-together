
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Trophy, Medal, Star, Crown, Mail, User } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  submissionTitle: string;
  submissionDescription: string;
  submissionImage?: string;
  submissionDate: string;
  votes: number;
  isWinner?: boolean;
}

const PartnerSelectWinnerPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectingWinner, setSelectingWinner] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading challenge participants
    setTimeout(() => {
      setChallengeTitle('DIY Wooden Storage Solutions Challenge');
      setParticipants([
        {
          id: '1',
          name: 'Anna Schmidt',
          email: 'anna.schmidt@email.com',
          avatar: '/placeholder.svg',
          submissionTitle: 'Floating Wooden Shelves',
          submissionDescription: 'Beautiful minimalist floating shelves made from reclaimed oak wood.',
          submissionImage: '/placeholder.svg',
          submissionDate: '2024-01-15',
          votes: 47
        },
        {
          id: '2',
          name: 'Michael Weber',
          email: 'michael.weber@email.com',
          submissionTitle: 'Under-Stair Storage Cabinet',
          submissionDescription: 'Maximizing space with a custom-built cabinet under the stairs.',
          submissionDate: '2024-01-14',
          votes: 23
        },
        {
          id: '3',
          name: 'Sarah Mueller',
          email: 'sarah.mueller@email.com',
          avatar: '/placeholder.svg',
          submissionTitle: 'Modular Toy Storage System',
          submissionDescription: 'Kid-friendly modular storage boxes that can be stacked and rearranged.',
          submissionImage: '/placeholder.svg',
          submissionDate: '2024-01-13',
          votes: 35
        },
        {
          id: '4',
          name: 'Thomas Fischer',
          email: 'thomas.fischer@email.com',
          submissionTitle: 'Rustic Bathroom Organizer',
          submissionDescription: 'Rustic wooden organizer with rope details for bathroom storage.',
          submissionDate: '2024-01-12',
          votes: 18
        },
        {
          id: '5',
          name: 'Lisa Hoffmann',
          email: 'lisa.hoffmann@email.com',
          avatar: '/placeholder.svg',
          submissionTitle: 'Kitchen Spice Rack Tower',
          submissionDescription: 'Rotating spice tower made from bamboo with multiple tiers.',
          submissionDate: '2024-01-11',
          votes: 29,
          isWinner: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSelectWinner = (participantId: string) => {
    setSelectingWinner(participantId);
    
    setTimeout(() => {
      setParticipants(prev => prev.map(p => ({
        ...p,
        isWinner: p.id === participantId
      })));
      setSelectingWinner(null);
      toast({
        title: "Winner selected!",
        description: "The participant has been notified about winning the challenge."
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading challenge participants...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Select Challenge Winner</h1>
          </div>
          <h2 className="text-xl text-muted-foreground mb-2">{challengeTitle}</h2>
          <p className="text-muted-foreground">Challenge ID: {id}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="outline">{participants.length} Participants</Badge>
            <Badge variant="outline">{participants.reduce((sum, p) => sum + p.votes, 0)} Total Votes</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {participants
            .sort((a, b) => b.votes - a.votes)
            .map((participant, index) => (
            <Card key={participant.id} className={`${participant.isWinner ? 'border-yellow-400 bg-yellow-50' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                        }`}>
                          {index + 1}
                        </div>
                      )}
                      {participant.isWinner && (
                        <Crown className="absolute -top-2 -left-2 h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {participant.name}
                        {participant.isWinner && <Badge className="bg-yellow-500">Winner</Badge>}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {participant.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {participant.votes} votes
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Submitted: {participant.submissionDate}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{participant.submissionTitle}</h4>
                    <p className="text-muted-foreground">{participant.submissionDescription}</p>
                  </div>
                  
                  {participant.submissionImage && (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img 
                        src={participant.submissionImage} 
                        alt={participant.submissionTitle}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Medal className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Ranked #{index + 1} by community votes
                      </span>
                    </div>
                    {!participant.isWinner ? (
                      <Button 
                        onClick={() => handleSelectWinner(participant.id)}
                        disabled={selectingWinner === participant.id}
                        className="bg-yellow-500 hover:bg-yellow-600"
                      >
                        {selectingWinner === participant.id ? "Selecting..." : "Select as Winner"}
                      </Button>
                    ) : (
                      <Badge className="bg-yellow-500 text-white">
                        <Crown className="h-4 w-4 mr-1" />
                        Current Winner
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {participants.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Participants Yet</h3>
              <p className="text-muted-foreground">This challenge doesn't have any participants yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PartnerSelectWinnerPage;
