import { Button } from '@/components/ui/button';
import { 
  Weight, 
  Scale, 
  Flame, 
  Percent, 
  Heart, 
  Calendar, 
  Ruler,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function CalculatorSelection() {

  const calculators = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and see where you fall on the BMI scale.',
      icon: <Weight className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:bg-green-50',
      buttonColor: 'bg-green-500 hover:bg-green-600 text-white'
    },
    {
      id: 'ideal-weight',
      title: 'Ideal Weight Calculator',
      description: 'Discover your ideal body weight range based on your height and frame size.',
      icon: <Scale className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:bg-blue-50',
      buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white'
    },
    {
      id: 'calorie',
      title: 'Calorie Calculator',
      description: 'Calculate your daily calorie needs for weight loss, maintenance, or gain.',
      icon: <Flame className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-amber-500 to-yellow-500',
      hoverColor: 'hover:bg-amber-50',
      buttonColor: 'bg-amber-500 hover:bg-amber-600 text-white'
    },
    {
      id: 'body-fat',
      title: 'Body Fat Calculator',
      description: 'Estimate your body fat percentage using different measurement methods.',
      icon: <Percent className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:bg-red-50',
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white'
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zone Calculator',
      description: 'Determine your optimal heart rate zones for fat burning and cardio fitness.',
      icon: <Heart className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'hover:bg-pink-50',
      buttonColor: 'bg-pink-500 hover:bg-pink-600 text-white'
    },
    {
      id: 'weight-timeline',
      title: 'Weight Timeline Calculator',
      description: 'Plan your weight loss or gain journey with a realistic timeline projection.',
      icon: <Calendar className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:bg-purple-50',
      buttonColor: 'bg-purple-500 hover:bg-purple-600 text-white'
    },
    {
      id: 'waist-hip',
      title: 'Waist-to-Hip Ratio Calculator',
      description: 'Calculate your waist-to-hip ratio and assess potential health risks.',
      icon: <Ruler className="h-10 w-10 md:h-16 md:w-16" />,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:bg-indigo-50',
      buttonColor: 'bg-indigo-500 hover:bg-indigo-600 text-white'
    }
  ] as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="calculators" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-center mb-4">Weight Management Calculators</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Choose from our collection of free calculators to help you reach your health and fitness goals
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator, index) => (
            <motion.div 
              key={calculator.id}
              className={`calculator-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${calculator.hoverColor} hover:shadow-xl border border-gray-100`}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`px-6 pt-6 pb-4 flex items-center gap-4`}>
                <div className={`rounded-full bg-gradient-to-r ${calculator.color} p-3 flex items-center justify-center text-white`}>
                  {calculator.icon}
                </div>
                <h3 className="font-sans font-semibold text-xl">{calculator.title}</h3>
              </div>
              <div className="px-6 pb-6">
                <p className="text-gray-600 mb-6 min-h-[60px]">{calculator.description}</p>
                <Link href={`/calculators/${calculator.id}`}>
                  <Button 
                    variant="default"
                    className={`w-full ${calculator.buttonColor} font-medium flex items-center justify-center gap-2`}
                  >
                    Open Calculator
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
