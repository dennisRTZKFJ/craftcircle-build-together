
/**
 * Partner Dashboard Page
 * 
 * Main interface for partner users to manage their products and orders.
 * Displays partner-specific analytics and management tools.
 * 
 * Features:
 * - Product inventory management
 * - Order tracking and fulfillment
 * - Revenue analytics
 * - Customer insights
 * 
 * Integration with Spring Boot:
 * - Connects to /partners/* endpoints
 * - Requires 'partner' role authorization
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnerDashboard from '@/components/PartnerDashboard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Partner Dashboard Page Component
 * 
 * Container for the partner dashboard interface.
 * Provides navigation and layout structure.
 * 
 * Production implementation:
 * - Ensures user has partner role
 * - Redirects non-partners to appropriate page
 * - Loads partner-specific data and statistics
 */
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
        {/* 
          The PartnerDashboard component contains all partner-specific
          functionality including product management, order tracking,
          and analytics visualizations.
          
          In production, this component will fetch data from:
          - GET /partners/stats
          - GET /partners/products
          - GET /partners/orders
          - GET /partners/analytics
        */}
        <PartnerDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default PartnerDashboardPage;
