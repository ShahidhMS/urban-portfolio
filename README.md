# Urban Planning & GIS Portfolio Website

A premium, modern, responsive personal portfolio website designed for Urban Planning undergraduate students specializing in **GIS**, **Remote Sensing**, **Urban Analytics**, **Spatial Data Science**, **Sustainable Development**, and **Technology-Driven Planning**.

Built using **React**, **Next.js**, **Tailwind CSS**, **Framer Motion**, and **TypeScript**, with interactive coordinate mapping powered by **Leaflet**.

---

## Key Features

1. **Spatial Preloader Screen**: An immersive loading screen that simulates a terminal log rendering geospatial datasets and CRS configurations.
2. **Interactive GIS Map**: A styled Leaflet-powered world map plotting locations of completed projects, with custom HTML marker animations and information overlays.
3. **Analytics Dashboard**: Responsive statistics cards visualizing key academic and GIS benchmarks (e.g. area mapped, database rows, classification accuracy).
4. **Dynamic Project Search & Filter**: Interactive filtering tabs by project type, with responsive search inputs and detailed information modal displays.
5. **Academic Publications & Research**: Expandable research card panels for displaying journal abstracts, conference talks, and report links.
6. **Maps & Visualizations Lightbox Gallery**: A masonry-styled visual index featuring a custom image lightbox preview modal.
7. **Education & Experience Timeline**: A vertical node timeline mapping academic paths and professional internships, alongside side panels for Certifications, Honors, and Volunteering.
8. **Spatial Blog**: A dedicated search-and-filter grid for GIS tutorials and urban insights.
9. **Validated Contact Form**: Real-time feedback, validation checks, and academic contact portals (Google Scholar, ResearchGate, LinkedIn).
10. **Centralized Data Store**: All content is managed within a single JSON database (`data/portfolioData.json`) for quick edits.

---

## Technical Specifications

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 (with native class-based light/dark theme toggling)
- **Animations**: Framer Motion
- **Map Library**: Leaflet (direct client-side integration to ensure React 19 compatibility)
- **Icons**: Lucide React
- **Types**: Custom TypeScript interfaces in `types/portfolio.ts`

---

## Local Setup & Development

### Prerequisites
Ensure you have **Node.js** (v18+) installed.

### Installation
1. Clone or copy the directory:
   ```bash
   cd urban-portfolio-next
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Content Management (JSON Schema)

All website content is located in:
`data/portfolioData.json`

To modify profile details, add projects, add blog posts, or edit skills, edit the respective arrays or objects in this JSON file. The UI will update automatically without modifying page code.

---

## Deployment Instructions

### 1. Vercel (Recommended)
Next.js works natively with Vercel:
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Keep the default build settings (`npm run build` and `.next` output directory).
5. Click **Deploy**. Vercel will automatically configure SSL and CDN caching.

### 2. Netlify
1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com) and click **Import from Git**.
3. Choose your repository.
4. Set the Build Command to `npm run build` and the Publish Directory to `.next` (or if deploying a static site, set Next.js to export static files).
5. Add the Next.js Runtime plugin (automatic on modern Netlify deployments).
6. Click **Deploy**.

### 3. GitHub Pages (Static Export)
To deploy as a static website on GitHub Pages:
1. Update `next.config.ts` to enable static export:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: "export",
     images: {
       unoptimized: true, // Required for static export
     },
   };

   export default nextConfig;
   ```
2. Build the project:
   ```bash
   npm run build
   ```
   This will generate a static build in the `out` directory.
3. Commit and push the `out` directory to your `gh-pages` branch, or configure GitHub Actions to build and deploy.
