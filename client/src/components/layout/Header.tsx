import { useState } from 'react';
import { Link } from 'wouter';
import { 
  SquareMenu, 
  X, 
  ChevronDown,
  Weight,
  Scale,
  Flame,
  Percent,
  Heart,
  Calendar,
  Ruler
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [calculatorsDropdownOpen, setCalculatorsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setCalculatorsDropdownOpen(false);
  };
  
  const toggleCalculatorsDropdown = () => {
    setCalculatorsDropdownOpen(!calculatorsDropdownOpen);
  };
  
  const calculators = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      icon: <Weight className="h-4 w-4" />
    },
    {
      id: 'ideal-weight',
      title: 'Ideal Weight Calculator',
      icon: <Scale className="h-4 w-4" />
    },
    {
      id: 'calorie',
      title: 'Calorie Calculator',
      icon: <Flame className="h-4 w-4" />
    },
    {
      id: 'body-fat',
      title: 'Body Fat Calculator',
      icon: <Percent className="h-4 w-4" />
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zone Calculator',
      icon: <Heart className="h-4 w-4" />
    },
    {
      id: 'weight-timeline',
      title: 'Weight Timeline Calculator',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: 'waist-hip',
      title: 'Waist-Hip Ratio Calculator',
      icon: <Ruler className="h-4 w-4" />
    }
  ];

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
          
          {/* Calculators Dropdown */}
          <div className="relative">
            <button 
              className="font-medium text-gray-700 hover:text-primary transition-colors flex items-center gap-1"
              onClick={toggleCalculatorsDropdown}
            >
              Calculators <ChevronDown className="h-4 w-4" />
            </button>
            
            {calculatorsDropdownOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-md rounded-md py-2 w-64 z-10 border border-gray-100">
                {calculators.map(calculator => (
                  <Link 
                    key={calculator.id} 
                    href={`/calculators/${calculator.id}`}
                    onClick={() => setCalculatorsDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
                      <div className="text-primary">{calculator.icon}</div>
                      <span className="font-medium">{calculator.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link href="/mission" className="font-medium text-gray-700 hover:text-primary transition-colors">About</Link>
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
            <Link href="/">
              <span 
                className="block font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </span>
            </Link>
            <div>
              <button 
                className="w-full text-left font-medium text-gray-700 hover:text-primary transition-colors flex items-center justify-between"
                onClick={toggleCalculatorsDropdown}
              >
                <span>Calculators</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${calculatorsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {calculatorsDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {calculators.map(calculator => (
                    <Link 
                      key={calculator.id} 
                      href={`/calculators/${calculator.id}`}
                      onClick={() => {
                        setCalculatorsDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2 py-1 hover:text-primary transition-colors">
                        <div className="text-primary">{calculator.icon}</div>
                        <span>{calculator.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/mission">
              <span 
                className="block font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </span>
            </Link>
            <Link href="/faq">
              <span 
                className="block font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
