import { createContext, useContext, useState, ReactNode } from 'react';

type CalculatorType = 
  'bmi' | 
  'ideal-weight' | 
  'calorie' | 
  'body-fat' | 
  'heart-rate' | 
  'weight-timeline' | 
  'waist-hip' | 
  null;

interface ModalContextType {
  isOpen: boolean;
  activeCalculator: CalculatorType;
  openCalculator: (calculator: CalculatorType) => void;
  closeCalculator: () => void;
  calculatorTitle: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);

  const openCalculator = (calculator: CalculatorType) => {
    setActiveCalculator(calculator);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeCalculator = () => {
    setIsOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
  };

  const getCalculatorTitle = (): string => {
    switch (activeCalculator) {
      case 'bmi':
        return 'BMI Calculator';
      case 'ideal-weight':
        return 'Ideal Weight Calculator';
      case 'calorie':
        return 'Calorie Calculator';
      case 'body-fat':
        return 'Body Fat Calculator';
      case 'heart-rate':
        return 'Heart Rate Zone Calculator';
      case 'weight-timeline':
        return 'Weight Timeline Calculator';
      case 'waist-hip':
        return 'Waist-to-Hip Ratio Calculator';
      default:
        return 'Calculator';
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        activeCalculator,
        openCalculator,
        closeCalculator,
        calculatorTitle: getCalculatorTitle(),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
