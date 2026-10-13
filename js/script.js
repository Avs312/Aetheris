/* ==========================================================================
   HEATWAVE EARLY WARNING SYSTEM — JAVASCRIPT CONTROLLER
   Lightweight, vanilla ES6 script handling interactive navigation,
   telemetry toggles, and community reporting.
   ========================================================================== */

// 1. Mobile Menu Toggle: Opens or closes the navigation links on smaller screens
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

// 2. City Filter: Shows only cities matching the chosen risk level (all / orange / red / yellow)
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

// 3. Station Switcher: Updates the displayed weather station sensor values
function switchStation(stationName, location, temp, hum, wind, solar) {
  document.getElementById('stationTitle').innerText = stationName;
  document.getElementById('stationLocation').innerText = location;
  document.getElementById('sensorTemp').innerText = temp;
  document.getElementById('sensorHumidity').innerText = hum;
  document.getElementById('sensorWind').innerText = wind;
  document.getElementById('sensorSolar').innerText = solar;
}

// 4. Live Simulation Refresh: Updates the telemetry timestamp to current time
function refreshTimestamp() {
  const timeBox = document.getElementById('stationTime');
  if (timeBox) {
    const now = new Date();
    timeBox.innerText = "Live Telemetry: Today, " + now.toLocaleTimeString();
  }
}

// 5. Community Report Submission: Handles form submission and logs the report
function submitReport(event) {
  event.preventDefault(); // Prevents standard page reload

  const location = document.getElementById('repLocation').value;
  const issue = document.getElementById('repIssue').value;
  const note = document.getElementById('repNote').value;
  const list = document.getElementById('reportsList');
  const alertBox = document.getElementById('formSuccess');

  // Insert newly submitted report at the top of the community feed
  if (list) {
    const item = document.createElement('div');
    item.className = 'card';
    item.style.marginBottom = '1rem';
    item.innerHTML = `<strong>📍 ${location} — ${issue}</strong><p style="margin-top:0.3rem;">"${note}"</p><small class="mono-tag" style="margin-top:0.4rem;">Just Now • Verified Public Entry</small>`;
    list.prepend(item);
  }

  // Show confirmation alert message
  if (alertBox) {
    alertBox.style.display = 'block';
  }

  event.target.reset(); // Clear form fields
}
