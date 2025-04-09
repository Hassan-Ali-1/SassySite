import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home, Calculator, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | FitCalc</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-green-100 p-8 flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
              <p className="text-gray-600 max-w-md">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
              </p>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Home className="h-4 w-4" /> Back to Home
                  </Button>
                </Link>
                <Link href="/#calculators">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" /> Try Our Calculators
                  </Button>
                </Link>
              </div>
              <Button
                variant="ghost"
                className="mt-6 text-gray-500"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
