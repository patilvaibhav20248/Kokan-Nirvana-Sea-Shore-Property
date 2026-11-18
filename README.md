# Kokan Nirvana Sea Shore Property — Dapoli, Maharashtra

> *“Your dream of owning a piece of paradise in Dapoli.”*

A modern, responsive real-estate web application for **Kokan Nirvana Sea Shore Property**, a premier coastal property development firm based in Dapoli, Maharashtra.

---

## 🌟 Overview & Key Highlights

- **Destination**: Dapoli, Ratnagiri Coast, Maharashtra ("Mini Mahabaleshwar of Konkan", AQI < 20, 4 hours from Mumbai & 3.5 hours from Pune via NH-66 & Ro-Ro ferry).
- **Offerings**:
  1. **Collector NA Sanctioned Coastal Plots** (Individual 7/12 land extract, 30-ft tar roads, underground electrical cabling & water supply).
  2. **Beachfront Luxury Signature Villas** (Private infinity plunge pools facing the Arabian Sea, sunset decks).
  3. **Alphonso Mango Agro Farmhouse Estates** (1-2 Acre gated parcels with 40+ mature GI-tagged Alphonso mango & coconut trees).
  4. **Oceanview Boutique Cottages** (Turnkey furnished holiday homes delivering 12-14% projected annual tourism rental yield).
- **100% Clear Title Guarantee**: 30-year title search by Mumbai High Court advocates, Sanctioned Collector NA Sanad, demarcated boundaries.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React icons, Canvas Confetti.
- **Backend**: Node.js & Express.js REST API (`server/server.js`).
- **Database & Cloud**: Firebase (Firestore for inquiries & VIP site visits, configuration ready for live projects).

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (Node.js)
```bash
cd server
node server.js
# API runs on http://localhost:5000
```

### 2. Start the Frontend (React + Vite)
```bash
cd client
npm.cmd run dev
# Vite runs on http://localhost:5173 with automatic /api proxy to port 5000
```

### 3. Production Build
```bash
cd client
npm.cmd run build
```

---

## 📂 Project Architecture

```
OGT project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # Header with live Dapoli weather & quick actions
│   │   │   ├── Hero.jsx                  # Brand hero with quick search filters
│   │   │   ├── PropertyCard.jsx          # Rich property card with specs & badges
│   │   │   ├── PropertyList.jsx          # Filterable catalog (Plots, Villas, Agro, Cottages)
│   │   │   ├── PropertyDetailModal.jsx   # Deep dive modal with photo gallery & blueprints
│   │   │   ├── MasterPlanExplorer.jsx    # Interactive plot layout selector (Row A, B, C)
│   │   │   ├── WhyDapoliSection.jsx      # Connectivity (NH-66/Ro-Ro), climate & legal checklist
│   │   │   ├── InvestmentCalculator.jsx  # Interactive EMI & 13.5% CAGR appreciation calculator
│   │   │   ├── TestimonialsSection.jsx   # Buyer reviews from Mumbai, Pune, and NRIs
│   │   │   ├── VipSiteVisitModal.jsx     # Complimentary site visit booking with pickup & lunch
│   │   │   ├── BrochureDownloadModal.jsx # Instant project e-brochure download
│   │   │   ├── ContactSection.jsx        # Direct lead inquiry form
│   │   │   ├── AdminPanelModal.jsx       # Management desk to view leads & monitor Firebase
│   │   │   └── Footer.jsx                # Legal disclaimers, RERA notes & sitemap
│   │   ├── firebase/
│   │   │   ├── config.js                 # Firebase initialization
│   │   │   └── firebaseService.js        # Firestore sync & dual-write to Node API
│   │   ├── data/
│   │   │   └── fallbackData.js           # Resilient offline data bundle
│   │   ├── App.jsx                       # Master page coordinator
│   │   ├── main.jsx                      # React 19 root
│   │   └── index.css                     # Tailwind CSS v4 styling & typography
│   ├── vite.config.js                    # Optimized chunking & API proxy
│   └── package.json
└── server/
    ├── data/
    │   ├── properties.json               # Verified Dapoli project listings
    │   ├── plots.json                    # Interactive master plan plot units
    │   ├── inquiries.json                # Captured leads
    │   ├── site-visits.json              # Scheduled VIP tours
    │   └── testimonials.json             # Verified homeowner reviews
    ├── server.js                         # Express REST API
    └── package.json
```

---

## 🔥 Firebase Configuration

The client is pre-wired to Google Firebase Firestore. To connect your live Firebase project:
1. Open `client/.env`
2. Enter your Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/):
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
3. Inquiries and site visit bookings automatically write directly to Firestore collections `inquiries` and `siteVisits`, while also synchronizing with the Node.js server.
