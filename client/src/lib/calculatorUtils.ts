// BMI Calculator functions
export const calculateBMI = (
  height: number,
  weight: number,
  heightUnit: 'cm' | 'inches',
  weightUnit: 'kg' | 'lbs'
): number => {
  // Convert to metric if needed
  let heightInMeters = height;
  let weightInKg = weight;
  
  if (heightUnit === 'inches') {
    heightInMeters = height * 0.0254; // inches to meters
  } else {
    heightInMeters = height / 100; // cm to meters
  }
  
  if (weightUnit === 'lbs') {
    weightInKg = weight * 0.453592; // lbs to kg
  }
  
  // BMI formula: weight (kg) / [height (m)]²
  return weightInKg / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

export const getBMICategoryDescription = (bmi: number): string => {
  if (bmi < 18.5) {
    return 'Your BMI is below the healthy range. Consider consulting a healthcare provider.';
  } else if (bmi < 25) {
    return 'Your BMI indicates you are in a healthy weight range for your height.';
  } else if (bmi < 30) {
    return 'Your BMI is above the healthy range. Consider healthy lifestyle changes.';
  } else {
    return 'Your BMI indicates obesity. Consider consulting a healthcare provider.';
  }
};

// Ideal Weight Calculator functions
export const calculateIdealWeight = (
  height: number,
  heightUnit: 'cm' | 'inches',
  sex: 'male' | 'female',
  frame: 'medium' | 'small' | 'large'
): {
  range: string;
  devine: number;
  hamwi: number;
  robinson: number;
  miller: number;
  displayUnit: 'kg' | 'lbs';
} => {
  // Convert to inches if needed
  let heightInInches = height;
  if (heightUnit === 'cm') {
    heightInInches = height / 2.54; // cm to inches
  }
  
  // Calculate using different formulas
  let devine: number, hamwi: number, robinson: number, miller: number;
  
  if (sex === 'male') {
    devine = 50 + 2.3 * (heightInInches - 60);
    hamwi = 48 + 2.7 * (heightInInches - 60);
    robinson = 52 + 1.9 * (heightInInches - 60);
    miller = 56.2 + 1.41 * (heightInInches - 60);
  } else {
    devine = 45.5 + 2.3 * (heightInInches - 60);
    hamwi = 45.5 + 2.2 * (heightInInches - 60);
    robinson = 49 + 1.7 * (heightInInches - 60);
    miller = 53.1 + 1.36 * (heightInInches - 60);
  }
  
  // Adjust for frame size
  const frameMultiplier = frame === 'small' ? 0.9 : (frame === 'large' ? 1.1 : 1);
  devine *= frameMultiplier;
  hamwi *= frameMultiplier;
  robinson *= frameMultiplier;
  miller *= frameMultiplier;
  
  // Round values
  devine = Math.round(devine * 10) / 10;
  hamwi = Math.round(hamwi * 10) / 10;
  robinson = Math.round(robinson * 10) / 10;
  miller = Math.round(miller * 10) / 10;
  
  // Calculate range
  const minWeight = Math.min(devine, hamwi, robinson, miller);
  const maxWeight = Math.max(devine, hamwi, robinson, miller);
  
  // Determine display unit
  const displayUnit = heightUnit === 'cm' ? 'kg' : 'lbs';
  
  // Convert to kg if needed
  if (displayUnit === 'kg') {
    return {
      range: `${Math.round(minWeight * 0.453592)} - ${Math.round(maxWeight * 0.453592)} kg`,
      devine: Math.round(devine * 0.453592),
      hamwi: Math.round(hamwi * 0.453592),
      robinson: Math.round(robinson * 0.453592),
      miller: Math.round(miller * 0.453592),
      displayUnit
    };
  }
  
  return {
    range: `${Math.round(minWeight)} - ${Math.round(maxWeight)} lbs`,
    devine,
    hamwi,
    robinson,
    miller,
    displayUnit
  };
};

// Calorie Calculator functions
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
type Goal = 'lose' | 'maintain' | 'gain';

export const calculateDailyCalories = (
  age: number,
  sex: 'male' | 'female',
  height: number,
  weight: number,
  heightUnit: 'cm' | 'inches',
  weightUnit: 'kg' | 'lbs',
  activityLevel: ActivityLevel,
  goal: Goal,
  rateOfChange: number
): {
  maintenanceCalories: number;
  targetCalories: number;
  deficit: number;
} => {
  // Convert to metric if needed
  let heightInCm = height;
  let weightInKg = weight;
  
  if (heightUnit === 'inches') {
    heightInCm = height * 2.54; // inches to cm
  }
  
  if (weightUnit === 'lbs') {
    weightInKg = weight * 0.453592; // lbs to kg
  }
  
  // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr: number;
  if (sex === 'male') {
    bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
  } else {
    bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
  }
  
  // Apply activity multiplier to get TDEE (Total Daily Energy Expenditure)
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    'very-active': 1.9 // Very hard exercise, physical job, or training twice a day
  };
  
  const maintenanceCalories = bmr * activityMultipliers[activityLevel];
  
  // Calculate calorie target based on goal
  let deficit = 0;
  let targetCalories = maintenanceCalories;
  
  if (goal === 'lose') {
    // For weight loss: 7700 calories = 1 kg of fat (or 3500 calories = 1 lb)
    const caloriesPerKgPerWeek = weightUnit === 'kg' ? 7700 : 3500;
    deficit = (rateOfChange * caloriesPerKgPerWeek) / 7; // Daily deficit
    targetCalories = maintenanceCalories - deficit;
  } else if (goal === 'gain') {
    // For weight gain: use same calorie surplus
    const caloriesPerKgPerWeek = weightUnit === 'kg' ? 7700 : 3500;
    deficit = -((rateOfChange * caloriesPerKgPerWeek) / 7); // Negative deficit = surplus
    targetCalories = maintenanceCalories - deficit; // Adding surplus
  }
  
  return {
    maintenanceCalories,
    targetCalories,
    deficit
  };
};

// Body Fat Calculator functions
export const calculateBodyFatSkinfold = (
  sex: 'male' | 'female',
  tricep: number,
  subscapular: number,
  suprailiac: number
): number => {
  // Jackson/Pollock 3-site formula
  const sumOfSkinfolds = tricep + subscapular + suprailiac;
  
  let bodyDensity: number;
  if (sex === 'male') {
    bodyDensity = 1.1093800 - 0.0008267 * sumOfSkinfolds + 0.0000016 * Math.pow(sumOfSkinfolds, 2) - 0.0002574 * 30; // 30 is average age
  } else {
    bodyDensity = 1.0994921 - 0.0009929 * sumOfSkinfolds + 0.0000023 * Math.pow(sumOfSkinfolds, 2) - 0.0001392 * 30; // 30 is average age
  }
  
  // Siri equation to convert body density to body fat percentage
  const bodyFatPercentage = (495 / bodyDensity) - 450;
  
  return Math.round(bodyFatPercentage * 10) / 10;
};

export const calculateBodyFatNavy = (
  sex: 'male' | 'female',
  waist: number,
  neck: number,
  hip: number,
  height: number,
  measureUnit: 'cm' | 'inches',
  heightUnit: 'cm' | 'inches'
): number => {
  // Convert all measurements to inches if needed
  let waistInches = waist;
  let neckInches = neck;
  let hipInches = hip;
  let heightInches = height;
  
  if (measureUnit === 'cm') {
    waistInches = waist / 2.54;
    neckInches = neck / 2.54;
    hipInches = hip / 2.54;
  }
  
  if (heightUnit === 'cm') {
    heightInches = height / 2.54;
  }
  
  // Calculate body fat percentage using U.S. Navy method
  let bodyFatPercentage: number;
  
  if (sex === 'male') {
    bodyFatPercentage = 86.010 * Math.log10(waistInches - neckInches) - 70.041 * Math.log10(heightInches) + 36.76;
  } else {
    bodyFatPercentage = 163.205 * Math.log10(waistInches + hipInches - neckInches) - 97.684 * Math.log10(heightInches) - 78.387;
  }
  
  return Math.max(0, Math.round(bodyFatPercentage * 10) / 10); // Ensure non-negative value
};

export const getBodyFatCategory = (bodyFatPercentage: number, sex: 'male' | 'female'): string => {
  if (sex === 'male') {
    if (bodyFatPercentage < 6) return 'Essential Fat';
    if (bodyFatPercentage < 14) return 'Athletes';
    if (bodyFatPercentage < 18) return 'Fitness';
    if (bodyFatPercentage < 25) return 'Average';
    return 'Obese';
  } else {
    if (bodyFatPercentage < 16) return 'Essential Fat';
    if (bodyFatPercentage < 21) return 'Athletes';
    if (bodyFatPercentage < 25) return 'Fitness';
    if (bodyFatPercentage < 32) return 'Average';
    return 'Obese';
  }
};

// Heart Rate Calculator functions
export const calculateHeartRateZones = (
  age: number,
  restingHR?: number
): {
  maxHR: number;
  zones: {
    rest: number;
    warmUp: [number, number];
    fatBurn: [number, number];
    cardio: [number, number];
    peak: [number, number];
  };
} => {
  // Calculate maximum heart rate using Tanaka formula (more accurate than 220-age)
  const maxHR = 208 - (0.7 * age);
  
  // Set default resting heart rate if not provided
  const restHR = restingHR || 70;
  
  // Calculate heart rate reserve (Karvonen method)
  const hrReserve = maxHR - restHR;
  
  // Calculate heart rate zones based on percentage of heart rate reserve
  const getTargetHR = (percentLow: number, percentHigh: number): [number, number] => {
    const low = Math.round(restHR + (hrReserve * percentLow));
    const high = Math.round(restHR + (hrReserve * percentHigh));
    return [low, high];
  };
  
  return {
    maxHR: Math.round(maxHR),
    zones: {
      rest: restHR,
      warmUp: getTargetHR(0.5, 0.6), // 50-60% of HRR
      fatBurn: getTargetHR(0.6, 0.7), // 60-70% of HRR
      cardio: getTargetHR(0.7, 0.85), // 70-85% of HRR
      peak: getTargetHR(0.85, 1.0) // 85-100% of HRR
    }
  };
};

// Weight Timeline Calculator functions
export const calculateWeightTimeline = (
  currentWeight: number,
  goalWeight: number,
  weightUnit: 'kg' | 'lbs',
  calorieDeficit: number
): {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  weeklyData: { week: number; weight: number }[];
  targetDate: Date;
  weightUnit: 'kg' | 'lbs';
} => {
  // Calculate weight change needed
  const weightChange = Math.abs(goalWeight - currentWeight);
  const isWeightLoss = goalWeight < currentWeight;
  
  // Calculate calories needed per kg/lb
  const caloriesPerUnit = weightUnit === 'kg' ? 7700 : 3500;
  
  // Calculate total calories needed
  const totalCaloriesNeeded = weightChange * caloriesPerUnit;
  
  // Calculate time needed in days
  const daysNeeded = Math.ceil(totalCaloriesNeeded / calorieDeficit);
  
  // Calculate weeks and months
  const weeksNeeded = Math.ceil(daysNeeded / 7);
  const monthsNeeded = Math.floor(weeksNeeded / 4);
  
  // Calculate target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysNeeded);
  
  // Generate weekly data for chart
  const weeklyData = [];
  const weeklyWeightChange = (calorieDeficit * 7) / caloriesPerUnit * (isWeightLoss ? -1 : 1);
  
  for (let week = 0; week <= weeksNeeded; week++) {
    weeklyData.push({
      week,
      weight: parseFloat((currentWeight + (weeklyWeightChange * week)).toFixed(1))
    });
  }
  
  return {
    totalDays: daysNeeded,
    totalWeeks: weeksNeeded,
    totalMonths: monthsNeeded,
    weeklyData,
    targetDate,
    weightUnit
  };
};

// Waist-to-Hip Ratio Calculator functions
export const calculateWaistHipRatio = (
  waist: number,
  hip: number
): number => {
  return waist / hip;
};

export const getWaistHipRiskLevel = (
  ratio: number,
  sex: 'male' | 'female'
): string => {
  if (sex === 'male') {
    if (ratio < 0.90) return 'Low Risk';
    if (ratio <= 0.95) return 'Moderate Risk';
    return 'High Risk';
  } else {
    if (ratio < 0.80) return 'Low Risk';
    if (ratio <= 0.85) return 'Moderate Risk';
    return 'High Risk';
  }
};
