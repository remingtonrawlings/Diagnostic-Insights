import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-800 shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo scrolled={scrolled} />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks scrolled={scrolled} currentPath={location.pathname} />
          </nav>
          
          {/* Mobile Toggle */}
          <button 
            className={`md:hidden ${scrolled ? 'text-white' : 'text-gray-700'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-4 space-y-3">
          <MobileNavLinks closeMenu={() => setIsOpen(false)} currentPath={location.pathname} />
        </div>
      </div>
    </header>
  );
};

interface NavLinksProps {
  scrolled: boolean;
  currentPath: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ scrolled, currentPath }) => {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Audit Findings', href: '/audit-findings' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <div key={link.name} className="relative group">
          <Link 
            to={link.href} 
            className={`font-medium ${
              scrolled ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
            } ${currentPath === link.href ? 'text-orange-500' : ''}`}
          >
            {link.name}
          </Link>
        </div>
      ))}
    </>
  );
};

const MobileNavLinks: React.FC<{ closeMenu: () => void; currentPath: string }> = ({ closeMenu, currentPath }) => {
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Audit Findings', href: '/audit-findings' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <div key={link.name}>
          <Link 
            to={link.href} 
            className={`block py-2 text-gray-700 ${currentPath === link.href ? 'text-orange-500 font-semibold' : ''}`}
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Header;