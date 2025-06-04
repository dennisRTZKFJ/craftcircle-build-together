import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Menu, Search, LogIn, Hammer, X, LogOut, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme, isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/tutorials?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = () => {
    // Clear authentication state
    logout();
    navigate('/sign-out');
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center container-padding">
        <div className="flex-align-center-gap-3 md:space-x-4">
          <Link to="/" className="flex-align-center-gap-3">
            <img 
              src="/lovable-uploads/338c44ac-7396-43e0-9592-632f2df54ad9.png" 
              alt="CraftCircle Logo" 
              className="w-10 h-10"
            />
            <span className="text-lg font-bold">CraftCircle</span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-align-center-gap-3 mx-6">
          <Link to="/tutorials" className="craft-link text-sm font-medium">Tutorials</Link>
          <Link to="/challenges" className="craft-link text-sm font-medium">Challenges</Link>
          <Link to="/community" className="craft-link text-sm font-medium">Community</Link>
          <Link to="/marketplace" className="craft-link text-sm font-medium">Materials</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="craft-link text-sm font-medium">My Workshop</Link>
          )}
        </nav>
        <div className="flex-1" />
        <div className="flex-align-center-gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="mr-1"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>

          <div className="hidden md:flex space-x-1">
            {!isAuthenticated ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/account">
                    <User className="h-4 w-4 icon-margin-right" />
                    My Account
                  </Link>
                </Button>
                <Button size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 icon-margin-right" />
                  Sign Out
                </Button>
              </>
            )}
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex-col-gap-8 mt-8">
                <Link to="/" className="text-lg font-medium">Home</Link>
                <Link to="/tutorials" className="text-lg font-medium">Tutorials</Link>
                <Link to="/challenges" className="text-lg font-medium">Challenges</Link>
                <Link to="/community" className="text-lg font-medium">Community</Link>
                <Link to="/marketplace" className="text-lg font-medium">Materials</Link>
                {isAuthenticated && (
                  <Link to="/dashboard" className="flex-align-center-gap-3 text-lg font-medium">
                    <Hammer className="h-4 w-4 icon-margin-right" />
                    My Workshop
                  </Link>
                )}
                <div className="mt-4 space-y-2">
                  {!isAuthenticated ? (
                    <>
                      <Button className="w-full" variant="outline" asChild>
                        <Link to="/login">Log In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" variant="outline" asChild>
                        <Link to="/account">My Account</Link>
                      </Button>
                      <Button className="w-full" variant="destructive" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 icon-margin-right" />
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex-col-gap-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 muted-text" />
              <Input
                className="pl-10"
                placeholder="Projects, materials, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setSearchOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!searchQuery.trim()}>
                Search
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
