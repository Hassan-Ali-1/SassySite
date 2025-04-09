import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';

export default function CalorieCalculatorPage() {
  return (
    <CalculatorPageLayout
      title="Calorie Calculator" 
      description="Calculate your daily calorie needs for weight loss, maintenance, or gain. Our calculator considers your age, sex, height, weight, activity level, and goals to give you a personalized calorie target."
      calculatorType="calorie"
      keywords="calorie calculator, daily calorie needs, TDEE calculator, weight management calories, metabolic rate calculator"
    >
      <CalorieCalculator />
    </CalculatorPageLayout>
  );
}