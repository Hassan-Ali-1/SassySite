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

// Calculator page imports
import BMICalculatorPage from "@/pages/calculators/BMICalculator";
import IdealWeightCalculatorPage from "@/pages/calculators/IdealWeightCalculator";
import CalorieCalculatorPage from "@/pages/calculators/CalorieCalculator";
import BodyFatCalculatorPage from "@/pages/calculators/BodyFatCalculator";
import HeartRateCalculatorPage from "@/pages/calculators/HeartRateCalculator";
import WeightTimelineCalculatorPage from "@/pages/calculators/WeightTimelineCalculator";
import WaistHipCalculatorPage from "@/pages/calculators/WaistHipCalculator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mission" component={Mission} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={FAQ} />
      
      {/* Calculator Routes */}
      <Route path="/calculators/bmi" component={BMICalculatorPage} />
      <Route path="/calculators/ideal-weight" component={IdealWeightCalculatorPage} />
      <Route path="/calculators/calorie" component={CalorieCalculatorPage} />
      <Route path="/calculators/body-fat" component={BodyFatCalculatorPage} />
      <Route path="/calculators/heart-rate" component={HeartRateCalculatorPage} />
      <Route path="/calculators/weight-timeline" component={WeightTimelineCalculatorPage} />
      <Route path="/calculators/waist-hip" component={WaistHipCalculatorPage} />
      
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
