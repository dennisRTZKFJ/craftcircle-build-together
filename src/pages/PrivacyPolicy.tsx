
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding max-w-4xl">
          <h1 className="header-xl mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="header-lg mb-4">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly, such as account details, project uploads, and communications with other users.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">How We Use Information</h2>
              <p className="text-muted-foreground">
                Your information helps us provide, maintain, and improve our services, process transactions, and communicate with you.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Information Sharing</h2>
              <p className="text-muted-foreground">
                We don't sell your personal information. We may share information in limited circumstances outlined in this policy.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at privacy@craftcircle.com.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
