
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, ArrowLeft, Shield, CheckCircle } from 'lucide-react';

const AddPaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Stripe payment method creation
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment method added successfully",
        description: "Your Stripe payment method has been securely saved."
      });
      navigate('/account/payments');
    }, 2000);
  };

  const handleStripeConnect = () => {
    setLoading(true);
    
    // Simulate Stripe Connect flow
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Stripe account connected",
        description: "Your Stripe account has been successfully connected for payments."
      });
      navigate('/account/payments');
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Add Payment Method</h1>
            <p className="text-muted-foreground">Securely add your payment information with Stripe</p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Security Notice */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Secure Payment Processing</h3>
                  <p className="text-sm text-green-700">All payments are processed securely through Stripe. Your payment information is encrypted and never stored on our servers.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Select how you want to pay for your subscription and purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-6">
                
                {/* Stripe Card Payment */}
                <div className={`border p-4 rounded-lg ${paymentMethod === 'stripe-card' ? 'border-primary bg-primary/5' : 'border-border'}`}> 
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="stripe-card" id="stripe-card" />
                    <div className="flex flex-col w-full">
                      <Label htmlFor="stripe-card" className="text-base font-semibold mb-2">Credit or Debit Card</Label>
                      <p className="text-sm text-muted-foreground mb-4">Pay securely with your card through Stripe</p>
                      {paymentMethod === 'stripe-card' && (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input 
                                id="cardNumber" 
                                placeholder="4242 4242 4242 4242" 
                                value={cardInfo.cardNumber}
                                onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardHolder">Cardholder Name</Label>
                              <Input 
                                id="cardHolder" 
                                placeholder="John Doe" 
                                value={cardInfo.cardHolder}
                                onChange={(e) => setCardInfo({...cardInfo, cardHolder: e.target.value})}
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input 
                                  id="expiryDate" 
                                  placeholder="MM/YY" 
                                  value={cardInfo.expiryDate}
                                  onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input 
                                  id="cvv" 
                                  placeholder="123" 
                                  type="password" 
                                  value={cardInfo.cvv}
                                  onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Adding Payment Method..." : "Add Payment Method"}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stripe Connect */}
                <div className={`border p-4 rounded-lg ${paymentMethod === 'stripe-connect' ? 'border-primary bg-primary/5' : 'border-border'}`}> 
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="stripe-connect" id="stripe-connect" />
                    <div className="flex flex-col w-full">
                      <Label htmlFor="stripe-connect" className="text-base font-semibold">Connect Stripe Account</Label>
                      <p className="text-sm text-muted-foreground mb-4">Use your existing Stripe account for seamless payments</p>
                      {paymentMethod === 'stripe-connect' && (
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="h-5 w-5 text-blue-600" />
                              <span className="font-medium text-blue-800">Benefits of Stripe Connect:</span>
                            </div>
                            <ul className="text-sm text-blue-700 space-y-1 ml-7">
                              <li>• One-click payments</li>
                              <li>• Enhanced security</li>
                              <li>• Automatic payment updates</li>
                              <li>• Direct bank transfers</li>
                            </ul>
                          </div>
                          <Button className="w-full" onClick={handleStripeConnect} disabled={loading}>
                            {loading ? "Connecting..." : "Connect with Stripe"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </RadioGroup>
            </CardContent>
          </Card>

          {/* Stripe Features */}
          <Card>
            <CardHeader>
              <CardTitle>Why Stripe?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold">Bank-level Security</h4>
                  <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
                </div>
                <div className="text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold">Global Payments</h4>
                  <p className="text-sm text-muted-foreground">135+ currencies supported</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold">Trusted by Millions</h4>
                  <p className="text-sm text-muted-foreground">Used by top companies worldwide</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddPaymentPage;
