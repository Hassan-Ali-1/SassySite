
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';

export default function Mission() {
  return (
    <PageLayout title="Our Mission">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <section>
          <h2 className="text-2xl font-semibold mb-4">Empowering Health Decisions</h2>
          <p className="text-gray-600">
            At FitCalc, we believe that accurate health information should be accessible to everyone. 
            Our mission is to provide free, reliable weight management tools that help you make informed 
            decisions about your health journey.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <strong>Accuracy:</strong>
                <p className="text-gray-600">
                  We use scientifically validated formulas and provide clear explanations for all calculations.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <strong>Privacy:</strong>
                <p className="text-gray-600">
                  Your data stays in your browser - we never store or track your personal information.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <div>
                <strong>Accessibility:</strong>
                <p className="text-gray-600">
                  Our tools are free and available to everyone, with clear visual results and explanations.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </motion.div>
    </PageLayout>
  );
}
