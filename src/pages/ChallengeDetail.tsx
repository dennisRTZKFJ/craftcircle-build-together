
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Clock, Tag, Star, Award, Users, Calendar, ChevronLeft } from 'lucide-react';

// Mock challenge data
const challengeData = {
  id: '1',
  title: 'Upcycling Wonder',
  description: 'Transform old wood scraps or discarded furniture into something new and useful. Be creative and give old materials a second life!',
  image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828',
  prize: 'Hornbach voucher worth €50',
  hasBadge: true,
  badgeName: 'Eco Warrior',
  duration: '7 days',
  category: 'Upcycling',
  difficulty: 'Intermediate',
  startDate: 'May 15, 2025',
  endDate: 'May 22, 2025',
  participants: 124,
  recommendations: [
    'Use at least 80% recycled materials',
    'Document your process with photos',
    'Ensure your creation is safe and functional',
    'Be creative with color combinations',
    'Think about practical everyday use'
  ],
  detailedTask: `Your mission is to breathe new life into discarded materials! This challenge is all about sustainability and creativity. Take old wood scraps, broken furniture, or forgotten pieces and transform them into something beautiful and functional.

What we're looking for:
- Original and creative designs
- Practical functionality
- Use of at least 80% recycled/upcycled materials
- Clear documentation of your process
- Safety and durability considerations

Remember: The goal is not perfection, but innovation and sustainability. Show us how you can see potential in what others might consider waste!`,
  rules: [
    'Only one submission per participant',
    'Project must be original and not previously published',
    'Use at least 80% recycled or upcycled materials',
    'Project must be safe and functional',
    'Submit clear photos of the process and final result',
    'Include a brief description of materials used'
  ]
};

const ChallengeDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/challenges" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Challenges
            </Link>
          </div>

          <div className="grid-cols-1-3-gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Section */}
              <Card className="card-overflow-hidden mb-8">
                <div className="h-80 card-overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <img 
                    src={challengeData.image} 
                    alt={challengeData.title}
                    className="img-object-cover"
                  />
                  <div className="absolute-bottom-left-z-20">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="badge-craft-wood">Active Challenge</Badge>
                      {challengeData.hasBadge && (
                        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-400">
                          <Award className="h-3 w-3 mr-1" />
                          {challengeData.badgeName} Badge
                        </Badge>
                      )}
                    </div>
                    <h1 className="header-xl-white mb-2">{challengeData.title}</h1>
                    <p className="text-white/90 text-lg">{challengeData.description}</p>
                  </div>
                </div>
              </Card>

              {/* Challenge Details */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 icon-craft-wood" />
                    Challenge Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="header-md mb-3">The Task</h3>
                    <div className="prose prose-sm max-w-none">
                      {challengeData.detailedTask.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="header-md mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {challengeData.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-4 w-4 icon-craft-wood mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="header-md mb-3">Rules</h3>
                    <ul className="space-y-2">
                      {challengeData.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-craft-wood font-bold mt-0.5 flex-shrink-0">{index + 1}.</span>
                          <span className="text-muted-foreground">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex-row-gap4">
                <Button size="lg" className="bg-craft-wood hover:bg-craft-wood/90">
                  <Trophy className="h-4 w-4 mr-2" />
                  Participate Now
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="h-4 w-4 mr-2" />
                  View Submissions
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Challenge Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Prize</span>
                    <div className="flex items-center gap-1 font-medium">
                      <Trophy className="h-4 w-4 icon-craft-wood" />
                      {challengeData.prize}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <div className="flex items-center gap-1 font-medium">
                      <Clock className="h-4 w-4 icon-muted-foreground" />
                      {challengeData.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <Badge variant="outline">{challengeData.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Difficulty</span>
                    <Badge variant="outline" className={
                      challengeData.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      challengeData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {challengeData.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="font-medium">{challengeData.participants}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium">{challengeData.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">{challengeData.endDate}</span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-craft-wood h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Challenge is 60% complete</p>
                  </div>
                </CardContent>
              </Card>

              {/* Badge Info */}
              {challengeData.hasBadge && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 icon-craft-wood" />
                      Special Badge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{challengeData.badgeName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete this challenge to earn the exclusive {challengeData.badgeName} badge for your profile!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
