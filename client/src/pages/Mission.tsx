
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Shield, LineChart, Lock, Users, Award, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Mission() {
  return (
    <PageLayout 
      title="Our Mission" 
      description="Learn about FitCalc's mission to provide free, accurate, and accessible weight management tools for everyone."
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary to-primary-foreground text-white py-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center px-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h1>
            <p className="text-xl text-white/90 mb-6">
              Empowering your health journey with accessible, accurate, and privacy-focused tools.
            </p>
          </motion.div>
        </div>
        
        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Empowering Health Decisions</CardTitle>
              <CardDescription>Our Purpose</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                At FitCalc, we believe that accurate health information should be accessible to everyone. 
                Our mission is to provide free, reliable weight management tools that help you make informed 
                decisions about your health journey. We are committed to creating a platform that respects your 
                privacy, delivers accurate information, and makes health calculations understandable.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Core values section */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-center mb-8"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <LineChart className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Accuracy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We use scientifically validated formulas and provide clear explanations for all calculations, 
                    ensuring reliable results you can trust for your health decisions.
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
                  <Lock className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Privacy</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your data stays in your browser - we never store or track your personal information. 
                    We believe your health data belongs only to you, and we've designed our platform with 
                    privacy at its core.
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
                    <CardTitle>Accessibility</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our tools are free and available to everyone, with clear visual results and helpful 
                    explanations. We believe health information should be understandable and accessible 
                    regardless of technical background.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Transparency</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We clearly explain the science behind each calculator and provide context for 
                    interpreting results. No black boxes or hidden methodologies - just straightforward,
                    evidence-based health information.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Quality</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We continuously improve our calculators based on scientific research and user 
                    feedback. Our commitment to quality means regularly updating our tools to ensure 
                    the best possible experience and results.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle>Education</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Beyond just providing numbers, we aim to educate users about what those numbers mean. 
                    We believe understanding health metrics helps people make better long-term decisions 
                    about their wellness.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
