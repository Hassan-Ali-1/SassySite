
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldCheck, Lock, BarChart, Bell, Eye, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

export default function Privacy() {
  const privacyTopics = [
    {
      id: "data-collection",
      title: "Data Collection",
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      content: "FitCalc does not collect, store, or transmit any personal information. All calculations are performed locally in your browser, and your data is never sent to our servers. We prioritize your privacy by keeping your health metrics completely confidential."
    },
    {
      id: "cookies",
      title: "Cookies & Local Storage",
      icon: <Lock className="h-5 w-5 text-primary" />,
      content: "We do not use cookies or local storage to track you or your behavior. Any preference settings are stored locally in your browser and can be cleared at any time through your browser settings. We don't need to remember your data between sessions to provide our services."
    },
    {
      id: "analytics",
      title: "Anonymous Analytics",
      icon: <BarChart className="h-5 w-5 text-primary" />,
      content: "We use basic, anonymized analytics to understand how our calculators are used in aggregate. This data cannot be traced back to individual users and only helps us improve our service. We only collect non-identifying information such as which calculators are most frequently used."
    },
    {
      id: "third-parties",
      title: "Third-Party Services",
      icon: <Eye className="h-5 w-5 text-primary" />,
      content: "FitCalc does not share any information with third parties. We do not integrate with external services that would compromise your privacy or require data transfer. Our calculators work independently without needing external connections."
    },
    {
      id: "changes",
      title: "Changes to Privacy Policy",
      icon: <Bell className="h-5 w-5 text-primary" />,
      content: "We may update this privacy policy from time to time. We will notify users of any material changes by posting the new privacy policy on this page. Major changes will be highlighted to ensure transparency about how we protect your information."
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: <FileText className="h-5 w-5 text-primary" />,
      content: "If you have any questions or concerns about our privacy practices, you can contact us through the links in the footer. We're committed to addressing any privacy concerns promptly and transparently."
    }
  ];

  return (
    <PageLayout 
      title="Privacy Policy" 
      description="Your privacy matters. Learn how FitCalc protects your data and ensures your personal information stays private."
    >
      <div className="space-y-8">
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="flex items-center text-green-800">
            <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
            <span>
              <strong>Your data never leaves your device.</strong> All calculations are performed locally in your browser.
            </span>
          </AlertDescription>
        </Alert>

        <div>
          <p className="text-gray-600 mb-2 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            At FitCalc, we're committed to protecting your privacy. We've designed our service 
            to provide valuable health tools without compromising your personal information.
            This policy explains our approach to data privacy and how we ensure your information
            remains secure.
          </p>
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {privacyTopics.map((topic) => (
                <AccordionItem key={topic.id} value={topic.id} className="border-b last:border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center text-left">
                      <div className="mr-3">{topic.icon}</div>
                      <span className="font-medium">{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600 pl-8 leading-relaxed">
                      {topic.content}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="font-semibold text-lg mb-3">Privacy Summary</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              No personal data collection
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              No cookies or tracking
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              All calculations performed locally
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              No data sharing with third parties
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
