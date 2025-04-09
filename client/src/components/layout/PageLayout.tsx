
import { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-sans font-bold text-4xl mb-8 text-center">{title}</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
