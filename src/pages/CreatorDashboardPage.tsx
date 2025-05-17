
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreatorDashboard from '@/components/creator-dashboard/CreatorDashboard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CreatorDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <div className="flex gap-2">
            <Link to="/creator-dashboard/upload">
              <Button>Upload Tutorial</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Back to My Workshop</Button>
            </Link>
          </div>
        </div>
        <CreatorDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default CreatorDashboardPage;
