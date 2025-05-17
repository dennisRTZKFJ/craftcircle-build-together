
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnerDashboard from '@/components/PartnerDashboard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PartnerDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Partner Dashboard</h1>
          <Link to="/dashboard">
            <Button variant="outline">Back to My Workshop</Button>
          </Link>
        </div>
        <PartnerDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default PartnerDashboardPage;
