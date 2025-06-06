import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { navigation } from '../config/content';
import { scrollToSection } from '../utils/scroll';

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
      isScrolled ? 'bg-white/80 py-1 shadow-lg' : 'bg-transparent py-2'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" onClick={handleLogoClick}>
            <img src="/src/assets/ticket_banner_cropped_transparent.png" alt="Power Millions" className="h-8 md:h-10" />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.items.map((item) => (
              <Link
                key={item.label} 
                to={item.href}
                className="font-medium text-lg text-red-600 hover:text-red-800 transition-all duration-300"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navigation.items.map((item) => (
                <Link
                  key={item.label} 
                  to={item.href}
                  className="font-medium text-lg text-red-600 hover:text-red-800 transition-colors"
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