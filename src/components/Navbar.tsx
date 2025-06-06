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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
      isScrolled ? 'bg-white/80 py-1 shadow-lg' : 'bg-transparent py-2'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <img src="/src/assets/ticket_banner_cropped_transparent.png" alt="Power Millions" className="h-8 md:h-10" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.items.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className={`font-medium transition-all duration-300 ${
                  isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-200'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
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
                <a 
                  key={item.label} 
                  href={item.href}
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-200'
                  }`}
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