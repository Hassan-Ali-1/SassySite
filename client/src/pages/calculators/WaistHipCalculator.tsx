import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import WaistHipCalculator from '@/components/calculators/WaistHipCalculator';
import { getCalculatorStructuredData, StructuredData } from '@/lib/seoUtils';

export default function WaistHipCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Waist-to-Hip Ratio Calculator" 
      description="Calculate your waist-to-hip ratio and assess potential health risks associated with body fat distribution. This simple measurement can provide important insights about your cardiovascular risk profile."
      calculatorType="waist-hip"
      keywords="waist to hip ratio calculator, WHR calculator, body fat distribution, waist circumference, health risk calculator"
    >
      
      <WaistHipCalculator />
    </CalculatorPageLayout>
  );
}