
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
      isScrolled ? "bg-background/95 shadow-md backdrop-blur-sm py-3" : "bg-transparent"
    )}>
      <div className="container flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <div className="bg-craft-wood text-white font-bold p-2 rounded">
            CC
          </div>
          <span className="font-playfair text-xl font-bold">CraftCircle</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#projects" className="craft-link font-medium">Projekte</a>
          <a href="#community" className="craft-link font-medium">Community</a>
          <a href="#how-it-works" className="craft-link font-medium">So funktioniert's</a>
          <a href="#ai-assistant" className="craft-link font-medium">KI-Assistent</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline">Anmelden</Button>
          <Button>Registrieren</Button>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
        >
          <div className={cn("w-6 h-0.5 bg-foreground transition-all", 
            isMobileMenuOpen && "rotate-45 translate-y-1.5"
          )}></div>
          <div className={cn("w-6 h-0.5 bg-foreground my-1.5 transition-opacity", 
            isMobileMenuOpen && "opacity-0"
          )}></div>
          <div className={cn("w-6 h-0.5 bg-foreground transition-all", 
            isMobileMenuOpen && "-rotate-45 -translate-y-1.5"
          )}></div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 bg-background z-40 transition-all duration-300 transform",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container pt-24 space-y-6">
          <nav className="flex flex-col space-y-6">
            <a 
              href="#projects" 
              className="text-xl font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projekte
            </a>
            <a 
              href="#community" 
              className="text-xl font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </a>
            <a 
              href="#how-it-works" 
              className="text-xl font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              So funktioniert's
            </a>
            <a 
              href="#ai-assistant" 
              className="text-xl font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              KI-Assistent
            </a>
          </nav>
          <div className="flex flex-col space-y-4 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => setIsMobileMenuOpen(false)}>Anmelden</Button>
            <Button onClick={() => setIsMobileMenuOpen(false)}>Registrieren</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
