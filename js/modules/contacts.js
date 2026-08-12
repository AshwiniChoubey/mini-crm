// =========================
// Contact Form
// =========================
import { contacts, saveContacts, setContacts } from "../data/storage.js";
import { renderDashboard } from "./dashboard.js";
import { showPage, contactsPage } from "../ui/navigation.js";

import {
    showError,
    clearErrors
} from "../utils/validation.js";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const company = document.getElementById("company").value.trim();
        const category = document.getElementById("category").value;

        // Clear previous errors
        clearErrors();

        let isValid = true;

        // Name Validation
        if (!name) {
            showError("nameError", "Name is required.");
            isValid = false;
        }

        // Phone Validation
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phone) {
            showError("phoneError", "Phone number is required.");
            isValid = false;
        } else if (!phonePattern.test(phone)) {
            showError("phoneError", "Please enter a valid 10-digit Indian phone number.");
            isValid = false;
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError("emailError", "Email is required.");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        // Company Validation
        if (!company) {
            showError("companyError", "Company is required.");
            isValid = false;
        }

        // Stop if Invalid
        if (!isValid) {
            return;
        }

        const editingId = contactForm.dataset.editingId;

        if (editingId) {
            // Update Existing Contact
            const contactIndex = contacts.findIndex(function (contact) {
                return contact.id === Number(editingId);
            });

            if (contactIndex !== -1) {
                contacts[contactIndex].name = name;
                contacts[contactIndex].phone = phone;
                contacts[contactIndex].email = email;
                contacts[contactIndex].company = company;
                contacts[contactIndex].category = category;
            }

            // Remove editing mode
            delete contactForm.dataset.editingId;

        } else {
            // Create New Contact
            const newContact = {
                id: Date.now(),
                name: name,
                phone: phone,
                email: email,
                company: company,
                category: category,
                stage: "New",
                createdAt: new Date().toISOString(),
                notes: []
            };

            contacts.push(newContact);
        }

        // Save contact
        saveContacts();

        // Show contact
        renderContacts();

        // Clear form
        contactForm.reset();

        // Change button back
        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.textContent = "Add Contact";

        // Update Dashboard
        renderDashboard();
    });
}

// =========================
// Render Contacts
// =========================

export function renderContacts() {

    const contactsList = document.getElementById("contactsList");
    if (!contactsList) return;

    contactsList.innerHTML = "";

    // No contacts
    if (contacts.length === 0) {
        contactsList.innerHTML = "<p>No contacts added yet.</p>";
        return;
    }

    // Display contacts
    contacts.forEach(function (contact) {

        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");

        contactCard.innerHTML = `
            <h3>${contact.name}</h3>

            <p>
                <strong>Phone:</strong>
                ${contact.phone}
            </p>

            <p>
                <strong>Email:</strong>
                ${contact.email}
            </p>

            <p>
                <strong>Company:</strong>
                ${contact.company}
            </p>

            <p>
                <strong>Category:</strong>
                ${contact.category}
            </p>

            <p>
                <strong>Stage:</strong>
                ${contact.stage}
            </p>

            <div class="contact-actions">
                <button
                    class="edit-btn"
                    onclick="window.editContact(${contact.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="window.deleteContact(${contact.id})"
                >
                    Delete
                </button>
            </div>
        `;

        contactsList.appendChild(contactCard);
    });
}

// =========================
// Edit Contact
// =========================

export function editContact(contactId) {

    const contact = contacts.find(function (contact) {
        return contact.id === contactId;
    });

    if (!contact) {
        return;
    }

    // Put existing data into form
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;
    document.getElementById("company").value = contact.company;
    document.getElementById("category").value = contact.category;

    // Show Contacts page
    showPage(contactsPage);

    // Change button text
    const submitButton = contactForm.querySelector("button[type='submit']");
    submitButton.textContent = "Update Contact";

    // Store editing ID
    contactForm.dataset.editingId = contactId;
}

// =========================
// Delete Contact
// =========================

export function deleteContact(contactId) {

    const contact = contacts.find(function (contact) {
        return contact.id === contactId;
    });

    if (!contact) {
        return;
    }

    // Confirmation
    const confirmed = confirm(
        `Are you sure you want to delete ${contact.name}?`
    );

    if (!confirmed) {
        return;
    }

    // Delete Contact using setContacts
    const updatedContacts = contacts.filter(function (c) {
        return c.id !== contactId;
    });

    setContacts(updatedContacts);

    // Re-render contacts
    renderContacts();

    // Update dashboard
    renderDashboard();
}