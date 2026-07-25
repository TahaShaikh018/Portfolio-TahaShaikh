# 🚀 Personal Portfolio Website

A modern, dynamic, and animated personal portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed for high performance, smooth visual aesthetics, and effortless customization.

![Portfolio Screenshot](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features & Highlights

- **⚡ Fast & Modern Tech Stack**: Powered by React (Vite) + Tailwind CSS + Lucide React Icons.
- **🎨 Glassmorphism & Micro-Animations**: Smooth Framer Motion transitions, hover glow cards, magnetic buttons, and responsive scale effects.
- **✨ Custom Animated Cursor**: Dot + trailing spring ring that dynamically scales and changes color over interactive elements.
- **🌌 Interactive Particle Background**: HTML5 Canvas particle mesh with mouse hover displacement and theme adaptation.
- **🌗 Dark Mode by Default**: Built-in dark/light theme switch with persistent `localStorage` preference.
- **📱 Fully Responsive**: Pixel-perfect layout across mobile, tablet, and widescreen desktop displays.
- **📝 Single Config File Architecture**: Customize **100% of your data** (name, bio, skills, experience, projects, resume PDF, contact email) in [`src/data/portfolioData.js`](./src/data/portfolioData.js).
- **📬 Working Contact Form**: Integrated with **Formspree** (or EmailJS) out of the box with zero backend setup needed.
- **📄 Downloadable Resume**: Direct resume view and download buttons linked to `/public/resume.pdf`.
- **🤖 Automated GitHub Pages Deployment**: Pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic builds on `git push`.

---

## 📁 Project Structure

```
personal-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions workflow for GitHub Pages
├── public/
│   ├── favicon.svg                 # Brand logo browser icon
│   └── resume.pdf                  # PDF placeholder resume
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx        # Bio, photo frame, stats & quick facts
│   │   ├── ContactSection.jsx      # Contact form & social media icons
│   │   ├── CustomCursor.jsx        # Spring dot + trailing ring custom cursor
│   │   ├── ExperienceSection.jsx   # Interactive vertical career timeline
│   │   ├── Footer.jsx              # Footer copyright & return-to-top button
│   │   ├── HeroSection.jsx         # Typewriter role animation & CTA buttons
│   │   ├── Navbar.jsx              # Glassmorphic header & section link indicator
│   │   ├── PageLoader.jsx          # Intro splash screen animation
│   │   ├── ParticleBackground.jsx  # Interactive canvas particle mesh
│   │   ├── ProjectsSection.jsx     # Project cards grid with category filter
│   │   ├── ResumeSection.jsx       # Resume summary card & PDF download button
│   │   └── SkillsSection.jsx       # Categorized skills & animated progress bars
│   ├── context/
│   │   └── ThemeContext.jsx        # Dark/Light theme state management
│   ├── data/
│   │   └── portfolioData.js        # 🌟 ALL PORTFOLIO DATA IS EDITED HERE!
│   ├── hooks/
│   │   └── useActiveSection.js     # IntersectionObserver section tracker
│   ├── App.jsx                     # Main layout & component assembler
│   ├── index.css                   # Tailwind directives & glass utilities
│   └── main.jsx                    # Vite React entry point
├── package.json
├── tailwind.config.js
├── vite.config.js                  # Relativized base path for GitHub Pages
└── README.md
```

---

## 🛠️ Quick Start & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

---

## ✏️ How to Customize Your Portfolio

### 1. Edit Your Personal Information
All content is stored in [`src/data/portfolioData.js`](./src/data/portfolioData.js). Open this file and update:
- **`personal`**: Name, hero bio, roles (for typewriter effect), location, availability, avatar URL.
- **`socialLinks`**: GitHub, LinkedIn, Twitter/X, Dev.to, Email.
- **`experiences`**: Add or remove companies, job titles, dates, descriptions, and achievements.
- **`skillCategories`**: Skill names, icons, level percentages, and colors.
- **`projects`**: Project titles, descriptions, categories, images, tech tags, demo & GitHub URLs.

### 2. Replace the Resume PDF
Replace `public/resume.pdf` with your actual PDF document (keep the filename as `resume.pdf` or update `portfolioData.js`).

### 3. Set Up Contact Form Submissions (Formspree)
1. Go to [Formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your Form ID (e.g. `xbjnqpkz`).
3. Open `src/data/portfolioData.js` and paste your Formspree endpoint in `contactConfig.formspreeEndpoint`:
   ```javascript
   contactConfig: {
     formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
     // ...
   }
   ```
Submissions sent from your website form will now arrive directly in your email inbox!

---

## 🚀 Deployment Instructions

### Option A: Automatic Deployment via GitHub Pages (Recommended)

1. Create a new repository on GitHub.
2. Initialize git and push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings > Pages**.
4. Under **Build and deployment > Source**, select **GitHub Actions**.
5. The included workflow (`.github/workflows/deploy.yml`) will automatically build and publish your portfolio website on every push to `main`!

### Option B: Deploy to Vercel
1. Import your GitHub repository to [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Click **Deploy**.

### Option C: Deploy to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Build Command: `npm run build`.
3. Publish Directory: `dist`.

---

## 📄 License
MIT License - feel free to customize and use this portfolio template for your personal or commercial projects!
