
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="data-collection">
            <AccordionTrigger>Data Collection</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">
                FitCalc does not collect, store, or transmit any personal information. All calculations 
                are performed locally in your browser, and your data is never sent to our servers.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cookies">
            <AccordionTrigger>Cookies & Local Storage</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">
                We do not use cookies or local storage to track you. Any preference settings are stored 
                locally in your browser and can be cleared at any time.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="analytics">
            <AccordionTrigger>Analytics</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">
                We use basic, anonymized analytics to understand how our calculators are used in aggregate. 
                This data cannot be traced back to individual users.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes">
            <AccordionTrigger>Changes to Privacy Policy</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">
                We may update this privacy policy from time to time. We will notify users of any material 
                changes by posting the new privacy policy on this page.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </PageLayout>
  );
}
