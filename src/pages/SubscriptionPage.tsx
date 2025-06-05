import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const SubscriptionPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Subscription",
        description: "Thank you for your interest! You will be redirected to the payment page."
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Premium Subscription</h1>
          <Link to="/dashboard">
            <Button variant="outline">Back to My Workshop</Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex-center-gap2-craft-wood">
                <Crown className="h-6 w-6" />
                <CardTitle className="text-2xl">DIY Premium</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Enhance your possibilities and get access to exclusive premium features
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-craft-wood" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Unlimited Projects</h4>
                    <p className="text-muted-foreground">Create and manage as many projects as you want</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-craft-wood" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">AI Project Assistant</h4>
                    <p className="text-muted-foreground">Get personalized suggestions and guidance for your projects</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-craft-wood" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Exclusive Tutorials</h4>
                    <p className="text-muted-foreground">Access to premium content from top creators</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check className="h-5 w-5 text-craft-wood" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Priority Support</h4>
                    <p className="text-muted-foreground">Get faster responses to your questions and issues</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-6 rounded-lg mt-8">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg">Monthly Price</div>
                  <div className="text-2xl font-bold">$9.99</div>
                </div>
                <div className="text-sm text-muted-foreground">Cancel anytime. 14-day money-back guarantee.</div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pb-8">
              <Button 
                size="lg" 
                className="w-full max-w-md gap-2" 
                onClick={handleSubscribe}
                disabled={loading}
              >
                <Crown className="h-5 w-5" />
                {loading ? "Processing..." : "Subscribe Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;
