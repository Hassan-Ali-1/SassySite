import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Share2, Info } from 'lucide-react';
import { calculateWaistHipRatio, getWaistHipRiskLevel } from '@/lib/calculatorUtils';
import { createWaistHipChart } from '@/lib/chartUtils';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Register ChartJS components - Make sure DoughnutController is registered
Chart.register(ArcElement, Tooltip, Legend);

export default function WaistHipCalculator() {
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [measureUnit, setMeasureUnit] = useState<'cm' | 'inches'>('cm');
  const [ratio, setRatio] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waistValue = parseFloat(waist);
    const hipValue = parseFloat(hip);
    
    if (isNaN(waistValue) || isNaN(hipValue) || waistValue <= 0 || hipValue <= 0) {
      alert('Please enter valid waist and hip measurements.');
      return;
    }
    
    if (waistValue >= hipValue) {
      alert('Waist measurement should be less than hip measurement for most body types. Please check your measurements.');
      return;
    }
    
    const calculatedRatio = calculateWaistHipRatio(waistValue, hipValue);
    const riskCategory = getWaistHipRiskLevel(calculatedRatio, sex);
    
    setRatio(calculatedRatio);
    setRiskLevel(riskCategory);
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && ratio !== null && chartRef.current) {
      // For this component, let's use a simple display instead of a chart
      // to avoid Chart.js controller registration issues
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    }
    
    // Clean up chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [showResults, ratio, sex]);

  // Helper function to determine risk level color
  const getRiskColor = (level: string) => {
    if (level === 'Low Risk') return 'bg-green-500';
    if (level === 'Moderate Risk') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Calculate Your Waist-to-Hip Ratio</h3>
        
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <Label htmlFor="waist-hip-sex">Sex</Label>
            <RadioGroup 
              id="waist-hip-sex" 
              value={sex} 
              onValueChange={(value) => setSex(value as 'male' | 'female')}
              className="flex space-x-4 mt-2"
            >
              <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="male" id="waist-hip-male" className="mr-2" />
                <Label htmlFor="waist-hip-male">Male</Label>
              </div>
              <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="female" id="waist-hip-female" className="mr-2" />
                <Label htmlFor="waist-hip-female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <div className="flex items-center">
              <Label htmlFor="waist-measurement">Waist Circumference</Label>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Measure at the narrowest part of your waist, usually at the level of your navel</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="waist-measurement"
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="Waist measurement"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <Select 
                  value={measureUnit} 
                  onValueChange={(value) => setMeasureUnit(value as 'cm' | 'inches')}
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
            <div className="flex items-center">
              <Label htmlFor="hip-measurement">Hip Circumference</Label>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Measure at the widest part of your hips/buttocks</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="hip-measurement"
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="Hip measurement"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <Select 
                  value={measureUnit} 
                  onValueChange={(value) => setMeasureUnit(value as 'cm' | 'inches')}
                  disabled
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
          
          <Button type="submit" className="w-full bg-indigo-500 text-white font-medium py-2 rounded hover:bg-indigo-600 transition-colors">
            Calculate Ratio
          </Button>
        </form>
        
        <div className="mt-6">
          <h4 className="font-sans font-semibold text-gray-700 mb-2">About Waist-to-Hip Ratio</h4>
          <p className="text-gray-600 text-sm">
            Waist-to-hip ratio (WHR) is a measurement of the proportion of fat stored on your waist, hips, and buttocks. It's calculated by dividing your waist measurement by your hip measurement.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            WHR is used to assess health risks associated with excess abdominal fat. Higher ratios indicate more fat stored around the waist, which is linked to increased risk of heart disease, type 2 diabetes, and other health problems.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>How to measure correctly:</strong>
          </p>
          <ul className="text-gray-600 text-sm list-disc pl-5">
            <li>Stand straight with feet together</li>
            <li>Waist: Measure at the narrowest part, usually at the navel</li>
            <li>Hips: Measure at the widest part of the buttocks</li>
            <li>Keep the tape measure snug but not tight</li>
            <li>Take measurements twice for accuracy</li>
          </ul>
        </div>
      </div>
      
      <div className="md:w-1/2">
        {showResults && ratio !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Results</h3>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-700">Your Waist-to-Hip Ratio:</span>
                <span className="font-bold text-xl">{ratio.toFixed(2)}</span>
              </div>
              
              <div className="mb-6">
                <h4 className="font-sans font-semibold mb-2">
                  Health Risk: <span className={
                    riskLevel === 'Low Risk' ? 'text-green-500' :
                    riskLevel === 'Moderate Risk' ? 'text-yellow-600' :
                    'text-red-500'
                  }>{riskLevel}</span>
                </h4>
                
                <p className="text-gray-600 text-sm">
                  {riskLevel === 'Low Risk' ? 
                    'Your waist-to-hip ratio indicates a lower risk of heart disease and other weight-related health issues.' :
                    riskLevel === 'Moderate Risk' ?
                    'Your waist-to-hip ratio indicates a moderate risk of heart disease and other weight-related health issues. Consider discussing with a healthcare provider.' :
                    'Your waist-to-hip ratio indicates a higher risk of heart disease and other weight-related health issues. We recommend consulting with a healthcare provider.'
                  }
                </p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-sans font-semibold text-gray-700 mb-2">Reference Ranges</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">For Men:</span>
                      <ul className="pl-5 list-disc">
                        <li>Below 0.90: Low Risk</li>
                        <li>0.90 to 0.95: Moderate Risk</li>
                        <li>Above 0.95: High Risk</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">For Women:</span>
                      <ul className="pl-5 list-disc">
                        <li>Below 0.80: Low Risk</li>
                        <li>0.80 to 0.85: Moderate Risk</li>
                        <li>Above 0.85: High Risk</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Custom visual display instead of chart */}
              <div className="mt-6 flex justify-center">
                <div className="w-64">
                  <div className="text-center mb-6">
                    <div className="inline-block rounded-full w-24 h-24 flex items-center justify-center border-4 border-indigo-500">
                      <div className="text-2xl font-bold">{ratio.toFixed(2)}</div>
                    </div>
                    <div className="mt-2 font-medium text-lg">
                      <span className={
                        riskLevel === 'Low Risk' ? 'text-green-500' :
                        riskLevel === 'Moderate Risk' ? 'text-yellow-600' :
                        'text-red-500'
                      }>{riskLevel}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex h-4 mb-1 rounded-full overflow-hidden">
                      <div className="bg-green-500 flex-1"></div>
                      <div className="bg-yellow-500 flex-1"></div>
                      <div className="bg-red-500 flex-1"></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Low Risk</span>
                      <span>Moderate</span>
                      <span>High Risk</span>
                    </div>
                    
                    {/* Position indicator */}
                    <div className="relative mt-2">
                      <div 
                        className="absolute -ml-1 w-2 h-4 bg-black"
                        style={{ 
                          left: `${ratio < 0.7 ? 0 : ratio > 1.1 ? 100 : ((ratio - 0.7) / 0.4) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-indigo-500 hover:text-indigo-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My waist-to-hip ratio is ${ratio.toFixed(2)}. Calculate yours at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Waist-to-Hip Ratio Results',
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
