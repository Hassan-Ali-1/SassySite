import { Chart, ChartData, ChartOptions } from 'chart.js';

// BMI Chart
export const createBMIChart = (ctx: CanvasRenderingContext2D, bmiValue: number): Chart => {
  const data: ChartData = {
    labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
    datasets: [{
      label: 'BMI Categories',
      data: [18.5, 6.5, 5, 10], // Width of each category (18.5, 25, 30, 40)
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(75, 192, 75, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(255, 99, 132, 0.5)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 75, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options: ChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            if (context.dataIndex === 0) {
              return label + ': < 18.5';
            } else if (context.dataIndex === 1) {
              return label + ': 18.5 - 24.9';
            } else if (context.dataIndex === 2) {
              return label + ': 25 - 29.9';
            } else {
              return label + ': ≥ 30';
            }
          }
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        stacked: true,
        max: 40,
        title: {
          display: true,
          text: 'BMI Value'
        }
      },
      y: {
        stacked: true
      }
    }
  };

  const chart = new Chart(ctx, {
    type: 'bar',
    data,
    options
  });

  // Add annotation for user's BMI
  const bmiPosition = Math.min(bmiValue, 40);
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.beginPath();
  ctx.moveTo(chart.scales.x.getPixelForValue(bmiPosition), chart.chartArea.top);
  ctx.lineTo(chart.scales.x.getPixelForValue(bmiPosition), chart.chartArea.bottom);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.stroke();

  // Add BMI value text
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillText(`Your BMI: ${bmiValue}`, chart.scales.x.getPixelForValue(bmiPosition), chart.chartArea.top - 10);

  return chart;
};

// Ideal Weight Chart
export const createIdealWeightChart = (
  ctx: CanvasRenderingContext2D,
  devine: number,
  hamwi: number,
  robinson: number,
  miller: number,
  unit: string
): Chart => {
  const data: ChartData = {
    labels: ['Devine', 'Hamwi', 'Robinson', 'Miller'],
    datasets: [{
      label: `Ideal Weight (${unit})`,
      data: [devine, hamwi, robinson, miller],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ideal Weight by Formula'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: unit
        }
      }
    }
  };

  return new Chart(ctx, {
    type: 'bar',
    data,
    options
  });
};

// Calorie Chart
export const createCalorieChart = (
  ctx: CanvasRenderingContext2D,
  maintenanceCalories: number,
  targetCalories: number,
  goal: 'lose' | 'maintain' | 'gain'
): Chart => {
  let chartTitle = '';
  let backgroundColor = ['rgba(75, 192, 192, 0.5)', 'rgba(75, 192, 192, 0.5)'];
  
  if (goal === 'lose') {
    chartTitle = 'Daily Calorie Target for Weight Loss';
    backgroundColor = ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'];
  } else if (goal === 'gain') {
    chartTitle = 'Daily Calorie Target for Weight Gain';
    backgroundColor = ['rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)'];
  } else {
    chartTitle = 'Daily Calorie Target for Maintenance';
  }

  const data: ChartData = {
    labels: ['Target', 'Maintenance'],
    datasets: [{
      label: 'Calories',
      data: [targetCalories, maintenanceCalories],
      backgroundColor,
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
      circumference: 360,
      rotation: 0
    }]
  };

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartTitle
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            return `${label}: ${Math.round(context.raw as number)} calories`;
          }
        }
      }
    }
  };

  return new Chart(ctx, {
    type: 'pie',
    data,
    options
  });
};

// Body Fat Chart
export const createBodyFatChart = (
  ctx: CanvasRenderingContext2D,
  bodyFatPercentage: number,
  sex: 'male' | 'female'
): Chart => {
  // Define category ranges and colors based on sex
  const categories = sex === 'male' ? 
    [
      { name: 'Essential Fat', range: [2, 6], color: 'rgba(54, 162, 235, 0.5)' },
      { name: 'Athletes', range: [6, 14], color: 'rgba(75, 192, 75, 0.5)' },
      { name: 'Fitness', range: [14, 18], color: 'rgba(75, 192, 75, 0.3)' },
      { name: 'Average', range: [18, 25], color: 'rgba(255, 206, 86, 0.5)' },
      { name: 'Obese', range: [25, 40], color: 'rgba(255, 99, 132, 0.5)' }
    ] : 
    [
      { name: 'Essential Fat', range: [10, 16], color: 'rgba(54, 162, 235, 0.5)' },
      { name: 'Athletes', range: [16, 21], color: 'rgba(75, 192, 75, 0.5)' },
      { name: 'Fitness', range: [21, 25], color: 'rgba(75, 192, 75, 0.3)' },
      { name: 'Average', range: [25, 32], color: 'rgba(255, 206, 86, 0.5)' },
      { name: 'Obese', range: [32, 45], color: 'rgba(255, 99, 132, 0.5)' }
    ];

  // Find user's category
  const userCategory = categories.find(category => 
    bodyFatPercentage >= category.range[0] && bodyFatPercentage < category.range[1]
  ) || categories[categories.length - 1];

  // Calculate angles for gauge chart (semi-circle)
  const data: ChartData = {
    labels: categories.map(c => c.name),
    datasets: [{
      data: categories.map(c => c.range[1] - c.range[0]),
      backgroundColor: categories.map(c => c.color),
      borderColor: categories.map(c => c.color.replace('0.5', '1')),
      borderWidth: 1
    }]
  };

  const options: ChartOptions = {
    responsive: true,
    cutout: '70%',
    circumference: 180,
    rotation: 270,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const categoryIndex = context.dataIndex;
            const category = categories[categoryIndex];
            return `${category.name}: ${category.range[0]}-${category.range[1]}%`;
          }
        }
      }
    }
  };

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data,
    options
  });

  // Add body fat percentage in the center
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = userCategory.color.replace('0.5', '1');
  ctx.font = 'bold 24px Arial';
  ctx.fillText(`${bodyFatPercentage}%`, chart.width / 2, chart.height / 2 - 15);
  
  ctx.font = '14px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText(userCategory.name, chart.width / 2, chart.height / 2 + 15);

  return chart;
};

// Heart Rate Chart
export const createHeartRateChart = (
  ctx: CanvasRenderingContext2D,
  heartRateZones: {
    maxHR: number;
    zones: {
      rest: number;
      warmUp: [number, number];
      fatBurn: [number, number];
      cardio: [number, number];
      peak: [number, number];
    };
  }
): Chart => {
  const zoneLabels = [
    'Resting',
    'Warm Up (50-60%)',
    'Fat Burning (60-70%)',
    'Cardio (70-85%)',
    'Peak (85-100%)'
  ];

  // Calculate zone ranges for the chart
  const zoneData = [
    heartRateZones.zones.rest,
    heartRateZones.zones.warmUp[1] - heartRateZones.zones.rest,
    heartRateZones.zones.fatBurn[1] - heartRateZones.zones.warmUp[1],
    heartRateZones.zones.cardio[1] - heartRateZones.zones.fatBurn[1],
    heartRateZones.zones.peak[1] - heartRateZones.zones.cardio[1]
  ];

  const data: ChartData = {
    labels: zoneLabels,
    datasets: [{
      label: 'Heart Rate Zones (BPM)',
      data: zoneData,
      backgroundColor: [
        'rgba(200, 200, 200, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(75, 192, 75, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 99, 132, 0.5)'
      ],
      borderColor: [
        'rgba(200, 200, 200, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 75, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  };

  const options: ChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            if (index === 0) {
              return `Resting: ${heartRateZones.zones.rest} BPM`;
            } else if (index === 1) {
              return `Warm Up: ${heartRateZones.zones.warmUp[0]}-${heartRateZones.zones.warmUp[1]} BPM`;
            } else if (index === 2) {
              return `Fat Burning: ${heartRateZones.zones.fatBurn[0]}-${heartRateZones.zones.fatBurn[1]} BPM`;
            } else if (index === 3) {
              return `Cardio: ${heartRateZones.zones.cardio[0]}-${heartRateZones.zones.cardio[1]} BPM`;
            } else {
              return `Peak: ${heartRateZones.zones.peak[0]}-${heartRateZones.zones.peak[1]} BPM`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Heart Rate (BPM)'
        },
        max: heartRateZones.maxHR
      },
      y: {
        stacked: true
      }
    }
  };

  return new Chart(ctx, {
    type: 'bar',
    data,
    options
  });
};

// Weight Timeline Chart
export const createWeightTimelineChart = (
  ctx: CanvasRenderingContext2D,
  timelineResult: {
    weeklyData: { week: number; weight: number }[];
    weightUnit: 'kg' | 'lbs';
  }
): Chart => {
  const data: ChartData = {
    labels: timelineResult.weeklyData.map(data => `Week ${data.week}`),
    datasets: [{
      label: `Weight (${timelineResult.weightUnit})`,
      data: timelineResult.weeklyData.map(data => data.weight),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  };

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Projected Weight Change Timeline'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: `Weight (${timelineResult.weightUnit})`
        }
      }
    }
  };

  return new Chart(ctx, {
    type: 'line',
    data,
    options
  });
};

// Waist-Hip Ratio Chart
export const createWaistHipChart = (
  ctx: CanvasRenderingContext2D,
  ratio: number,
  sex: 'male' | 'female'
): Chart => {
  // Define risk levels based on sex
  const riskLevels = sex === 'male' ? 
    [
      { name: 'Low Risk', range: [0.7, 0.9], color: 'rgba(75, 192, 75, 0.5)' },
      { name: 'Moderate Risk', range: [0.9, 0.95], color: 'rgba(255, 206, 86, 0.5)' },
      { name: 'High Risk', range: [0.95, 1.2], color: 'rgba(255, 99, 132, 0.5)' }
    ] : 
    [
      { name: 'Low Risk', range: [0.7, 0.8], color: 'rgba(75, 192, 75, 0.5)' },
      { name: 'Moderate Risk', range: [0.8, 0.85], color: 'rgba(255, 206, 86, 0.5)' },
      { name: 'High Risk', range: [0.85, 1.1], color: 'rgba(255, 99, 132, 0.5)' }
    ];

  // Find user's risk level
  const userRiskLevel = riskLevels.find(level => 
    ratio >= level.range[0] && ratio < level.range[1]
  ) || riskLevels[riskLevels.length - 1];

  const data: ChartData = {
    labels: riskLevels.map(level => level.name),
    datasets: [{
      data: riskLevels.map(level => level.range[1] - level.range[0]),
      backgroundColor: riskLevels.map(level => level.color),
      borderColor: riskLevels.map(level => level.color.replace('0.5', '1')),
      borderWidth: 1
    }]
  };

  const options: ChartOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const levelIndex = context.dataIndex;
            const level = riskLevels[levelIndex];
            return `${level.name}: ${level.range[0]}-${level.range[1]}`;
          }
        }
      }
    }
  };

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data,
    options
  });

  // Add WHR value in the center
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = userRiskLevel.color.replace('0.5', '1');
  ctx.font = 'bold 24px Arial';
  ctx.fillText(ratio.toFixed(2), chart.width / 2, chart.height / 2 - 15);
  
  ctx.font = '14px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText(userRiskLevel.name, chart.width / 2, chart.height / 2 + 15);

  return chart;
};
