import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import WeightTimelineCalculatorComponent from '@/components/calculators/WeightTimelineCalculator';
import { Helmet } from 'react-helmet';

export default function WeightTimelineCalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for Weight Timeline Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Weight Timeline Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Plan your weight management journey by calculating a realistic timeline to reach your target weight based on healthy weight loss principles.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="Weight Timeline Calculator"
        description="Plan your weight management journey by calculating a realistic timeline to reach your target weight based on healthy weight loss principles."
        calculatorName="Weight Timeline Calculator"
      >
        <WeightTimelineCalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}