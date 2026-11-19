# JAHID OFFICE EQUIPMENT (JOE) — MERN Stack 3D Photocopier Platform

Official web platform for **Jahid Office Equipment (JOE)**, established in 1990. Built with a full **MERN Stack** (React 18 + Vite + Tailwind CSS + Three.js / React Three Fiber + GSAP ScrollTrigger + Node.js / Express + Mongoose), featuring an interactive **3D Scroll Exploded-View Photocopier & Spare Parts Showcase**.

---

## 🏢 Business Identity
- **Company Name**: Jahid Office Equipment (JOE) — Established 1990
- **Official Hotlines**: `01713-093300`, `01922-117201`
- **Official Website**: `https://www.jahidoffice.com/`
- **Principal Business Partners**: TOSHIBA (Japan), Brother (Japan), Unibind (Belgium), Bio system, Quality
- **Core Product Lines**: Photocopy, Digital Fax, Steel Binding Machine, Paper Shredder, Spiral Machine, Laminating Machine

---

## 🚀 Key Features

1. **3D Scroll Exploded-View**:
   - Built with Three.js (`@react-three/fiber`, `@react-three/drei`) and `gsap` (ScrollTrigger).
   - As you scroll down or drag the Explode Level scrubber:
     - External modular options (DSDF feeder, 10.1" multi-touch panel, paper feed pedestal, inner/saddle finishers) separate outward.
     - Internal wearable spare parts (drum + developer unit, fuser unit, transfer belt, toner cartridge, pickup rollers, DSDF roller kit) dismantle along 3D vectors.
2. **Model Switcher**:
   - Seamlessly switch between all 6 Toshiba models: `e-STUDIO2528A`, `3028A`, `3528A`, `4528A`, `5528A`, and `6528A`.
   - Real-time technical specs HUD and base pricing in BDT (৳).
3. **Hover Tooltip & Click Modal**:
   - **Desktop**: Hovering over separated parts reveals a floating glassmorphism tooltip with part number, category, and BDT price.
   - **Mobile / Tablet**: 1st tap highlights and displays the floating card; 2nd tap opens the enlarged modal.
   - **Enlarged Modal**: High-res image, official part number, full specifications, compatibility list, dynamic BDT pricing, and a direct "Request Quote / Order Part" form connected to MongoDB (`POST /api/inquiries`).
4. **Resilient Dual-Mode Backend**:
   - Fully supports **MongoDB Atlas** when `MONGODB_URI` is provided.
   - Automatically falls back to high-fidelity JSON data when running offline or without database credentials.
5. **SEO & Analytics Ready**:
   - `react-helmet-async` with dynamic meta tags, OpenGraph, and Product JSON-LD structured data.
   - Dynamic `/sitemap.xml` route and `robots.txt`.
   - `react-ga4` event tracking: `model_select`, `part_hover`, `part_click`, `quote_submit`.

---

## 🛠️ Project Structure

```
jahid_office_equipment/
├── client/                     # Frontend (React 18, Vite, Tailwind, Three.js, GSAP)
│   ├── public/
│   │   ├── images/             # Copied high-res machine & part PNGs
│   │   ├── robots.txt          # Search engine crawler instructions
│   │   └── favicon.svg         # JOE brand icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Showcase3D/     # 3D Canvas, Exploded Mesh, Tooltips, Modal, ModelSelector
│   │   │   ├── Navbar.jsx      # Fixed glassmorphism header & mobile drawer
│   │   │   ├── HeroSection.jsx # Hero with trust signals & hotlines
│   │   │   ├── AboutSection.jsx# 34+ years history (Est. 1990)
│   │   │   ├── MdMessageSection.jsx # Message from Managing Director
│   │   │   ├── ProductsCatalogSection.jsx # 6 core product categories
│   │   │   ├── ClientsSection.jsx  # Bank, Corporate, Govt, University clients
│   │   │   ├── PartnersSection.jsx # Toshiba, Brother, Unibind, etc.
│   │   │   ├── ServicesSection.jsx # AMC, breakdown hotlines, OEM spares
│   │   │   ├── GallerySection.jsx  # Photo gallery with lightbox
│   │   │   ├── ContactSection.jsx  # Hotlines & RFQ inquiry form
│   │   │   ├── Footer.jsx          # © 2026 JAHID OFFICE EQUIPMENT (JOE)
│   │   │   └── QuoteModal.jsx      # General inquiry modal
│   │   ├── data/               # Static fallback data (machinesData.js, partsData.js)
│   │   └── analytics.js        # Google Analytics 4 integration
│   ├── vite.config.js          # Configured for http://localhost:3000 + /api proxy
│   └── package.json
├── server/                     # Backend API (Node.js, Express, Mongoose)
│   ├── api/index.js            # Vercel Serverless Function entry point
│   ├── models/                 # Machine, Part, Inquiry Mongoose schemas
│   ├── routes/                 # machines, parts, inquiries, sitemap routes
│   ├── seed.js                 # Database seeder script
│   ├── server.js               # Express application on port 5000
│   └── package.json
├── data/                       # Seed JSON data (machines.json, parts.json)
├── images/                     # Original source images
├── vercel.json                 # Vercel deployment configuration
├── run-dev.js                  # Cross-platform concurrent runner
└── package.json                # Root orchestration scripts
```

---

## 💻 Local Development Setup (Runs on `http://localhost:3000`)

### 1. Install Dependencies
Run the following command at the root of the project to install dependencies for both `server` and `client`:

```bash
npm run install:all
```

*(Or individually: `cd server && npm install` followed by `cd ../client && npm install`)*

### 2. Configure Environment Variables (Optional)
Create `server/.env` if connecting to MongoDB Atlas:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jahid_office?retryWrites=true&w=majority
```
*(If no `MONGODB_URI` is provided, the server automatically operates in local JSON mode with full offline functionality.)*

Create `client/.env` if configuring Google Analytics:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Run Development Servers
Start both the backend server (`localhost:5000`) and the Vite client (`localhost:3000`) concurrently:

```bash
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 🌐 Deployment to Vercel with Custom Domain

The repository is pre-configured with a root `vercel.json` supporting full-stack serverless deployment (client static SPA + serverless Express API).

### Step-by-Step Vercel Deployment:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of JOE 3D platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/jahid-office-equipment.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository `jahid-office-equipment`.
   - In **Environment Variables**, add:
     - `MONGODB_URI`: Your MongoDB Atlas connection string.
     - `VITE_GA_MEASUREMENT_ID`: (Optional) Your Google Analytics 4 Measurement ID.
   - Click **Deploy**.

3. **Connect Custom Domain (`www.jahidoffice.com`)**:
   - In your Vercel Project Dashboard, navigate to **Settings** > **Domains**.
   - Enter `www.jahidoffice.com` and `jahidoffice.com`.
   - Update your domain DNS records at your registrar:
     - Type: `CNAME` | Name: `www` | Value: `cname.vercel-dns.com`
     - Type: `A` | Name: `@` | Value: `76.76.21.21`
   - Vercel will automatically provision SSL certificates.

---

## 📞 Support & Inquiries
- **Hotline 1 (Sales)**: `01713-093300`
- **Hotline 2 (Technical)**: `01922-117201`
- **Email**: `info@jahidoffice.com` / `sales@jahidoffice.com`
- **Copyright**: `© 2026 JAHID OFFICE EQUIPMENT (JOE) All Rights Reserved.`
