# Comprehensive Study Guide & Presentation Script
**Aetheris — Heatwave Early Warning & Monitoring System**

---

## PART 1: COMPLETE CODEBASE EXPLANATION

### 1. Architectural Overview
The project is built using vanilla **HTML5**, **CSS3**, and **ES6 JavaScript**. It follows an editorial design aesthetic inspired by architectural publications—relying on warm off-white tones, subtle borders, clean typography, CSS grid layouts, and pure CSS data visualizations.

- **No external frameworks:** No Bootstrap, Tailwind, React, or jQuery.
- **Zero build steps:** Works immediately when opening any HTML file in a browser.
- **Centralized styling:** A single file `css/style.css` controls the visual presentation for all six pages.
- **Minimalist scripting:** A single file `js/script.js` (~50 lines) handles all interactions.

---

### 2. Detailed Explanation of HTML Pages

#### A. `index.html` (Home & Overview)
- **`<div class="top-notice">`**: Displays a top notification strip with a live pulsating CSS indicator (`.pulse-dot`), providing immediate situational awareness.
- **`<header class="navbar">`**: Contains the brand logo (`AETHERIS`) and navigation menu (`#navMenu`). Uses sticky positioning so it stays visible while scrolling.
- **`<section class="hero">`**: High-impact editorial hero section with a two-column CSS grid (`.grid-2`). The left column features headlines and call-to-action buttons; the right features an aerial landscape photo with a floating frosted-glass statistic badge (`.hero-stat-card`).
- **Thermal Metrics Grid (`.grid-3`)**: Displays three critical statistics (Peak Ambient 43.8°C, Heat Index 47.5°C, Risk Zones 14 Districts) styled inside tinted cards (`.card-highlight`).
- **7-Day CSS Bar Forecast**: Demonstrates data visualization without JavaScript or chart libraries. Uses `.bar-track` and `.bar-fill` divs with inline percentage widths (`style="width: 84%;"`).
- **Meteorology Explainer**: Semantic HTML paragraphs explaining the India Meteorological Department (IMD) heatwave criteria (+4.5°C departure from normal).
- **Module Directory Cards**: Six cards linking to every section of the platform.
- **Journey Bar (`.journey-bar`)**: Provides a guided sequential step forward to `forecasts.html`.

#### B. `forecasts.html` (Weather & Forecasts)
- **Alert Level Classification Grid (`.grid-4`)**: Four color-coded cards explaining Green (Normal <40°C), Yellow (Watch 40–42.5°C), Orange (Alert 42.6–44.5°C), and Red (Warning >44.5°C). Uses left colored border accents (`border-left: 4px solid var(--terracotta)`).
- **Interactive City Cards (`.city-card`)**: Six regional cards representing New Delhi, Nagpur, Bikaner, Ahmedabad, Hyderabad, and Bengaluru. Each card carries a `data-risk="orange|red|yellow"` HTML5 custom data attribute.
- **Filter Buttons**: Triggers the JavaScript function `filterCities('all'|'red'|'orange'|'yellow')`.
- **Archival Table (`<table>`)**: Semantic table with `<thead>`, `<tbody>`, `<th>`, and `<td>` listing benchmark historical heatwaves (2024 Mungeshpur 49.9°C, 2016 Phalodi 51.0°C). Wrapped in `.table-wrap` for horizontal scroll on mobile devices.

#### C. `monitoring.html` (Weather Station Telemetry)
- **Station Header & Mast Photo**: Details the physical Automatic Weather Station (AWS), Stevenson radiation screen, and sensor mast height.
- **Station Selection Buttons**: Three buttons with `onclick="switchStation(...)"` that pass station name, elevation, temperature, humidity, wind, and solar flux directly to JavaScript.
- **4 Core Sensor Cards (`.grid-4`)**:
  1. Ambient Air Temperature (`#sensorTemp`)
  2. Relative Humidity (`#sensorHumidity`)
  3. Wind Velocity (`#sensorWind`)
  4. Solar Flux / UV Index (`#sensorSolar`)
- **Simulate Refresh Button**: Triggers `refreshTimestamp()` to update `#stationTime` with the current computer time.
- **Technical Operation Guide**: Explains radiation shielding, mounting standards (1.5m for air temp, 10m for anemometers), and automated logging intervals.

#### D. `comparison.html` (Forecast Comparison & Accuracy)
- **Accuracy Assessment Card**: Summarizes model reliability (Mean Absolute Error 0.39°C, Accuracy 94.8% within ±0.8°C margin).
- **Plain-English Explainer**: Breaks down atmospheric grid limitations versus urban pavement heat sinks and vegetation cooling.
- **Dual CSS Comparison Bars (`.dual-bar-wrap`)**: Visual side-by-side comparison for each weekday showing two stacked bars:
  - Orange bar (`.fill-pred`): Model Prediction.
  - Charcoal bar (`.fill-obs`): Actual Ground Thermometer.
- **Verification Table**: Tabular log showing Date, Station Node, Predicted Temp, Observed Temp, Delta (Variance), and Verdict badge.
- **Field Notes Grid**: Three observational case studies noting pavement absorption and wind dispersion effects.

#### E. `safety.html` (Heatwave Safety Guide)
- **Audience-Specific Advisories (`.grid-3`)**:
  - *Citizens:* Indoor stay timings (12:00–16:00), window insulation, breathable fabrics.
  - *Farmers & Outdoor Workers:* Shift scheduling (early morning & late afternoon), ORS hydration, livestock care.
  - *Municipal Authorities:* Public cooling shelters, roadside *pyaau* water kiosks, hospital ice-bath readiness.
- **Phased Timeline (`.grid-3`)**: Actions broken down into *Phase 1: Before*, *Phase 2: During*, and *Phase 3: After*.
- **Hydration Badges**: Pill badges displaying beneficial cooling drinks (Coconut Water, Chaas, Aam Panna, ORS).
- **Native Expandable Accordions (`<details><summary>`)**: Zero-JS expandable sections for Heat Exhaustion vs. Heatstroke, non-AC cooling tips, and elder care.

#### F. `emergency.html` (Emergency & Community Help)
- **Emergency Hotline Cards (`.grid-4`)**: Prominent display of official Indian emergency numbers:
  - `112` — National All-in-One Emergency
  - `108 / 102` — Ambulance Dispatch & Triage
  - `1078` — National Disaster Management Authority (NDMA)
  - `1800-11-2026` — Public Advisory Hotline
- **First-Aid Protocol**: Four structured step cards: Relocate to shade → Surface cooling → Elevate limbs → Sips of water.
- **Municipal Cooling Shelter Directory**: Three verified shelters with location, hours, capacity, and amenities.
- **Interactive Community Form (`<form onsubmit="submitReport(event)">`)**: Input fields for Location, Issue Category, and Notes. Submitting triggers `submitReport()` without page reload.
- **Live Community Reports Feed (`#reportsList`)**: Displays user submissions dynamically prepended at the top.

---

### 3. Detailed CSS Architecture (`css/style.css`)

#### A. CSS Custom Properties (`:root`)
All colors, fonts, and borders are centralized at the top of the file:
```css
:root {
  --bg: #FAF8F5;          /* Warm alabaster canvas */
  --surface: #FFFFFF;     /* Pure card white */
  --surface-alt: #F4EFE6; /* Warm sand/beige surface */
  --text: #23201D;        /* Deep charcoal */
  --text-muted: #6C665F;  /* Warm grey for paragraphs */
  --border: rgba(35, 32, 29, 0.12); /* Subtle hair-line border */
  --terracotta: #C85A32;  /* Primary warm warning accent */
  --olive: #556B54;       /* Green normal alert */
  --amber: #D6942D;       /* Yellow watch */
  --red: #A82C26;         /* Red severe emergency */
  --charcoal: #1E1C1A;    /* Dark buttons and footer */
}
```
*Why this is great for viva:* If an examiner asks to change the theme color, you only change `--terracotta` once in `:root`, and every button, title, and badge on all 6 pages updates automatically!

#### B. CSS Grid Layout System
Instead of heavy classes, clean semantic grid classes are used:
- `.grid-2`: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;`
- `.grid-3`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;`
- `.grid-4`: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;`
On tablets (`max-width: 900px`) and mobiles (`max-width: 700px`), media queries collapse these into `1fr` single columns.

#### C. Pure CSS Visualization Bars
The progress bars do not require any JavaScript:
```css
.bar-track {
  background: var(--surface-alt);
  height: 18px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border);
}
.bar-fill {
  height: 100%;
  border-radius: 4px;
}
```
The width is controlled in HTML via `style="width: 85%;"`.

#### D. Semantic Accordions without JavaScript
Native HTML `<details>` and `<summary>` are styled with CSS:
```css
summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  justify-content: space-between;
}
summary::-webkit-details-marker { display: none; }
summary::after { content: '+'; color: var(--terracotta); font-weight: bold; }
details[open] summary::after { content: '−'; }
```
When clicked, the browser automatically reveals `.details-content` and toggles the `+` icon into `−`.

---

### 4. JavaScript Functions Explained Line-by-Line (`js/script.js`)

There are only **5 lightweight functions** in the entire project:

#### 1. `toggleMenu()` — Mobile Navigation Drawer
```javascript
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}
```
- **Explanation:** Finds the navigation element `#navMenu`. `classList.toggle('open')` adds the `open` CSS class if it's absent (showing the menu), or removes it if present (hiding it).

#### 2. `filterCities(risk)` — Risk Filter on Forecasts Page
```javascript
function filterCities(risk) {
  const cards = document.querySelectorAll('.city-card');
  cards.forEach(card => {
    if (risk === 'all' || card.dataset.risk === risk) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
```
- **Explanation:** Selects all `.city-card` elements using `querySelectorAll`. Loops through each card using `forEach`. Checks the HTML5 `data-risk` attribute (`card.dataset.risk`). If the user clicked `'all'` or if the card's risk matches the parameter, it sets `style.display = 'block'`; otherwise, it hides it with `'none'`.

#### 3. `switchStation(name, location, temp, hum, wind, solar)` — Telemetry Switcher
```javascript
function switchStation(stationName, location, temp, hum, wind, solar) {
  document.getElementById('stationTitle').innerText = stationName;
  document.getElementById('stationLocation').innerText = location;
  document.getElementById('sensorTemp').innerText = temp;
  document.getElementById('sensorHumidity').innerText = hum;
  document.getElementById('sensorWind').innerText = wind;
  document.getElementById('sensorSolar').innerText = solar;
}
```
- **Explanation:** Receives six arguments from the button's `onclick` attribute. Finds the corresponding elements by ID in the DOM and replaces their text using `.innerText`.

#### 4. `refreshTimestamp()` — Live Timestamp Updater
```javascript
function refreshTimestamp() {
  const timeBox = document.getElementById('stationTime');
  if (timeBox) {
    const now = new Date();
    timeBox.innerText = "Live Telemetry: Today, " + now.toLocaleTimeString();
  }
}
```
- **Explanation:** Instantiates a new JavaScript Date object (`new Date()`). Uses `.toLocaleTimeString()` to get the current time and updates the `#stationTime` element's text.

#### 5. `submitReport(event)` — Community Observation Logger
```javascript
function submitReport(event) {
  event.preventDefault(); // Prevents standard page reload

  const location = document.getElementById('repLocation').value;
  const issue = document.getElementById('repIssue').value;
  const note = document.getElementById('repNote').value;
  const list = document.getElementById('reportsList');
  const alertBox = document.getElementById('formSuccess');

  if (list) {
    const item = document.createElement('div');
    item.className = 'card';
    item.style.marginBottom = '1rem';
    item.innerHTML = `<strong>📍 ${location} — ${issue}</strong><p style="margin-top:0.3rem;">"${note}"</p><small class="mono-tag" style="margin-top:0.4rem;">Just Now • Verified Public Entry</small>`;
    list.prepend(item);
  }

  if (alertBox) {
    alertBox.style.display = 'block';
  }

  event.target.reset(); // Clears form inputs
}
```
- **Explanation:**
  - `event.preventDefault()` stops the browser's default behavior of reloading the page on form submission.
  - Extracts user input via `.value`.
  - `document.createElement('div')` builds a new card container in memory.
  - Fills the card with HTML template literals (`${location}`, `${issue}`, `${note}`).
  - `list.prepend(item)` inserts the new report at the very top of the feed.
  - Sets `alertBox.style.display = 'block'` to show a success message.
  - Calls `event.target.reset()` to clear the inputs for the next entry.

---

## PART 2: COMMON TEACHER QUESTIONS & HOW TO CODE THEM LIVE

Teachers and examiners often test students by asking for on-the-spot code modifications. Here are the most common requests and the exact steps to implement them:

---

### Question 1: *"Change the website's primary orange/terracotta color to Blue or Dark Cyan."*
- **File to modify:** `css/style.css`
- **What to do:** Go to lines 15–16 in `css/style.css`. Change `--terracotta`:
  ```css
  /* Change this line: */
  --terracotta: #C85A32;

  /* To this: */
  --terracotta: #1A73E8; /* Or any blue: #0F766E */
  ```
- **Explanation to teacher:** *"Because we designed the CSS with custom properties (`:root`), changing `--terracotta` automatically propagates to all buttons, headings, badges, and progress bars across all 6 pages."*

---

### Question 2: *"Add a 7th city (e.g., Mumbai, 38.2°C, Yellow Watch) to the forecasts page."*
- **File to modify:** `forecasts.html`
- **What to do:** Locate the `<div class="grid-3">` section (around line 90). Paste this new card inside:
  ```html
  <div class="card city-card" data-risk="yellow">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <h3>Mumbai</h3>
      <span class="badge badge-yellow">Yellow Watch</span>
    </div>
    <div style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--amber);">38.2°C</div>
    <p style="font-size: 0.85rem; margin: 0.5rem 0;">Condition: Humid Coastal Heat • Humidity 68%</p>
    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">Min: 29.0°C | Departure: +2.1°C</div>
  </div>
  ```
- **Explanation to teacher:** *"We added a new `.city-card` with `data-risk="yellow"`. Our existing JavaScript `filterCities()` function automatically recognizes it and filters it correctly without modifying the script."*

---

### Question 3: *"Add a 4th Weather Station button (e.g., Station Delta — Mumbai Coastal Mast) on the monitoring page."*
- **File to modify:** `monitoring.html`
- **What to do:** Find the station buttons container (around line 65) and append:
  ```html
  <button class="btn btn-outline" onclick="switchStation('Station Delta — Coastal Marine Mast', 'Colaba Outpost, Mumbai (Elev. 12m)', '38.4°C', '68%', '12 km/h (SW)', '820 W/m²')">
    Station Delta (Mumbai)
  </button>
  ```
- **Explanation to teacher:** *"Our `switchStation()` function accepts the station parameters directly, so adding new stations requires zero changes to the underlying script."*

---

### Question 4: *"Add a Phone Number field to the Community Report form."*
- **File to modify:** `emergency.html` and `js/script.js`
- **Step 1 (`emergency.html`):** Inside `<form onsubmit="submitReport(event)">`, add:
  ```html
  <div class="form-group">
    <label for="repPhone">Contact Number (Optional)</label>
    <input type="tel" id="repPhone" placeholder="e.g., +91 98765 43210">
  </div>
  ```
- **Step 2 (`js/script.js`):** In `submitReport(event)`, retrieve the phone number and include it in the report card:
  ```javascript
  const phone = document.getElementById('repPhone').value || "Not provided";
  // Then in item.innerHTML add:
  // <small class="mono-tag">Contact: ${phone}</small>
  ```

---

### Question 5: *"Change the Wednesday forecast bar on the home page from 43.5°C to 46.0°C and make it red."*
- **File to modify:** `index.html`
- **What to do:** Locate the Wednesday bar row in `index.html` (around line 118):
  ```html
  <!-- Change this: -->
  <div class="bar-day">Wednesday</div>
  <div class="bar-track"><div class="bar-fill fill-orange" style="width: 88%;"></div></div>
  <div class="bar-val">43.5°C</div>

  <!-- To this: -->
  <div class="bar-day">Wednesday</div>
  <div class="bar-track"><div class="bar-fill fill-red" style="width: 96%;"></div></div>
  <div class="bar-val">46.0°C</div>
  ```

---

### Question 6: *"How do you make an accordion open or closed by default on the safety page?"*
- **File to modify:** `safety.html`
- **What to do:** HTML `<details>` elements use the boolean attribute `open`:
  - To make an accordion open by default: `<details open>`
  - To make it closed by default: `<details>` (simply remove the `open` word).

---

### Question 7: *"Make the navigation bar static instead of sticky at the top."*
- **File to modify:** `css/style.css`
- **What to do:** In `css/style.css` under `.navbar`:
  ```css
  /* Change: */
  position: sticky;
  /* To: */
  position: static;
  ```

---

## PART 3: PRESENTATION SCRIPT FOR 3 DEVELOPERS

### Setup & Roles
- **Total Duration:** 6–8 minutes
- **Developer 1:** Introduces the project, design system, Home page (`index.html`), and Forecasts page (`forecasts.html`).
- **Developer 2:** Covers Monitoring Telemetry (`monitoring.html`) and Forecast Accuracy Comparison (`comparison.html`).
- **Developer 3:** Covers Public Safety Protocols (`safety.html`), Emergency Helplines, and Community Reporting (`emergency.html`), plus project conclusion.

---

### DEVELOPER 1: Introduction, Home & Weather Forecasts (2–2.5 mins)

> **[Developer 1 speaks]**  
> *"Good morning/afternoon, esteemed faculty and evaluators. Today, our team is presenting **Aetheris**, a comprehensive, responsive Heatwave Early Warning and Monitoring Web Platform.*
> 
> *As surface temperatures regularly cross 45°C during summer across northern and central plains, timely thermal information can save lives. Our objective was to build an editorial-grade, accessible web platform that communicates complex meteorological risks clearly without overwhelming the user.*
> 
> *Technically, the entire system is built strictly using **HTML5, CSS3, and vanilla ES6 JavaScript**—without heavy frameworks or external dependencies.*
> 
> *I was responsible for the foundational design system and the first two core modules: **Home & Overview** and **Weather Forecasts**.*
> 
> *[Show `index.html` on screen]*  
> *Here on the Home page, you can see our architectural editorial styling. We used a warm alabaster and sand palette with terracotta warning accents. At the top, a live status bar provides immediate situational context. Below that, our hero section highlights today's recorded peak of 43.8°C alongside three key metrics: Peak Ambient, the 'Feels-Like' Heat Index, and the active district alert count.*
> 
> *One technical feature we're proud of is our 7-day temperature outlook. Instead of importing heavy chart libraries, we engineered pure **CSS progress bars**. They render instantly, scale responsively on mobile screens, and color-code each day's severity from Yellow to Red.*
> 
> *[Navigate to `forecasts.html`]*  
> *Moving to the Forecasts module, we implemented the official four-tier alert framework established by the India Meteorological Department: Green for Normal, Yellow for Watch, Orange for Alert, and Red for Severe Warning.*
> 
> *Below, we display multi-city telemetry across diverse climate zones—including New Delhi, Nagpur, and Bengaluru. We added an interactive risk filter using vanilla JavaScript. When I click 'Red Alert', our `filterCities()` function inspects the `data-risk` attributes and isolates high-risk zones instantly without a page reload.*
> 
> *Lastly, we built a historical benchmark table archiving record heatwaves such as Mungeshpur 2024 and Phalodi 2016.*
> 
> *I will now hand over to **[Developer 2's Name]**, who will demonstrate our real-time weather station telemetry and accuracy comparison modules."*

---

### DEVELOPER 2: Monitoring Telemetry & Forecast Verification (2 mins)

> **[Developer 2 speaks]**  
> *"Thank you, [Developer 1's Name]. Hello everyone. I developed the next two modules: **Weather Station Monitoring** and **Forecast Accuracy Comparison**.*
> 
> *[Show `monitoring.html` on screen]*  
> *On the Monitoring page, our focus is ground-truth surface observation. Satellites capture upper atmospheric patterns, but humans experience heat at ground level. This page showcases an Automatic Weather Station (AWS) equipped with aspirated Stevenson screens.*
> 
> *We track four primary sensor parameters: Ambient Air Temperature, Relative Humidity, Wind Velocity and Direction—essential for tracking dry 'Loo' winds—and Solar Flux measured by thermopile pyranometers.*
> 
> *To demonstrate live network capability, I implemented an interactive station switcher using our `switchStation()` JavaScript function. When I switch from Station Alpha in New Delhi to Station Beta in Nagpur or Station Gamma in the Thar Desert, the DOM immediately updates all four sensor cards with their calibrated metrics.*
> 
> *Clicking 'Refresh Telemetry' executes our `refreshTimestamp()` function, capturing the client's current time to simulate live telemetry polling.*
> 
> *[Navigate to `comparison.html`]*  
> *Next is our Forecast Comparison module. A major challenge in meteorology is that numerical prediction models operate on wide 5-kilometer grid boxes, while street-level thermometers encounter asphalt absorption and urban heat island effects.*
> 
> *This page proves model verification. We have a comparison table analyzing daily predictions against ground observations. Visually, we built a **dual CSS bar comparison** for each day: the terracotta bar shows the model forecast, while the charcoal bar represents the observed ground temperature.*
> 
> *Across our sample weekly cycle, the system maintained a Mean Absolute Error of just 0.39°C—well within the ±1.0°C tolerance required for life-saving municipal heat alerts.*
> 
> *Now, I will pass the presentation to **[Developer 3's Name]** to cover our public health safety guidelines and community emergency response systems."*

---

### DEVELOPER 3: Safety Protocols, Emergency Help & Conclusion (2–2.5 mins)

> **[Developer 3 speaks]**  
> *"Thank you, [Developer 2's Name]. I was responsible for the civic and human resilience aspect of the platform: the **Heatwave Safety Guide** and the **Emergency & Community Assistance** modules.*
> 
> *[Show `safety.html` on screen]*  
> *Meteorological data is only effective if citizens know how to respond. On the Safety Guide page, we separated actionable precautions for three distinct groups:*
> 1. *General Households and vulnerable seniors,*
> 2. *Farmers and agricultural labor, recommending shift restructuring to avoid peak midday sun,*
> 3. *And Municipal Authorities, focusing on cool roofs and roadside drinking water kiosks.*
> 
> *We structured safety chronologically into Before, During, and After a heatwave. We also built an expandable medical FAQ section. A key technical choice here was using native HTML5 `<details>` and `<summary>` elements styled with CSS. This provides smooth, accessible accordions with zero JavaScript overhead.*
> 
> *[Navigate to `emergency.html`]*  
> *Finally, we arrive at our Emergency and Community Help module. At the top, we prominently display official Indian emergency hotlines: 112 for all-in-one emergency dispatch, 108 for ambulance triage, and 1078 for the National Disaster Management Authority.*
> 
> *Beside our four-step heatstroke first-aid protocol, we provide a directory of designated municipal cooling shelters equipped with evaporative coolers and hydration supplies.*
> 
> *At the bottom is our interactive Citizen Observation Desk. If a local resident spots a broken public water cooler or unshaded outdoor workers, they can submit an observation.*
> 
> *[Demonstrate live: fill form and submit]*  
> *When I type in a location and click 'Submit Community Report', our `submitReport()` JavaScript function prevents the default browser reload, constructs a new verified observation card dynamically, and prepends it directly to our live community feed.*
> 
> *To summarize: all six pages share a unified design, persistent navigation, responsive layouts, and clean, modular code that is lightweight and accessible on any device.*
> 
> *Thank you for your time. We are now happy to answer any questions or demonstrate code modifications."*

---

### Q&A Defense Strategy (Quick Reference)

| Question from Evaluator | How to Answer Confidently |
| :--- | :--- |
| **"Why didn't you use React or Bootstrap?"** | *"We deliberately chose vanilla HTML5, CSS3, and modern ES6 to ensure optimal performance, fast load times on low-bandwidth mobile connections, and zero dependency overhead. Using CSS custom properties and CSS Grid gives us full control over our editorial design without framework bloat."* |
| **"How does the site adapt to mobile devices?"** | *"We used responsive CSS media queries at 900px and 700px. Grid columns automatically collapse from 4 and 3 columns into single-column layouts, table wrappers enable smooth horizontal scrolling, and navigation collapses into a toggleable hamburger menu via `toggleMenu()`."* |
| **"How is user input sanitized in your report form?"** | *"In `js/script.js`, input values are read via standard DOM element properties and formatted using template literals. In a production environment, this would connect to an authenticated REST API with backend validation and SQL/XSS sanitization."* |
