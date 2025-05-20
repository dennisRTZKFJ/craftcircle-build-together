
/**
 * Landing Page / Homepage
 * 
 * The main entry point for the CraftCircle application.
 * Showcases key features and encourages user registration.
 * 
 * Features:
 * - Hero section with call-to-action
 * - Feature highlights
 * - Project showcase
 * - Community section
 * - How it works explanation
 * - AI assistant preview
 * - Weekly challenge promotion
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProjectShowcase from '@/components/ProjectShowcase';
import CommunitySection from '@/components/CommunitySection';
import HowItWorks from '@/components/HowItWorks';
import AIAssistant from '@/components/AIAssistant';
import Footer from '@/components/Footer';
import WeeklyChallenge from '@/components/WeeklyChallenge';

/**
 * Index Component
 * 
 * Main landing page composed of various section components.
 * 
 * Component structure:
 * - Navbar: Navigation and authentication links
 * - Hero: Main banner with headline and signup CTA
 * - HowItWorks: Step-by-step explanation of the platform
 * - ProjectShowcase: Featured DIY projects from the community
 * - AIAssistant: Preview of AI-powered project assistance
 * - WeeklyChallenge: Current community challenge
 * - CommunitySection: Community features and benefits
 * - Features: Platform feature highlights
 * - Footer: Site links and information
 */
const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />
      
      {/* Main hero banner with signup CTA */}
      <Hero />
      
      {/* How the platform works */}
      <HowItWorks />
      
      {/* Featured DIY projects */}
      <ProjectShowcase />
      
      {/* AI assistant feature preview */}
      <AIAssistant />
      
      {/* Current weekly challenge */}
      <WeeklyChallenge />
      
      {/* Community features */}
      <CommunitySection />
      
      {/* Platform feature highlights */}
      <Features />
      
      {/* Site footer */}
      <Footer />
    </div>
  );
};

export default Index;
