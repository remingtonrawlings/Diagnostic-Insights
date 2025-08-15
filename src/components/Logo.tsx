import React from 'react';

interface LogoProps {
  scrolled: boolean;
}

const Logo: React.FC<LogoProps> = ({ scrolled }) => {
  const initialLogo = "https://interfaces-cdn.zapier.com/3bd0bacb-6f98-41e7-98c7-0e6fae14b251/1vLABShorizontal09.png";
  const scrolledLogo = "https://interfaces-cdn.zapier.com/20169154-0c6b-4ca7-8e9a-7cb5d8b609b9/1vLABShorizontal08.png";
  
  return (
    <div className="flex items-center">
      <img 
        src={scrolled ? scrolledLogo : initialLogo} 
        alt="OneViewLabs Logo" 
        className="h-8 transition-all duration-300"
      />
    </div>
  );
};

export default Logo;