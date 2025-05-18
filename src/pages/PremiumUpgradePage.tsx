
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown, ArrowLeft, Package, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const PremiumUpgradePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = {
    monthly: {
      name: "Monthly",
      price: "$9.99",
      period: "month",
      features: ["Unlimited projects", "AI Project Assistant", "Exclusive tutorials", "Priority support"]
    },
    yearly: {
      name: "Yearly",
      price: "$99.99",
      period: "year",
      badge: "Save 16%",
      features: ["Unlimited projects", "AI Project Assistant", "Exclusive tutorials", "Priority support", "Project analytics", "Early access to new features"]
    }
  };

  const handleSubscribe = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Subscription",
        description: "Thank you for your interest! You will be redirected to the payment page."
      });
      // This would normally redirect to a payment gateway
      navigate('/subscription');
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-2 text-craft-wood mb-2">
              <Crown className="h-6 w-6" />
              <h2 className="text-2xl font-bold">DIY Premium</h2>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Enhance your DIY experience with our premium features. Choose the plan that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className={`cursor-pointer transition-all ${selectedPlan === 'monthly' ? 'border-craft-wood ring-1 ring-craft-wood' : 'hover:border-craft-wood/50'}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Monthly Plan</CardTitle>
                  {selectedPlan === 'monthly' && (
                    <div className="h-6 w-6 bg-craft-wood text-white rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardDescription>Flexible month-to-month billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end mb-6">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-sm text-muted-foreground ml-1">/ month</span>
                </div>
                
                <ul className="space-y-3">
                  {plans.monthly.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-craft-wood" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card 
              className={`cursor-pointer transition-all ${selectedPlan === 'yearly' ? 'border-craft-wood ring-1 ring-craft-wood' : 'hover:border-craft-wood/50'}`}
              onClick={() => setSelectedPlan('yearly')}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CardTitle>Yearly Plan</CardTitle>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Save 16%</span>
                  </div>
                  {selectedPlan === 'yearly' && (
                    <div className="h-6 w-6 bg-craft-wood text-white rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardDescription>Our best value plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end mb-6">
                  <span className="text-3xl font-bold">$99.99</span>
                  <span className="text-sm text-muted-foreground ml-1">/ year</span>
                </div>
                
                <ul className="space-y-3">
                  {plans.yearly.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {index < 4 ? (
                        <Package className="h-4 w-4 mr-2 text-craft-wood" />
                      ) : (
                        <Star className="h-4 w-4 mr-2 text-amber-500" />
                      )}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium">Ready to upgrade your DIY experience?</h3>
                  <p className="text-muted-foreground">Cancel anytime. 14-day money-back guarantee.</p>
                </div>
                <Button 
                  size="lg" 
                  className="gap-2" 
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  <Crown className="h-5 w-5" />
                  {loading ? "Processing..." : `Subscribe ${selectedPlan === 'monthly' ? 'Monthly' : 'Yearly'}`}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
            <p className="mt-1">Need help? <Link to="#" className="underline">Contact our support team</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PremiumUpgradePage;
