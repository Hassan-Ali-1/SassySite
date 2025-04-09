import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ChevronRight, Home, Calculator } from 'lucide-react';
import SEO from '@/components/SEO';

interface CalculatorPageLayoutProps {
  title: string;
  description: string;
  calculatorType: string;
  children: ReactNode;
  keywords?: string;
}

export default function CalculatorPageLayout({ 
  title, 
  description, 
  calculatorType,
  children,
  keywords
}: CalculatorPageLayoutProps) {
  return (
    <>
      <SEO 
        title={title}
        description={description}
        keywords={keywords}
        ogType="website"
      />
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary to-primary-foreground text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-white/80 mb-4">
              <a href="/" className="hover:text-white flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </a>
              <ChevronRight className="h-4 w-4 mx-2" />
              <a href="/#calculators" className="hover:text-white flex items-center">
                <Calculator className="h-4 w-4 mr-1" />
                Calculators
              </a>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>{title}</span>
            </div>
            <motion.h1 
              className="font-sans font-bold text-3xl md:text-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p 
                className="mt-4 text-white/90 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>
        
        {/* Page Content */}
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}