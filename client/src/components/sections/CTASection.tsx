import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-sans font-bold text-3xl mb-4">Ready to start your health journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Our free calculators are here to help you set realistic goals and track your progress.</p>
        <a href="#calculators">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 transition-colors shadow-lg"
          >
            Try Our Calculators
          </Button>
        </a>
      </div>
    </section>
  );
}
