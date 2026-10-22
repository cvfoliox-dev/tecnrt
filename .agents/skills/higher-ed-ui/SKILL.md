---
name: higher-ed-ui
description: >-
  UI/UX design principles and component standards for engineering college and university websites.
  Focuses on clean visual hierarchy, restrained academic color palettes, accessible typography,
  responsive layouts, and elimination of AI-style visual noise (giant cards, floating glassmorphism, excessive gradients).
---

# Higher Education UI/UX Design System Skill

This skill enforces modern, institutional web design standards for university websites, based on research into established academic design systems (such as Stanford Decanter, MIT, and leading engineering institutions).

---

## 1. Visual Restraint & Anti-AI-Noise Rules

1. **Eliminate Gratuitous Trends**:
   - No pervasive glassmorphism (`backdrop-filter: blur(...)` on every card).
   - No floating ambient glowing spheres or saturated neon gradients.
   - Avoid oversized cards with giant margins that push useful content far down the page.
   - Restrict pulse animations and continuous decorative loops that distract from reading.

2. **Disciplined Color System**:
   - **Primary Identity**: Deep Institutional Navy (`#0e2154`) — reflects credibility and academic tradition.
   - **Accent / Interaction**: Warm Gold / Amber (`#d97706` / `#b45309` / `#f59e0b`) — used deliberately for key interactive actions, badges, and primary links.
   - **Surface & Backgrounds**: Crisp Off-White / Slate (`#ffffff`, `#f8fafc`, `#f1f5f9`) — high clarity, easy on eyes during sustained reading.
   - **Text & Contrast**: High-contrast slate neutrals (`#0f172a` for headings, `#334155` for body text, `#64748b` for subtle captions) meeting WCAG AAA / AA contrast requirements.

3. **Typography as Infrastructure**:
   - Clear hierarchical scale:
     - Page Title: `2.25rem - 2.75rem`, font-weight `800`
     - Section Headings: `1.75rem - 2.25rem`, font-weight `800`
     - Subsection / Card Titles: `1.1rem - 1.25rem`, font-weight `700`
     - Body Text: `0.938rem - 1rem` (`15px - 16px`), line-height `1.65`, font-weight `400`
     - Captions & Meta: `0.813rem - 0.875rem` (`13px - 14px`), font-weight `500`
   - No all-caps body text or low-contrast grey-on-dark text.

4. **Information Density & Task Flow**:
   - Visitors come to accomplish tasks: check results, read admissions requirements, explore engineering departments, check placement statistics, or reach the portal.
   - Structure content into scannable lists, clear tables, and concise grids rather than giant standalone promo banners.
   - Ensure primary navigation is accessible, with zero horizontal overflow on mobile devices (`320px - 480px`).
