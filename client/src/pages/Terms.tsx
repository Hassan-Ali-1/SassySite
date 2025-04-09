
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileWarning, Calculator, Stethoscope, BarChart, Users, Scale } from 'lucide-react';

export default function Terms() {
  return (
    <PageLayout 
      title="Terms of Use" 
      description="FitCalc's terms of use. Learn about our guidelines for using our health calculators responsibly."
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary/90 to-primary text-white rounded-xl p-8 mb-12 shadow-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center mb-4">
              <FileWarning className="h-16 w-16" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Use</h1>
            <p className="text-xl text-white/90">
              Guidelines for using FitCalc's health calculators responsibly
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Alert message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Alert className="border-primary/30 bg-primary/5">
              <AlertDescription className="text-center font-medium">
                By using FitCalc, you agree to these terms. Please read them carefully.
              </AlertDescription>
            </Alert>
          </motion.div>
          
          {/* Terms sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Calculator className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>1. Use of Calculators</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our calculators provide estimates based on general formulas and scientific research. Results 
                    should be used as guidelines only and not as definitive medical advice. These calculators 
                    are designed for educational purposes and to give you a general sense of your health metrics.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>2. Medical Disclaimer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    FitCalc is not a substitute for professional medical advice, diagnosis, or treatment. 
                    Always consult with qualified healthcare professionals for medical decisions. Never 
                    disregard professional medical advice or delay seeking it because of something you have 
                    read on this website.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>3. Accuracy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    While we strive for accuracy in our calculators by using scientifically validated formulas, 
                    we make no guarantees about the results provided. Individual results may vary based on 
                    factors that our calculators cannot account for, such as specific health conditions, 
                    genetic factors, and variations in body composition.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>4. User Conduct</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Users agree not to misuse the service or attempt to access it using automated means. 
                    You may not use FitCalc for any purpose that is unlawful or prohibited by these terms. 
                    We reserve the right to terminate access to anyone who violates these terms or uses 
                    the service inappropriately.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Additional terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="mb-10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  <span>Additional Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">5. Changes to Terms</h3>
                  <p className="text-gray-600">
                    We may update these terms of use from time to time. We will notify users of any material 
                    changes by posting the new terms on this page. Your continued use of FitCalc after changes 
                    constitutes acceptance of those changes.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">6. Intellectual Property</h3>
                  <p className="text-gray-600">
                    All content, features, and functionality on FitCalc, including but not limited to design, 
                    text, graphics, and calculators, are owned by FitCalc and are protected by copyright, 
                    trademark, and other intellectual property laws.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">7. Limitation of Liability</h3>
                  <p className="text-gray-600">
                    To the fullest extent permitted by law, FitCalc shall not be liable for any direct, 
                    indirect, incidental, consequential, or special damages arising out of or in connection 
                    with your use of the service, whether based on warranty, contract, tort, or any other 
                    legal theory.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Final note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center text-gray-500 text-sm"
          >
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
