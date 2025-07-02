
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="section-y-space-lg">
        <div className="container container-padding">
          <div className="text-center mb-12">
            <h1 className="header-xl mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Get in touch with our team. We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button className="w-full bg-craft-wood hover:bg-craft-wood/90">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 icon-craft-wood" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@craftcircle.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 icon-craft-wood" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 icon-craft-wood" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    123 Craft Street<br />
                    Maker City, MC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
