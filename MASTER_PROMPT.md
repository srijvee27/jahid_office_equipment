# MASTER PROMPT FOR ANTIGRAVITY AGENT (Gemini 3.8 Flash High)

## STEP 1: INSTALL & LOAD REQUIRED 3D SKILLS FIRST (DO NOT SKIP)

Run `npx skills use "https://github.com/justinebijupaul/frontend-ai-skills" --skill "48-3d-scroll-storytelling"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

Run `npx skills use "https://github.com/skinnye/3d-web-pack" --skill "scroll-3d-scene"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

Run `npx skills use "https://github.com/freshtechbro/claudedesignskills" --skill "web3d-integration-patterns"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

Run `npx skills use "https://github.com/iart-ai/webgl-animation-skills" --skill "threejs-animation"` and follow the generated skill instructions now. Read its complete output, redirecting it to a temporary file first if necessary. Resolve relative paths from the supporting-files directory it provides.

---

## STEP 2: PROJECT OVERVIEW & EXISTING BUSINESS IDENTITY
Build a complete, production-ready **MERN Stack** web application for **JAHID OFFICE EQUIPMENT (JOE)** — upgrading their existing website (`https://www.jahidoffice.com/`) with a modern **3D Scroll Exploded-View Photocopier & Spare Parts Showcase**.

### Keep Existing Business Information Identical:
- **Company Name**: Jahid Office Equipment (JOE) — Established 1990
- **Hotlines**: `01713-093300`, `01922-117201`
- **Core Navigation & Sections**: Home, About Us, Message from Managing Director, Products (Photocopy, Digital Fax, Steel Binding Machine, Paper Shredder, Spiral Machine, Laminating Machine), Our Clients (Bank, Corporate, Government, University & College), Our Business Partners (TOSHIBA, Brother, Quality, Unibind Belgium, Bio system), Service & Support, Photo Gallery, Contact Us.
- **Footer**: `© 2026 JAHID OFFICE EQUIPMENT (JOE) All Rights Reserved.`

---

## STEP 3: TECH STACK & LOCALHOST:3000 + VERCEL ARCHITECTURE
- **Monorepo Structure**:
  - `client/`: React (Vite) + Tailwind CSS + Three.js (`@react-three/fiber`, `@react-three/drei`, `three`) + `gsap` (ScrollTrigger) + `react-helmet-async` + `react-ga4`.
  - Configure `client/vite.config.js` so `npm run dev` runs on **`http://localhost:3000`** with API proxy `/api` -> `http://localhost:5000`.
  - `server/`: Node.js + Express + Mongoose (MongoDB Atlas) configured for both local dev (`localhost:5000`) and **Vercel Serverless Functions** via root `vercel.json`.
- **Seed Data**: Use the provided `data/machines.json` (6 Toshiba models: `e-STUDIO2528A`, `3028A`, `3528A`, `4528A`, `5528A`, `6528A`) and `data/parts.json` (12+ modular & spare parts with BDT pricing, part codes, compatibility, and `explodeOffset` vectors) along with all images from `images/` copied into `client/public/images/`.

---

## STEP 4: 3D SCROLL EXPLODED-VIEW, HOVER & CLICK INTERACTION
On the **Toshiba Photocopy Machine Showcase** section/page:
1. **Model Switcher**: Let users switch between all 6 models (`e-STUDIO2528A` to `e-STUDIO6528A`) and view full specs + base price in **BDT (৳)**.
2. **Initial State**: Display the selected photocopy machine assembled in a clean 3D/2.5D interactive stage.
3. **Scroll Exploded-View**: Using `GSAP ScrollTrigger` + `React Three Fiber`, as the user scrolls down:
   - First, external modular options (DSDF/RADF, 10.1" Touch Panel, Paper Feed Pedestal, Inner/Saddle Stitch Finisher) smoothly separate outward along their `explodeOffset` `{x, y, z}` vectors.
   - Further scroll separates internal wearable spare parts (Drum + Developer Unit, Fuser Unit, Transfer Belt, Toner Cartridge, Pickup Rollers, DSDF Roller Kit).
   - Build modular 3D meshes/layered 2.5D textured planes using the images in `client/public/images/` so real `.glb` models can be swapped in anytime.
4. **Hover Tooltip (Desktop)**: Hovering over any separated part shows a floating glassmorphism message-style tooltip (`<Html>`) with: **Part Name + Part Code + Short 1-line Detail + Price in BDT (৳)**.
5. **Click Zoom & Enlarged Details Modal**: Clicking any part smoothly zooms the camera toward that part and opens a clean modal showing:
   - Enlarged high-res part image
   - Official Part Number & Category
   - Full Technical Specs & Compatible Models
   - Price in BDT (৳) (editable from MongoDB/Admin or seed JSON)
   - "Request Quote / Order Part" form connected to MongoDB (`POST /api/inquiries`).

---

## STEP 5: MOBILE & TABLET RESPONSIVENESS (CRITICAL)
- Mobile (`<768px`) and Tablet (`768px–1024px`) have **no hover**:
  - **1st Tap** on a separated part highlights it and displays the floating message card (Short Detail + BDT Price + "View Full Details" button).
  - **2nd Tap** (or tapping "View Full Details") opens the enlarged modal.
- Adjust camera FOV, canvas height, and clamp `dpr={[1, 1.5]}` on mobile/tablet so scrolling stays smooth at 60fps.
- Ensure all navigation, partner logos, client categories, and quote forms are 100% responsive across mobile, tablet, and desktop.

---

## STEP 6: SEO, GOOGLE ANALYTICS 4 & VERCEL READY
- Add `react-helmet-async` for dynamic meta titles, OpenGraph tags, and Product JSON-LD structured data for every machine and part.
- Add `/sitemap.xml` Express route and `client/public/robots.txt`.
- Integrate `react-ga4` using `import.meta.env.VITE_GA_MEASUREMENT_ID` and track custom events: `model_select`, `part_hover`, `part_click`, `quote_submit`.
- Provide a root `README.md` with exact commands to run on `localhost:3000` (`npm install`, `npm run dev`) and deploy to Vercel with a custom domain.
