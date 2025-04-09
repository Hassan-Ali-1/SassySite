
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Database, Cookie, BarChart3, FileEdit, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Privacy() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageLayout 
      title="Privacy Policy" 
      description="Our commitment to your privacy. Learn how FitCalc protects your data and ensures your personal information remains secure."
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="bg-green-100 text-gray-800 py-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center px-4"
          >
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-700">
              Your privacy is our priority. We've designed FitCalc with privacy at its core.
            </p>
          </motion.div>
        </div>
        
        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8 flex items-center justify-center text-gray-500"
        >
          <Clock className="h-4 w-4 mr-2" />
          <p>Last updated: {currentDate}</p>
        </motion.div>
        
        {/* Privacy highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Privacy Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Database className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">No Data Collection</h3>
                  <p className="text-gray-600">
                    All calculations are performed locally in your browser. We don't collect, store, 
                    or transmit your personal health information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Cookie className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">No Tracking Cookies</h3>
                  <p className="text-gray-600">
                    We don't use cookies or local storage to track your activity. Your privacy is respected
                    across all our services.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <BarChart3 className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Minimal Anonymous Analytics</h3>
                  <p className="text-gray-600">
                    We use basic, anonymous analytics that can't be traced back to individuals, solely to 
                    improve our calculators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Detailed privacy policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Detailed Privacy Policy</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="data-collection" className="border rounded-lg px-4">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Data Collection</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <p className="text-gray-600 mb-2">
                  FitCalc does not collect, store, or transmit any personal information. All calculations 
                  are performed locally in your browser, and your data is never sent to our servers.
                </p>
                <p className="text-gray-600">
                  We believe that your health information is private and should remain under your control. 
                  This client-side processing approach means your data stays with you.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cookies" className="border rounded-lg px-4">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center">
                  <Cookie className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Cookies & Local Storage</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <p className="text-gray-600 mb-2">
                  We do not use cookies or local storage to track you or your activities. Any preference settings 
                  you choose are stored locally in your browser and can be cleared at any time through your 
                  browser settings.
                </p>
                <p className="text-gray-600">
                  This approach means your settings remain private to your device, and we have no access to them.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="analytics" className="border rounded-lg px-4">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Analytics</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <p className="text-gray-600 mb-2">
                  We use basic, anonymized analytics to understand how our calculators are used in aggregate. 
                  This data is completely anonymous and cannot be traced back to individual users.
                </p>
                <p className="text-gray-600">
                  The analytics help us improve our calculators by understanding which features are most valuable 
                  to users. We collect minimal information such as page views and calculator usage, with no 
                  personal identifiers.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes" className="border rounded-lg px-4">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center">
                  <FileEdit className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Changes to Privacy Policy</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <p className="text-gray-600 mb-2">
                  We may update this privacy policy from time to time. We will notify users of any material 
                  changes by posting the new privacy policy on this page with an updated "last modified" date.
                </p>
                <p className="text-gray-600">
                  We encourage you to review our privacy policy periodically for any changes. Your continued 
                  use of FitCalc after policy changes constitutes acceptance of those changes.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact" className="border rounded-lg px-4">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Third-Party Services</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-4">
                <p className="text-gray-600 mb-2">
                  FitCalc does not integrate with third-party services that would compromise your privacy. 
                  We do not share any data with social networks, advertising platforms, or other external 
                  services.
                </p>
                <p className="text-gray-600">
                  The website may contain links to external sites that are not operated by us. We have no 
                  control over the content and practices of these sites and cannot accept responsibility 
                  for their privacy policies.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </PageLayout>
  );
}
