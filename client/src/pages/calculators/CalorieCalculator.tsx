import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import CalorieCalculatorComponent from '@/components/calculators/CalorieCalculator';
import { Helmet } from 'react-helmet';

export default function CalorieCalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for Calorie Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Calorie Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Calculate your daily calorie needs based on your age, gender, weight, height, and activity level to maintain, lose, or gain weight.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="Calorie Calculator"
        description="Calculate your daily calorie needs based on your age, gender, weight, height, and activity level to maintain, lose, or gain weight."
        calculatorName="Calorie Calculator"
      >
        <CalorieCalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}