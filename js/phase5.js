/**
 * AETHERIS - PHASE V SCRIPTS (js/phase5.js)
 * Clean, Human-Centered, Professional Light Theme
 */

const PERSONA_ADVISORIES = {
    citizens: {
        title: "SAFETY GUIDE FOR FAMILIES & CITIZENS",
        icon: "fa-user",
        en: `
            <div class="advisory-section">
                <h5><i class="fa-solid fa-droplet"></i> Drinking Water & Staying Hydrated:</h5>
                <ul>
                    <li>Drink at least 3 to 4 liters of clean water daily, even if you do not feel thirsty yet.</li>
                    <li>Sip homemade ORS drinks, buttermilk (chhaas), coconut water, or lemon water with a pinch of salt.</li>
                    <li>Avoid heavy tea, coffee, and sugary sodas, as they cause you to lose more body water.</li>
                </ul>
            </div>
            <div class="advisory-section">
                <h5><i class="fa-solid fa-sun"></i> Staying Safe Outdoors:</h5>
                <ul>
                    <li>Try to stay indoors during the hottest hours between <strong>11:00 AM and 4:00 PM</strong>.</li>
                    <li>Wear loose, light-colored cotton clothes and use an umbrella or damp cloth when going outside.</li>
                    <li>Never leave young children, elderly family members, or pets inside a parked car.</li>
                </ul>
            </div>
        `,
        hi: `
            <div class="advisory-section">
                <h5><i class="fa-solid fa-droplet"></i> पानी पीने के नियम:</h5>
                <ul>
                    <li>प्यास न लगने पर भी दिन भर में 3 से 4 लीटर पानी अवश्य पिएं।</li>
                    <li>ओआरएस, छाछ, नींबू पानी और नारियल पानी पिएं।</li>
                    <li>दोपहर 11 बजे से 4 बजे के बीच तेज धूप में निकलने से बचें।</li>
                </ul>
            </div>
            <div class="advisory-section">
                <h5><i class="fa-solid fa-sun"></i> बाहर जाते समय ध्यान दें:</h5>
                <ul>
                    <li>हल्के रंग के ढीले सूती कपड़े पहनें और सिर को छाते या गमछे से ढकें।</li>
                </ul>
            </div>
        `,
        mr: `
            <div class="advisory-section">
                <h5><i class="fa-solid fa-droplet"></i> नागरिकांसाठी आवश्यक सूचना:</h5>
                <ul>
                    <li>तहान नसली तरी दिवसातून ३ ते ४ लिटर स्वच्छ पाणी प्या.</li>
                    <li>ओआरएस, ताक आणि लिंबू सरबत प्या.</li>
                    <li>दुपारी ११ ते ४ दरम्यान उन्हात जाणे टाळा. डोक्यावर टोपी किंवा रुमाल वापरा.</li>
                </ul>
            </div>
        `,
        speechSummary: "Citizens guide: Drink plenty of water and ORS. Avoid direct sun between 11 AM and 4 PM, and wear loose cotton clothes."
    },

    farmers: {
        title: "SAFETY GUIDE FOR FARMERS & ANIMALS",
        icon: "fa-wheat-awn",
        en: `
            <div class="advisory-section">
                <h5><i class="fa-solid fa-cow"></i> Protecting Cattle & Livestock:</h5>
                <ul>
                    <li>Provide plenty of shade for cattle sheds using green netting, straw roofs, or thatch.</li>
                    <li>Keep clean, cool water with mineral salt available for animals at all times.</li>
                    <li>Sprinkle cool water on dairy cows during peak afternoon heat to keep them comfortable.</li>
                </ul>
            </div>
            <div class="advisory-section">
                <h5><i class="fa-solid fa-faucet-drip"></i> Watering Crops & Protecting Soil:</h5>
                <ul>
                    <li>Water crops only in the late evening or night so the water does not evaporate in the midday sun.</li>
                    <li>Spread dry straw or plant waste around crop roots to keep the soil moist and cool.</li>
                </ul>
            </div>
        `,
        speechSummary: "Farming advice: Keep animals under shaded shelters with cool water. Water crops in the evening and use straw mulching to keep soil moist."
    },

    health: {
        title: "GUIDELINES FOR HEALTHCARE WORKERS",
        icon: "fa-user-doctor",
        en: `
            <div class="advisory-section">
                <h5><i class="fa-solid fa-hospital"></i> Clinic & Hospital Preparation:</h5>
                <ul>
                    <li>Ensure ample stock of ORS packets, intravenous fluids, and fever-relief medicines.</li>
                    <li>Set up dedicated cooling beds with electric fans, ice packs, and wet towels.</li>
                    <li>Check on high-risk patients such as elderly residents and pregnant women in the community.</li>
                </ul>
            </div>
        `,
        speechSummary: "Healthcare guidelines: Keep ORS and saline fluids in stock, prepare cool patient beds, and monitor vulnerable community members."
    },

    authorities: {
        title: "GUIDELINES FOR CITY & MUNICIPAL TEAMS",
        icon: "fa-building-flag",
        en: `
            <div class="advisory-section">
                <h5><i class="fa-solid fa-truck-droplet"></i> Public Drinking Water & Cooling Shelters:</h5>
                <ul>
                    <li>Deploy clean drinking water tankers to busy markets, slums, and bus stands.</li>
                    <li>Open air-conditioned or shaded community halls with free drinking water for the public.</li>
                </ul>
            </div>
            <div class="advisory-section">
                <h5><i class="fa-solid fa-clock"></i> Outdoor Worker Shift Adjustments:</h5>
                <ul>
                    <li>Reschedule outdoor construction and municipal road cleaning to early mornings (before 11 AM).</li>
                </ul>
            </div>
        `,
        speechSummary: "City official guidelines: Deploy water tankers to high traffic areas, open public cooling centers, and adjust outdoor working hours."
    }
};

let currentPersona = 'citizens';

function renderPersonaAdvisory(personaKey) {
    currentPersona = personaKey || 'citizens';
    const persona = PERSONA_ADVISORIES[currentPersona];
    const lang = (typeof HeatShield !== 'undefined' ? HeatShield.currentLanguage : 'en-US');

    $('#advPersonaBadge').text(persona.title);

    let content = persona.en;
    if (lang === 'hi-IN' && persona.hi) content = persona.hi;
    if (lang === 'mr-IN' && persona.mr) content = persona.mr;

    $('#llmAdvisoryBody').html(content);

    $('.persona-tab').removeClass('active');
    $(`.persona-tab[data-persona="${currentPersona}"]`).addClass('active');
}

function setupAccordion() {
    $('.accordion-header').on('click', function() {
        const $item = $(this).closest('.accordion-item');
        $item.toggleClass('active');
    });
}

$(document).ready(function() {
    renderPersonaAdvisory('citizens');
    setupAccordion();

    $('.persona-tab').on('click', function() {
        const persona = $(this).data('persona');
        renderPersonaAdvisory(persona);
    });

    $('#btnSpeakLLMAdvisory').on('click', function() {
        const persona = PERSONA_ADVISORIES[currentPersona];
        const lang = (typeof HeatShield !== 'undefined' ? HeatShield.currentLanguage : 'en-US');
        if (typeof speakText === 'function') {
            speakText(persona.speechSummary, lang);
        }
    });

    $('#btnRegenerateLLM').on('click', function() {
        const $btn = $(this);
        $btn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Refreshing...');
        $('#llmAdvisoryBody').fadeTo(200, 0.4);

        setTimeout(() => {
            renderPersonaAdvisory(currentPersona);
            $('#llmAdvisoryBody').fadeTo(200, 1.0);
            $btn.prop('disabled', false).html('<i class="fa-solid fa-rotate"></i> Refresh Guide');
            if (typeof playAlertTone === 'function') playAlertTone('chime');
        }, 500);
    });
});
