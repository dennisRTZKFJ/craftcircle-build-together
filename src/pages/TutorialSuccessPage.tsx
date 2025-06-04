import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Edit } from 'lucide-react';

const TutorialSuccessPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-16 max-w-2xl mx-auto">
        <Card className="border-green-100 bg-green-50/30">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="header-lg text-green-800">Tutorial Successfully Published!</h1>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <p className="muted-text">
              Your tutorial has been submitted and is now being reviewed by our team.
              Once approved, it will be available to the CraftCircle community.
            </p>
            
            <div className="mt-8 space-y-4 rounded-card">
              <h2 className="font-semibold">What happens next?</h2>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full flex-center bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">1</div>
                  <span>Our team will review your tutorial for clarity and completeness</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full flex-center bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">2</div>
                  <span>You may receive feedback or suggestions for improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full flex-center bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">3</div>
                  <span>Once approved, your tutorial will be published to the community</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full flex-center bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">4</div>
                  <span>You'll start earning from views and engagement on your tutorial</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/creator-dashboard">
              <Button variant="outline" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/creator-dashboard/upload">
              <Button className="w-full sm:w-auto">
                Create Another Tutorial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TutorialSuccessPage;
