
import React from 'react';
import Navbar from '@/components/Navbar';
import UserDashboard from '@/components/UserDashboard';
import CraftMatch from '@/components/CraftMatch';
import TutorialPlaylist from '@/components/TutorialPlaylist';
import Footer from '@/components/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <UserDashboard />
      <div className="bg-muted/30 py-8">
        <CraftMatch />
      </div>
      <TutorialPlaylist />
      <Footer />
    </div>
  );
};

export default Dashboard;
