import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import WeightTimelineCalculator from '@/components/calculators/WeightTimelineCalculator';
import { getCalculatorStructuredData, StructuredData } from '@/lib/seoUtils';

export default function WeightTimelineCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Weight Timeline Calculator" 
      description="Plan your weight loss or gain journey with a realistic timeline projection. Our calculator shows you how long it will take to reach your goal weight based on your current weight and planned calorie changes."
      calculatorType="weight-timeline"
      keywords="weight timeline calculator, weight loss timeline, goal weight date, weight loss planner, weight gain calculator"
    >
      
      <WeightTimelineCalculator />
    </CalculatorPageLayout>
  );
}