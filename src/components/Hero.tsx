import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-24 lg:pt-28 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-craft-light-green-pulse"></div>
        <div className="bg-craft-light-wood-pulse" style={{animationDuration: '10s'}}></div>
        
        {/* Wood grain texture overlay */}
        <div className="bg-woodgrain-overlay"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="flex-col-space-y6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="badge-hero-feature">
              <Star className="h-4 w-4 text-craft-wood" fill="currentColor" />
              <span>Unleash Creativity</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Create <span className="text-craft-dark-wood relative">
                Craft <span className="text-craft-teal">Circle</span>
                <svg className="absolute-bottom-w-full" viewBox="0 0 400 15" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10 C 100 0, 300 0, 400 10" stroke="#D4A22C" strokeWidth="3" fill="none" />
                </svg>
              </span> pieces with your hands
            </h1>
            
            <p className="text-lg md:text-xl muted-text max-w-[600px]">
              Discover step-by-step guides for impressive furniture pieces
              that give your home a personal touch – no prior knowledge needed.
            </p>
            
            <div className="text-xl md:text-2xl font-bold uppercase tracking-wide text-craft-dark-wood">
              BUILD IT YOURSELF. MAKE IT LAST.
            </div>
            
            <div className="flex-col-row-gap-4-pt-4">
              <Button size="lg" className="text-base font-medium group">
                Start your project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-base font-medium">
                How it works
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-border">
              <div className="flex-align-center-gap-2">
                <Users className="h-5 w-5 text-craft-wood" />
                <span className="text-sm">
                  <strong className="text-foreground">10,000+</strong> DIY enthusiasts
                </span>
              </div>
              <div className="flex-align-center-gap-2">
                <Star className="h-5 w-5 text-craft-wood" />
                <span className="text-sm">
                  <strong className="text-foreground">4.8/5</strong> satisfaction
                </span>
              </div>
              <div className="flex-align-center-gap-2">
                <Clock className="h-5 w-5 text-craft-wood" />
                <span className="text-sm">
                  <strong className="text-foreground">150+</strong> projects
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative lg:h-[600px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-craft-wood-green"></div>
            <div className="relative-h-full-grid-cols-2-rows-3-gap-4">
              <motion.div 
                className="bg-craft-wood-col-span-row-span"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" 
                  alt="Handcrafted wooden bowl" 
                  className="img-cover"
                />
              </motion.div>
              <motion.div 
                className="bg-craft-light-green-row-span"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1558274235-9b315bae9b7a" 
                  alt="Tools" 
                  className="img-cover"
                />
              </motion.div>
              <motion.div 
                className="bg-craft-light-green-row-span-2"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1540103711724-ebf833bde8d1" 
                  alt="Finished furniture piece" 
                  className="img-cover"
                />
              </motion.div>
              <motion.div 
                className="bg-craft-teal-col-span-2-row-span-1"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581612222497-018b5accd0c4" 
                  alt="DIY Workshop" 
                  className="img-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
