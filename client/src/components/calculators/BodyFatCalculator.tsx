import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2, Info } from 'lucide-react';
import { 
  calculateBodyFatSkinfold, 
  calculateBodyFatNavy, 
  getBodyFatCategory 
} from '@/lib/calculatorUtils';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function BodyFatCalculator() {
  const [method, setMethod] = useState<'skinfold' | 'navy'>('navy');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  
  // Navy method measurements
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [measureUnit, setMeasureUnit] = useState<'cm' | 'inches'>('cm');
  const [height, setHeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  
  // Skinfold method measurements
  const [tricep, setTricep] = useState<string>('');
  const [subscapular, setSubscapular] = useState<string>('');
  const [suprailiac, setSuprailiac] = useState<string>('');
  
  // Results
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    let calculatedBodyFat: number;
    
    if (method === 'navy') {
      const waistValue = parseFloat(waist);
      const neckValue = parseFloat(neck);
      const heightValue = parseFloat(height);
      let hipValue = sex === 'female' ? parseFloat(hip) : 0;
      
      if (
        isNaN(waistValue) || isNaN(neckValue) || isNaN(heightValue) || 
        (sex === 'female' && isNaN(hipValue)) ||
        waistValue <= 0 || neckValue <= 0 || heightValue <= 0 || 
        (sex === 'female' && hipValue <= 0)
      ) {
        alert('Please enter valid measurements.');
        return;
      }
      
      calculatedBodyFat = calculateBodyFatNavy(
        sex, 
        waistValue, 
        neckValue, 
        hipValue, 
        heightValue, 
        measureUnit, 
        heightUnit
      );
    } else {
      const tricepValue = parseFloat(tricep);
      const subscapularValue = parseFloat(subscapular);
      const suprailiacValue = parseFloat(suprailiac);
      
      if (
        isNaN(tricepValue) || isNaN(subscapularValue) || isNaN(suprailiacValue) ||
        tricepValue <= 0 || subscapularValue <= 0 || suprailiacValue <= 0
      ) {
        alert('Please enter valid skinfold measurements.');
        return;
      }
      
      calculatedBodyFat = calculateBodyFatSkinfold(
        sex, 
        tricepValue, 
        subscapularValue, 
        suprailiacValue
      );
    }
    
    setBodyFatPercentage(calculatedBodyFat);
    setBodyFatCategory(getBodyFatCategory(calculatedBodyFat, sex));
    setShowResults(true);
  };

  // Get category color based on the body fat category
  const getCategoryColor = () => {
    if (bodyFatCategory === 'Essential Fat') return 'bg-blue-500';
    if (bodyFatCategory === 'Athletes') return 'bg-green-500';
    if (bodyFatCategory === 'Fitness') return 'bg-green-300';
    if (bodyFatCategory === 'Average') return 'bg-yellow-500';
    return 'bg-red-500';
  }

  // Get text color based on the body fat category
  const getCategoryTextColor = () => {
    if (bodyFatCategory === 'Essential Fat') return 'text-blue-500';
    if (bodyFatCategory === 'Athletes') return 'text-green-500';
    if (bodyFatCategory === 'Fitness') return 'text-green-600';
    if (bodyFatCategory === 'Average') return 'text-yellow-600';
    return 'text-red-500';
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Calculate Your Body Fat Percentage</h3>
        
        <Tabs defaultValue="navy" value={method} onValueChange={(value) => setMethod(value as 'skinfold' | 'navy')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="navy">Circumference Method</TabsTrigger>
            <TabsTrigger value="skinfold">Skinfold Method</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleCalculate} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="body-fat-sex">Sex</Label>
              <RadioGroup 
                id="body-fat-sex" 
                value={sex} 
                onValueChange={(value) => setSex(value as 'male' | 'female')}
                className="flex space-x-4 mt-2"
              >
                <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="male" id="body-fat-male" className="mr-2" />
                  <Label htmlFor="body-fat-male">Male</Label>
                </div>
                <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="female" id="body-fat-female" className="mr-2" />
                  <Label htmlFor="body-fat-female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            
            <TabsContent value="navy" className="space-y-4 pt-2">
              <div>
                <div className="flex items-center">
                  <Label htmlFor="body-fat-waist">Waist Circumference</Label>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Measure at the narrowest point, typically around the navel</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-4 mt-2">
                  <div className="flex-1">
                    <Input
                      id="body-fat-waist"
                      type="number"
                      min="1"
                      placeholder="Waist"
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

              {sex === 'female' && (
                <div>
                  <div className="flex items-center">
                    <Label htmlFor="body-fat-hip">Hip Circumference</Label>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-2 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Measure at the widest point around the buttocks</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex-1">
                      <Input
                        id="body-fat-hip"
                        type="number"
                        min="1"
                        placeholder="Hip"
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
              )}

              <div>
                <div className="flex items-center">
                  <Label htmlFor="body-fat-neck">Neck Circumference</Label>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Measure at the narrowest point, just below the Adam's apple</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-4 mt-2">
                  <div className="flex-1">
                    <Input
                      id="body-fat-neck"
                      type="number"
                      min="1"
                      placeholder="Neck"
                      value={neck}
                      onChange={(e) => setNeck(e.target.value)}
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

              <div>
                <Label htmlFor="body-fat-height">Height</Label>
                <div className="flex space-x-4 mt-2">
                  <div className="flex-1">
                    <Input
                      id="body-fat-height"
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
            </TabsContent>
            
            <TabsContent value="skinfold" className="space-y-4 pt-2">
              <div>
                <div className="flex items-center">
                  <Label htmlFor="body-fat-tricep">Tricep Skinfold (mm)</Label>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Measure vertically at the midpoint between the shoulder and elbow</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="body-fat-tricep"
                  type="number"
                  min="1"
                  placeholder="Tricep measurement in mm"
                  value={tricep}
                  onChange={(e) => setTricep(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <div className="flex items-center">
                  <Label htmlFor="body-fat-subscapular">Subscapular Skinfold (mm)</Label>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Measure at a 45° angle just below the shoulder blade</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="body-fat-subscapular"
                  type="number"
                  min="1"
                  placeholder="Subscapular measurement in mm"
                  value={subscapular}
                  onChange={(e) => setSubscapular(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              
              <div>
                <div className="flex items-center">
                  <Label htmlFor="body-fat-suprailiac">Suprailiac Skinfold (mm)</Label>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Measure diagonally above the hip bone</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="body-fat-suprailiac"
                  type="number"
                  min="1"
                  placeholder="Suprailiac measurement in mm"
                  value={suprailiac}
                  onChange={(e) => setSuprailiac(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </TabsContent>
            
            <Button type="submit" className="w-full bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 transition-colors">
              Calculate Body Fat
            </Button>
          </form>
          
          <div className="mt-6">
            <h4 className="font-sans font-semibold text-gray-700 mb-2">About Body Fat Percentage</h4>
            <p className="text-gray-600 text-sm">
              Body fat percentage is the amount of fat mass in your body compared to everything else (muscle, bone, organs, etc). It's a better indicator of health than weight or BMI alone.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Navy Method</strong> uses body circumference measurements to estimate body fat percentage.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Skinfold Method</strong> uses measurements of skin folds at specific sites to estimate subcutaneous fat.
            </p>
          </div>
        </Tabs>
      </div>
      
      <div className="md:w-1/2">
        {showResults && bodyFatPercentage !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Results</h3>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-700">Your Body Fat Percentage:</span>
                <span className="font-bold text-xl">{bodyFatPercentage}%</span>
              </div>
              
              <div className="mb-6">
                <h4 className="font-sans font-semibold mb-2">
                  Category: <span className={getCategoryTextColor()}>{bodyFatCategory}</span>
                </h4>
                
                <p className="text-gray-600 text-sm">
                  {bodyFatCategory === 'Essential Fat' ? 
                    'This is the minimum body fat needed for basic physical and physiological health. It is not recommended to have less than this amount.' :
                    bodyFatCategory === 'Athletes' ?
                    'This range is typical for athletes and fitness competitors. It represents excellent conditioning but may be difficult to maintain year-round.' :
                    bodyFatCategory === 'Fitness' ?
                    'This range represents excellent fitness and is achievable and maintainable for many people with consistent exercise and proper nutrition.' :
                    bodyFatCategory === 'Average' ?
                    'This is considered a healthy range for most people, though improvement through regular exercise and balanced nutrition is beneficial.' :
                    'This range represents excess body fat and may increase health risks. Gradual reduction through lifestyle changes is recommended.'
                  }
                </p>
              </div>
              
              {/* Custom visual display instead of chart */}
              <div className="mt-6 flex justify-center">
                <div className="w-64">
                  <div className="text-center mb-6">
                    <div className={`inline-block rounded-full w-24 h-24 flex items-center justify-center border-4 ${getCategoryColor().replace('bg-', 'border-')}`}>
                      <div className="text-2xl font-bold">{bodyFatPercentage}%</div>
                    </div>
                    <div className="mt-2 font-medium text-lg">
                      <span className={getCategoryTextColor()}>{bodyFatCategory}</span>
                    </div>
                  </div>
                  
                  {/* Body fat ranges visualization */}
                  <div className="mt-6">
                    <h5 className="font-semibold text-sm mb-2 text-center">Body Fat Ranges for {sex === 'male' ? 'Men' : 'Women'}</h5>
                    <div className="flex h-4 mb-1 rounded-full overflow-hidden">
                      <div className="bg-blue-500 w-1/5"></div>
                      <div className="bg-green-500 w-1/5"></div>
                      <div className="bg-green-300 w-1/5"></div>
                      <div className="bg-yellow-500 w-1/5"></div>
                      <div className="bg-red-500 w-1/5"></div>
                    </div>
                    <div className="flex justify-between text-xs px-1">
                      <span>Essential</span>
                      <span>Athletes</span>
                      <span>Fitness</span>
                      <span>Average</span>
                      <span>Obese</span>
                    </div>
                    
                    {/* Position indicator */}
                    <div className="relative mt-2">
                      <div 
                        className="absolute -ml-1 w-2 h-4 bg-black"
                        style={{ 
                          left: `${Math.min(Math.max((bodyFatPercentage / (sex === 'male' ? 40 : 45)) * 100, 0), 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My body fat percentage is ${bodyFatPercentage}%. Calculate yours at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Body Fat Percentage Results',
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
