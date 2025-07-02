
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding max-w-4xl">
          <h1 className="header-xl mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="header-lg mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using CraftCircle, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily access CraftCircle for personal, non-commercial transitory viewing only.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">User Content</h2>
              <p className="text-muted-foreground">
                You retain ownership of content you create, but grant us license to use, display, and distribute your content on our platform.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground">
                You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and access to our service immediately, without prior notice.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
