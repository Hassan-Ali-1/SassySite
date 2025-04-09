
import PageLayout from '@/components/layout/PageLayout';
import { Heart, Globe, BarChart4, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Mission() {
  const values = [
    {
      title: "Accessibility",
      description: "Health information should be free and accessible to everyone, regardless of economic status.",
      icon: <Globe className="h-8 w-8 text-primary" />
    },
    {
      title: "Accuracy",
      description: "We're committed to providing scientifically accurate tools that follow established health formulas and guidelines.",
      icon: <BarChart4 className="h-8 w-8 text-primary" />
    },
    {
      title: "Privacy",
      description: "Your data stays in your browser - we never store or track your personal information.",
      icon: <Lock className="h-8 w-8 text-primary" />
    },
    {
      title: "Empowerment",
      description: "We believe informed individuals can make better decisions about their health and wellness journey.",
      icon: <Heart className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <PageLayout 
      title="Our Mission" 
      description="Empowering individuals with accessible tools and accurate information for their health journey."
    >
      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Empowering Health Decisions</h2>
          <p className="text-gray-600 leading-relaxed">
            At FitCalc, we believe that accurate health information should be accessible to everyone. 
            Our mission is to provide free, reliable weight management tools that help you make informed 
            decisions about your health journey without barriers or paywalls.
          </p>
          <p className="text-gray-600 leading-relaxed">
            In a world where health information is often locked behind expensive apps or services, 
            we're committed to democratizing access to basic health calculations and insights, enabling 
            individuals globally to better understand their bodies and track their progress.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-t-4 border-t-primary hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Why We're Different</h2>
          <p className="text-gray-600 leading-relaxed">
            Unlike many health platforms, we don't collect or store your personal data. All calculations 
            happen right in your browser, ensuring complete privacy. We're also committed to education – 
            not just providing numbers, but explaining what they mean and how you can use them to improve 
            your wellbeing.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our calculators are designed to be easy to use but scientifically accurate, striking a 
            balance between simplicity and reliability that makes them valuable for both beginners 
            and those experienced in health and fitness.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
