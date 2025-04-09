import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { calculateHeartRateZones } from '@/lib/calculatorUtils';
import { createHeartRateChart } from '@/lib/chartUtils';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HeartRateZones {
  maxHR: number;
  zones: {
    rest: number;
    warmUp: [number, number];
    fatBurn: [number, number];
    cardio: [number, number];
    peak: [number, number];
  };
}

export default function HeartRateCalculator() {
  const [age, setAge] = useState<string>('');
  const [restingHR, setRestingHR] = useState<string>('');
  const [heartRateZones, setHeartRateZones] = useState<HeartRateZones | null>(null);
  const [showResults, setShowResults] = useState(false);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageValue = parseInt(age);
    const restingHRValue = restingHR ? parseInt(restingHR) : undefined;
    
    if (isNaN(ageValue) || ageValue <= 0 || ageValue > 120) {
      alert('Please enter a valid age between 1 and 120.');
      return;
    }
    
    if (restingHRValue !== undefined && (isNaN(restingHRValue) || restingHRValue <= 0 || restingHRValue > 150)) {
      alert('Please enter a valid resting heart rate between 1 and 150, or leave blank.');
      return;
    }
    
    const zones = calculateHeartRateZones(ageValue, restingHRValue);
    setHeartRateZones(zones);
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults && heartRateZones !== null && chartRef.current) {
      // Clean up previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = createHeartRateChart(ctx, heartRateZones);
      }
    }
    
    // Clean up chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [showResults, heartRateZones]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <h3 className="font-sans font-semibold text-lg mb-4">Calculate Your Heart Rate Zones</h3>
        
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <Label htmlFor="heart-rate-age">Age</Label>
            <Input
              id="heart-rate-age"
              type="number"
              min="1"
              max="120"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="heart-rate-resting">Resting Heart Rate (optional)</Label>
            <Input
              id="heart-rate-resting"
              type="number"
              min="30"
              max="150"
              placeholder="Beats per minute"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              className="mt-2"
            />
          </div>
          
          <Button type="submit" className="w-full bg-pink-500 text-white font-medium py-2 rounded hover:bg-pink-600 transition-colors">
            Calculate Heart Rate Zones
          </Button>
        </form>
        
        <div className="mt-6">
          <h4 className="font-sans font-semibold text-gray-700 mb-2">About Heart Rate Zones</h4>
          <p className="text-gray-600 text-sm">
            Heart rate zones are ranges of heart rates based on your maximum heart rate (MHR). Training in different zones helps target specific fitness goals.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>Fat Burning Zone</strong> (60-70% of MHR): This zone helps improve basic endurance and fat burning. It's ideal for longer, moderate-intensity workouts.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            <strong>How to measure your heart rate:</strong> Place your index and middle fingers on your wrist (below your thumb) or on your neck (beside your windpipe). Count the beats for 15 seconds and multiply by 4 to get your beats per minute.
          </p>
        </div>
      </div>
      
      <div className="md:w-1/2">
        {showResults && heartRateZones !== null && (
          <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-sans font-semibold text-lg mb-2">Your Heart Rate Zones</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Maximum Heart Rate:</span>
                  <span className="font-bold text-xl">{heartRateZones.maxHR} bpm</span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Resting</span>
                      <span className="font-medium">{heartRateZones.zones.rest} bpm</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-200 h-full" style={{ width: `${(heartRateZones.zones.rest / heartRateZones.maxHR) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Warm Up (50-60%)</span>
                      <span className="font-medium">{heartRateZones.zones.warmUp[0]} - {heartRateZones.zones.warmUp[1]} bpm</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-200 h-full" style={{ width: `${(heartRateZones.zones.warmUp[1] / heartRateZones.maxHR) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-semibold">Fat Burning (60-70%)</span>
                      <span className="font-semibold">{heartRateZones.zones.fatBurn[0]} - {heartRateZones.zones.fatBurn[1]} bpm</span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${(heartRateZones.zones.fatBurn[1] / heartRateZones.maxHR) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Cardio (70-85%)</span>
                      <span className="font-medium">{heartRateZones.zones.cardio[0]} - {heartRateZones.zones.cardio[1]} bpm</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-300 h-full" style={{ width: `${(heartRateZones.zones.cardio[1] / heartRateZones.maxHR) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Peak (85-100%)</span>
                      <span className="font-medium">{heartRateZones.zones.peak[0]} - {heartRateZones.zones.peak[1]} bpm</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-300 h-full" style={{ width: `${(heartRateZones.zones.peak[1] / heartRateZones.maxHR) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-pink-500 hover:text-pink-600 font-medium text-sm flex items-center"
                  onClick={() => {
                    // Share results functionality
                    const text = `My fat burning heart rate zone is ${heartRateZones.zones.fatBurn[0]}-${heartRateZones.zones.fatBurn[1]} bpm. Calculate yours at FitCalc!`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Heart Rate Zone Results',
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
            <canvas ref={chartRef} height="300"></canvas>
          </div>
        )}
      </div>
    </div>
  );
}
