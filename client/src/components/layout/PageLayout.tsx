
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

export interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  const siteTitle = 'FitCalc';
  const fullTitle = `${title} | ${siteTitle}`;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={fullTitle} />
        {description && <meta property="og:description" content={description} />}
        <meta name="twitter:title" content={fullTitle} />
        {description && <meta name="twitter:description" content={description} />}
      </Helmet>
      
      {/* Header */}
      <Header />
      
      {/* Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
