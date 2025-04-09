import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import HeartRateCalculatorComponent from '@/components/calculators/HeartRateCalculator';
import { Helmet } from 'react-helmet';

export default function HeartRateCalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for Heart Rate Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Heart Rate Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Calculate your maximum heart rate and target heart rate zones for optimizing different types of exercise and workouts.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="Heart Rate Zone Calculator"
        description="Calculate your maximum heart rate and target heart rate zones for optimizing different types of exercise and workouts."
        calculatorName="Heart Rate Calculator"
      >
        <HeartRateCalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}