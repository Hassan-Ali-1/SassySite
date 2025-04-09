import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import IdealWeightCalculatorComponent from '@/components/calculators/IdealWeightCalculator';
import { Helmet } from 'react-helmet';

export default function IdealWeightCalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for Ideal Weight Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Ideal Weight Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Calculate your ideal weight range based on height, gender, and body frame using scientifically validated formulas.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="Ideal Weight Calculator"
        description="Calculate your ideal weight range based on height, gender, and body frame using scientifically validated formulas."
        calculatorName="Ideal Weight Calculator"
      >
        <IdealWeightCalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}