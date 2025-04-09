import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Share2, Calendar, ArrowRight } from 'lucide-react';
import { calculateWeightTimeline } from '@/lib/calculatorUtils';

interface TimelineResult {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  weeklyData: { week: number; weight: number }[];
  targetDate: Date;
  weightUnit: 'kg' | 'lbs';
}

export default function WeightTimelineCalculator() {
  const [currentWeight, setCurrentWeight] = useState<string>('');
  const [goalWeight, setGoalWeight] = useState<string>('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [calorieDeficit, setCalorieDeficit] = useState<number>(500);
  const [timelineResult, setTimelineResult] = useState<TimelineResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentWeightValue = parseFloat(currentWeight);
    const goalWeightValue = parseFloat(goalWeight);
    
    if (
      isNaN(currentWeightValue) || isNaN(goalWeightValue) ||
      currentWeightValue <= 0 || goalWeightValue <= 0
    ) {
      alert('Please enter valid weight values.');
      return;
    }
    
    if (currentWeightValue === goalWeightValue) {
      alert('Your current weight and goal weight are the same. Please enter different values.');
      return;
    }
    
    const result = calculateWeightTimeline(currentWeightValue, goalWeightValue, weightUnit, calorieDeficit);
    setTimelineResult(result);
    setShowResults(true);
  };

  const isWeightLoss = goalWeight && currentWeight ? parseFloat(goalWeight) < parseFloat(currentWeight) : true;

  // Helper function to format date nicely
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Generate timeline preview points
  const getTimelinePreview = () => {
    if (!timelineResult) return [];
    
    const { totalWeeks, weeklyData } = timelineResult;
    
    // Get points along the journey - start, 25%, 50%, 75%, goal
    const points = [
      { label: 'Start', week: 0, weight: weeklyData[0].weight },
      { label: '25%', week: Math.floor(totalWeeks * 0.25), weight: weeklyData[Math.min(Math.floor(totalWeeks * 0.25), weeklyData.length - 1)].weight },
      { label: '50%', week: Math.floor(totalWeeks * 0.5), weight: weeklyData[Math.min(Math.floor(totalWeeks * 0.5), weeklyData.length - 1)].weight },
      { label: '75%', week: Math.floor(totalWeeks * 0.75), weight: weeklyData[Math.min(Math.floor(totalWeeks * 0.75), weeklyData.length - 1)].weight },
      { label: 'Goal', week: totalWeeks, weight: weeklyData[weeklyData.length - 1].weight }
    ];
    
    return points;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Estimate Your Weight Change Timeline</h3>
        
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <Label htmlFor="current-weight">Current Weight</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="current-weight"
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="Current weight"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
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
          
          <div>
            <Label htmlFor="goal-weight">Goal Weight</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="goal-weight"
                  type="number"
                  min="1"
                  step="0.1"
                  placeholder="Goal weight"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  required
                />
              </div>
              <div className="w-24">
                <Select 
                  value={weightUnit} 
                  onValueChange={(value) => setWeightUnit(value as 'kg' | 'lbs')}
                  disabled
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
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="calorie-deficit">Daily Calorie {isWeightLoss ? 'Deficit' : 'Surplus'}</Label>
              <span className="text-sm font-medium">{calorieDeficit} calories</span>
            </div>
            <Slider
              id="calorie-deficit"
              min={100}
              max={1000}
              step={100}
              value={[calorieDeficit]}
              onValueChange={(value) => setCalorieDeficit(value[0])}
            />
          </div>
          
          <Button type="submit" className="w-full bg-purple-500 text-white font-medium py-2 rounded hover:bg-purple-600 transition-colors">
            Calculate Timeline
          </Button>
        </form>
        
        <div className="mt-6">
          <h4 className="font-sans font-semibold text-gray-700 mb-2">About Weight Change Timeline</h4>
          <p className="text-gray-600 text-sm">
            This calculator estimates how long it will take to reach your goal weight based on your current weight and planned calorie {isWeightLoss ? 'deficit' : 'surplus'}.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Note:</strong> This is based on the general principle that 3,500 calories equals approximately 1 pound (0.45 kg) of fat. Individual results may vary based on metabolism, activity level, and consistency. The rate of weight loss/gain tends to slow over time, which this simple calculator doesn't account for.
          </p>
        </div>
      </div>
      
      <div className="md:w-1/2">
        {showResults && timelineResult !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Timeline Estimate</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Estimated Time to Goal:</span>
                  <span className="font-bold text-xl">
                    {timelineResult.totalMonths > 0 ? `${timelineResult.totalMonths} months, ` : ''}
                    {timelineResult.totalWeeks % 4} weeks
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Target Date:</span>
                  <span className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    {formatDate(timelineResult.targetDate)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Weight Change:</span>
                  <span className="font-medium text-purple-600">
                    {Math.abs(parseFloat(goalWeight) - parseFloat(currentWeight)).toFixed(1)} {weightUnit}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Average Weekly Change:</span>
                  <span className="font-medium">
                    {(calorieDeficit * 7 / (weightUnit === 'kg' ? 7700 : 3500)).toFixed(2)} {weightUnit}/week
                  </span>
                </div>
              </div>
              
              {/* Custom timeline visualization */}
              <div className="mt-8">
                <h4 className="font-sans font-semibold text-gray-700 mb-4">Weight Journey Timeline</h4>
                
                <div className="relative pt-8 pb-2">
                  {/* Timeline line */}
                  <div className="absolute top-14 left-0 right-0 h-1 bg-purple-200 z-0"></div>
                  
                  {/* Timeline points */}
                  <div className="relative flex justify-between">
                    {getTimelinePreview().map((point, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="absolute top-0 text-sm font-medium">
                          {point.weight.toFixed(1)} {weightUnit}
                        </div>
                        <div className={`w-5 h-5 rounded-full ${index === 0 ? 'bg-purple-300' : index === getTimelinePreview().length - 1 ? 'bg-purple-600' : 'bg-purple-400'} z-10 mt-8`}></div>
                        <div className="text-xs mt-2 text-gray-600">{point.label}</div>
                        {index < getTimelinePreview().length - 1 && (
                          <div className="text-xs mt-1 text-gray-500">
                            {point.week !== getTimelinePreview()[index+1].week ? 
                              `Week ${point.week}` : ''}
                          </div>
                        )}
                        {index === getTimelinePreview().length - 1 && (
                          <div className="text-xs mt-1 text-gray-500">Week {point.week}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 text-sm">
                  This estimate assumes you maintain a consistent {calorieDeficit} calorie {isWeightLoss ? 'deficit' : 'surplus'} every day. Remember that healthy, sustainable weight {isWeightLoss ? 'loss' : 'gain'} is typically 0.5-1 {weightUnit === 'kg' ? 'kg' : 'lb'} per week.
                </p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-purple-500 hover:text-purple-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `I should reach my goal weight by ${formatDate(timelineResult.targetDate)}. Plan your weight journey at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Weight Timeline Results',
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
