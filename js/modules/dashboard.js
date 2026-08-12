// Render Dashboard

import { contacts } from "../data/storage.js";

export function renderDashboard() {

    // Total Contacts
    const totalContacts = contacts.length;


    // Total Leads
    const totalLeads = contacts.filter(function (contact) {

        return contact.category === "Lead";

    }).length;


    // Total Clients
    const totalClients = contacts.filter(function (contact) {

        return contact.category === "Customer";

    }).length;


    // Contacts Added This Week
    const now = new Date();

    const oneWeekAgo = new Date();

    oneWeekAgo.setDate(
        now.getDate() - 7
    );


    const contactsThisWeek = contacts.filter(function (contact) {

        const createdDate = new Date(
            contact.createdAt
        );

        return createdDate >= oneWeekAgo;

    }).length;


    // =========================
    // Update Dashboard Cards
    // =========================

    document.getElementById(
        "totalContacts"
    ).textContent = totalContacts;


    document.getElementById(
        "totalLeads"
    ).textContent = totalLeads;


    document.getElementById(
        "totalClients"
    ).textContent = totalClients;


    document.getElementById(
        "contactsThisWeek"
    ).textContent = contactsThisWeek;


    // =========================
    // Category Counts
    // =========================

    const leadCount = contacts.filter(function (contact) {

        return contact.category === "Lead";

    }).length;


    const customerCount = contacts.filter(function (contact) {

        return contact.category === "Customer";

    }).length;


    const prospectCount = contacts.filter(function (contact) {

        return contact.category === "Prospect";

    }).length;


    // Display numbers

    document.getElementById(
        "leadCount"
    ).textContent = leadCount;


    document.getElementById(
        "customerCount"
    ).textContent = customerCount;


    document.getElementById(
        "prospectCount"
    ).textContent = prospectCount;


    // =========================
    // Chart Bars
    // =========================

    const maxCount = Math.max(
        leadCount,
        customerCount,
        prospectCount,
        1
    );


    document.getElementById(
        "leadBar"
    ).style.width =
        (leadCount / maxCount * 100) + "%";


    document.getElementById(
        "customerBar"
    ).style.width =
        (customerCount / maxCount * 100) + "%";


    document.getElementById(
        "prospectBar"
    ).style.width =
        (prospectCount / maxCount * 100) + "%";


    // =========================
    // Recent Activity
    // =========================

    renderRecentActivity();

}

// Recent Activity

export function renderRecentActivity() {

    const recentActivity =
        document.getElementById("recentActivity");


    recentActivity.innerHTML = "";


    // No contacts

    if (contacts.length === 0) {

        recentActivity.innerHTML = `
            <p>
                No recent activity.
            </p>
        `;

        return;

    }


    // Get latest 5 contacts

    const recentContacts = [...contacts]
        .sort(function (a, b) {

            return new Date(b.createdAt) -
                   new Date(a.createdAt);

        })
        .slice(0, 5);


    // Display recent contacts

    recentContacts.forEach(function (contact) {

        const activityItem =
            document.createElement("div");


        activityItem.classList.add(
            "activity-item"
        );


        const date =
            new Date(contact.createdAt);


        activityItem.innerHTML = `

            <div>

                <strong>
                    ${contact.name}
                </strong>

                <p>
                    Added as ${contact.category}
                </p>

            </div>

            <span>
                ${date.toLocaleDateString()}
            </span>

        `;


        recentActivity.appendChild(
            activityItem
        );

    });

}