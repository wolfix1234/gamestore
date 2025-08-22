'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { text: 'Home', href: '/' },
    { text: 'Games', href: '/products' },
    { text: 'News', href: '/blog' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ];

  const checkAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, pathname]);

  useEffect(() => {
    // Listen for storage changes to update navbar when user logs in/out
    const handleStorageChange = () => checkAuth();
    const handleAuthChange = () => checkAuth();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('authChange', handleAuthChange);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('authChange', handleAuthChange);
      }
    };
  }, [checkAuth]);



  const handleMobileLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-navbar transition-all duration-300 ${
      scrolled 
        ? 'bg-cyber-black/98 backdrop-blur-strong shadow-neon-strong' 
        : 'bg-cyber-black/80 backdrop-blur-md shadow-neon'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-electric-blue hover:text-glow transition-all duration-300 drop-shadow-lg">
              CyberStore
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-readable hover:text-electric-blue px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-electric-blue/15 hover:shadow-neon hover:text-glow hover:scale-105"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 text-electric-blue">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <Link
                  href="/dashboard"
                  className="btn-primary px-4 py-2 rounded-lg hover:shadow-glow-blue transition-all duration-300 text-sm font-medium glow-blue hover:scale-105"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/signin"
                  className="btn-primary px-4 py-2 rounded-lg hover:shadow-glow-blue transition-all duration-300 text-sm font-medium glow-blue hover:scale-105 cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-electric-blue hover:text-white focus:outline-none transition-all duration-300 p-2 rounded-lg hover:bg-electric-blue/20 hover:scale-110 hover:shadow-neon"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect-strong border-t border-electric-blue/40 shadow-neon">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-readable hover:text-electric-blue py-2 px-3 rounded-lg hover:bg-electric-blue/15 transition-all duration-300 hover:text-glow hover:translate-x-2"
                onClick={handleMobileLinkClick}
              >
                {item.text}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-electric-blue/30 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-electric-blue px-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block btn-primary py-2 px-4 rounded-lg text-center font-medium glow-blue"
                    onClick={handleMobileLinkClick}
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-electric-blue py-2 px-4 rounded-lg hover:bg-electric-blue/10 text-center border border-electric-blue/30"
                    onClick={handleMobileLinkClick}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signin"
                    className="block bg-blue-gradient text-black py-2 px-4 rounded-lg text-center font-medium glow-blue"
                    onClick={handleMobileLinkClick}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;