import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-white text-3xl"><i className="fas fa-calculator"></i></span>
              <span className="font-sans font-bold text-xl">FitCalc</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Free weight management calculators to help you reach your health and fitness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-sans font-semibold text-lg mb-4">Calculators</h3>
              <ul className="space-y-2">
                <li><a href="#calculators" className="text-gray-400 hover:text-white transition-colors">BMI Calculator</a></li>
                <li><a href="#calculators" className="text-gray-400 hover:text-white transition-colors">Ideal Weight Calculator</a></li>
                <li><a href="#calculators" className="text-gray-400 hover:text-white transition-colors">Calorie Calculator</a></li>
                <li><a href="#calculators" className="text-gray-400 hover:text-white transition-colors">Body Fat Calculator</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-sans font-semibold text-lg mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-sans font-semibold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-pinterest"></i></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center md:text-left">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} FitCalc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
