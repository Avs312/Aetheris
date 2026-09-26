/**
 * AETHERIS - COMMUNITY & DIRECTORY SCRIPTS (js/community.js)
 * Clean, Human-Centered, Professional Light Theme
 */

const DIRECTORY_TEAMS = [
    {
        name: "National Emergency Ambulance Dispatch",
        role: "Emergency Paramedic Ambulance",
        category: "Ambulance",
        phone: "108",
        address: "Toll-Free 24/7 All-India Ambulance",
        status: "24/7 Available"
    },
    {
        name: "National Emergency Number",
        role: "Police, Fire & Medical Emergency",
        category: "Emergency Helpline",
        phone: "112",
        address: "Toll-Free Nationwide Response",
        status: "24/7 Available"
    },
    {
        name: "District Heat Relief Control Room",
        role: "District Disaster Management Cell",
        category: "City Helpdesk",
        phone: "1077",
        address: "District Magistrate Disaster Operations Center",
        status: "24/7 Available"
    },
    {
        name: "Jodhpur Public Air-Cooled Shelter",
        role: "Free AC Hall & Cold Drinking Water Kiosk",
        category: "Cooling Centers",
        phone: "0291-2651122",
        address: "Near Central Bus Station, Jodhpur, Rajasthan",
        status: "Open 09:00 - 18:00"
    },
    {
        name: "Nagpur Government Medical Hospital (GMCH)",
        role: "Dedicated Heatstroke Care Ward",
        category: "Hospitals",
        phone: "0712-2744671",
        address: "Medical Square, Nagpur, Maharashtra",
        status: "24/7 Trauma Emergency"
    },
    {
        name: "Municipal Drinking Water Helpline",
        role: "Emergency Water Tanker Dispatch",
        category: "Water Supply",
        phone: "1916",
        address: "City Water Works Department",
        status: "08:00 - 20:00"
    }
];

const INITIAL_BULLETIN_POSTS = [
    {
        author: "Suresh Patil (Resident)",
        category: "Water Tanker Needed",
        location: "Ward 12, Near Bus Stand",
        time: "15 mins ago",
        desc: "Over 50 outdoor vendors and rickshaw drivers here with no access to drinking water.",
        upvotes: 8,
        status: "Action Dispatched",
        statusBadge: "badge-success"
    },
    {
        author: "Meera Sen (Community Nurse)",
        category: "Heat Illness Observed",
        location: "Primary Health Center, Sector 4",
        time: "40 mins ago",
        desc: "Treated two elderly citizens experiencing heat exhaustion. ORS packets distributed.",
        upvotes: 12,
        status: "Resolved",
        statusBadge: "badge-info"
    },
    {
        author: "Anil R. (Shop Owner)",
        category: "Power Outage",
        location: "Main Market, Sector 7",
        time: "1 hour ago",
        desc: "Power cut due to high local power load. Fans and water coolers are currently off.",
        upvotes: 15,
        status: "Under Review",
        statusBadge: "badge-warning"
    }
];

// ===================================================================
// 1. DIRECTORY
// ===================================================================

function renderDirectory() {
    const $list = $('#directoryList');
    if (!$list.length) return;

    const query = $('#dirSearchInput').val().toLowerCase().trim();
    $list.empty();

    const filtered = DIRECTORY_TEAMS.filter(t => {
        return t.name.toLowerCase().includes(query) ||
               t.role.toLowerCase().includes(query) ||
               t.category.toLowerCase().includes(query) ||
               t.address.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
        $list.html('<p style="text-align: center; color: var(--text-muted); padding: 16px;">No matching emergency teams or cooling centers found.</p>');
        return;
    }

    filtered.forEach(team => {
        const cardHtml = `
            <div class="dir-card">
                <div class="dir-info">
                    <h5>${team.name}</h5>
                    <p><strong>${team.role}</strong> &bull; <span class="badge badge-primary">${team.category}</span></p>
                    <p style="color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${team.address}</p>
                </div>
                <div class="dir-actions">
                    <a href="tel:${team.phone}" class="btn btn-sm btn-primary" title="Call">
                        <i class="fa-solid fa-phone"></i> ${team.phone}
                    </a>
                </div>
            </div>
        `;
        $list.append(cardHtml);
    });
}

// ===================================================================
// 2. COMMUNITY BULLETIN
// ===================================================================

function renderBulletinFeed() {
    const $feed = $('#bulletinFeed');
    if (!$feed.length) return;

    $feed.empty();
    INITIAL_BULLETIN_POSTS.forEach((post, index) => {
        appendBulletinPost(post, index);
    });
}

function appendBulletinPost(post, index) {
    const cardHtml = `
        <div class="bulletin-card" id="post-${index}">
            <div class="bulletin-header">
                <div>
                    <span class="bulletin-author"><i class="fa-solid fa-circle-user"></i> ${post.author}</span>
                    <span class="badge badge-secondary" style="margin-left: 6px;">${post.category}</span>
                </div>
                <span class="bulletin-time">${post.time}</span>
            </div>
            <div style="font-size: 12px; color: var(--theme-primary); font-weight: 600;">
                <i class="fa-solid fa-map-pin"></i> ${post.location}
            </div>
            <p class="bulletin-desc">${post.desc}</p>
            <div class="bulletin-footer">
                <span class="badge ${post.statusBadge}">&bull; ${post.status}</span>
                <button class="btn-upvote" onclick="upvotePost(${index})">
                    <i class="fa-solid fa-thumbs-up"></i> Helpful (<span id="upvote-count-${index}">${post.upvotes}</span>)
                </button>
            </div>
        </div>
    `;
    $('#bulletinFeed').append(cardHtml);
}

function upvotePost(index) {
    const $count = $(`#upvote-count-${index}`);
    let val = parseInt($count.text()) || 0;
    $count.text(val + 1);
    if (typeof playAlertTone === 'function') playAlertTone('chime');
}

function submitCommunityReport(e) {
    e.preventDefault();

    const name = $('#rptName').val().trim();
    const category = $('#rptCategory').val();
    const location = $('#rptLocation').val().trim();
    const details = $('#rptDetails').val().trim();

    const newPost = {
        author: name || "Local Resident",
        category: category,
        location: location,
        time: "Just now",
        desc: details,
        upvotes: 1,
        status: "Action Dispatched",
        statusBadge: "badge-success"
    };

    const newIdx = Date.now();
    const cardHtml = `
        <div class="bulletin-card" id="post-${newIdx}" style="border-left-color: #16a34a;">
            <div class="bulletin-header">
                <div>
                    <span class="bulletin-author"><i class="fa-solid fa-circle-user"></i> ${newPost.author}</span>
                    <span class="badge badge-success" style="margin-left: 6px;">${newPost.category}</span>
                </div>
                <span class="bulletin-time">Just now</span>
            </div>
            <div style="font-size: 12px; color: #16a34a; font-weight: 600;">
                <i class="fa-solid fa-map-pin"></i> ${newPost.location}
            </div>
            <p class="bulletin-desc">${newPost.desc}</p>
            <div class="bulletin-footer">
                <span class="badge badge-success">&bull; Action Dispatched</span>
                <button class="btn-upvote" onclick="upvotePost('${newIdx}')">
                    <i class="fa-solid fa-thumbs-up"></i> Helpful (<span id="upvote-count-${newIdx}">1</span>)
                </button>
            </div>
        </div>
    `;

    $('#bulletinFeed').prepend(cardHtml);
    $('#communityReportForm')[0].reset();

    if (typeof playAlertTone === 'function') playAlertTone('chime');
    alert("Thank you. Your report has been submitted to the community board and local relief team.");
}

// ===================================================================
// INITIALIZATION
// ===================================================================

$(document).ready(function() {
    renderDirectory();
    renderBulletinFeed();

    $('#dirSearchInput').on('keyup', renderDirectory);
    $('#communityReportForm').on('submit', submitCommunityReport);
});
