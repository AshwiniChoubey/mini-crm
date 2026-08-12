// =========================
// Search & Filters Module
// =========================

import { contacts } from "../data/storage.js";

export function renderSearch() {

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const stageFilter = document.getElementById("stageFilter");
    const sortContacts = document.getElementById("sortContacts");
    const results = document.getElementById("filteredContactsList");

    if (
        !searchInput ||
        !categoryFilter ||
        !stageFilter ||
        !sortContacts ||
        !results
    ) {
        return;
    }

    function displayContacts() {

        let filtered = [...contacts];

        // =========================
        // Search by Name or Company
        // =========================

        const keyword = searchInput.value.trim().toLowerCase();

        if (keyword !== "") {

            filtered = filtered.filter(function (contact) {

                return (
                    contact.name.toLowerCase().includes(keyword) ||
                    contact.company.toLowerCase().includes(keyword)
                );

            });

        }

        // =========================
        // Filter by Category
        // =========================

        if (categoryFilter.value !== "") {

            filtered = filtered.filter(function (contact) {

                return contact.category === categoryFilter.value;

            });

        }

        // =========================
        // Filter by Pipeline Stage
        // =========================

        if (stageFilter.value !== "") {

            filtered = filtered.filter(function (contact) {

                return contact.stage === stageFilter.value;

            });

        }

        // =========================
        // Sort
        // =========================

        if (sortContacts.value === "name") {

            filtered.sort(function (a, b) {

                return a.name.localeCompare(b.name);

            });

        }

        if (sortContacts.value === "date") {

            filtered.sort(function (a, b) {

                return new Date(b.createdAt) - new Date(a.createdAt);

            });

        }

        // =========================
        // Display Results
        // =========================

        results.innerHTML = "";

        if (filtered.length === 0) {

            results.innerHTML = "<p>No matching contacts found.</p>";

            return;
        }

        filtered.forEach(function (contact) {

            const card = document.createElement("div");

            card.classList.add("contact-card");

            card.innerHTML = `
                <h3>${contact.name}</h3>

                <p><strong>Company:</strong> ${contact.company}</p>

                <p><strong>Phone:</strong> ${contact.phone}</p>

                <p><strong>Email:</strong> ${contact.email}</p>

                <p><strong>Category:</strong> ${contact.category}</p>

                <p><strong>Pipeline:</strong> ${contact.stage}</p>
            `;

            results.appendChild(card);

        });

    }

    // Initial display
    displayContacts();

    // Event Listeners
    searchInput.oninput = displayContacts;
    categoryFilter.onchange = displayContacts;
    stageFilter.onchange = displayContacts;
    sortContacts.onchange = displayContacts;

}