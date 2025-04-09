import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-green-100 text-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="font-sans font-bold text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Free Weight Management Calculators
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Accurate, helpful tools to support your health and fitness journey
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#calculators">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-primary font-medium px-8 py-6 h-auto rounded-lg transition-all shadow-lg"
              >
                Get Started <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
