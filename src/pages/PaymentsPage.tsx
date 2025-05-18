
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, CreditCard, Download, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Mock data
  const subscriptionStatus = "active";
  const subscriptionPlan = "DIY Premium";
  const nextBillingDate = "15.06.2025";
  const paymentMethod = "**** **** **** 4242";
  
  // Mock transactions
  const transactions = [
    { id: 'tx1', date: '05/10/2025', type: 'payment', description: 'Monthly Subscription', amount: '$9.99' },
    { id: 'tx2', date: '04/21/2025', type: 'income', description: 'Tutorial Sale', amount: '$15.50' },
    { id: 'tx3', date: '04/15/2025', type: 'payment', description: 'Monthly Subscription', amount: '$9.99' },
    { id: 'tx4', date: '04/03/2025', type: 'income', description: 'Material Commission', amount: '$2.75' },
    { id: 'tx5', date: '03/15/2025', type: 'payment', description: 'Monthly Subscription', amount: '$9.99' },
  ];

  const handleUpdatePayment = () => {
    navigate('/account/payments/update-method');
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Subscription cancelled",
      description: "Your subscription will remain active until the end of the current billing period."
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Payments & Subscriptions</h1>
            <p className="text-muted-foreground">Manage your payment methods and subscription details</p>
          </div>
          <Link to="/account">
            <Button variant="outline">Back to Account</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your current subscription and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {subscriptionStatus === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Plan</div>
                  <div className="font-medium mt-1">{subscriptionPlan}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Next Billing</div>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{nextBillingDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={handleCancelSubscription}>
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Your saved payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-white text-xs mr-3">
                        VISA
                      </div>
                      <div>
                        <div className="font-medium">{paymentMethod}</div>
                        <div className="text-xs text-muted-foreground">Expires 12/27</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" onClick={handleUpdatePayment}>
                Update Payment Method
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Creator Earnings</CardTitle>
              <CardDescription>Your earnings as a creator</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Current Month</div>
                  <div className="text-2xl font-bold">$68.50</div>
                  <div className="text-xs text-green-600">+12% compared to last month</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Total Earnings</div>
                  <div className="font-medium">$427.75</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Earnings Report (PDF)
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Your recent payments and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'payment' ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      {transaction.type === 'payment' ? (
                        <CreditCard className={`h-5 w-5 text-amber-800`} />
                      ) : (
                        <Tag className={`h-5 w-5 text-green-800`} />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : ''
                  }`}>
                    {transaction.type === 'income' ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentsPage;
