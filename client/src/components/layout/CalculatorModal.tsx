import { useModal } from '@/contexts/ModalContext';
import { X } from 'lucide-react';
import BMICalculator from '@/components/calculators/BMICalculator';
import IdealWeightCalculator from '@/components/calculators/IdealWeightCalculator';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';
import BodyFatCalculator from '@/components/calculators/BodyFatCalculator';
import HeartRateCalculator from '@/components/calculators/HeartRateCalculator';
import WeightTimelineCalculator from '@/components/calculators/WeightTimelineCalculator';
import WaistHipCalculator from '@/components/calculators/WaistHipCalculator';

export default function CalculatorModal() {
  const { isOpen, activeCalculator, closeCalculator, calculatorTitle } = useModal();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeCalculator();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="font-sans font-bold text-xl">{calculatorTitle}</h2>
          <button 
            onClick={closeCalculator}
            className="text-gray-500 hover:text-gray-700 text-xl focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          {activeCalculator === 'bmi' && <BMICalculator />}
          {activeCalculator === 'ideal-weight' && <IdealWeightCalculator />}
          {activeCalculator === 'calorie' && <CalorieCalculator />}
          {activeCalculator === 'body-fat' && <BodyFatCalculator />}
          {activeCalculator === 'heart-rate' && <HeartRateCalculator />}
          {activeCalculator === 'weight-timeline' && <WeightTimelineCalculator />}
          {activeCalculator === 'waist-hip' && <WaistHipCalculator />}
        </div>
      </div>
    </div>
  );
}
