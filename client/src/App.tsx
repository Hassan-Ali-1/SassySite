import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Mission from "@/pages/Mission";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import FAQ from "@/pages/FAQ";
import { ModalProvider } from "./contexts/ModalContext";
import { Helmet } from "react-helmet";

// Calculator pages
import BMICalculator from "@/pages/calculators/BMICalculator";
import IdealWeightCalculator from "@/pages/calculators/IdealWeightCalculator";
import CalorieCalculator from "@/pages/calculators/CalorieCalculator";
import BodyFatCalculator from "@/pages/calculators/BodyFatCalculator";
import HeartRateCalculator from "@/pages/calculators/HeartRateCalculator";
import WeightTimelineCalculator from "@/pages/calculators/WeightTimelineCalculator";
import WaistHipCalculator from "@/pages/calculators/WaistHipCalculator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Static pages */}
      <Route path="/mission" component={Mission} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={FAQ} />
      
      {/* Calculator pages */}
      <Route path="/calculators/bmi" component={BMICalculator} />
      <Route path="/calculators/ideal-weight" component={IdealWeightCalculator} />
      <Route path="/calculators/calorie" component={CalorieCalculator} />
      <Route path="/calculators/body-fat" component={BodyFatCalculator} />
      <Route path="/calculators/heart-rate" component={HeartRateCalculator} />
      <Route path="/calculators/weight-timeline" component={WeightTimelineCalculator} />
      <Route path="/calculators/waist-hip" component={WaistHipCalculator} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Helmet>
          <title>FitCalc - Free Weight Management Calculators</title>
          <meta name="description" content="Free weight management calculators for tracking your health goals. Calculate BMI, ideal weight, calorie needs, body fat percentage and more." />
          <meta name="keywords" content="weight management, calculators, BMI, ideal weight, body fat, calorie calculator, weight loss" />
          <meta name="author" content="FitCalc" />
          <meta property="og:title" content="FitCalc - Free Weight Management Calculators" />
          <meta property="og:description" content="Free weight management calculators for tracking your health goals." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="FitCalc - Free Weight Management Calculators" />
          <meta name="twitter:description" content="Free weight management calculators for tracking your health goals." />
        </Helmet>
        <Router />
        <Toaster />
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
