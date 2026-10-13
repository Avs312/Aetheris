# Aetheris — Heatwave Early Warning & Monitoring System

A responsive, editorial web application for regional heatwave surveillance, surface telemetry, forecast accuracy verification, and public safety.

---

## 1. Quick Start
To launch the website:
- Double-click **`index.html`** in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).
- Or right-click `index.html` in VS Code and choose **Open with Live Server**.

---

## 2. Page Directory

All pages share a unified editorial design system, typography, and navigation bar:

| Page | File | Overview |
| :--- | :--- | :--- |
| **Home** | `index.html` | Architectural hero section, current heat-risk metrics, 7-day CSS forecast bars, IMD heatwave definitions, and directory links. |
| **Forecasts** | `forecasts.html` | Regional 7-day outlook, multi-city temperature cards with alert level filters, historical heat records archive, and 4-tier risk legend. |
| **Monitoring** | `monitoring.html` | Autonomous Weather Station (AWS) telemetry: temperature, humidity, wind velocity, and solar flux with interactive station switcher. |
| **Comparison** | `comparison.html` | Numerical model vs. ground observation comparison table, side-by-side dual CSS comparison bars, and meteorologist field notes. |
| **Safety Guide** | `safety.html` | Targeted advisories for Citizens, Farmers, and Authorities; chronological precautions (Before, During, After); and expandable FAQ accordions. |
| **Emergency** | `emergency.html` | Official emergency hotlines (112, 108, 1078), 4-step heatstroke first-aid, municipal cooling shelters, and public observation logging form. |

---

## 3. Technology Stack

- **HTML5:** Clean semantic tags (`<header>`, `<nav>`, `<section>`, `<details>`, `<summary>`, `<footer>`).
- **CSS3:** Custom properties for warm mineral palette (Alabaster, Sand, Terracotta, Olive, Charcoal), CSS Grid/Flexbox layouts, and pure CSS visualization bars.
- **JavaScript (ES6):** Lightweight ~50 line script (`js/script.js`) handling mobile menu toggling, city filtering, station switching, live timestamp refresh, and observation form submissions.
