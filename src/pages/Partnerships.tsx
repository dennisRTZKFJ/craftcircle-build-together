
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Building, Users, Target } from 'lucide-react';

const Partnerships = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding">
          <div className="text-center mb-12">
            <h1 className="header-xl mb-4">Partnerships</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join forces with CraftCircle to reach DIY enthusiasts and grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Building className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Brand Partnerships</CardTitle>
                <CardDescription>
                  Showcase your products to our engaged community of makers and creators.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Influencer Collaboration</CardTitle>
                <CardDescription>
                  Work with our top creators to promote your brand through authentic content.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Sponsored Challenges</CardTitle>
                <CardDescription>
                  Create branded challenges that engage our community with your products.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Handshake className="h-8 w-8 icon-craft-wood mb-2" />
                <CardTitle>Strategic Alliances</CardTitle>
                <CardDescription>
                  Long-term partnerships that benefit both our communities and businesses.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-craft-wood hover:bg-craft-wood/90">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Partnerships;
