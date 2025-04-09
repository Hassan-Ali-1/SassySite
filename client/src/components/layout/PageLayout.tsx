import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <>
      <SEO 
        title={title}
        description={description || `${title} - FitCalc Free Weight Management Calculators`}
      />
      <Header />
      <main className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}