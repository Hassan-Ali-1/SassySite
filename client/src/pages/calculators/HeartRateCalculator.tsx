import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import HeartRateCalculator from '@/components/calculators/HeartRateCalculator';
import { getCalculatorStructuredData, StructuredData } from '@/lib/seoUtils';

export default function HeartRateCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Heart Rate Zone Calculator" 
      description="Determine your optimal heart rate zones for fat burning and cardio fitness. Our calculator uses your age and resting heart rate to create personalized training zones for optimal exercise results."
      calculatorType="heart-rate"
      keywords="heart rate zone calculator, target heart rate, fat burning zone, cardio zone, maximum heart rate calculator"
    >
      
      <HeartRateCalculator />
    </CalculatorPageLayout>
  );
}