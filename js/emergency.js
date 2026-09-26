/**
 * AETHERIS - EMERGENCY SCRIPTS (js/emergency.js)
 * Clean, Human-Centered, Professional Light Theme
 */

let capturedCoords = null;

// ===================================================================
// 1. SYMPTOM CHECKER & FIRST AID
// ===================================================================

function evaluateSymptoms() {
    const selected = [];
    $('.sym-check:checked').each(function() {
        selected.push($(this).val());
    });

    if (selected.length === 0) {
        alert("Please select at least one symptom to check.");
        return;
    }

    const hasHighTemp = selected.includes('high_temp');
    const hasNoSweat = selected.includes('no_sweat');
    const hasConfusion = selected.includes('confusion');

    const isHeatStroke = (hasHighTemp && hasNoSweat) || hasConfusion;

    $('#diagStep1').addClass('hidden');
    $('#diagStepResult').removeClass('hidden');

    const $resBox = $('#diagResultContainer');

    if (isHeatStroke) {
        $resBox.removeClass('diag-result-mild').addClass('diag-result-critical').html(`
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 28px; color: #dc2626;"></i>
                <div>
                    <h3 style="color: #991b1b; font-size: 18px; font-weight: 700; margin: 0;">Urgent: Heat Stroke Symptoms Detected</h3>
                    <span class="badge badge-danger">Immediate Medical Attention Needed</span>
                </div>
            </div>
            <p style="color: var(--text-primary); font-size: 14px; margin-bottom: 14px;">
                The person shows key signs of heat stroke (high temperature, lack of sweat, or confusion). Please call emergency medical services immediately.
            </p>
            <div class="emergency-steps-box">
                <h4>What you should do right now:</h4>
                <ol>
                    <li><strong>Call 108 immediately</strong> for an ambulance.</li>
                    <li><strong>Move to a shaded or air-conditioned area</strong> right away.</li>
                    <li><strong>Apply cool water or ice packs</strong> to neck, armpits, and groin. Fan gently.</li>
                    <li><strong>Do NOT force fluids</strong> if the person is sleepy, confused, or vomiting.</li>
                </ol>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="tel:108" class="btn btn-danger btn-lg"><i class="fa-solid fa-phone"></i> Call 108 Ambulance</a>
                <button class="btn btn-primary" onclick="triggerEmergencySOS()"><i class="fa-solid fa-location-crosshairs"></i> Share My Location</button>
            </div>
        `);

        $('#modalEmergencyAlert').removeClass('hidden');
        if (typeof playAlertTone === 'function') playAlertTone('siren');
        if (typeof speakText === 'function') speakText('heatstroke');

    } else {
        $resBox.removeClass('diag-result-critical').addClass('diag-result-mild').html(`
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <i class="fa-solid fa-person-falling-burst" style="font-size: 28px; color: #d97706;"></i>
                <div>
                    <h3 style="color: #92400e; font-size: 18px; font-weight: 700; margin: 0;">Heat Exhaustion Symptoms</h3>
                    <span class="badge badge-warning">Moderate Risk — Rest & Hydrate</span>
                </div>
            </div>
            <p style="color: var(--text-primary); font-size: 14px; margin-bottom: 14px;">
                The person is experiencing excessive sweating, dehydration, and fatigue. Acting early prevents this from becoming more dangerous.
            </p>
            <div class="emergency-steps-box" style="border-color: #fde68a; background: #fffbeb;">
                <h4 style="color: #92400e;">First-Aid Steps:</h4>
                <ol>
                    <li>Move the person to a cool, shaded or air-conditioned room.</li>
                    <li>Loosen tight clothing and let them rest comfortably.</li>
                    <li>Sip cool water or ORS electrolyte drink slowly.</li>
                    <li>Place a damp cloth on the forehead and neck.</li>
                    <li>If condition does not improve within 30 minutes, call 108.</li>
                </ol>
            </div>
        `);
        if (typeof playAlertTone === 'function') playAlertTone('warning');
    }
}

function resetWizard() {
    $('.sym-check').prop('checked', false);
    $('#diagStepResult').addClass('hidden');
    $('#diagStep1').removeClass('hidden');
}

// ===================================================================
// 2. EMERGENCY SOS (Location Sharing)
// ===================================================================

function triggerEmergencySOS() {
    const $geoDisplay = $('#geoDisplay');
    $geoDisplay.html('<span class="text-warning"><i class="fa-solid fa-spinner fa-spin"></i> Finding your current location...</span>');

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude.toFixed(5);
                const lon = position.coords.longitude.toFixed(5);
                const acc = Math.round(position.coords.accuracy);
                capturedCoords = { lat, lon, acc };
                displaySOSCoordinates(lat, lon, acc);
            },
            function(error) {
                const lat = "21.14580";
                const lon = "79.08820";
                const acc = 25;
                capturedCoords = { lat, lon, acc };
                displaySOSCoordinates(lat, lon, acc, true);
            },
            { timeout: 7000, enableHighAccuracy: true }
        );
    } else {
        const lat = "21.14580";
        const lon = "79.08820";
        const acc = 25;
        capturedCoords = { lat, lon, acc };
        displaySOSCoordinates(lat, lon, acc, true);
    }
}

function displaySOSCoordinates(lat, lon, acc, isFallback = false) {
    const mapsUrl = `https://maps.google.com/?q=${lat},${lon}`;
    const helpMsg = `AETHERIS EMERGENCY: Heat illness reported at Lat: ${lat}, Long: ${lon}. Accuracy: ±${acc}m. Maps link: ${mapsUrl}. Please send medical assistance.`;

    $('#geoDisplay').html(`
        <div style="margin-bottom: 6px;">
            <strong style="color: #dc2626;"><i class="fa-solid fa-circle-dot"></i> Coordinates Found:</strong>
            <span style="font-family: monospace; color: var(--text-primary); margin-left: 6px;">Lat: ${lat}°, Long: ${lon}° (±${acc}m)</span>
            ${isFallback ? '<span class="badge badge-warning" style="margin-left: 6px;">Default Station Location</span>' : '<span class="badge badge-success" style="margin-left: 6px;">GPS Verified</span>'}
        </div>
        <p style="font-size: 13px; color: var(--text-secondary);">
            Location captured. You can now tap WhatsApp or SMS below to share this with emergency contacts.
            <a href="${mapsUrl}" target="_blank" style="color: var(--theme-primary); margin-left: 6px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Open Map</a>
        </p>
    `);

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(helpMsg)}`;
    const smsUrl = `sms:?body=${encodeURIComponent(helpMsg)}`;

    $('#btnShareWhatsApp').prop('disabled', false).off('click').on('click', () => window.open(waUrl, '_blank'));
    $('#btnShareSMS').prop('disabled', false).off('click').on('click', () => window.location.href = smsUrl);

    if (typeof playAlertTone === 'function') playAlertTone('chime');
    if (typeof speakText === 'function') speakText('sos');
}

// ===================================================================
// INITIALIZATION
// ===================================================================

$(document).ready(function() {
    $('#btnEvaluateSymptoms').on('click', evaluateSymptoms);
    $('#btnResetWizard').on('click', resetWizard);
    $('#btnBigSOS').on('click', triggerEmergencySOS);
});
