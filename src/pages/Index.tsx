
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProjectShowcase from '@/components/ProjectShowcase';
import CommunitySection from '@/components/CommunitySection';
import HowItWorks from '@/components/HowItWorks';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ProjectShowcase />
      <CommunitySection />
      <HowItWorks />
      <AIAssistant />
      <Footer />
    </div>
  );
};

export default Index;
