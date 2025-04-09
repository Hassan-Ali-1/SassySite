import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Share2 } from 'lucide-react';
import { calculateIdealWeight } from '@/lib/calculatorUtils';

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

  // Helper function to get formula bar colors
  const getFormulaColor = (formula: string) => {
    switch (formula) {
      case 'devine': return 'bg-blue-500';
      case 'hamwi': return 'bg-green-500';
      case 'robinson': return 'bg-purple-500';
      case 'miller': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  // Helper function to calculate width percentage based on the weight value
  const getBarWidth = (value: number) => {
    if (!results) return '0%';
    
    // For calculation, find min and max in the results
    const weights = [results.devine, results.hamwi, results.robinson, results.miller];
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const range = maxWeight - minWeight;
    
    // Add padding to range
    const paddedMin = minWeight - (range * 0.2);
    const paddedMax = maxWeight + (range * 0.2);
    const paddedRange = paddedMax - paddedMin;
    
    // Calculate percentage
    return `${((value - paddedMin) / paddedRange) * 100}%`;
  };

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
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Your Ideal Weight Range:</span>
                  <span className="font-bold text-xl text-blue-600">{results.range}</span>
                </div>
                
                <div className="space-y-6 mt-8">
                  <h4 className="font-sans font-semibold text-gray-700 mb-3">Different Formulas Compared:</h4>
                  
                  {/* Formula comparison visualization */}
                  <div className="relative h-48 mt-2">
                    {/* Scale marks */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 flex justify-between">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="relative">
                          <div className="absolute bottom-0 w-px h-2 bg-gray-300"></div>
                          <div className="absolute bottom-4 transform -translate-x-1/2 text-xs text-gray-500">
                            {Math.round(parseFloat(results.range.split('-')[0]) + i * (parseFloat(results.range.split('-')[1]) - parseFloat(results.range.split('-')[0])) / 5)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Formula bars */}
                    <div className="absolute bottom-12 left-0 right-0 space-y-6">
                      <div className="relative h-5">
                        <div className="absolute left-0 h-full bg-gray-200 rounded-full" style={{ width: '100%' }}></div>
                        <div className={`absolute left-0 h-full ${getFormulaColor('devine')} rounded-full`} style={{ width: getBarWidth(results.devine) }}></div>
                        <div className="absolute right-0 transform translate-x-full ml-2 whitespace-nowrap text-sm">
                          <span className="font-semibold">Devine:</span> {results.devine} {results.displayUnit}
                        </div>
                      </div>
                      
                      <div className="relative h-5">
                        <div className="absolute left-0 h-full bg-gray-200 rounded-full" style={{ width: '100%' }}></div>
                        <div className={`absolute left-0 h-full ${getFormulaColor('hamwi')} rounded-full`} style={{ width: getBarWidth(results.hamwi) }}></div>
                        <div className="absolute right-0 transform translate-x-full ml-2 whitespace-nowrap text-sm">
                          <span className="font-semibold">Hamwi:</span> {results.hamwi} {results.displayUnit}
                        </div>
                      </div>
                      
                      <div className="relative h-5">
                        <div className="absolute left-0 h-full bg-gray-200 rounded-full" style={{ width: '100%' }}></div>
                        <div className={`absolute left-0 h-full ${getFormulaColor('robinson')} rounded-full`} style={{ width: getBarWidth(results.robinson) }}></div>
                        <div className="absolute right-0 transform translate-x-full ml-2 whitespace-nowrap text-sm">
                          <span className="font-semibold">Robinson:</span> {results.robinson} {results.displayUnit}
                        </div>
                      </div>
                      
                      <div className="relative h-5">
                        <div className="absolute left-0 h-full bg-gray-200 rounded-full" style={{ width: '100%' }}></div>
                        <div className={`absolute left-0 h-full ${getFormulaColor('miller')} rounded-full`} style={{ width: getBarWidth(results.miller) }}></div>
                        <div className="absolute right-0 transform translate-x-full ml-2 whitespace-nowrap text-sm">
                          <span className="font-semibold">Miller:</span> {results.miller} {results.displayUnit}
                        </div>
                      </div>
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
      </div>
    </div>
  );
}
