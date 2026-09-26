/**
 * AETHERIS - PHASE I & II SCRIPTS (js/phase1-2.js)
 * Clean, Human-Centered, Professional Light Theme
 */

// Historical Weather Observations Dataset (2020-2026)
const IMD_DATASET = [
    { station: "Chandrapur (Vidarbha)", date: "2026-05-18", maxTemp: 46.8, normBase: 40.0, departure: 6.8, humidity: 32, heatIndex: 52.4, status: "Severe Heatwave" },
    { station: "Churu (West Rajasthan)", date: "2026-05-18", maxTemp: 45.4, normBase: 40.2, departure: 5.2, humidity: 28, heatIndex: 49.8, status: "Heatwave" },
    { station: "Nagpur (Maharashtra)", date: "2026-05-17", maxTemp: 45.1, normBase: 40.5, departure: 4.6, humidity: 36, heatIndex: 51.2, status: "Heatwave" },
    { station: "Vijayawada (Andhra Pradesh)", date: "2026-05-17", maxTemp: 42.4, normBase: 37.0, departure: 5.4, humidity: 58, heatIndex: 54.8, status: "Severe Heatwave" },
    { station: "New Delhi (Safdarjung)", date: "2026-05-16", maxTemp: 43.2, normBase: 39.8, departure: 3.4, humidity: 44, heatIndex: 48.6, status: "Normal" },
    { station: "Ramagundam (Telangana)", date: "2026-05-16", maxTemp: 45.6, normBase: 40.4, departure: 5.2, humidity: 38, heatIndex: 53.0, status: "Heatwave" },
    { station: "Ahmedabad (Gujarat)", date: "2025-05-22", maxTemp: 44.0, normBase: 40.1, departure: 3.9, humidity: 40, heatIndex: 49.1, status: "Normal" },
    { station: "Banda (Bundelkhand, UP)", date: "2025-05-21", maxTemp: 47.2, normBase: 40.6, departure: 6.6, humidity: 30, heatIndex: 53.7, status: "Severe Heatwave" },
    { station: "Bikaner (Rajasthan)", date: "2024-05-29", maxTemp: 46.2, normBase: 41.0, departure: 5.2, humidity: 26, heatIndex: 49.5, status: "Heatwave" },
    { station: "Gannavaram (Andhra Pradesh)", date: "2024-05-28", maxTemp: 43.0, normBase: 37.5, departure: 5.5, humidity: 62, heatIndex: 56.4, status: "Severe Heatwave" }
];

// 7-Day Regional Temperature Forecasts
const REGIONAL_FORECASTS = {
    vidarbha: {
        labels: ['Day 1 (Today)', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        baseline: [40.5, 40.5, 40.5, 40.5, 40.5, 40.5, 40.5],
        predictedMax: [45.2, 45.8, 46.4, 46.8, 45.5, 44.2, 43.6],
        heatIndex: [51.5, 52.8, 54.0, 54.6, 52.0, 49.5, 48.2]
    },
    rajasthan: {
        labels: ['Day 1 (Today)', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        baseline: [40.8, 40.8, 40.8, 40.8, 40.8, 40.8, 40.8],
        predictedMax: [44.8, 45.5, 46.0, 45.8, 45.0, 44.5, 43.8],
        heatIndex: [49.2, 50.4, 51.2, 50.8, 49.5, 48.6, 47.5]
    },
    delhi: {
        labels: ['Day 1 (Today)', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        baseline: [39.5, 39.5, 39.5, 39.5, 39.5, 39.5, 39.5],
        predictedMax: [42.5, 43.2, 44.0, 44.4, 43.8, 42.6, 41.8],
        heatIndex: [47.5, 48.6, 50.2, 51.0, 49.8, 47.4, 45.8]
    },
    andhra: {
        labels: ['Day 1 (Today)', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        baseline: [37.0, 37.0, 37.0, 37.0, 37.0, 37.0, 37.0],
        predictedMax: [41.8, 42.5, 43.0, 43.4, 42.8, 42.0, 41.2],
        heatIndex: [53.2, 54.8, 56.1, 56.8, 55.2, 53.6, 51.5]
    }
};

let forecastChartInstance = null;

// ===================================================================
// 1. DATA TABLE & EXPORT
// ===================================================================

function renderIMDTable() {
    const $tbody = $('#imdTableBody');
    if (!$tbody.length) return;

    const searchTerm = $('#imdSearchInput').val().toLowerCase().trim();
    const yearFilter = $('#imdYearFilter').val();
    const severityFilter = $('#imdSeverityFilter').val();

    $tbody.empty();

    const filtered = IMD_DATASET.filter(row => {
        const matchSearch = row.station.toLowerCase().includes(searchTerm);
        const matchYear = yearFilter === 'all' || row.date.startsWith(yearFilter);
        const matchSev = severityFilter === 'all' || row.status === severityFilter;
        return matchSearch && matchYear && matchSev;
    });

    if (filtered.length === 0) {
        $tbody.append('<tr><td colspan="8" style="text-align:center; padding: 20px; color: var(--text-muted);">No records found matching filters.</td></tr>');
        return;
    }

    filtered.forEach(row => {
        const depClass = row.departure >= 4.5 ? 'departure-pos' : 'departure-norm';
        let statusBadge = '<span class="badge badge-success">Normal</span>';
        if (row.status === 'Severe Heatwave') {
            statusBadge = '<span class="badge badge-danger">Severe Heatwave</span>';
        } else if (row.status === 'Heatwave') {
            statusBadge = '<span class="badge badge-warning">Heatwave</span>';
        }

        const tr = `
            <tr>
                <td><strong>${row.station}</strong></td>
                <td>${row.date}</td>
                <td>${row.maxTemp.toFixed(1)} °C</td>
                <td>${row.normBase.toFixed(1)} °C</td>
                <td class="${depClass}">+${row.departure.toFixed(1)} °C</td>
                <td>${row.humidity}%</td>
                <td><strong>${row.heatIndex.toFixed(1)} °C</strong></td>
                <td>${statusBadge}</td>
            </tr>
        `;
        $tbody.append(tr);
    });
}

function exportIMDToCSV() {
    let csv = "Station,Date,MaxTemp_C,NormalBase_C,Departure_C,RelHumidity_Pct,FeelsLike_C,Status\n";
    IMD_DATASET.forEach(r => {
        csv += `"${r.station}",${r.date},${r.maxTemp},${r.normBase},${r.departure},${r.humidity},${r.heatIndex},"${r.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Aetheris_Weather_Records_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (typeof playAlertTone === 'function') playAlertTone('chime');
}

// ===================================================================
// 2. DATA QUALITY CHECK SIMULATOR
// ===================================================================

function runDataPipeline() {
    const $btn = $('#btnRunPipeline');
    $btn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Checking data...');

    $('#pipeCleanStatus').html('<span class="text-warning">Scanning records for errors...</span>');
    $('#pipeNormStatus').html('<span class="text-muted">Awaiting check...</span>');
    $('#pipeQCStatus').html('<span class="text-muted">Awaiting check...</span>');

    setTimeout(() => {
        $('#pipeCleanStatus').html('<span class="text-success"><i class="fa-solid fa-check"></i> Outliers & gaps cleaned</span>');
        $('#pipeNormStatus').html('<span class="text-warning">Comparing with standard averages...</span>');

        setTimeout(() => {
            $('#pipeNormStatus').html('<span class="text-success"><i class="fa-solid fa-check"></i> Standardized to 30-year base</span>');
            $('#pipeQCStatus').html('<span class="text-warning">Comparing with neighboring stations...</span>');

            setTimeout(() => {
                $('#pipeQCStatus').html('<span class="text-success"><i class="fa-solid fa-check"></i> Cross-check passed (99.4%)</span>');
                $btn.prop('disabled', false).html('<i class="fa-solid fa-rotate"></i> Re-Check Data Quality');
                if (typeof playAlertTone === 'function') playAlertTone('chime');
            }, 600);
        }, 600);
    }, 600);
}

// ===================================================================
// 3. HEATWAVE CRITERIA CHECKER
// ===================================================================

function evaluateIMDCriteria() {
    const terrain = $('#chkTerrain').val();
    const normal = parseFloat($('#chkNormalTemp').val()) || 40.0;
    const actual = parseFloat($('#chkObservedTemp').val()) || 40.0;

    const departure = actual - normal;
    let isSevere = false;
    let isHeatwave = false;
    let desc = "";
    let badgeHtml = "";

    if (terrain === 'coastal') {
        if (actual >= 37.0 && departure >= 4.5) {
            isHeatwave = true;
            if (departure > 6.4) isSevere = true;
            desc = `Coastal condition: Temperature is ≥37°C (${actual.toFixed(1)}°C) and +${departure.toFixed(1)}°C above normal.`;
        } else {
            desc = `Normal coastal condition: ${actual.toFixed(1)}°C (Departure: +${departure.toFixed(1)}°C).`;
        }
    } else if (terrain === 'hills') {
        if (actual >= 30.0 && departure >= 4.5) {
            isHeatwave = true;
            if (departure > 6.4) isSevere = true;
            desc = `Hilly region: Temperature is ≥30°C (${actual.toFixed(1)}°C) and +${departure.toFixed(1)}°C above normal.`;
        } else {
            desc = `Normal hill condition: ${actual.toFixed(1)}°C (Departure: +${departure.toFixed(1)}°C).`;
        }
    } else {
        if (actual >= 47.0 || departure > 6.4) {
            isSevere = true;
            desc = `Severe Heatwave: Actual temperature is ≥47°C (${actual.toFixed(1)}°C) or departure >+6.4°C (+${departure.toFixed(1)}°C).`;
        } else if (actual >= 45.0 || departure >= 4.5) {
            isHeatwave = true;
            desc = `Heatwave: Actual temperature is ≥45°C (${actual.toFixed(1)}°C) or departure is +${departure.toFixed(1)}°C above normal.`;
        } else {
            desc = `Normal range: Temperature is ${actual.toFixed(1)}°C (Departure: ${departure >= 0 ? '+' : ''}${departure.toFixed(1)}°C from normal ${normal}°C).`;
        }
    }

    if (isSevere) {
        $('#chkResultTitle').text("Severe Heatwave Condition").css('color', '#dc2626');
        badgeHtml = '<span class="badge badge-danger">Warning: Red Alert Issued</span>';
    } else if (isHeatwave) {
        $('#chkResultTitle').text("Heatwave Condition").css('color', '#ea580c');
        badgeHtml = '<span class="badge badge-warning">Alert: Orange Level</span>';
    } else {
        $('#chkResultTitle').text("Normal Temperature Range").css('color', '#16a34a');
        badgeHtml = '<span class="badge badge-success">Normal: Green Level</span>';
    }

    $('#chkResultDesc').html(desc);
    $('#chkActionBadge').replaceWith(badgeHtml);
}

// ===================================================================
// 4. HEAT & HUMIDITY RISK CALCULATOR
// ===================================================================

function calculateHeatIndexAndWBGT() {
    const T = parseFloat($('#sliderCalcTemp').val());
    const RH = parseFloat($('#sliderCalcHumidity').val());
    const Wind = parseFloat($('#sliderCalcWind').val());
    const Solar = parseFloat($('#sliderCalcSolar').val());

    $('#valCalcTemp').text(`${T.toFixed(1)} °C`);
    $('#valCalcHumidity').text(`${RH} %`);
    $('#valCalcWind').text(`${Wind} km/h`);
    $('#valCalcSolar').text(`${Solar} W/m²`);

    const T_F = (T * 9/5) + 32;
    let HI_F = 0.5 * (T_F + 61.0 + ((T_F - 68.0) * 1.2) + (RH * 0.094));

    if (HI_F >= 80) {
        HI_F = -42.379 + 2.04901523*T_F + 10.14333127*RH - 0.22475541*T_F*RH - 0.00683783*T_F*T_F 
             - 0.05481717*RH*RH + 0.00122874*T_F*T_F*RH + 0.00085282*T_F*RH*RH - 0.00000199*T_F*T_F*RH*RH;
    }
    const HI_C = (HI_F - 32) * 5/9;

    const Tw = T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) + Math.atan(T + RH) 
             - Math.atan(RH - 1.676331) + 0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) - 4.686035;

    const solarFactor = (Solar / 1000) * 4.5;
    const windCooling = Math.sqrt(Math.max(1, Wind)) * 0.45;
    const Tg = T + solarFactor - windCooling;

    const WBGT = (0.7 * Tw) + (0.2 * Tg) + (0.1 * T);

    $('#outHeatIndex').text(`${HI_C.toFixed(1)} °C`);
    $('#outWBGT').text(`${WBGT.toFixed(1)} °C`);

    let riskHtml = '';
    if (WBGT >= 32.2 || HI_C >= 54) {
        riskHtml = '<span class="badge badge-danger">High Danger</span>';
    } else if (WBGT >= 30.0 || HI_C >= 46) {
        riskHtml = '<span class="badge badge-danger">Danger</span>';
    } else if (WBGT >= 27.8 || HI_C >= 38) {
        riskHtml = '<span class="badge badge-warning">Caution</span>';
    } else {
        riskHtml = '<span class="badge badge-success">Safe</span>';
    }
    $('#outRiskLevel').replaceWith(riskHtml);
}

// ===================================================================
// 5. CHART.JS 7-DAY REGIONAL FORECAST (Clean Light Styling)
// ===================================================================

function initForecastChart(regionKey) {
    const canvas = document.getElementById('overviewForecastChart');
    if (!canvas) return;

    const data = REGIONAL_FORECASTS[regionKey || 'vidarbha'];
    const ctx = canvas.getContext('2d');

    if (forecastChartInstance) {
        forecastChartInstance.destroy();
    }

    forecastChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Real-Feel (Feels Like °C)',
                    data: data.heatIndex,
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.05)',
                    fill: true,
                    tension: 0.35,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#dc2626',
                    pointBorderWidth: 2
                },
                {
                    label: 'Expected Max Temp (°C)',
                    data: data.predictedMax,
                    borderColor: '#ea580c',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 4],
                    tension: 0.35,
                    pointRadius: 4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#ea580c',
                    pointBorderWidth: 2
                },
                {
                    label: 'Normal Average (°C)',
                    data: data.baseline,
                    borderColor: '#94a3b8',
                    borderWidth: 1.5,
                    borderDash: [3, 3],
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#475569', font: { family: 'Plus Jakarta Sans', size: 12 } }
                },
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    padding: 10,
                    cornerRadius: 6
                }
            },
            scales: {
                x: {
                    ticks: { color: '#64748b' },
                    grid: { color: '#f1f5f9' }
                },
                y: {
                    ticks: { color: '#64748b' },
                    grid: { color: '#f1f5f9' },
                    suggestedMin: 35,
                    suggestedMax: 56
                }
            }
        }
    });
}

// ===================================================================
// INITIALIZATION
// ===================================================================

$(document).ready(function() {
    renderIMDTable();
    initForecastChart('vidarbha');
    calculateHeatIndexAndWBGT();
    evaluateIMDCriteria();

    $('#imdSearchInput').on('keyup', renderIMDTable);
    $('#imdYearFilter, #imdSeverityFilter').on('change', renderIMDTable);
    $('#btnExportIMDData').on('click', exportIMDToCSV);

    $('#btnRunPipeline').on('click', runDataPipeline);

    $('#chkTerrain, #chkNormalTemp, #chkObservedTemp').on('input change', evaluateIMDCriteria);

    $('#sliderCalcTemp, #sliderCalcHumidity, #sliderCalcWind, #sliderCalcSolar').on('input', calculateHeatIndexAndWBGT);

    $('#overviewRegionSelect').on('change', function() {
        initForecastChart($(this).val());
    });

    $('#btnTTSWBGT').on('click', function() {
        const hi = $('#outHeatIndex').text();
        const wbgt = $('#outWBGT').text();
        const msg = `Feels like temperature is ${hi}, and heat stress is ${wbgt}. High heat risk. Please drink plenty of water.`;
        if (typeof speakText === 'function') speakText(msg);
    });

    $('#btnTTSOverviewChart').on('click', function() {
        const region = $('#overviewRegionSelect option:selected').text();
        const msg = `7-day weather forecast for ${region}: Temperatures will reach near 46 degrees with real feel above 50 degrees. Take care and stay cool.`;
        if (typeof speakText === 'function') speakText(msg);
    });
});