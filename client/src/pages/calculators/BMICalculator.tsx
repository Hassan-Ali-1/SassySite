import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import BMICalculatorComponent from '@/components/calculators/BMICalculator';
import { Helmet } from 'react-helmet';

export default function BMICalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for BMI Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'BMI Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Calculate your Body Mass Index (BMI) to determine if your weight is in a healthy range for your height.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) to determine if your weight is in a healthy range for your height."
        calculatorName="BMI Calculator"
      >
        <BMICalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}