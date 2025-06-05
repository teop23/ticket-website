import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { navigation } from '../config/content';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-red-700 py-2' : 'bg-red-700/90 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <img src="/src/assets/ticket_banner_cropped_transparent.png" alt="Power Millions" className="h-10 md:h-12" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.items.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-white font-medium hover:text-red-500 transition-colors"
              >
                {item.label}
              </a>
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
          <div className="md:hidden mt-4 py-4 border-t border-red-600 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navigation.items.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-white font-medium hover:text-red-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};