
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
import { CreditCard, ArrowLeft } from 'lucide-react';

const UpdatePaymentMethodPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment method updated",
        description: "Your payment information has been successfully updated."
      });
      navigate('/account/payments');
    }, 1500);
  };

  const handleStripeConnect = () => {
    setLoading(true);
    
    // Simulate redirecting to Stripe
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Stripe account connected",
        description: "Your Stripe account has been successfully connected."
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
            <h1 className="text-3xl font-bold">Update Payment Method</h1>
            <p className="text-muted-foreground">Choose how you want to pay for your subscription</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/account/payments')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payments
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-6">
                <div className={`border p-4 rounded-lg ${paymentMethod === 'credit-card' ? 'border-primary' : 'border-border'}`}>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <div className="flex flex-col">
                      <Label htmlFor="credit-card" className="text-base font-medium mb-2">Credit or Debit Card</Label>
                      
                      {paymentMethod === 'credit-card' && (
                        <form className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input 
                                id="cardNumber" 
                                placeholder="1234 5678 9012 3456" 
                                value={cardInfo.cardNumber}
                                onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="cardHolder">Cardholder Name</Label>
                              <Input 
                                id="cardHolder" 
                                placeholder="John Doe" 
                                value={cardInfo.cardHolder}
                                onChange={(e) => setCardInfo({...cardInfo, cardHolder: e.target.value})}
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
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`border p-4 rounded-lg ${paymentMethod === 'stripe' ? 'border-primary' : 'border-border'}`}>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <div className="flex flex-col">
                      <Label htmlFor="stripe" className="text-base font-medium">Connect Stripe Account</Label>
                      <p className="text-sm text-muted-foreground">Use your existing Stripe account for payments</p>
                      
                      {paymentMethod === 'stripe' && (
                        <Button className="mt-4" onClick={handleStripeConnect} disabled={loading}>
                          {loading ? "Connecting..." : "Connect Stripe"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-end">
              {paymentMethod === 'credit-card' && (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Updating..." : "Update Payment Method"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePaymentMethodPage;
