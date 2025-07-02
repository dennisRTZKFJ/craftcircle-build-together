
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, DollarSign } from 'lucide-react';

const BecomeCreator = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding">
          <div className="text-center mb-12">
            <h1 className="header-xl mb-4">Become a Creator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your DIY expertise and earn money by creating tutorials for our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Build Community</CardTitle>
                <CardDescription>Connect with thousands of DIY enthusiasts</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Trophy className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Share Expertise</CardTitle>
                <CardDescription>Teach others your skills and techniques</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Earn Money</CardTitle>
                <CardDescription>Get paid for your quality tutorials</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-craft-wood hover:bg-craft-wood/90">
              Start Creating Today
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BecomeCreator;
