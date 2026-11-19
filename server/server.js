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
const reservationsPath = path.join(__dirname, 'data', 'reservations.json');
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

// Official Plot & Site Visit Reservations
app.get('/api/reservations', (req, res) => {
  const reservations = readJsonFile(reservationsPath, []);
  res.json({ success: true, count: reservations.length, data: reservations });
});

app.post('/api/reservations', (req, res) => {
  const reservationData = req.body;

  if (!reservationData.fullName || !reservationData.phone) {
    return res.status(400).json({ success: false, message: 'Full name and phone number are required.' });
  }

  const reservations = readJsonFile(reservationsPath, []);
  const newReservation = {
    id: reservationData.reservationId || `KN-RES-${Date.now()}`,
    ...reservationData,
    receivedAt: new Date().toISOString()
  };

  reservations.unshift(newReservation);
  writeJsonFile(reservationsPath, reservations);

  res.status(201).json({
    success: true,
    message: 'Reservation confirmed! Your official digital pass has been generated.',
    data: newReservation
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

// Serve frontend static build if available
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use('/Kokan-Nirvana-Sea-Shore-Property', express.static(clientDistPath));
  app.use(express.static(clientDistPath));
  app.get('/Kokan-Nirvana-Sea-Shore-Property*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌊 Kokan Nirvana Server running on http://localhost:${PORT}`);
});
