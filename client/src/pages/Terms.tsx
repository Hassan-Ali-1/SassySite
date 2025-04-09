
import PageLayout from '@/components/layout/PageLayout';
import { AlertTriangle, CheckCircle2, FileWarning, Scale, Stethoscope, ShieldCheck, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Terms() {
  const terms = [
    {
      id: 1,
      title: "Use of Calculators",
      icon: <Scale className="h-6 w-6 text-primary" />,
      content: "Our calculators provide estimates based on general formulas. Results should be used as guidelines only and not as definitive medical advice. The calculations are meant to be informative and educational, helping you understand general health metrics based on established formulas."
    },
    {
      id: 2,
      title: "Medical Disclaimer",
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      content: "FitCalc is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions, especially regarding diet, exercise, or any health-related matters. Never disregard professional medical advice or delay seeking it based on information from our calculators."
    },
    {
      id: 3,
      title: "Accuracy",
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
      content: "While we strive for accuracy by using scientifically established formulas, we make no guarantees about the results provided by our calculators. Individual results may vary significantly based on factors like age, medical conditions, body composition, and other personal characteristics that generic calculators cannot account for."
    },
    {
      id: 4,
      title: "User Conduct",
      icon: <User className="h-6 w-6 text-primary" />,
      content: "Users agree not to misuse the service or attempt to access it using automated means. This includes but is not limited to excessive requests, scraping, or any activity that may negatively impact the service's performance or accessibility for others. Please use the service as intended - as a personal health calculation tool."
    },
    {
      id: 5,
      title: "Privacy",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      content: "As detailed in our Privacy Policy, all calculations take place on your device. We do not store or process your personal health data. While this ensures your privacy, it also means you are responsible for saving any results you wish to keep for future reference."
    },
    {
      id: 6,
      title: "Changes to Terms",
      icon: <FileWarning className="h-6 w-6 text-primary" />,
      content: "We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the updated terms on this page. Your continued use of the service after changes indicates your acceptance of the revised terms."
    }
  ];

  return (
    <PageLayout 
      title="Terms of Use" 
      description="Please read these terms carefully before using our calculators."
    >
      <div className="space-y-8">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription className="flex items-center text-amber-800">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            <span>By using FitCalc's calculators, you agree to these terms. Please read them carefully.</span>
          </AlertDescription>
        </Alert>

        <p className="text-gray-600 leading-relaxed">
          These Terms of Use govern your use of the FitCalc website and calculators. 
          They explain our limitations, your responsibilities, and important disclaimers 
          about the nature of the information we provide.
        </p>

        <div className="space-y-6">
          {terms.map((term) => (
            <Card key={term.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="p-6 flex items-center md:items-start bg-gray-50 md:w-1/4">
                    <div className="mr-4">{term.icon}</div>
                    <h2 className="text-lg font-semibold">{term.id}. {term.title}</h2>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <p className="text-gray-600 leading-relaxed">{term.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">By Using Our Service, You Acknowledge:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-amber-500 mt-1 mr-2">⚠</span>
              <p className="text-gray-700">The calculators provide estimates only and should not replace professional medical advice.</p>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mt-1 mr-2">⚠</span>
              <p className="text-gray-700">Results may vary based on individual factors not accounted for in these general formulas.</p>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 mt-1 mr-2">⚠</span>
              <p className="text-gray-700">You should consult a healthcare professional before making health or fitness decisions.</p>
            </li>
          </ul>
        </div>

        <Separator />

        <p className="text-sm text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </PageLayout>
  );
}
