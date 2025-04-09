import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom styles for calculator cards
const style = document.createElement('style');
style.textContent = `
  .calculator-card {
    transition: all 0.3s ease;
  }
  .calculator-card:hover {
    transform: translateY(-5px);
  }
  
  @layer base {
    :root {
      --background: 0 0% 98%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      --primary: 122 39% 49%;
      --primary-foreground: 210 40% 98%;
      --secondary: 210 79% 46%;
      --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 36 100% 50%;
      --accent-foreground: 222.2 47.4% 11.2%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 40% 98%;
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
      --ring: 122 39% 49%;
      --radius: 0.5rem;
      
      /* Chart colors */
      --chart-1: 122 39% 49%;
      --chart-2: 210 79% 46%;
      --chart-3: 36 100% 50%;
      --chart-4: 0 84.2% 60.2%;
      --chart-5: 262 83% 58%;
    }
  }
`;
document.head.appendChild(style);

// Apply custom font to body
document.body.classList.add('font-sans', 'antialiased', 'bg-gray-50', 'text-gray-800');

createRoot(document.getElementById("root")!).render(<App />);
