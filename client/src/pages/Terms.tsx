
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Terms() {
  return (
    <PageLayout title="Terms of Use">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <Alert>
          <AlertDescription>
            By using FitCalc, you agree to these terms. Please read them carefully.
          </AlertDescription>
        </Alert>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Use of Calculators</h2>
          <p className="text-gray-600">
            Our calculators provide estimates based on general formulas. Results should be used as 
            guidelines only and not as definitive medical advice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Medical Disclaimer</h2>
          <p className="text-gray-600">
            FitCalc is not a substitute for professional medical advice. Always consult with healthcare 
            professionals for medical decisions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Accuracy</h2>
          <p className="text-gray-600">
            While we strive for accuracy, we make no guarantees about the results provided by our 
            calculators. Individual results may vary.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. User Conduct</h2>
          <p className="text-gray-600">
            Users agree not to misuse the service or attempt to access it using automated means.
          </p>
        </section>
      </motion.div>
    </PageLayout>
  );
}
