import { contacts, saveContacts } from "../data/storage.js";
import { renderContacts } from "./contacts.js";

const stages = [
    "New",
    "Contacted",
    "Negotiation",
    "Won",
    "Lost"
];

export function renderPipeline() {

    const columns = {
        "New": document.getElementById("stage-New"),
        "Contacted": document.getElementById("stage-Contacted"),
        "Negotiation": document.getElementById("stage-Negotiation"),
        "Won": document.getElementById("stage-Won"),
        "Lost": document.getElementById("stage-Lost")
    };

    // Clear all columns
    stages.forEach(stage => {
        columns[stage].innerHTML = "";
    });

    // If no contacts
    if (contacts.length === 0) {

        stages.forEach(stage => {

            columns[stage].innerHTML =
                "<p>No Leads</p>";

        });

        return;
    }

    // Add cards
    contacts.forEach(contact => {

        const card = document.createElement("div");

        card.className = "lead-card";

        card.innerHTML = `
            <h3>${contact.name}</h3>

            <p>${contact.company}</p>

            <p>${contact.email}</p>

            <select class="stage-select">

                ${stages.map(stage => `
                    <option
                        value="${stage}"
                        ${contact.stage === stage ? "selected" : ""}
                    >
                        ${stage}
                    </option>
                `).join("")}

            </select>
        `;

        const select = card.querySelector(".stage-select");

        select.addEventListener("change", function () {

            contact.stage = this.value;

            saveContacts();

            renderPipeline();

            renderContacts();

        });

        columns[contact.stage].appendChild(card);

    });

}