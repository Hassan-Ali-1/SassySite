import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-sans font-bold text-4xl md:text-5xl mb-6">Free Weight Management Calculators</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">Accurate, helpful tools to support your health and fitness journey</p>
          <a href="#calculators">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-primary-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
