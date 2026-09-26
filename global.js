/**
 * AETHERIS - GLOBAL SCRIPTS (js/global.js)
 * Clean, Human-Centered, Professional Light Theme Engine
 */

// Global State
const HeatShield = {
    currentSeverity: localStorage.getItem('aetheris_severity') || 'orange',
    currentLanguage: localStorage.getItem('aetheris_lang') || 'en-US',
    audioFeedbackEnabled: localStorage.getItem('aetheris_audio') !== 'false',
    isSpeaking: false,
    audioCtx: null
};

// ===================================================================
// 1. DYNAMIC SEVERITY ENGINE
// ===================================================================

const SEVERITY_CONFIG = {
    green: {
        label: 'Normal (Green)',
        tempBadge: '< 35°C Feels-Like',
        bannerTitle: 'Normal Weather Conditions (Green):',
        bannerDesc: 'Temperatures are within comfortable ranges. Stay hydrated during routine outdoor activities.',
        color: '#16a34a',
        shimmer: false
    },
    yellow: {
        label: 'Watch (Yellow)',
        tempBadge: '36 - 45°C Feels-Like',
        bannerTitle: 'Heat Watch (Yellow Level):',
        bannerDesc: 'Moderate heat. Children, elderly family members, and outdoor workers should take regular water breaks.',
        color: '#d97706',
        shimmer: false
    },
    orange: {
        label: 'Alert (Orange)',
        tempBadge: '46 - 55°C Feels-Like',
        bannerTitle: 'Severe Heatwave Alert (Orange Level):',
        bannerDesc: 'Real-feel temperatures reach 48.5°C. Stay hydrated and avoid outdoor activity from 11 AM to 4 PM.',
        color: '#ea580c',
        shimmer: true
    },
    red: {
        label: 'Warning (Red)',
        tempBadge: '> 55°C Feels / > 45°C Temp',
        bannerTitle: 'Critical Heatwave Warning (Red Alert):',
        bannerDesc: 'Dangerous extreme heat. High risk of heat illness for all ages. Remain indoors in cool areas.',
        color: '#dc2626',
        shimmer: true
    }
};

function setSeverity(level) {
    if (!SEVERITY_CONFIG[level]) return;

    HeatShield.currentSeverity = level;
    localStorage.setItem('aetheris_severity', level);

    $('body')
        .removeClass('severity-green severity-yellow severity-orange severity-red')
        .addClass(`severity-${level}`);

    const cfg = SEVERITY_CONFIG[level];
    $('#severityPillLabel').text(cfg.label);
    $('#pillTempBadge').text(cfg.tempBadge);
    $('#bannerSeverityTitle').text(cfg.bannerTitle);
    $('#bannerSeverityDesc').text(cfg.bannerDesc);

    $('#severitySimSelect').val(level);

    if (level === 'red' && HeatShield.audioFeedbackEnabled) {
        playAlertTone('warning');
    }
}

// ===================================================================
// 2. CANVAS HEAT SHIMMER OVERLAY (Subtle Light Wave)
// ===================================================================

let shimmerCanvas, shimmerCtx, shimmerAnimationId;
let shimmerWidth, shimmerHeight;
let shimmerStep = 0;

function initHeatShimmer() {
    shimmerCanvas = document.getElementById('heatShimmerCanvas');
    if (!shimmerCanvas) return;

    shimmerCtx = shimmerCanvas.getContext('2d');

    function resize() {
        shimmerWidth = shimmerCanvas.width = window.innerWidth;
        shimmerHeight = shimmerCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    function renderShimmer() {
        if (!shimmerCtx) return;

        shimmerCtx.clearRect(0, 0, shimmerWidth, shimmerHeight);

        if (HeatShield.currentSeverity === 'orange' || HeatShield.currentSeverity === 'red') {
            const waveCount = HeatShield.currentSeverity === 'red' ? 4 : 2;
            const waveColor = HeatShield.currentSeverity === 'red' 
                ? 'rgba(220, 38, 38, 0.04)' 
                : 'rgba(234, 88, 12, 0.03)';

            shimmerStep += 0.025;

            for (let i = 0; i < waveCount; i++) {
                shimmerCtx.beginPath();
                const yBase = (shimmerHeight * 0.22) + (i * 50);
                shimmerCtx.moveTo(0, yBase);

                for (let x = 0; x < shimmerWidth; x += 15) {
                    const y = yBase + Math.sin((x * 0.006) + shimmerStep + (i * 1.5)) * 12;
                    shimmerCtx.lineTo(x, y);
                }

                shimmerCtx.lineTo(shimmerWidth, 0);
                shimmerCtx.lineTo(0, 0);
                shimmerCtx.fillStyle = waveColor;
                shimmerCtx.fill();
            }
        }

        shimmerAnimationId = requestAnimationFrame(renderShimmer);
    }

    renderShimmer();
}

// ===================================================================
// 3. WEB SPEECH API (Voice Accessibility)
// ===================================================================

const MULTILINGUAL_ALERTS = {
    'en-US': {
        banner: "Severe heatwave alert: Temperatures and humidity are high today. Please drink plenty of water and stay in the shade between 11 AM and 4 PM.",
        sos: "Emergency help requested. Your current coordinates have been mapped for medical responders.",
        heatstroke: "Emergency warning: Possible heat stroke symptoms observed. Seek emergency medical care immediately."
    },
    'hi-IN': {
        banner: "मौसम चेतावनी: आज तेज गर्मी और लू का प्रकोप है। कृपया धूप में जाने से बचें, खूब पानी पिएं और ओआरएस का सेवन करें।",
        sos: "आपातकालीन सहायता अनुरोध दर्ज हो गया है। आपका स्थान साझा किया जा रहा है।",
        heatstroke: "चेतावनी: हीट स्ट्रोक के गंभीर लक्षण पाए गए हैं। तुरंत 108 नंबर पर एम्बुलेंस बुलाएं।"
    },
    'mr-IN': {
        banner: "हवामान इशारा: आज उष्णतेची तीव्र लाट आहे. दुपारी उन्हात फिरणे टाळा आणि भरपूर पाणी प्या.",
        sos: "तातडीची मदत विनंती नोंदवली गेली आहे. तुमचे लोकेशन पाठवले जात आहे.",
        heatstroke: "धोकादायक इशारा: उष्माघाताचे लक्षण आढळले आहे. तात्काळ १०८ नंबरवर रुग्णवाहिकेसाठी कॉल करा."
    }
};

function speakText(text, lang) {
    if (!('speechSynthesis' in window)) {
        alert("Voice reading is not supported on this browser.");
        return;
    }

    window.speechSynthesis.cancel();
    const selectedLang = lang || HeatShield.currentLanguage;

    let spokenText = text;
    if (MULTILINGUAL_ALERTS[selectedLang] && MULTILINGUAL_ALERTS[selectedLang][text]) {
        spokenText = MULTILINGUAL_ALERTS[selectedLang][text];
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = selectedLang;
    utterance.rate = selectedLang === 'en-US' ? 0.95 : 0.88;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(selectedLang.split('-')[0]));
    if (matchedVoice) {
        utterance.voice = matchedVoice;
    }

    utterance.onstart = function() {
        HeatShield.isSpeaking = true;
        $('#btnStopSpeech').removeClass('hidden');
        $('#btnListenBanner, #btnSpeakLLMAdvisory').addClass('speaking-pulse');
    };

    utterance.onend = utterance.onerror = function() {
        HeatShield.isSpeaking = false;
        $('#btnStopSpeech').addClass('hidden');
        $('#btnListenBanner, #btnSpeakLLMAdvisory').removeClass('speaking-pulse');
    };

    window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        HeatShield.isSpeaking = false;
        $('#btnStopSpeech').addClass('hidden');
    }
}

// ===================================================================
// 4. WEB AUDIO FEEDBACK (Chimes & Soft Siren)
// ===================================================================

function initAudioContext() {
    if (!HeatShield.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        HeatShield.audioCtx = new AudioContext();
    }
    if (HeatShield.audioCtx.state === 'suspended') {
        HeatShield.audioCtx.resume();
    }
}

function playAlertTone(type) {
    if (!HeatShield.audioFeedbackEnabled) return;
    initAudioContext();
    const ctx = HeatShield.audioCtx;

    if (type === 'chime') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    } 
    else if (type === 'warning') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    } 
    else if (type === 'siren') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.25, ctx.currentTime);

        let freq = 650;
        let direction = 1;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const sirenInterval = setInterval(() => {
            freq += direction * 30;
            if (freq > 850) direction = -1;
            if (freq < 620) direction = 1;
            if (osc.frequency) {
                osc.frequency.setValueAtTime(freq, ctx.currentTime);
            }
        }, 50);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setTimeout(() => {
            clearInterval(sirenInterval);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
            setTimeout(() => osc.stop(), 250);
        }, 3500);
    }
}

// ===================================================================
// 5. INITIALIZATION
// ===================================================================

$(document).ready(function() {
    setSeverity(HeatShield.currentSeverity);
    $('#severitySimSelect').val(HeatShield.currentSeverity);
    $('#appLangSelect').val(HeatShield.currentLanguage);

    initHeatShimmer();

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-link').each(function() {
        const href = $(this).attr('href');
        if (href && (href.endsWith(currentPath) || (currentPath === '' && href.endsWith('index.html')))) {
            $(this).addClass('active');
        }
    });

    $('#severitySimSelect').on('change', function() {
        setSeverity($(this).val());
    });

    $('#appLangSelect').on('change', function() {
        HeatShield.currentLanguage = $(this).val();
        localStorage.setItem('aetheris_lang', HeatShield.currentLanguage);
        playAlertTone('chime');
    });

    $('#btnToggleAudioFeedback').on('click', function() {
        HeatShield.audioFeedbackEnabled = !HeatShield.audioFeedbackEnabled;
        localStorage.setItem('aetheris_audio', HeatShield.audioFeedbackEnabled);
        $(this).toggleClass('active', HeatShield.audioFeedbackEnabled);
        if (HeatShield.audioFeedbackEnabled) {
            playAlertTone('chime');
        }
    });

    $('#btnListenBanner').on('click', function() {
        speakText('banner');
    });

    $('#btnStopSpeech').on('click', function() {
        stopSpeech();
    });
});