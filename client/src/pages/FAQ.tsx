
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    {
      question: "How accurate are these calculators?",
      answer: "Our calculators use scientifically validated formulas that provide good estimates for most people. However, they are general tools and not substitutes for professional medical advice. Individual factors like muscle mass, bone density, and specific health conditions can affect the accuracy of these calculations for your particular situation."
    },
    {
      question: "Is my data stored on your servers?",
      answer: "No. We don't store any of your personal information. All calculations happen directly in your browser, and the data you enter is never sent to our servers. When you close your browser, the information is gone."
    },
    {
      question: "How should I interpret the results?",
      answer: "Each calculator includes a guide to help you understand your results. Generally, these tools provide estimates and ranges rather than exact targets. Use them as a starting point, and remember that healthy ranges can vary based on individual factors. For personalized health advice, consult with a healthcare professional."
    },
    {
      question: "Can I use these calculators for children or teenagers?",
      answer: "These calculators are primarily designed for adults. For children and teenagers, different formulas and considerations apply due to their ongoing growth and development. We recommend consulting with a pediatrician or healthcare provider for appropriate health assessments for young people."
    },
    {
      question: "How often should I use these calculators?",
      answer: "For weight tracking, checking once every 2-4 weeks is usually sufficient. Body composition measurements like body fat percentage might be checked monthly or quarterly. Remember that healthy changes take time, and frequent measurements can sometimes cause unnecessary stress."
    }
  ];

  return (
    <PageLayout title="Frequently Asked Questions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </PageLayout>
  );
}
