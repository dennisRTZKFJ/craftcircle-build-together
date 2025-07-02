
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Imprint = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding max-w-4xl">
          <h1 className="header-xl mb-8">Imprint</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="header-lg mb-4">Company Information</h2>
              <div className="text-muted-foreground space-y-2">
                <p><strong>CraftCircle GmbH</strong></p>
                <p>123 Craft Street</p>
                <p>Maker City, MC 12345</p>
                <p>Germany</p>
              </div>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Contact</h2>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Phone:</strong> +49 (0) 123 456789</p>
                <p><strong>Email:</strong> legal@craftcircle.com</p>
                <p><strong>Website:</strong> www.craftcircle.com</p>
              </div>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Legal</h2>
              <div className="text-muted-foreground space-y-2">
                <p><strong>Managing Director:</strong> John Doe</p>
                <p><strong>Commercial Register:</strong> HRB 123456B</p>
                <p><strong>Registration Court:</strong> Amtsgericht Maker City</p>
                <p><strong>VAT ID:</strong> DE123456789</p>
              </div>
            </section>
            
            <section>
              <h2 className="header-lg mb-4">Responsible for Content</h2>
              <div className="text-muted-foreground">
                <p>According to § 55 Abs. 2 RStV:</p>
                <p><strong>John Doe</strong></p>
                <p>123 Craft Street</p>
                <p>Maker City, MC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Imprint;
