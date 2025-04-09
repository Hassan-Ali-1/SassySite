import { Helmet } from 'react-helmet';
import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

/**
 * Creates SEO metadata component for the page
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = 'weight management, calculators, BMI, ideal weight, body fat, calorie calculator, weight loss',
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
  ogType = 'website'
}) => {
  const siteName = 'FitCalc - Free Weight Management Calculators';
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

/**
 * Page-specific SEO configurations
 */
export const pageSEOConfig = {
  home: {
    title: 'FitCalc - Free Weight Management Calculators',
    description: 'Free, accurate calculators for weight management, BMI, body fat, ideal weight, calorie needs, heart rate zones, and more. All calculations happen in your browser with no data storage.',
  },
  bmi: {
    title: 'BMI Calculator - FitCalc',
    description: 'Calculate your Body Mass Index (BMI) and see where you fall on the BMI scale. Our free calculator provides instant results with helpful visualization.',
  },
  idealWeight: {
    title: 'Ideal Weight Calculator - FitCalc',
    description: 'Discover your ideal body weight range based on your height, gender, and frame size using multiple scientific formulas.',
  },
  calories: {
    title: 'Calorie Calculator - FitCalc',
    description: 'Calculate your daily calorie needs for weight loss, maintenance, or gain with our accurate calorie calculator.',
  },
  bodyFat: {
    title: 'Body Fat Percentage Calculator - FitCalc',
    description: 'Estimate your body fat percentage using skinfold measurements or the Navy method. Includes visual charts and health category information.',
  },
  heartRate: {
    title: 'Heart Rate Zone Calculator - FitCalc',
    description: 'Determine your optimal heart rate zones for fat burning, cardio fitness, and peak performance based on your age and resting heart rate.',
  },
  weightTimeline: {
    title: 'Weight Timeline Calculator - FitCalc',
    description: 'Plan your weight loss or gain journey with a realistic timeline projection. See how long it will take to reach your goal weight.',
  },
  waistHip: {
    title: 'Waist-to-Hip Ratio Calculator - FitCalc',
    description: 'Calculate your waist-to-hip ratio and assess potential health risks associated with body fat distribution.',
  },
  privacy: {
    title: 'Privacy Policy - FitCalc',
    description: 'FitCalc does not store any personal information. All calculations are performed client-side in your browser for complete privacy.',
  },
  terms: {
    title: 'Terms of Use - FitCalc',
    description: 'Terms and conditions for using the FitCalc weight management calculators.',
  },
};

/**
 * Structured data for calculators for better SEO
 */
export const getCalculatorStructuredData = (calculatorType: string): string => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Web browser"
  };
  
  const calculatorSpecificData: Record<string, any> = {
    bmi: {
      "name": "BMI Calculator",
      "description": "Calculate your Body Mass Index (BMI) and see where you fall on the BMI scale."
    },
    idealWeight: {
      "name": "Ideal Weight Calculator", 
      "description": "Discover your ideal body weight range based on your height, gender, and frame size."
    },
    calories: {
      "name": "Calorie Calculator",
      "description": "Calculate your daily calorie needs for weight loss, maintenance, or gain."
    },
    bodyFat: {
      "name": "Body Fat Percentage Calculator", 
      "description": "Estimate your body fat percentage using skinfold measurements or Navy method."
    },
    heartRate: {
      "name": "Heart Rate Zone Calculator", 
      "description": "Determine your optimal heart rate zones for fat burning and cardio fitness."
    },
    weightTimeline: {
      "name": "Weight Timeline Calculator", 
      "description": "Plan your weight loss or gain journey with a realistic timeline projection."
    },
    waistHip: {
      "name": "Waist-to-Hip Ratio Calculator", 
      "description": "Calculate your waist-to-hip ratio and assess potential health risks."
    }
  };
  
  if (!calculatorSpecificData[calculatorType]) {
    return '';
  }
  
  const fullData = { ...baseData, ...calculatorSpecificData[calculatorType] };
  return JSON.stringify(fullData);
};

/**
 * Component to add structured data to a page
 */
export const StructuredData: React.FC<{ data: string }> = ({ data }) => {
  if (!data) return null;
  
  return (
    <Helmet>
      <script type="application/ld+json">{data}</script>
    </Helmet>
  );
};
