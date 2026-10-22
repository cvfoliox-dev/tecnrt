# Tirumala Engineering College (TEC) - Autonomous Web Portal Frontend

Official frontend web application and student/faculty management portal for **Tirumala Engineering College (Autonomous)**, Narasaraopet, Palnadu District, Andhra Pradesh.

- **EAPCET / ECET / ICET Code:** `TMLN`
- **Affiliation:** Permanently Affiliated to JNTU Kakinada
- **Accreditation:** NAAC 'A' Grade, NBA Accredited, ISO 9001:2015 Certified, UGC Autonomous

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite 8
- **Routing:** React Router v7 (with `React.lazy` route-level code splitting & Suspense)
- **Styling:** Curated Institutional CSS Design System (Royal Navy & Warm Sun Gold tokens)
- **Icons:** Lucide React
- **Accessibility:** Apple Human Interface Guidelines (HIG) + WCAG 2.1 AA Compliant
  - Keyboard `:focus-visible` outline indicators
  - Accessible Skip to Main Content bypass link
  - ARIA dialog, modal focus management, and tablist semantics
  - `@media (prefers-reduced-motion: reduce)` support
- **Copywriting Standard:** Humanizer Writing Standard (`humanzier.md`) — clean, human-centered academic prose free of AI clichés.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/cvfoliox-dev/tecnrt.git
cd tecnrt

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Build outputs are compiled into `dist/` with route-level code splitting and minified chunks.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Architecture

```text
├── .agents/skills/          # Installed design & copywriting skills (Apple Design, Higher-Ed UI)
├── public/                  # Static institutional assets, logos, PDFs, panoramas
├── src/
│   ├── components/
│   │   ├── common/          # Universal Navbar, Footer, PortalHeader, RoleSwitcher
│   │   ├── home/            # Hero, PlacementsSection, LatestNewsSection
│   │   ├── public/          # AboutSection, ContactSection, LoginModal
│   │   ├── student/         # Student Portal Views (Attendance, Fees, Exams)
│   │   ├── faculty/         # Faculty Portal Views
│   │   ├── hod/             # HOD Administration Views
│   │   └── principal/       # Principal Executive Suite
│   ├── context/             # Global AuthContext & Role Switching
│   ├── data/                # Verified College Audit & Mock Data
│   ├── pages/               # Code-split page components (About, Academics, Admissions, etc.)
│   ├── App.jsx              # Application root with Suspense boundaries & routes
│   └── index.css            # Global design tokens, focus styles, responsive utilities
```

---

## 📄 License & Ownership

© Tirumala Engineering College, Narasaraopet. Managed by Venkata Ramana Charitable Trust. All rights reserved.
