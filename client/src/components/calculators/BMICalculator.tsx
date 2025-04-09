import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Share2 } from 'lucide-react';
import { calculateBMI, getBMICategory, getBMICategoryDescription } from '@/lib/calculatorUtils';
import { createBMIChart } from '@/lib/chartUtils';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [bmiDescription, setBmiDescription] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    
    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      alert('Please enter valid height and weight values.');
      return;
    }
    
    const calculatedBMI = calculateBMI(heightValue, weightValue, heightUnit, weightUnit);
    const roundedBMI = Math.round(calculatedBMI * 10) / 10;
    
    setBmi(roundedBMI);
    setBmiCategory(getBMICategory(roundedBMI));
    setBmiDescription(getBMICategoryDescription(roundedBMI));
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && bmi !== null && chartRef.current) {
      // Clean up previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = createBMIChart(ctx, bmi);
      }
    }
    
    // Clean up chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [showResults, bmi]);

  // Calculate position for the BMI indicator
  const indicatorPosition = bmi ? Math.max(0, Math.min((bmi / 40) * 100, 100)) : 50;

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
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <Select 
                  value={heightUnit} 
                  onValueChange={(value) => setHeightUnit(value as 'cm' | 'inches')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="inches">inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="bmi-weight">Weight</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="bmi-weight"
                  type="number"
                  min="1"
                  placeholder="Weight"
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
          
          <Button type="submit" className="w-full bg-primary text-white font-medium py-2 rounded hover:bg-primary/90 transition-colors">
            Calculate BMI
          </Button>
        </form>
        
        <div className="mt-6">
          <h4 className="font-sans font-semibold text-gray-700 mb-2">What is BMI?</h4>
          <p className="text-gray-600 text-sm">
            Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Note:</strong> BMI is not a diagnostic tool and doesn't account for muscle mass, bone density, or overall body composition.
          </p>
        </div>
      </div>
      
      <div className="md:w-1/2">
        {showResults && bmi !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Results</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Your BMI:</span>
                <span className="font-bold text-xl">{bmi}</span>
              </div>
              
              <div className="mb-4">
                <div className="relative mb-6">
                  <div className="flex h-6">
                    <div className="bg-blue-500 rounded-l-full text-xs text-white flex items-center justify-center w-1/4 h-full">
                      Under
                    </div>
                    <div className="bg-green-500 text-xs text-white flex items-center justify-center w-1/4 h-full">
                      Normal
                    </div>
                    <div className="bg-yellow-500 text-xs text-white flex items-center justify-center w-1/4 h-full">
                      Over
                    </div>
                    <div className="bg-red-500 rounded-r-full text-xs text-white flex items-center justify-center w-1/4 h-full">
                      Obese
                    </div>
                  </div>
                  
                  <div 
                    className="absolute top-0 -ml-1.5 mt-6 text-center" 
                    style={{ left: `${indicatorPosition}%` }}
                  >
                    <div className="w-3 h-3 bg-primary rounded-full mx-auto"></div>
                    <i className="fas fa-caret-up text-primary -mt-1"></i>
                  </div>
                </div>
                
                <div className="flex text-xs mt-1">
                  <div className="w-1/4 text-center">18.5</div>
                  <div className="w-1/4 text-center">25</div>
                  <div className="w-1/4 text-center">30</div>
                  <div className="w-1/4 text-center">+</div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-sans font-semibold mb-2">
                  Category: <span className={
                    bmiCategory === 'Underweight' ? 'text-blue-500' :
                    bmiCategory === 'Normal weight' ? 'text-green-500' :
                    bmiCategory === 'Overweight' ? 'text-yellow-600' :
                    'text-red-500'
                  }>{bmiCategory}</span>
                </h4>
                <p className="text-gray-600 text-sm">
                  {bmiDescription}
                </p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary/90 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My BMI is ${bmi}. Calculate yours at FitCalc!`;
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
        
        {showResults && (
          <div className="mt-4">
            <canvas ref={chartRef} height="250"></canvas>
          </div>
        )}
      </div>
    </div>
  );
}
