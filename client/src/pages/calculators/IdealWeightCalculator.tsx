import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import IdealWeightCalculator from '@/components/calculators/IdealWeightCalculator';

export default function IdealWeightCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Ideal Weight Calculator" 
      description="Discover your ideal body weight range based on your height, sex, and frame size. Our calculator uses multiple scientifically validated formulas to provide a comprehensive range."
      calculatorType="ideal-weight"
      keywords="ideal weight calculator, healthy weight range, ideal body weight, weight for height, frame size calculator"
    >
      <IdealWeightCalculator />
    </CalculatorPageLayout>
  );
}