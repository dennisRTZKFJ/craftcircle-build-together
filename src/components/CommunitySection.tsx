
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Thanks to CraftCircle, I built my first piece of furniture! The step-by-step guide was so clear that it was super easy even for me as a beginner.",
    author: "Lisa Meyer",
    role: "DIY Beginner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "As a woodworker, I appreciate the quality of the instructions on CraftCircle. The community always gives me new ideas and feedback on my own projects.",
    author: "Martin Schmidt",
    role: "Hobby Woodworker",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces"
  },
  {
    quote: "CraftCircle's AI help was incredibly useful when I got stuck on my desk project. Within seconds, I had the perfect solution!",
    author: "Sophia Wagner",
    role: "Interior Design Student",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=faces"
  },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-24 bg-craft-wood/5">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Made for you – by people like you.</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Find personalized recommendations, discover new favorite ideas and get inspired by real DIY pros. Or become a creator yourself and earn money with your projects.
            </p>
            <div className="space-y-6 mt-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm italic mb-2">{testimonial.quote}</p>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button>
                Join the community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-craft-wood/10 rounded-2xl -rotate-2"></div>
            <div className="absolute inset-0 -z-10 bg-craft-light-green/10 rounded-2xl rotate-2"></div>
            <div className="bg-background rounded-xl overflow-hidden shadow-lg p-6">
              <div className="pb-5 border-b border-border mb-5">
                <h3 className="font-bold text-xl">Community Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">10k+</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">5k+</p>
                  <p className="text-sm text-muted-foreground">DIY Projects</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">98%</p>
                  <p className="text-sm text-muted-foreground">Positive Reviews</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-3xl font-bold text-craft-dark-wood">24/7</p>
                  <p className="text-sm text-muted-foreground">Community Support</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-craft-light-green/10 rounded-lg">
                <p className="text-sm text-center">
                  "Together, our members have built over 5,000 individual pieces of furniture and saved more than 250,000 kg of CO₂ in the process!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
