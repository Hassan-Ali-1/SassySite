import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import BodyFatCalculatorComponent from '@/components/calculators/BodyFatCalculator';
import { Helmet } from 'react-helmet';

export default function BodyFatCalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for Body Fat Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Body Fat Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Estimate your body fat percentage using various methods including Navy method and skinfold measurements.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="Body Fat Calculator"
        description="Estimate your body fat percentage using various methods including Navy method and skinfold measurements."
        calculatorName="Body Fat Calculator"
      >
        <BodyFatCalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}