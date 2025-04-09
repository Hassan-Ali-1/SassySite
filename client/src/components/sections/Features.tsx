import { Lock, TrendingUp, CheckCircle } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-sans font-bold text-3xl text-center mb-12">Why Use Our Calculators?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <Lock className="h-12 w-12" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-3">100% Private</h3>
            <p className="text-gray-600">Your data never leaves your device. All calculations happen in your browser, no information is stored.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="text-center p-6">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <TrendingUp className="h-12 w-12" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-3">Visual Results</h3>
            <p className="text-gray-600">Interactive charts and graphs help you understand your data and track your progress.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="text-center p-6">
            <div className="text-primary text-4xl mb-4 flex justify-center">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-3">Science-Based</h3>
            <p className="text-gray-600">Our calculators use scientifically validated formulas and provide realistic, accurate results.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
