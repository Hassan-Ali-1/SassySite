import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { calculateBMI, getBMICategory, getBMICategoryDescription } from '@/lib/calculatorUtils';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'feet'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [categoryDescription, setCategoryDescription] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    
    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }
    
    const calculatedBMI = calculateBMI(heightValue, weightValue, heightUnit, weightUnit);
    const category = getBMICategory(calculatedBMI);
    const description = getBMICategoryDescription(calculatedBMI);
    
    setBmi(calculatedBMI);
    setBmiCategory(category);
    setCategoryDescription(description);
    setShowResults(true);
  };

  // Helper function to get color based on BMI category
  const getCategoryColor = () => {
    if (bmiCategory === 'Underweight') return 'bg-blue-500';
    if (bmiCategory === 'Normal weight') return 'bg-green-500';
    if (bmiCategory === 'Overweight') return 'bg-yellow-500';
    if (bmiCategory === 'Obese Class I') return 'bg-orange-500';
    if (bmiCategory === 'Obese Class II') return 'bg-red-500';
    return 'bg-red-600';
  };

  // Helper function to get text color based on BMI category
  const getCategoryTextColor = () => {
    if (bmiCategory === 'Underweight') return 'text-blue-500';
    if (bmiCategory === 'Normal weight') return 'text-green-500';
    if (bmiCategory === 'Overweight') return 'text-yellow-600';
    if (bmiCategory === 'Obese Class I') return 'text-orange-500';
    if (bmiCategory === 'Obese Class II') return 'text-red-500';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Calculate Your BMI</h3>
        
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <Label htmlFor="bmi-height">Height</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="bmi-height"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder={heightUnit === 'cm' ? 'Height in cm' : 'Height in feet'}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <Select 
                  value={heightUnit} 
                  onValueChange={(value) => setHeightUnit(value as 'cm' | 'feet')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="feet">feet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {heightUnit === 'feet' && (
              <p className="text-xs text-gray-500 mt-1">
                Use decimal for inches (e.g., 5.75 for 5'9")
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="bmi-weight">Weight</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="bmi-weight"
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder={weightUnit === 'kg' ? 'Weight in kg' : 'Weight in lbs'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <Select 
                  value={weightUnit} 
                  onValueChange={(value) => setWeightUnit(value as 'kg' | 'lbs')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-green-500 text-white font-medium py-2 rounded hover:bg-green-600 transition-colors">
            Calculate BMI
          </Button>
        </form>
        
        <div className="mt-6">
          <h4 className="font-sans font-semibold text-gray-700 mb-2">About Body Mass Index (BMI)</h4>
          <p className="text-gray-600 text-sm">
            BMI is a measure of body fat based on height and weight that applies to adult men and women. It's calculated by dividing your weight (in kg) by the square of your height (in meters).
          </p>
          <p className="text-gray-600 text-sm mt-2">
            While BMI is a useful screening tool, it doesn't directly measure body fat or account for factors like muscle mass, bone density, age, sex, or ethnicity.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>BMI Categories:</strong>
          </p>
          <ul className="text-gray-600 text-sm list-disc pl-5">
            <li>Underweight: BMI less than 18.5</li>
            <li>Normal weight: BMI between 18.5 and 24.9</li>
            <li>Overweight: BMI between 25 and 29.9</li>
            <li>Obesity (Class I): BMI between 30 and 34.9</li>
            <li>Obesity (Class II): BMI between 35 and 39.9</li>
            <li>Extreme Obesity (Class III): BMI 40 or greater</li>
          </ul>
        </div>
      </div>
      
      <div className="md:w-1/2">
        {showResults && bmi !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your BMI Results</h3>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-700">Your BMI:</span>
                <span className="font-bold text-xl">{bmi.toFixed(1)}</span>
              </div>
              
              <div className="mb-6">
                <h4 className="font-sans font-semibold mb-2">
                  Category: <span className={getCategoryTextColor()}>{bmiCategory}</span>
                </h4>
                <p className="text-gray-600 text-sm">{categoryDescription}</p>
              </div>
              
              {/* Custom BMI visualization */}
              <div className="mt-6">
                <div className="w-full flex justify-center mb-6">
                  <div className={`inline-block rounded-full w-24 h-24 flex items-center justify-center border-4 ${getCategoryColor().replace('bg-', 'border-')}`}>
                    <div className="text-2xl font-bold">{bmi.toFixed(1)}</div>
                  </div>
                </div>
                
                <div className="w-full relative">
                  <div className="flex h-4 mb-1 rounded-full overflow-hidden">
                    <div className="bg-blue-500 flex-1"></div>
                    <div className="bg-green-500 flex-2"></div>
                    <div className="bg-yellow-500 flex-1"></div>
                    <div className="bg-orange-500 flex-1"></div>
                    <div className="bg-red-500 flex-1"></div>
                    <div className="bg-red-600 flex-1"></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                    <span>40</span>
                  </div>
                  
                  {/* BMI indicator */}
                  <div className="relative mt-2">
                    <div 
                      className="absolute -ml-1 w-2 h-4 bg-black"
                      style={{ 
                        left: `${Math.min(Math.max(((bmi - 15) / 35) * 100, 0), 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600 text-sm">
                  <strong>Remember:</strong> BMI is just one indicator of health. For a more comprehensive assessment, consider other factors like waist circumference, body fat percentage, and consult with a healthcare provider.
                </p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-green-500 hover:text-green-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My BMI is ${bmi.toFixed(1)}. Calculate yours at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My BMI Results',
                        text: text,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback for browsers that don't support navigator.share
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                    }
                  }}
                >
                  <Share2 className="mr-1 h-4 w-4" /> Share Results
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
