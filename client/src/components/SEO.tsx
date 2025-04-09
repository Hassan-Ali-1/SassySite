import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
}

export default function SEO({
  title,
  description,
  keywords = 'weight management, calculators, BMI, ideal weight, body fat, calorie calculator, weight loss',
  ogType = 'website'
}: SEOProps) {
  const siteName = 'FitCalc - Free Weight Management Calculators';
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}