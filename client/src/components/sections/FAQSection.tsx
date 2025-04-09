import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-sans font-semibold focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
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
      answer: "For weight tracking, checking once every 2-4 weeks is usually sufficient. Body composition measurements like body fat percentage might be checked monthly or quarterly. Remember that healthy changes take time, and frequent measurements can sometimes cause unnecessary stress or focus on short-term fluctuations rather than long-term trends."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-sans font-bold text-3xl text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
