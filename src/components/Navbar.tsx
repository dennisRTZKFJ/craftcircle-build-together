
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Search, LogIn, Tool } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-craft-wood text-white w-8 h-8 rounded flex items-center justify-center font-bold">
              CC
            </div>
            <span className="text-lg font-bold">CraftCircle</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 mx-6">
          <Link to="/tutorials" className="craft-link text-sm font-medium">Tutorials</Link>
          <Link to="/challenges" className="craft-link text-sm font-medium">Challenges</Link>
          <Link to="/community" className="craft-link text-sm font-medium">Community</Link>
          <Link to="/marketplace" className="craft-link text-sm font-medium">Materialien</Link>
          <Link to="/dashboard" className="craft-link text-sm font-medium">Meine Werkstatt</Link>
        </nav>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Search className="h-4 w-4 mr-2" />
            Suchen
          </Button>

          <div className="hidden md:flex space-x-1">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Anmelden
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Registrieren</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium">Home</Link>
                <Link to="/tutorials" className="text-lg font-medium">Tutorials</Link>
                <Link to="/challenges" className="text-lg font-medium">Challenges</Link>
                <Link to="/community" className="text-lg font-medium">Community</Link>
                <Link to="/marketplace" className="text-lg font-medium">Materialien</Link>
                <Link to="/dashboard" className="flex items-center text-lg font-medium">
                  <Tool className="h-4 w-4 mr-2" />
                  Meine Werkstatt
                </Link>
                <div className="mt-4 space-y-2">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/login">Anmelden</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/register">Registrieren</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
