import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to safely read JSON
const readJsonFile = (filePath, fallback = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return fallback;
};

// Helper to safely write JSON
const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
};

const propertiesPath = path.join(__dirname, 'data', 'properties.json');
const plotsPath = path.join(__dirname, 'data', 'plots.json');
const inquiriesPath = path.join(__dirname, 'data', 'inquiries.json');
const siteVisitsPath = path.join(__dirname, 'data', 'site-visits.json');
const testimonialsPath = path.join(__dirname, 'data', 'testimonials.json');

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Kokan Nirvana Sea Shore Property API',
    location: 'Dapoli, Maharashtra',
    timestamp: new Date().toISOString()
  });
});

// Properties
app.get('/api/properties', (req, res) => {
  const { category, maxPrice, search } = req.query;
  let properties = readJsonFile(propertiesPath, []);

  if (category && category !== 'All') {
    properties = properties.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    properties = properties.filter(p => p.numericPrice <= Number(maxPrice));
  }

  if (search) {
    const q = search.toLowerCase();
    properties = properties.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: properties.length,
    data: properties
  });
});

app.get('/api/properties/:id', (req, res) => {
  const properties = readJsonFile(propertiesPath, []);
  const prop = properties.find(p => p.id === req.params.id);
  if (!prop) {
    return res.status(404).json({ success: false, message: 'Property not found' });
  }
  res.json({ success: true, data: prop });
});

// Plots for interactive master plan
app.get('/api/plots', (req, res) => {
  const plots = readJsonFile(plotsPath, []);
  res.json({ success: true, data: plots });
});

app.patch('/api/plots/:id/reserve', (req, res) => {
  const plots = readJsonFile(plotsPath, []);
  const index = plots.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Plot not found' });
  }

  if (plots[index].status === 'sold') {
    return res.status(400).json({ success: false, message: 'Plot is already sold' });
  }

  plots[index].status = 'reserved';
  writeJsonFile(plotsPath, plots);
  res.json({ success: true, message: `Plot ${plots[index].name} marked as reserved`, data: plots[index] });
});

// Inquiries / Leads
app.get('/api/inquiries', (req, res) => {
  const inquiries = readJsonFile(inquiriesPath, []);
  res.json({ success: true, count: inquiries.length, data: inquiries });
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, city, interestedCategory, budget, message, propertyTitle } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
  }

  const inquiries = readJsonFile(inquiriesPath, []);
  const newInquiry = {
    id: `inq-${Date.now()}`,
    name,
    email: email || '',
    phone,
    city: city || 'Not Specified',
    interestedCategory: interestedCategory || 'General Inquiry',
    budget: budget || 'Flexible',
    propertyTitle: propertyTitle || 'General',
    message: message || '',
    createdAt: new Date().toISOString(),
    status: 'New Lead'
  };

  inquiries.unshift(newInquiry);
  writeJsonFile(inquiriesPath, inquiries);

  res.status(201).json({
    success: true,
    message: 'Thank you for your interest! Our Kokan Nirvana relationship executive will contact you shortly.',
    data: newInquiry
  });
});

// VIP Site Visits
app.get('/api/site-visits', (req, res) => {
  const visits = readJsonFile(siteVisitsPath, []);
  res.json({ success: true, count: visits.length, data: visits });
});

app.post('/api/site-visit', (req, res) => {
  const { name, email, phone, city, preferredDate, pickupNeeded, guestCount, propertyId, propertyName, notes } = req.body;

  if (!name || !phone || !preferredDate) {
    return res.status(400).json({ success: false, message: 'Name, phone, and preferred date are required.' });
  }

  const visits = readJsonFile(siteVisitsPath, []);
  const newVisit = {
    id: `sv-${Date.now()}`,
    name,
    email: email || '',
    phone,
    city: city || '',
    preferredDate,
    pickupNeeded: pickupNeeded || 'Own Vehicle',
    guestCount: Number(guestCount) || 2,
    propertyId: propertyId || '',
    propertyName: propertyName || 'Kokan Nirvana Sea Shore Projects',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    status: 'Pending Confirmation'
  };

  visits.unshift(newVisit);
  writeJsonFile(siteVisitsPath, visits);

  res.status(201).json({
    success: true,
    message: 'Your VIP Site Visit request is received! Our Dapoli guest hospitality manager will call to confirm logistics and complimentary Konkani refreshments.',
    data: newVisit
  });
});

// Testimonials
app.get('/api/testimonials', (req, res) => {
  const testimonials = readJsonFile(testimonialsPath, []);
  res.json({ success: true, data: testimonials });
});

// Live Stats & Dapoli Overview
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      acresDeveloped: '125+',
      plotsDelivered: '340+',
      satisfiedFamilies: '480+',
      coastlineDistance: '0 - 400m',
      clearTitleGuarantee: '100%',
      airQualityIndex: '18 AQI (Pure Ozone)',
      travelTimeMumbai: '3.5 - 4 Hrs',
      travelTimePune: '3 - 3.5 Hrs'
    }
  });
});

// Dapoli Weather Live Simulation
app.get('/api/weather', (req, res) => {
  res.json({
    success: true,
    data: {
      location: 'Dapoli Coastal Belt, Maharashtra',
      temperature: '26°C',
      condition: 'Sunny Sea Breeze',
      humidity: '62%',
      windSpeed: '14 km/h (Arabian Sea Gusts)',
      aqi: '18 (Clean Air Index)',
      seaWaterTemp: '24°C',
      sunsetTime: '6:12 PM'
    }
  });
});

// Investment ROI Calculator Endpoint
app.post('/api/calculator/investment', (req, res) => {
  const { propertyCost = 3000000, holdingYears = 5, downPaymentPercent = 20, loanInterestRate = 8.75 } = req.body;

  const cost = Number(propertyCost);
  const years = Number(holdingYears);
  const dpPercent = Number(downPaymentPercent) / 100;
  const interestRate = Number(loanInterestRate) / 100 / 12;

  // Dapoli coastal land historic CAGR is ~13.5%
  const annualGrowthRate = 0.135;
  const projectedFutureValue = Math.round(cost * Math.pow(1 + annualGrowthRate, years));
  const estimatedCapitalAppreciation = projectedFutureValue - cost;

  // Weekend Vacation Rental Yield (avg 11% gross for furnished coastal cottages/villas)
  const estimatedAnnualRental = Math.round(cost * 0.11);
  const totalRentalEarned = estimatedAnnualRental * years;

  // EMI Calculation
  const loanAmount = cost * (1 - dpPercent);
  const totalMonths = years * 12;
  const monthlyEmi = Math.round(
    loanAmount * interestRate * (Math.pow(1 + interestRate, totalMonths)) / (Math.pow(1 + interestRate, totalMonths) - 1)
  );

  res.json({
    success: true,
    data: {
      cost,
      downPayment: Math.round(cost * dpPercent),
      loanAmount: Math.round(loanAmount),
      monthlyEmi,
      projectedFutureValue,
      estimatedCapitalAppreciation,
      estimatedAnnualRental,
      totalRentalEarned,
      totalProjectedReturn: estimatedCapitalAppreciation + totalRentalEarned,
      annualCagr: '13.5%'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌊 Kokan Nirvana Server running on http://localhost:${PORT}`);
});
