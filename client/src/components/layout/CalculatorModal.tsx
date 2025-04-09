import { useModal } from '@/contexts/ModalContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Helper function to determine the header background color based on the calculator type
  const getHeaderColor = () => {
    switch (activeCalculator) {
      case 'bmi':
        return 'bg-green-500';
      case 'ideal-weight':
        return 'bg-blue-500';
      case 'calorie':
        return 'bg-amber-500';
      case 'body-fat':
        return 'bg-red-500';
      case 'heart-rate':
        return 'bg-pink-500';
      case 'weight-timeline':
        return 'bg-purple-500';
      case 'waist-hip':
        return 'bg-indigo-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className={`flex justify-between items-center px-6 py-4 ${getHeaderColor()} text-white sticky top-0 z-10`}>
              <h2 className="font-sans font-bold text-xl">{calculatorTitle}</h2>
              <button 
                onClick={closeCalculator}
                className="text-white hover:text-gray-100 focus:outline-none bg-white bg-opacity-20 rounded-full p-1"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-64px)]">
              {activeCalculator === 'bmi' && <BMICalculator />}
              {activeCalculator === 'ideal-weight' && <IdealWeightCalculator />}
              {activeCalculator === 'calorie' && <CalorieCalculator />}
              {activeCalculator === 'body-fat' && <BodyFatCalculator />}
              {activeCalculator === 'heart-rate' && <HeartRateCalculator />}
              {activeCalculator === 'weight-timeline' && <WeightTimelineCalculator />}
              {activeCalculator === 'waist-hip' && <WaistHipCalculator />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
