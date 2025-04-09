import { Link } from 'wouter';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <PageLayout 
      title="Page Not Found" 
      description="We couldn't find the page you were looking for."
    >
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold mt-6 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="gap-2"
            >
              <Link href="/">
                <Home className="h-5 w-5" />
                Return Home
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
            >
              <Link href="/#calculators">
                Browse Calculators
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}