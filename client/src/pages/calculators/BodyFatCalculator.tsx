import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import BodyFatCalculator from '@/components/calculators/BodyFatCalculator';
import { getCalculatorStructuredData, StructuredData } from '@/lib/seoUtils';

export default function BodyFatCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Body Fat Calculator" 
      description="Estimate your body fat percentage using different measurement methods. Our calculator offers both the Navy method and skinfold method to give you an accurate assessment of your body composition."
      calculatorType="body-fat"
      keywords="body fat calculator, body fat percentage, body composition, navy method calculator, skinfold calculator"
    >
      
      <BodyFatCalculator />
    </CalculatorPageLayout>
  );
}