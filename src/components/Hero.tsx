import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-24 lg:pt-28 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-craft-light-green/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-craft-light-wood/30 blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
        
        {/* Wood grain texture overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd')] opacity-5 mix-blend-overlay bg-repeat"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="flex flex-col space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-craft-wood/10 border border-craft-wood/20 text-craft-dark-wood text-sm mb-2">
              <Star className="h-4 w-4 text-craft-wood" fill="currentColor" />
              <span>Unleash Creativity</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Create <span className="text-craft-dark-wood relative">
                Unique
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 15" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0,10 C 150,30 250,-10 400,12" stroke="#D4A76A" strokeWidth="5" fill="none" strokeLinecap="round" />
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
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="text-base font-medium group">
                Start your project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-base font-medium">
                How it works
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-craft-wood" />
                <span className="text-sm">
                  <strong className="text-foreground">10,000+</strong> DIY enthusiasts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-craft-wood" />
                <span className="text-sm">
                  <strong className="text-foreground">4.8/5</strong> satisfaction
                </span>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="absolute inset-0 bg-gradient-to-br from-craft-wood/20 to-craft-light-green/20 rounded-lg"></div>
            <div className="relative h-full grid grid-cols-2 grid-rows-3 gap-4 p-4">
              <motion.div 
                className="bg-craft-wood/20 rounded-lg overflow-hidden hover-lift col-span-1 row-span-2"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7" 
                  alt="Handcrafted wooden bowl" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="bg-craft-light-green/20 rounded-lg overflow-hidden hover-lift row-span-1"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1558274235-9b315bae9b7a" 
                  alt="Tools" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="bg-craft-light-green/20 rounded-lg overflow-hidden row-span-2 hover-lift"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1540103711724-ebf833bde8d1" 
                  alt="Finished furniture piece" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="bg-craft-teal/20 rounded-lg overflow-hidden hover-lift col-span-2 row-span-1"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581612222497-018b5accd0c4" 
                  alt="DIY Workshop" 
                  className="w-full h-full object-cover"
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
