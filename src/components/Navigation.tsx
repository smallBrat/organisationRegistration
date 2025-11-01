import React from 'react';
import logo from 'figma:asset/e0963de6c295b8186c8b1123fb023debd5344de7.png';

interface NavigationProps {
  onRegisterClick?: () => void;
  onNavigateHome?: () => void;
  onPricingClick?: () => void;
  isRegistrationPage?: boolean;
}

export function Navigation({ onRegisterClick, onNavigateHome, onPricingClick, isRegistrationPage }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={onNavigateHome}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <div className="text-[#0d1b2a]">
            <img src={logo} alt="VELRIC Logo" width="32" height="32" />
          </div>
          <span className="ml-3 text-[#0d1b2a] tracking-wider" style={{ fontWeight: '700' }}>VELRIC</span>
        </button>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" onClick={(e) => { if (isRegistrationPage) { e.preventDefault(); onNavigateHome?.(); }}} className="text-[#0d1b2a] hover:text-[#007bff] transition-colors">
            Home
          </a>
          <a href="#features" onClick={(e) => { if (isRegistrationPage) { e.preventDefault(); onNavigateHome?.(); }}} className="text-[#0d1b2a] hover:text-[#007bff] transition-colors">
            Features
          </a>
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              if (isRegistrationPage) { 
                onNavigateHome?.(); 
              } else {
                onPricingClick?.(); 
              }
            }} 
            className="text-[#0d1b2a] hover:text-[#007bff] transition-colors"
            style={{ fontWeight: '400' }}
          >
            Pricing
          </button>
          <a href="#partners" className="text-[#0d1b2a] hover:text-[#007bff] transition-colors">
            Partners
          </a>
        </div>

        {/* Register Button */}
        <button 
          onClick={onRegisterClick}
          className="bg-[#007bff] text-white px-6 py-2.5 rounded-lg hover:bg-[#0066e6] transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Register
        </button>
      </div>
    </nav>
  );
}
