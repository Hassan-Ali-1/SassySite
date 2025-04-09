
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { HelpCircle, Search, PieChart, Server, Eye, Baby, Clock, Calculator, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FAQ() {
  const faqs = [
    {
      question: "How accurate are these calculators?",
      answer: "Our calculators use scientifically validated formulas that provide good estimates for most people. However, they are general tools and not substitutes for professional medical advice. Individual factors like muscle mass, bone density, and specific health conditions can affect the accuracy of these calculations for your particular situation.",
      icon: <PieChart className="h-5 w-5 text-primary" />
    },
    {
      question: "Is my data stored on your servers?",
      answer: "No. We don't store any of your personal information. All calculations happen directly in your browser, and the data you enter is never sent to our servers. When you close your browser, the information is gone.",
      icon: <Server className="h-5 w-5 text-primary" />
    },
    {
      question: "How should I interpret the results?",
      answer: "Each calculator includes a guide to help you understand your results. Generally, these tools provide estimates and ranges rather than exact targets. Use them as a starting point, and remember that healthy ranges can vary based on individual factors. For personalized health advice, consult with a healthcare professional.",
      icon: <Eye className="h-5 w-5 text-primary" />
    },
    {
      question: "Can I use these calculators for children or teenagers?",
      answer: "These calculators are primarily designed for adults. For children and teenagers, different formulas and considerations apply due to their ongoing growth and development. We recommend consulting with a pediatrician or healthcare provider for appropriate health assessments for young people.",
      icon: <Baby className="h-5 w-5 text-primary" />
    },
    {
      question: "How often should I use these calculators?",
      answer: "For weight tracking, checking once every 2-4 weeks is usually sufficient. Body composition measurements like body fat percentage might be checked monthly or quarterly. Remember that healthy changes take time, and frequent measurements can sometimes cause unnecessary stress.",
      icon: <Clock className="h-5 w-5 text-primary" />
    },
    {
      question: "Which calculator should I start with?",
      answer: "If you're new to fitness tracking, start with the BMI calculator for a basic health assessment. For weight management, the Calorie calculator can help you understand your daily energy needs. If you're focused on fitness goals, the Body Fat calculator provides more detailed body composition information than BMI alone.",
      icon: <Calculator className="h-5 w-5 text-primary" />
    },
    {
      question: "Are these calculators suitable for athletes?",
      answer: "Athletes often have higher muscle mass and lower body fat percentages than the general population. While our calculators can still provide useful information, keep in mind that standard formulas might not fully account for an athlete's unique body composition. The Body Fat calculator is generally more useful for athletes than BMI.",
      icon: <Activity className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <PageLayout 
      title="Frequently Asked Questions" 
      description="Find answers to common questions about FitCalc's health and fitness calculators, data privacy, and result interpretation."
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary to-primary-foreground text-white py-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center px-4"
          >
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-16 w-16" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our calculators
            </p>
          </motion.div>
        </div>
        
        {/* Search section - This is just UI, not functional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Have a Question?</CardTitle>
              <CardDescription>Browse our frequently asked questions below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled  // This is just for UI display purposes
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline bg-gray-50">
                  <div className="flex items-center text-left">
                    <span className="mr-3">{faq.icon}</span>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Still Have Questions?</h3>
                <p className="text-gray-600 mb-4">
                  If you couldn't find the answer you were looking for, please check our
                  detailed calculator pages for more information about each specific calculation.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
