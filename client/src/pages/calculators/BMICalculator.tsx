import CalculatorPageLayout from '@/components/layout/CalculatorPageLayout';
import BMICalculator from '@/components/calculators/BMICalculator';

export default function BMICalculatorPage() {
  return (
    <CalculatorPageLayout
      title="BMI Calculator" 
      description="Calculate your Body Mass Index (BMI) and see where you fall on the BMI scale. Our free BMI calculator uses the standard formula to determine if you're underweight, normal weight, overweight, or obese."
      calculatorType="bmi"
      keywords="BMI calculator, body mass index, healthy weight calculator, BMI formula, BMI chart, weight health calculator"
    >
      <BMICalculator />
    </CalculatorPageLayout>
  );
}