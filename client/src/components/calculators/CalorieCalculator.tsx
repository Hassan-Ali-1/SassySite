import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Share2 } from 'lucide-react';
import { calculateDailyCalories } from '@/lib/calculatorUtils';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
Chart.register(ArcElement, Tooltip, Legend);

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
type Goal = 'lose' | 'maintain' | 'gain';

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'inches'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [rateOfChange, setRateOfChange] = useState<number>(0.5);
  const [results, setResults] = useState<null | {
    maintenanceCalories: number;
    targetCalories: number;
    deficit: number;
  }>(null);
  const [showResults, setShowResults] = useState(false);

  const activityLevelDescriptions = {
    sedentary: 'Little or no exercise',
    light: 'Light exercise/sports 1-3 days/week',
    moderate: 'Moderate exercise/sports 3-5 days/week',
    active: 'Hard exercise/sports 6-7 days/week',
    'very-active': 'Very hard exercise, physical job, or training twice a day'
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageValue = parseInt(age);
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    
    if (
      isNaN(ageValue) || isNaN(heightValue) || isNaN(weightValue) || 
      ageValue <= 0 || heightValue <= 0 || weightValue <= 0
    ) {
      alert('Please enter valid values for age, height, and weight.');
      return;
    }
    
    const calorieResults = calculateDailyCalories(
      ageValue,
      sex,
      heightValue,
      weightValue,
      heightUnit,
      weightUnit,
      activityLevel,
      goal,
      rateOfChange
    );
    
    setResults(calorieResults);
    setShowResults(true);
  };

  const getCalorieBreakdown = () => {
    if (!results) return [];
    
    const targetCalories = Math.round(results.targetCalories);
    
    // Simplified macro breakdown (rough estimates)
    const protein = Math.round(targetCalories * 0.3); // 30% protein
    const fat = Math.round(targetCalories * 0.3);     // 30% fat
    const carbs = Math.round(targetCalories * 0.4);   // 40% carbs
    
    return [
      { category: 'Protein', calories: protein, color: '#4ade80' },  // green
      { category: 'Fat', calories: fat, color: '#facc15' },          // yellow
      { category: 'Carbs', calories: carbs, color: '#60a5fa' }       // blue
    ];
  };

  // Get color for the goal
  const getGoalColor = () => {
    if (goal === 'lose') return 'text-red-500';
    if (goal === 'maintain') return 'text-blue-500';
    return 'text-green-500';
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Calculate Your Daily Calorie Needs</h3>
        
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <Label htmlFor="calorie-age">Age</Label>
            <Input
              id="calorie-age"
              type="number"
              min="1"
              max="120"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="calorie-sex">Sex</Label>
            <RadioGroup 
              id="calorie-sex" 
              value={sex} 
              onValueChange={(value) => setSex(value as 'male' | 'female')}
              className="flex space-x-4 mt-2"
            >
              <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="male" id="calorie-male" className="mr-2" />
                <Label htmlFor="calorie-male">Male</Label>
              </div>
              <div className="flex-1 border rounded p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="female" id="calorie-female" className="mr-2" />
                <Label htmlFor="calorie-female">Female</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="calorie-height">Height</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="calorie-height"
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
            <Label htmlFor="calorie-weight">Weight</Label>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <Input
                  id="calorie-weight"
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
          
          <div>
            <Label htmlFor="calorie-activity">Activity Level</Label>
            <Select 
              id="calorie-activity" 
              value={activityLevel} 
              onValueChange={(value) => setActivityLevel(value as ActivityLevel)}
              className="mt-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">{activityLevelDescriptions.sedentary}</SelectItem>
                <SelectItem value="light">{activityLevelDescriptions.light}</SelectItem>
                <SelectItem value="moderate">{activityLevelDescriptions.moderate}</SelectItem>
                <SelectItem value="active">{activityLevelDescriptions.active}</SelectItem>
                <SelectItem value="very-active">{activityLevelDescriptions["very-active"]}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="calorie-goal">Goal</Label>
            <Select 
              id="calorie-goal" 
              value={goal} 
              onValueChange={(value) => setGoal(value as Goal)}
              className="mt-2"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Weight Loss</SelectItem>
                <SelectItem value="maintain">Maintenance</SelectItem>
                <SelectItem value="gain">Weight Gain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {goal !== 'maintain' && (
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="calorie-rate">Target Rate ({goal === 'lose' ? 'Loss' : 'Gain'} per week)</Label>
                <span className="text-sm font-medium">
                  {rateOfChange} {weightUnit === 'kg' ? 'kg' : 'lb'}/week
                </span>
              </div>
              <Slider
                id="calorie-rate"
                min={0.1}
                max={goal === 'lose' ? 1 : 2}
                step={0.1}
                value={[rateOfChange]}
                onValueChange={(value) => setRateOfChange(value[0])}
              />
            </div>
          )}
          
          <Button type="submit" className="w-full bg-amber-500 text-white font-medium py-2 rounded hover:bg-amber-600 transition-colors">
            Calculate Calories
          </Button>
        </form>
      </div>
      
      <div className="md:w-1/2">
        {showResults && results !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Maintenance Calories:</span>
                  <span className="font-bold text-xl">{Math.round(results.maintenanceCalories)} calories/day</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {goal === 'lose' ? 'Weight Loss' : goal === 'gain' ? 'Weight Gain' : 'Maintenance'} Target:
                  </span>
                  <span className={`font-bold text-xl ${getGoalColor()}`}>{Math.round(results.targetCalories)} calories/day</span>
                </div>
                
                {goal !== 'maintain' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Daily {goal === 'lose' ? 'Deficit' : 'Surplus'}:</span>
                    <span className="font-medium">{Math.abs(Math.round(results.deficit))} calories</span>
                  </div>
                )}
              </div>
              
              {/* Custom calorie breakdown visualization */}
              <div className="mt-6">
                <h4 className="font-sans font-semibold text-sm mb-3">Suggested Macronutrient Breakdown</h4>
                <div className="space-y-3">
                  {getCalorieBreakdown().map((macro, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{macro.category}</span>
                        <span>{macro.calories} calories</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${(macro.calories / Math.round(results.targetCalories)) * 100}%`,
                            backgroundColor: macro.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600 text-sm">
                  {goal === 'lose' 
                    ? `This calorie target creates a deficit that should result in approximately ${rateOfChange} ${weightUnit}/week of weight loss.` 
                    : goal === 'gain'
                    ? `This calorie target creates a surplus that should result in approximately ${rateOfChange} ${weightUnit}/week of weight gain.`
                    : 'This calorie target will help maintain your current weight.'}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Note:</strong> These are estimates. Individual results may vary based on metabolism, activity, and consistency. Consult a healthcare professional before making significant changes to your diet.
                </p>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-amber-500 hover:text-amber-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My daily calorie target is ${Math.round(results.targetCalories)} calories. Calculate yours at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Calorie Calculator Results',
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
