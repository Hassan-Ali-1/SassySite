import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/ui/button';
import { 
  Weight, 
  Scale, 
  Flame, 
  Percent, 
  Heart, 
  Calendar, 
  Ruler 
} from 'lucide-react';

export default function CalculatorSelection() {
  const { openCalculator } = useModal();

  const calculators = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and see where you fall on the BMI scale.',
      icon: <Weight className="h-16 w-16" />,
      color: 'from-green-500 to-green-600',
      buttonColor: 'bg-primary hover:bg-primary/90'
    },
    {
      id: 'ideal-weight',
      title: 'Ideal Weight Calculator',
      description: 'Discover your ideal body weight range based on your height and frame size.',
      icon: <Scale className="h-16 w-16" />,
      color: 'from-blue-500 to-blue-600',
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'calorie',
      title: 'Calorie Calculator',
      description: 'Calculate your daily calorie needs for weight loss, maintenance, or gain.',
      icon: <Flame className="h-16 w-16" />,
      color: 'from-amber-500 to-yellow-500',
      buttonColor: 'bg-amber-500 hover:bg-amber-600'
    },
    {
      id: 'body-fat',
      title: 'Body Fat Calculator',
      description: 'Estimate your body fat percentage using different measurement methods.',
      icon: <Percent className="h-16 w-16" />,
      color: 'from-red-500 to-red-600',
      buttonColor: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zone Calculator',
      description: 'Determine your optimal heart rate zones for fat burning and cardio fitness.',
      icon: <Heart className="h-16 w-16" />,
      color: 'from-pink-500 to-pink-600',
      buttonColor: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      id: 'weight-timeline',
      title: 'Weight Timeline Calculator',
      description: 'Plan your weight loss or gain journey with a realistic timeline projection.',
      icon: <Calendar className="h-16 w-16" />,
      color: 'from-purple-500 to-purple-600',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'waist-hip',
      title: 'Waist-to-Hip Ratio Calculator',
      description: 'Calculate your waist-to-hip ratio and assess potential health risks.',
      icon: <Ruler className="h-16 w-16" />,
      color: 'from-indigo-500 to-indigo-600',
      buttonColor: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ] as const;

  return (
    <section id="calculators" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-sans font-bold text-3xl text-center mb-4">Weight Management Calculators</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Choose from our collection of free calculators to help you reach your health and fitness goals
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <div 
              key={calculator.id}
              className="calculator-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-40 bg-gradient-to-r ${calculator.color} flex items-center justify-center text-white`}>
                {calculator.icon}
              </div>
              <div className="p-6">
                <h3 className="font-sans font-semibold text-xl mb-2">{calculator.title}</h3>
                <p className="text-gray-600 mb-4">{calculator.description}</p>
                <Button 
                  onClick={() => openCalculator(calculator.id as any)}
                  variant="default"
                  className={`w-full ${calculator.buttonColor}`}
                >
                  Open Calculator
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
