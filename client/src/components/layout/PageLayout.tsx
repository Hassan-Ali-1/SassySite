
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

export interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  const siteTitle = 'FitCalc';
  const fullTitle = `${title} | ${siteTitle}`;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={fullTitle} />
        {description && <meta property="og:description" content={description} />}
        <meta name="twitter:title" content={fullTitle} />
        {description && <meta name="twitter:description" content={description} />}
      </Helmet>
      
      {/* Content */}
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}
