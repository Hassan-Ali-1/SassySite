
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  ShieldCheck, 
  HelpCircle, 
  BarChart, 
  Clock, 
  Baby, 
  Smartphone, 
  Share2 
} from 'lucide-react';

export default function FAQ() {
  const faqCategories = [
    {
      id: "general",
      label: "General Questions",
      icon: <HelpCircle className="h-4 w-4" />,
      items: [
        {
          question: "How accurate are these calculators?",
          answer: "Our calculators use scientifically validated formulas that provide good estimates for most people. However, they are general tools and not substitutes for professional medical advice. Individual factors like muscle mass, bone density, and specific health conditions can affect the accuracy of these calculations for your particular situation.",
          icon: <BarChart className="h-5 w-5 text-primary" />
        },
        {
          question: "Is my data stored on your servers?",
          answer: "No. We don't store any of your personal information. All calculations happen directly in your browser, and the data you enter is never sent to our servers. When you close your browser, the information is gone.",
          icon: <ShieldCheck className="h-5 w-5 text-primary" />
        },
        {
          question: "How should I interpret the results?",
          answer: "Each calculator includes a guide to help you understand your results. Generally, these tools provide estimates and ranges rather than exact targets. Use them as a starting point, and remember that healthy ranges can vary based on individual factors. For personalized health advice, consult with a healthcare professional.",
          icon: <Calculator className="h-5 w-5 text-primary" />
        }
      ]
    },
    {
      id: "usage",
      label: "Usage Questions",
      icon: <Clock className="h-4 w-4" />,
      items: [
        {
          question: "How often should I use these calculators?",
          answer: "For weight tracking, checking once every 2-4 weeks is usually sufficient. Body composition measurements like body fat percentage might be checked monthly or quarterly. Remember that healthy changes take time, and frequent measurements can sometimes cause unnecessary stress or focus on short-term fluctuations rather than long-term trends.",
          icon: <Clock className="h-5 w-5 text-primary" />
        },
        {
          question: "Can I use these calculators for children or teenagers?",
          answer: "These calculators are primarily designed for adults. For children and teenagers, different formulas and considerations apply due to their ongoing growth and development. We recommend consulting with a pediatrician or healthcare provider for appropriate health assessments for young people.",
          icon: <Baby className="h-5 w-5 text-primary" />
        },
        {
          question: "Do the calculators work on mobile devices?",
          answer: "Yes, all of our calculators are fully responsive and work on smartphones, tablets, and desktop computers. The interface automatically adjusts to provide an optimal experience on any screen size.",
          icon: <Smartphone className="h-5 w-5 text-primary" />
        },
        {
          question: "Can I share my results with others?",
          answer: "Yes, each calculator has a share button that allows you to share your results. You can share directly if your device supports the Web Share API, or copy a link to share via your preferred method. Your personal data is never included in shared links - only the final calculated results.",
          icon: <Share2 className="h-5 w-5 text-primary" />
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => category.items);

  return (
    <PageLayout 
      title="Frequently Asked Questions" 
      description="Find answers to common questions about our calculators and how to use them effectively."
    >
      <div className="space-y-8">
        <p className="text-gray-600 leading-relaxed">
          We've compiled answers to the most common questions about our calculators and their use. 
          If you don't find the answer you're looking for, feel free to contact us.
        </p>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="all" className="flex-1">All Questions</TabsTrigger>
            {faqCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="flex-1 flex items-center justify-center"
              >
                <span className="mr-2">{category.icon}</span>
                <span>{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {allFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0">
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center text-left">
                          <div className="mr-3">{faq.icon}</div>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 pl-8 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          {faqCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`} className="border-b last:border-0">
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                          <div className="flex items-center text-left">
                            <div className="mr-3">{faq.icon}</div>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-gray-600 pl-8 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Still have questions?</h3>
          <p className="text-gray-600">
            If you didn't find the answer to your question, feel free to reach out to us. We're 
            always happy to help and appreciate your feedback on how we can improve our calculators.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
