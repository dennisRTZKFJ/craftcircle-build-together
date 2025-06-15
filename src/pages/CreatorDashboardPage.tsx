
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CreatorDashboard from '@/components/creator-dashboard/CreatorDashboard';

const CreatorDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CreatorDashboard />
      <Footer />
    </div>
  );
};

export default CreatorDashboardPage;
