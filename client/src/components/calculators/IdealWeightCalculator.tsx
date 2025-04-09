import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Share2 } from 'lucide-react';
import { calculateIdealWeight } from '@/lib/calculatorUtils';
import { createIdealWeightChart } from '@/lib/chartUtils';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [frame, setFrame] = useState<'medium' | 'small' | 'large'>('medium');
  const [results, setResults] = useState<null | {
    range: string;
    devine: number;
    hamwi: number;
    robinson: number;
    miller: number;
    displayUnit: 'kg' | 'lbs';
  }>(null);
  const [showResults, setShowResults] = useState(false);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const heightValue = parseFloat(height);
    
    if (isNaN(heightValue) || heightValue <= 0) {
      alert('Please enter a valid height value.');
      return;
    }
    
    const idealWeightResults = calculateIdealWeight(heightValue, heightUnit, sex, frame);
    setResults(idealWeightResults);
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && results !== null && chartRef.current) {
      // Clean up previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = createIdealWeightChart(
          ctx, 
          results.devine, 
          results.hamwi, 
          results.robinson, 
          results.miller, 
          results.displayUnit
        );
      }
    }
    
    // Clean up chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [showResults, results]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Calculate Your Ideal Weight</h3>
        
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <Label htmlFor="ideal-height">Height</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="ideal-height"
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
            <Label htmlFor="ideal-sex">Sex</Label>
            <RadioGroup 
              id="ideal-sex" 
              value={sex} 
              onValueChange={(value) => setSex(value as 'male' | 'female')}
              className="flex space-x-4 mt-2"
            >
              <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="male" id="male" className="mr-2" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="female" id="female" className="mr-2" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="ideal-frame">Frame Size (Optional)</Label>
            <Select 
              id="ideal-frame" 
              value={frame} 
              onValueChange={(value) => setFrame(value as 'medium' | 'small' | 'large')}
              className="mt-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frame size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition-colors">
            Calculate Ideal Weight
          </Button>
        </form>
        
        <div className="mt-6">
          <h4 className="font-sans font-semibold text-gray-700 mb-2">About Ideal Weight</h4>
          <p className="text-gray-600 text-sm">
            The ideal body weight calculation uses multiple formulas (Hamwi, Devine, etc.) to estimate a healthy weight range based on your height, gender, and frame size.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Note:</strong> These are estimates and don't account for muscle mass, body composition, or individual health factors. Consult a healthcare professional for personalized advice.
          </p>
        </div>
      </div>
      
      <div className="md:w-1/2">
        {showResults && results !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Results</h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Your Ideal Weight Range:</span>
                  <span className="font-bold">{results.range}</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Formula</span>
                    <span>Result</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-t">
                      <span>Devine Formula</span>
                      <span>
                        {results.devine} {results.displayUnit}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span>Hamwi Formula</span>
                      <span>
                        {results.hamwi} {results.displayUnit}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span>Robinson Formula</span>
                      <span>
                        {results.robinson} {results.displayUnit}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span>Miller Formula</span>
                      <span>
                        {results.miller} {results.displayUnit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My ideal weight range is ${results.range}. Calculate yours at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Ideal Weight Results',
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
