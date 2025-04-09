import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import WaistHipCalculatorComponent from '@/components/calculators/WaistHipCalculator';
import { Helmet } from 'react-helmet';

export default function WaistHipCalculatorPage() {
  return (
    <>
      <Helmet>
        {/* Structured data for Waist-Hip Ratio Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Waist-Hip Ratio Calculator',
            'applicationCategory': 'HealthApplication',
            'operatingSystem': 'Web',
            'description': 'Calculate your waist-to-hip ratio to assess your body fat distribution and potential health risks associated with abdominal obesity.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            }
          })}
        </script>
      </Helmet>
      
      <CalculatorPageLayout
        title="Waist-Hip Ratio Calculator"
        description="Calculate your waist-to-hip ratio to assess your body fat distribution and potential health risks associated with abdominal obesity."
        calculatorName="Waist-Hip Ratio Calculator"
      >
        <WaistHipCalculatorComponent />
      </CalculatorPageLayout>
    </>
  );
}