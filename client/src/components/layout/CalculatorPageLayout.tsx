import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';
import Header from './Header';
import Footer from './Footer';

export interface CalculatorPageLayoutProps {
  title: string;
  description: string;
  calculatorName: string;
  children: ReactNode;
}

export default function CalculatorPageLayout({ 
  title, 
  description, 
  calculatorName, 
  children 
}: CalculatorPageLayoutProps) {
  const siteTitle = 'FitCalc';
  const fullTitle = `${title} | ${siteTitle}`;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      
      {/* Header */}
      <Header />
      
      {/* Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
                  <span className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    Home
                  </span>
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="ml-2 text-gray-700 font-medium">{calculatorName}</span>
              </li>
            </ol>
          </nav>
          
          {/* Hero section */}
          <div className="bg-green-100 text-gray-800 py-12 mb-12 rounded-lg">
            <div className="max-w-3xl mx-auto text-center px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-gray-700">
                {description}
              </p>
            </div>
          </div>
          
          {/* Calculator content */}
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}