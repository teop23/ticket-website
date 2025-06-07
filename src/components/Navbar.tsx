import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { navigation } from '../config/content';
import ticketBanner from '../assets/ticket_banner_cropped_transparent.png';
import { scrollToSection } from '../utils/scroll';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/');
  };
  
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (href.startsWith('#')) {
      const isHome = window.location.pathname === '/';
      if (!isHome) {
        setIsNavigating(true);
        navigate('/');
        setTimeout(() => {
          scrollToSection(href.slice(1));
          setIsNavigating(false);
        }, 100);
      } else {
        scrollToSection(href.slice(1));
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 py-2 shadow-lg' : 'bg-transparent py-3'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" onClick={handleLogoClick}>
            <img src={ticketBanner} alt="Power Millions" className="h-6 sm:h-8 md:h-10" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.items.map((item) => (
              <Link
                key={item.label} 
                to={item.href}
                className="font-medium text-lg text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-4 px-4 bg-white/95 dark:bg-gray-900/95 rounded-lg shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navigation.items.map((item) => (
                <Link
                  key={item.label} 
                  to={item.href}
                  className="font-medium text-lg text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};