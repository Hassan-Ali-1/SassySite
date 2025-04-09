import { useState } from 'react';
import { Link } from 'wouter';
import { SquareMenu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-primary text-3xl">
            <i className="fas fa-calculator"></i>
          </span>
          <span className="font-sans font-bold text-xl md:text-2xl text-gray-800">FitCalc</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="font-medium text-gray-700 hover:text-primary transition-colors">Home</Link>
          <Link href="/mission" className="font-medium text-gray-700 hover:text-primary transition-colors">Mission</Link>
          <Link href="/faq" className="font-medium text-gray-700 hover:text-primary transition-colors">FAQ</Link>
        </nav>
        
        {/* Mobile Navigation Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 focus:outline-none" 
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <SquareMenu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link 
              href="/" 
              className="block font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/mission" 
              className="block font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mission
            </Link>
            <Link 
              href="/faq" 
              className="block font-medium text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
