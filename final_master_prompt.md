# MASTER PROMPT FOR ANTIGRAVITY AGENT (Gemini 3.8 Flash High)

## STEP 1: INSTALL & LOAD REQUIRED 3D SKILLS FIRST (100% IDENTICAL — DO NOT MODIFY)

Run `npx skills use "https://github.com/justinebijupaul/frontend-ai-skills" --skill "48-3d-scroll-storytelling"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

Run `npx skills use "https://github.com/skinnye/3d-web-pack" --skill "scroll-3d-scene"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

Run `npx skills use "https://github.com/freshtechbro/claudedesignskills" --skill "web3d-integration-patterns"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

Run `npx skills use "https://github.com/iart-ai/webgl-animation-skills" --skill "threejs-animation"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

---

## STEP 2: PROJECT GOAL, THEME & BUSINESS INFO
Build the complete **MERN Stack** web application for **Jahid Office Equipment (JOE)** (`https://www.jahidoffice.com/`), running on **`http://localhost:3000`** locally and ready for **Vercel** deployment + custom domain + **Google Analytics 4 (GA4)** + **SEO**.

### Theme & Color System (STRICT):
- **Clean Studio White + Corporate Blue Accent** (`#FFFFFF` / `#F8FAFC` backgrounds, `#0F172A` crisp dark text, `#0066CC` / `#0284C7` Toshiba corporate blue accents). NO dark/black background theme!

### Keep Existing Business Information from `https://www.jahidoffice.com/`:
- **Company**: JAHID OFFICE EQUIPMENT (JOE), established in 1990
- **Hotlines**: `01713-093300`, `01922-117201`
- **Navigation & Sections**: Home, About Us, Message from MD, Products (Photocopy, Digital Fax, Steel Binding Machine, Paper Shredder, Spiral Machine, Laminating Machine), Our Clients (Bank, Corporate, Government, University & College), Our Business Partners (TOSHIBA, Brother, Quality, Unibind Belgium, Bio system), Service & Support, Photo Gallery, Contact Us.
- **Footer**: `© 2026 JAHID OFFICE EQUIPMENT (JOE) All Rights Reserved.`

---

## STEP 3: MERN, LOCALHOST:3000, VERCEL, SEO & GA4 REQUIREMENTS
1. **Frontend (`client/`)**: Vite + React + Tailwind CSS + `three` (`OrbitControls`) + `react-helmet-async` + `react-ga4`. Configure `vite.config.js` to run on `http://localhost:3000` with `/api` proxied to `http://localhost:5000`.
2. **Backend (`server/`)**: Node.js + Express + Mongoose (MongoDB Atlas) with `GET /api/machines`, `GET /api/parts`, `POST /api/inquiries`, and `GET /sitemap.xml`. Add root `vercel.json` so Express runs as Vercel Serverless Functions.
3. **SEO & GA4**: Dynamic meta tags, OpenGraph, Product JSON-LD structured data, `robots.txt`, and GA4 (`VITE_GA_MEASUREMENT_ID`) tracking `model_select`, `part_hover`, `part_click`, and `quote_submit`.
4. **Mobile & Tablet Responsive**: Clean touch support (1st tap shows tooltip + price, 2nd tap opens enlarged modal), responsive HUD & navbar, smooth 60fps performance.

---

## STEP 4: 100% IDENTICAL 3D PHOTOCOPIER IMPLEMENTATION (CRITICAL)
For the **Toshiba e-STUDIO6528A Series 3D Showcase** component in React, implement the **EXACT SAME 100% IDENTICAL** Three.js procedural 3D machine, studio lighting, scroll-triggered explosion timeline, auto-play tour, hover message tooltip, BDT pricing, model switcher (`e-STUDIO2528A` to `e-STUDIO6528A`), and click-to-zoom detail modal shown in the reference HTML code below. Do NOT replace the 3D meshes with flat 2D image planes!

### Exact Reference Code (Convert 100% Identically into React Component + Connect to MongoDB Inquiry API):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Toshiba e-STUDIO6528A Series — Interactive 3D Exploded View | Jahid Office Equipment</title>
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
      --muted: #475569;
      --blue: #0066cc;
      --blue-light: #e0f2fe;
      --blue-hover: #0052a3;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
    }
    /* Header */
    header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 40;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-badge {
      background: var(--blue);
      color: #fff;
      font-weight: 800;
      font-size: 13px;
      padding: 5px 10px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }
    .brand-title { font-weight: 700; font-size: 15px; color: var(--text); }
    .brand-sub { font-size: 12px; color: var(--muted); }

    /* Model Switcher */
    .model-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .model-btn {
      border: 1px solid var(--border);
      background: #fff;
      color: var(--muted);
      padding: 6px 11px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .model-btn:hover { border-color: var(--blue); color: var(--blue); }
    .model-btn.active {
      background: var(--blue);
      color: #fff;
      border-color: var(--blue);
      box-shadow: 0 2px 8px rgba(0, 102, 204, 0.28);
    }

    /* Scroll Track Container */
    .scroll-section {
      position: relative;
      height: 360vh;
    }
    .sticky-stage {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      background: radial-gradient(circle at 55% 45%, #ffffff 0%, #eff6ff 55%, #e2e8f0 100%);
      overflow: hidden;
    }
    #canvas-container {
      width: 100%;
      height: 100%;
      cursor: grab;
    }
    #canvas-container:active { cursor: grabbing; }

    /* Left Info Overlay */
    .hud-left {
      position: absolute;
      top: 86px;
      left: 24px;
      z-index: 20;
      max-width: 330px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-left: 4px solid var(--blue);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      pointer-events: auto;
    }
    .hud-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--blue);
      background: var(--blue-light);
      padding: 3px 8px;
      border-radius: 999px;
      margin-bottom: 6px;
    }
    .hud-title { font-size: 20px; font-weight: 800; color: var(--text); }
    .hud-price { font-size: 18px; font-weight: 800; color: var(--blue); margin: 4px 0 8px; }
    .hud-specs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 12px;
    }
    .hud-specs span strong { color: var(--text); }
    .hud-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: var(--blue);
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s;
    }
    .btn-primary:hover { background: var(--blue-hover); }
    .btn-outline {
      background: #fff;
      color: var(--blue);
      border: 1px solid var(--blue);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    /* Bottom Scrub & Stage Indicator */
    .hud-bottom {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      width: min(560px, 92vw);
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 12px 18px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    }
    .stage-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .stage-name { color: var(--blue); }
    input[type="range"] {
      width: 100%;
      accent-color: var(--blue);
      cursor: pointer;
    }
    .hint-text {
      text-align: center;
      font-size: 11px;
      color: var(--muted);
      margin-top: 4px;
    }

    /* Floating Hover Tooltip (Message Style) */
    #hover-tooltip {
      position: fixed;
      z-index: 50;
      pointer-events: none;
      display: none;
      max-width: 250px;
      background: rgba(255, 255, 255, 0.97);
      border: 1.5px solid var(--blue);
      border-radius: 12px;
      padding: 10px 13px;
      box-shadow: 0 12px 28px rgba(0, 102, 204, 0.18);
    }
    #hover-tooltip::after {
      content: "";
      position: absolute;
      bottom: -7px;
      left: 18px;
      width: 12px;
      height: 12px;
      background: #fff;
      border-right: 1.5px solid var(--blue);
      border-bottom: 1.5px solid var(--blue);
      transform: rotate(45deg);
    }
    .tt-cat { font-size: 10px; font-weight: 700; color: var(--blue); text-transform: uppercase; }
    .tt-name { font-size: 13px; font-weight: 700; color: var(--text); margin: 2px 0; }
    .tt-desc { font-size: 11px; color: var(--muted); line-height: 1.35; margin-bottom: 6px; }
    .tt-price { font-size: 14px; font-weight: 800; color: var(--blue); }
    .tt-tap { font-size: 10px; color: #64748b; margin-top: 4px; }

    /* Part Detail Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 60;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-backdrop.open { display: flex; }
    .modal-card {
      background: #fff;
      width: min(520px, 100%);
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 24px 50px rgba(15, 23, 42, 0.22);
      overflow: hidden;
      animation: popIn 0.22s ease-out;
    }
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .modal-header {
      background: linear-gradient(135deg, #0066cc, #0284c7);
      color: #fff;
      padding: 18px 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .modal-close {
      background: rgba(255,255,255,0.2);
      border: none;
      color: #fff;
      width: 30px; height: 30px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
    }
    .modal-body { padding: 20px; }
    .modal-price-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--blue-light);
      padding: 12px 14px;
      border-radius: 10px;
      margin-bottom: 14px;
    }
    .modal-price-val { font-size: 22px; font-weight: 800; color: var(--blue); }
    .modal-spec-list { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
    .compat-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .chip {
      background: #f1f5f9;
      color: var(--text);
      font-size: 11px;
      font-weight: 600;
      padding: 4px 9px;
      border-radius: 6px;
    }

    @media (max-width: 768px) {
      .hud-left {
        top: auto;
        bottom: 108px;
        left: 12px;
        right: 12px;
        max-width: none;
        padding: 12px;
      }
      .hud-title { font-size: 16px; }
      .hud-price { font-size: 15px; }
      .model-bar { display: none; }
    }
  </style>
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
      }
    }
  </script>
</head>
<body>

<header>
  <div class="brand">
    <span class="brand-badge">TOSHIBA</span>
    <div>
      <div class="brand-title">Jahid Office Equipment (JOE)</div>
      <div class="brand-sub">e-STUDIO6528A Series • Interactive 3D Showcase</div>
    </div>
  </div>
  <div class="model-bar" id="model-bar"></div>
</header>

<section class="scroll-section" id="scroll-section">
  <div class="sticky-stage">
    <div id="canvas-container"></div>

    <div class="hud-left">
      <span class="hud-tag">A3 Monochrome MFP</span>
      <div class="hud-title" id="hud-model-name">Toshiba e-STUDIO6528A</div>
      <div class="hud-price" id="hud-model-price">৳ 7,95,000</div>
      <div class="hud-specs" id="hud-model-specs">
        <span>Speed: <strong>65 ppm</strong></span>
        <span>RAM: <strong>6 GB</strong></span>
        <span>First Copy: <strong>4.3s</strong></span>
        <span>Weight: <strong>72 kg</strong></span>
      </div>
      <div class="hud-actions">
        <button class="btn-primary" id="btn-autoplay">▶ Auto-Play 3D Tour</button>
        <button class="btn-outline" id="btn-reset">Reset View</button>
      </div>
    </div>

    <div class="hud-bottom">
      <div class="stage-row">
        <span class="stage-name" id="stage-label">Stage 1: Assembled Machine</span>
        <span id="scroll-pct">0%</span>
      </div>
      <input type="range" id="scrub-slider" min="0" max="100" value="0" />
      <div class="hint-text">Scroll page or drag slider to separate parts • Hover/Tap for price • Click for details</div>
    </div>
  </div>
</section>

<!-- Hover Message Tooltip -->
<div id="hover-tooltip">
  <div class="tt-cat" id="tt-cat">SPARE PART</div>
  <div class="tt-name" id="tt-name">Part Name</div>
  <div class="tt-desc" id="tt-desc">Short description</div>
  <div class="tt-price" id="tt-price">৳ 0</div>
  <div class="tt-tap">Click to zoom &amp; view full specs</div>
</div>

<!-- Enlarged Detail Modal -->
<div class="modal-backdrop" id="detail-modal">
  <div class="modal-card">
    <div class="modal-header">
      <div>
        <div style="font-size:11px;opacity:0.85;font-weight:700;" id="m-code">PART CODE</div>
        <h2 style="font-size:20px;margin-top:2px;" id="m-title">Part Name</h2>
      </div>
      <button class="modal-close" id="m-close">&times;</button>
    </div>
    <div class="modal-body">
      <div class="modal-price-box">
        <div>
          <div style="font-size:11px;color:#475569;font-weight:600;">Estimated Price (Editable)</div>
          <div class="modal-price-val" id="m-price">৳ 42,500</div>
        </div>
        <span class="hud-tag" style="margin:0;" id="m-cat">Spare Part</span>
      </div>
      <p class="modal-spec-list" id="m-specs"></p>
      <div style="font-size:12px;font-weight:700;color:#0f172a;">Compatible Models:</div>
      <div class="compat-chips" id="m-compat"></div>
      <div style="margin-top:18px;display:flex;gap:10px;">
        <a href="tel:01713093300" class="btn-primary" style="text-decoration:none;text-align:center;flex:1;">Call 01713-093300 to Order</a>
        <button class="btn-outline" id="m-zoom-reset">Back to Full Machine</button>
      </div>
    </div>
  </div>
</div>

<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- 1. DATA FROM PDF & INTERNATIONAL BDT PRICING ---
const MODELS = [
  { name: "e-STUDIO2528A", fullName: "Toshiba e-STUDIO2528A", speed: "25 ppm", ram: "4 GB", firstCopy: "4.3s", weight: "55 kg", price: "৳ 3,75,000" },
  { name: "e-STUDIO3028A", fullName: "Toshiba e-STUDIO3028A", speed: "30 ppm", ram: "4 GB", firstCopy: "4.3s", weight: "55 kg", price: "৳ 4,20,000" },
  { name: "e-STUDIO3528A", fullName: "Toshiba e-STUDIO3528A", speed: "35 ppm", ram: "4 GB", firstCopy: "3.6s", weight: "57 kg", price: "৳ 4,85,000" },
  { name: "e-STUDIO4528A", fullName: "Toshiba e-STUDIO4528A", speed: "45 ppm", ram: "4 GB", firstCopy: "3.6s", weight: "57 kg", price: "৳ 5,60,000" },
  { name: "e-STUDIO5528A", fullName: "Toshiba e-STUDIO5528A", speed: "55 ppm", ram: "6 GB", firstCopy: "4.3s", weight: "72 kg", price: "৳ 6,90,000" },
  { name: "e-STUDIO6528A", fullName: "Toshiba e-STUDIO6528A", speed: "65 ppm", ram: "6 GB", firstCopy: "4.3s", weight: "72 kg", price: "৳ 7,95,000" }
];

const PARTS_DATA = {
  dsdf: {
    name: "Dual Scan Document Feeder (DSDF)",
    code: "MR-4010 / MR-4020",
    category: "External Module",
    price: "৳ 1,06,500",
    shortDesc: "300-sheet capacity, duplex scans up to 240 ipm.",
    fullSpecs: "Holds up to 300 originals (A5R-A3, 35-209 g/m²). Single-pass dual-side scanning at 240 ipm with optional Double Feed Detection.",
    explode: new THREE.Vector3(0, 1.35, 0),
    stage: "external"
  },
  panel: {
    name: "10.1\" Multi-Touch Control Panel",
    code: "e-BRIDGE Next UI Panel",
    category: "External / Spare",
    price: "৳ 34,500",
    shortDesc: "26 cm tiltable tablet-style colour touch screen.",
    fullSpecs: "Customisable multi-touch colour display with embedded web browser, workflow shortcuts, and physical Start/Stop keys.",
    explode: new THREE.Vector3(1.15, 0.55, 1.15),
    stage: "external"
  },
  finisher: {
    name: "Saddle Stitch Finisher (3,250-Sheet)",
    code: "MJ-1116 + Hole Punch",
    category: "External Module",
    price: "৳ 1,95,000",
    shortDesc: "60-page booklet maker + 50-sheet multi-position stapler.",
    fullSpecs: "2 output trays, 3,250-sheet capacity, 50-sheet stapling, and optional 2/4 hole punching unit.",
    explode: new THREE.Vector3(-1.55, 0.05, 0),
    stage: "external"
  },
  pedestal: {
    name: "Paper Feed Pedestal & Drawers",
    code: "KD-1072 + MY-1052",
    category: "External Module",
    price: "৳ 46,200",
    shortDesc: "550-sheet cassette drawers (A5R-A3, 60-163 g/m²).",
    fullSpecs: "Expandable lower paper feed pedestal with heavy-duty caster wheels and A4/A3/B4 size indicators.",
    explode: new THREE.Vector3(0, -1.15, 0.25),
    stage: "external"
  },
  drum: {
    name: "Process / Drum + Developer Unit",
    code: "6LL51753400 / EPU-K166K",
    category: "Internal Spare Part",
    price: "৳ 42,500",
    shortDesc: "Photoconductor drum & developer assembly for sharp prints.",
    fullSpecs: "Replace when prints appear faded, show vertical lines, or drum counter reaches end-of-life.",
    explode: new THREE.Vector3(1.25, 0.15, 1.45),
    stage: "internal"
  },
  fuser: {
    name: "Fuser Unit (Heater Section)",
    code: "6LL51810000",
    category: "Internal Spare Part",
    price: "৳ 54,000",
    shortDesc: "220V fixing assembly that bonds toner onto paper.",
    fullSpecs: "High-precision heat & pressure roller assembly. Replace if paper jams at exit or toner rubs off.",
    explode: new THREE.Vector3(-0.95, 0.25, 1.55),
    stage: "internal"
  },
  belt: {
    name: "Transfer Belt Assembly",
    code: "6LL44835000",
    category: "Internal Spare Part",
    price: "৳ 36,500",
    shortDesc: "Image transfer belt unit for clean, streak-free output.",
    fullSpecs: "OEM-grade transfer belt stretched on precision rollers. Replace when belt surface wears out.",
    explode: new THREE.Vector3(0.05, -0.35, 1.75),
    stage: "internal"
  },
  toner: {
    name: "Original Black Toner Cartridge",
    code: "T-3028P / T-3028C",
    category: "Consumable",
    price: "৳ 14,500",
    shortDesc: "High-yield original Toshiba black toner (~36,000 pages).",
    fullSpecs: "Genuine monochrome laser toner cartridge engineered for crisp text and deep blacks.",
    explode: new THREE.Vector3(1.55, 0.85, 0.85),
    stage: "internal"
  },
  roller: {
    name: "Paper Pickup & Feed Roller Kit",
    code: "CST-H21X / 6LJ56845000",
    category: "Internal Spare Part",
    price: "৳ 4,200",
    shortDesc: "3-piece cassette pickup, feed & separation rubber rollers.",
    fullSpecs: "Solves paper misfeed, skewing, and multi-sheet feed issues in paper drawers.",
    explode: new THREE.Vector3(0.75, -0.85, 1.4),
    stage: "internal"
  }
};

// Populate Model Switcher
const modelBar = document.getElementById('model-bar');
MODELS.forEach((m, i) => {
  const btn = document.createElement('button');
  btn.className = 'model-btn' + (i === 5 ? ' active' : '');
  btn.textContent = m.name;
  btn.onclick = () => {
    document.querySelectorAll('.model-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('hud-model-name').textContent = m.fullName;
    document.getElementById('hud-model-price').textContent = m.price;
    document.getElementById('hud-model-specs').innerHTML = `
      <span>Speed: <strong>${m.speed}</strong></span>
      <span>RAM: <strong>${m.ram}</strong></span>
      <span>First Copy: <strong>${m.firstCopy}</strong></span>
      <span>Weight: <strong>${m.weight}</strong></span>
    `;
  };
  modelBar.appendChild(btn);
});

// --- 2. THREE.JS STUDIO SCENE ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
const defaultCamPos = new THREE.Vector3(3.4, 2.1, 4.6);
camera.position.copy(defaultCamPos);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false; // Keep page scroll smooth!
controls.target.set(0, 0.2, 0);

// Studio Lighting (White Theme)
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcbd5e1, 1.3);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(5, 8, 6);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
rimLight.position.set(-5, 4, -4);
scene.add(rimLight);

// Ground Shadow Receiver
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.ShadowMaterial({ opacity: 0.14 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.42;
floor.receiveShadow = true;
scene.add(floor);

// --- 3. BUILD REALISTIC TOSHIBA e-STUDIO6528A 3D MODEL ---
const copierRoot = new THREE.Group();
scene.add(copierRoot);

// Materials
const matCharcoal = new THREE.MeshStandardMaterial({ color: 0x1e2329, roughness: 0.45, metalness: 0.15 });
const matDarkGrey = new THREE.MeshStandardMaterial({ color: 0x2b323b, roughness: 0.5, metalness: 0.2 });
const matSilver   = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.25, metalness: 0.8 });
const matRedBadge = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, metalness: 0.2 });
const matBlueLED  = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.8 });
const matDrumGreen= new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.18, metalness: 0.75 });
const matFuserRed = new THREE.MeshStandardMaterial({ color: 0xea580c, emissive: 0x9a3412, emissiveIntensity: 0.35, roughness: 0.3 });

// Canvas Texture for 10.1" Touch Screen
function createScreenTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 300;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 300);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, 0, 512, 46);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('TOSHIBA  e-BRIDGE Next', 20, 30);
  const tiles = [
    { x: 30, y: 75, col: '#0ea5e9', txt: 'COPY' },
    { x: 150, y: 75, col: '#10b981', txt: 'SCAN' },
    { x: 270, y: 75, col: '#6366f1', txt: 'PRINT' },
    { x: 390, y: 75, col: '#f59e0b', txt: 'FAX' },
    { x: 30, y: 180, col: '#334155', txt: 'e-FILING' },
    { x: 150, y: 180, col: '#334155', txt: 'USB' },
    { x: 270, y: 180, col: '#334155', txt: 'CLOUD' },
    { x: 390, y: 180, col: '#ef4444', txt: 'START' },
  ];
  tiles.forEach(t => {
    ctx.fillStyle = t.col;
    ctx.beginPath();
    ctx.roundRect(t.x, t.y, 96, 82, 10);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(t.txt, t.x + 18, t.y + 48);
  });
  return new THREE.CanvasTexture(c);
}

const interactiveGroups = [];
function registerPart(key, group) {
  group.userData.partKey = key;
  group.userData.basePos = group.position.clone();
  group.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.userData.partKey = key;
    }
  });
  interactiveGroups.push(group);
  copierRoot.add(group);
  return group;
}

// A. MAIN CHASSIS (Non-exploding core + opening front door)
const chassisGroup = new THREE.Group();
const lowerCore = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.72, 1.05), matCharcoal);
lowerCore.position.set(0, -0.05, 0);
chassisGroup.add(lowerCore);

// Output Bay Recess & Upper Scanner Deck
const upperBridge = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.22, 1.05), matCharcoal);
upperBridge.position.set(0, 0.62, 0);
chassisGroup.add(upperBridge);

const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, 1.05), matDarkGrey);
rightPillar.position.set(0.415, 0.34, 0);
chassisGroup.add(rightPillar);

const backPillar = new THREE.Mesh(new THREE.BoxGeometry(0.83, 0.45, 0.25), matDarkGrey);
backPillar.position.set(-0.16, 0.34, -0.4);
chassisGroup.add(backPillar);

// Silver Trim & Toshiba Red Accent
const silverStrip = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.03, 0.03), matSilver);
silverStrip.position.set(0, 0.31, 0.525);
chassisGroup.add(silverStrip);

const logoBadge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, 0.02), matRedBadge);
logoBadge.position.set(-0.38, 0.22, 0.53);
chassisGroup.add(logoBadge);

const statusLED = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.02), matBlueLED);
statusLED.position.set(0.42, 0.22, 0.53);
chassisGroup.add(statusLED);

// Front Service Door (opens/slides out on internal scroll)
const frontDoor = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.55, 0.04), matDarkGrey);
frontDoor.position.set(0, -0.02, 0.525);
chassisGroup.add(frontDoor);

chassisGroup.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; }});
copierRoot.add(chassisGroup);

// B. DSDF TOP DOCUMENT FEEDER
const dsdf = registerPart('dsdf', new THREE.Group());
dsdf.position.set(0, 0.82, 0);
const dsdfBase = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.16, 0.98), matCharcoal);
const dsdfTray = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.72), matDarkGrey);
dsdfTray.position.set(-0.22, 0.11, 0);
dsdfTray.rotation.z = 0.16;
const dsdfGuide = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.04), matSilver);
dsdfGuide.position.set(-0.22, 0.14, 0.28);
dsdf.add(dsdfBase, dsdfTray, dsdfGuide);

// C. 10.1" TOUCH CONTROL PANEL
const panel = registerPart('panel', new THREE.Group());
panel.position.set(0.40, 0.56, 0.62);
const panelBody = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.04), matCharcoal);
panelBody.rotation.x = -0.55;
const screenMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.38, 0.20),
  new THREE.MeshBasicMaterial({ map: createScreenTexture() })
);
screenMesh.position.set(0, 0.012, 0.022);
screenMesh.rotation.x = -0.55;
panel.add(panelBody, screenMesh);

// D. PAPER FEED PEDESTAL (2 Drawers + Caster Wheels)
const pedestal = registerPart('pedestal', new THREE.Group());
pedestal.position.set(0, -0.85, 0);
for (let i = 0; i < 3; i++) {
  const drawer = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.22, 1.04), i % 2 === 0 ? matDarkGrey : matCharcoal);
  drawer.position.set(0, 0.28 - i * 0.25, 0);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.03), matSilver);
  handle.position.set(0, 0.28 - i * 0.25, 0.525);
  pedestal.add(drawer, handle);
}
// 4 Caster Wheels
[[-0.45, -0.4], [0.45, -0.4], [-0.45, 0.4], [0.45, 0.4]].forEach(([wx, wz]) => {
  const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.05, 16), matSilver);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(wx, -0.48, wz);
  pedestal.add(wheel);
});

// E. SADDLE STITCH FINISHER (Left Side)
const finisher = registerPart('finisher', new THREE.Group());
finisher.position.set(-0.88, -0.22, 0);
const finTower = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.38, 0.88), matCharcoal);
const finTray1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.65), matDarkGrey);
finTray1.position.set(-0.35, 0.35, 0);
finTray1.rotation.z = -0.22;
const finTray2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.03, 0.65), matDarkGrey);
finTray2.position.set(-0.35, -0.05, 0);
finTray2.rotation.z = -0.22;
finisher.add(finTower, finTray1, finTray2);

// F. INTERNAL SPARE PARTS (Hidden inside chassis until scroll > 45%)
const internalParts = [];
function registerInternal(key, group, pos) {
  group.position.copy(pos);
  group.visible = false;
  internalParts.push(group);
  return registerPart(key, group);
}

// Drum + Developer Unit
const drumGrp = new THREE.Group();
const drumCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.65, 24), matDrumGreen);
drumCyl.rotation.z = Math.PI / 2;
const drumHousing = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.14, 0.22), matDarkGrey);
drumHousing.position.set(0, -0.04, -0.05);
drumGrp.add(drumCyl, drumHousing);
registerInternal('drum', drumGrp, new THREE.Vector3(0.05, 0.05, 0.1));

// Fuser Unit (Heater)
const fuserGrp = new THREE.Group();
const fuserBody = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.16, 0.24), matCharcoal);
const fuserRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.60, 20), matFuserRed);
fuserRoller.rotation.z = Math.PI / 2;
fuserRoller.position.set(0, 0.04, 0.06);
fuserGrp.add(fuserBody, fuserRoller);
registerInternal('fuser', fuserGrp, new THREE.Vector3(-0.08, 0.15, -0.05));

// Transfer Belt
const beltGrp = new THREE.Group();
const beltMesh = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.07, 0.56), matDarkGrey);
const beltRim = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.03, 0.58), matSilver);
beltGrp.add(beltMesh, beltRim);
registerInternal('belt', beltGrp, new THREE.Vector3(0, -0.10, 0));

// Toner Cartridge
const tonerGrp = new THREE.Group();
const tonerTube = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.58, 24), matCharcoal);
tonerTube.rotation.z = Math.PI / 2;
const tonerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.08, 24), matBlueLED);
tonerCap.rotation.z = Math.PI / 2;
tonerCap.position.x = 0.27;
tonerGrp.add(tonerTube, tonerCap);
registerInternal('toner', tonerGrp, new THREE.Vector3(0.12, 0.22, 0.20));

// Pickup Roller Kit
const rollerGrp = new THREE.Group();
for (let r = -1; r <= 1; r++) {
  const rl = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.08, 18), matSilver);
  rl.rotation.x = Math.PI / 2;
  rl.position.x = r * 0.14;
  rollerGrp.add(rl);
}
registerInternal('roller', rollerGrp, new THREE.Vector3(0.1, -0.25, 0.2));

// --- 4. SCROLL & AUTO-PLAY ANIMATION STATE ---
let scrollProgress = 0; // 0 to 1
let targetProgress = 0;
let autoPlaying = false;
let targetCamPos = defaultCamPos.clone();
let targetLookAt = new THREE.Vector3(0, 0.2, 0);

const slider = document.getElementById('scrub-slider');
const pctEl = document.getElementById('scroll-pct');
const stageEl = document.getElementById('stage-label');

function updateProgressUI(val) {
  const pct = Math.round(val * 100);
  slider.value = pct;
  pctEl.textContent = pct + '%';
  if (val < 0.2) stageEl.textContent = 'Stage 1: Assembled Machine';
  else if (val < 0.55) stageEl.textContent = 'Stage 2: External Modular Options Separating';
  else stageEl.textContent = 'Stage 3: Internal Spare Parts Exposed';
}

window.addEventListener('scroll', () => {
  if (autoPlaying) return;
  const maxScroll = document.getElementById('scroll-section').offsetHeight - window.innerHeight;
  targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  updateProgressUI(targetProgress);
});

slider.addEventListener('input', (e) => {
  autoPlaying = false;
  document.getElementById('btn-autoplay').textContent = '▶ Auto-Play 3D Tour';
  targetProgress = e.target.value / 100;
  updateProgressUI(targetProgress);
});

document.getElementById('btn-autoplay').addEventListener('click', () => {
  autoPlaying = !autoPlaying;
  document.getElementById('btn-autoplay').textContent = autoPlaying ? '⏸ Pause Tour' : '▶ Auto-Play 3D Tour';
});

document.getElementById('btn-reset').addEventListener('click', () => {
  autoPlaying = false;
  targetProgress = 0;
  targetCamPos.copy(defaultCamPos);
  targetLookAt.set(0, 0.2, 0);
  updateProgressUI(0);
});

// --- 5. HOVER TOOLTIP & CLICK ZOOM/MODAL ---
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tooltip = document.getElementById('hover-tooltip');
let hoveredKey = null;
let tappedKey = null; // Mobile touch support

function getPartKeyFromEvent(clientX, clientY) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactiveGroups, true);
  if (hits.length > 0) {
    const obj = hits[0].object;
    if (obj.visible && obj.parent.visible) return obj.userData.partKey;
  }
  return null;
}

function showTooltip(key, x, y) {
  const data = PARTS_DATA[key];
  if (!data) return;
  document.getElementById('tt-cat').textContent = data.category;
  document.getElementById('tt-name').textContent = data.name;
  document.getElementById('tt-desc').textContent = data.shortDesc;
  document.getElementById('tt-price').textContent = data.price;
  tooltip.style.display = 'block';
  tooltip.style.left = Math.min(window.innerWidth - 270, x + 16) + 'px';
  tooltip.style.top = Math.max(80, y - 115) + 'px';
}

function openModal(key) {
  const data = PARTS_DATA[key];
  if (!data) return;
  // Zoom camera toward part
  const grp = interactiveGroups.find(g => g.userData.partKey === key);
  if (grp) {
    const worldPos = new THREE.Vector3();
    grp.getWorldPosition(worldPos);
    targetLookAt.copy(worldPos);
    targetCamPos.copy(worldPos).add(new THREE.Vector3(1.4, 0.8, 2.0));
  }
  document.getElementById('m-code').textContent = 'PART CODE: ' + data.code;
  document.getElementById('m-title').textContent = data.name;
  document.getElementById('m-price').textContent = data.price;
  document.getElementById('m-cat').textContent = data.category;
  document.getElementById('m-specs').textContent = data.fullSpecs;
  document.getElementById('m-compat').innerHTML = MODELS.map(m => `<span class="chip">${m.name}</span>`).join('');
  document.getElementById('detail-modal').classList.add('open');
}

renderer.domElement.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  const key = getPartKeyFromEvent(e.clientX, e.clientY);
  hoveredKey = key;
  if (key) {
    renderer.domElement.style.cursor = 'pointer';
    showTooltip(key, e.clientX, e.clientY);
  } else {
    renderer.domElement.style.cursor = 'grab';
    tooltip.style.display = 'none';
  }
});

renderer.domElement.addEventListener('click', (e) => {
  const key = getPartKeyFromEvent(e.clientX, e.clientY);
  if (!key) {
    tooltip.style.display = 'none';
    tappedKey = null;
    return;
  }
  if (window.innerWidth < 1024 && tappedKey !== key) {
    // 1st tap on mobile/tablet shows tooltip first
    tappedKey = key;
    showTooltip(key, e.clientX, e.clientY);
    return;
  }
  tooltip.style.display = 'none';
  openModal(key);
});

document.getElementById('m-close').onclick = () => document.getElementById('detail-modal').classList.remove('open');
document.getElementById('m-zoom-reset').onclick = () => {
  document.getElementById('detail-modal').classList.remove('open');
  targetCamPos.copy(defaultCamPos);
  targetLookAt.set(0, 0.2, 0);
};

// --- 6. ANIMATION LOOP ---
let autoDir = 1;
function animate() {
  requestAnimationFrame(animate);

  if (autoPlaying) {
    targetProgress += 0.0035 * autoDir;
    if (targetProgress >= 1) { targetProgress = 1; autoDir = -1; }
    if (targetProgress <= 0) { targetProgress = 0; autoDir = 1; }
    updateProgressUI(targetProgress);
  }

  scrollProgress += (targetProgress - scrollProgress) * 0.08;

  // Gentle hero rotation when assembled
  copierRoot.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.28 - 0.15;

  // Front door opens smoothly after 45% scroll
  const doorT = Math.max(0, Math.min(1, (scrollProgress - 0.42) / 0.25));
  frontDoor.position.z = 0.525 + doorT * 0.5;
  frontDoor.material.transparent = true;
  frontDoor.material.opacity = 1 - doorT * 0.88;

  // Animate External & Internal Parts
  interactiveGroups.forEach(grp => {
    const key = grp.userData.partKey;
    const data = PARTS_DATA[key];
    if (!data) return;

    let t = 0;
    if (data.stage === 'external') {
      t = Math.max(0, Math.min(1, (scrollProgress - 0.12) / 0.45));
    } else {
      t = Math.max(0, Math.min(1, (scrollProgress - 0.50) / 0.45));
      grp.visible = scrollProgress > 0.46;
    }
    grp.position.copy(grp.userData.basePos).addScaledVector(data.explode, t);

    // Highlight hovered part
    const isHov = hoveredKey === key || tappedKey === key;
    grp.scale.setScalar(isHov ? 1.05 : 1.0);
  });

  // Smooth Camera Zoom
  camera.position.lerp(targetCamPos, 0.07);
  controls.target.lerp(targetLookAt, 0.07);
  controls.update();

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
</script>
</body>
</html>
```
