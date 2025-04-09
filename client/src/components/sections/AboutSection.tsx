import { CheckCircle } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 className="font-sans font-bold text-3xl mb-6">Why We Created FitCalc</h2>
            <p className="text-gray-600 mb-4">
              We believe that accurate information should be accessible to everyone. Our mission is to provide free, reliable weight management tools that empower you to make informed health decisions.
            </p>
            <p className="text-gray-600 mb-4">
              Unlike many other calculator sites, we prioritize:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-gray-600">Your privacy - no data storage, period.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-gray-600">Scientific accuracy with clear explanations.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-gray-600">Visual results that are easy to understand.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary h-5 w-5 mt-1 mr-2" />
                <span className="text-gray-600">Mobile-friendly design that works on any device.</span>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/2 order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" 
              alt="Healthy lifestyle image" 
              className="rounded-lg shadow-lg w-full h-auto" 
              width="700" 
              height="500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
