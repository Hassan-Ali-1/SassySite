import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the calculator application
  // Most calculation logic is client-side, but adding a few endpoints for future expansion
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
  });
  
  // Feedback submission endpoint (for future use)
  app.post('/api/feedback', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // In a real app, this would store feedback in a database or send an email
    // For now, just return success response
    res.json({
      success: true,
      message: 'Feedback received successfully'
    });
  });
  
  // Get reference data for calculators (could be used in the future for dynamic ranges)
  app.get('/api/reference/bmi-categories', (req, res) => {
    res.json({
      categories: [
        { name: 'Underweight', range: [0, 18.5], description: 'BMI is below the healthy range.' },
        { name: 'Normal weight', range: [18.5, 25], description: 'BMI is within the healthy range.' },
        { name: 'Overweight', range: [25, 30], description: 'BMI is above the healthy range.' },
        { name: 'Obese', range: [30, 100], description: 'BMI indicates obesity.' }
      ]
    });
  });
  
  app.get('/api/reference/body-fat-categories', (req, res) => {
    res.json({
      male: [
        { name: 'Essential Fat', range: [2, 6] },
        { name: 'Athletes', range: [6, 14] },
        { name: 'Fitness', range: [14, 18] },
        { name: 'Average', range: [18, 25] },
        { name: 'Obese', range: [25, 40] }
      ],
      female: [
        { name: 'Essential Fat', range: [10, 16] },
        { name: 'Athletes', range: [16, 21] },
        { name: 'Fitness', range: [21, 25] },
        { name: 'Average', range: [25, 32] },
        { name: 'Obese', range: [32, 45] }
      ]
    });
  });
  
  app.get('/api/reference/waist-hip-ratio', (req, res) => {
    res.json({
      male: [
        { level: 'Low Risk', range: [0, 0.9] },
        { level: 'Moderate Risk', range: [0.9, 0.95] },
        { level: 'High Risk', range: [0.95, 2] }
      ],
      female: [
        { level: 'Low Risk', range: [0, 0.8] },
        { level: 'Moderate Risk', range: [0.8, 0.85] },
        { level: 'High Risk', range: [0.85, 2] }
      ]
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
