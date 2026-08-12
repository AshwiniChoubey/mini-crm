// =========================
// Initial Page
// =========================

// Dashboard should appear first
import { initTheme } from "./modules/settings.js";

import {
    showPage,
    dashboardPage
} from "./ui/navigation.js";

import {
    renderDashboard
} from "./modules/dashboard.js";

import {
    renderPipeline
} from "./modules/pipeline.js";

import {
    renderNotes
} from "./modules/notes.js";

// IMPORT CONTACTS MODULE TO BIND FORM SUBMIT LISTENER
import { editContact, deleteContact } from "./modules/contacts.js";

// Expose edit and delete handlers to window for inline onclicks
window.editContact = editContact;
window.deleteContact = deleteContact;

showPage(dashboardPage);

renderDashboard();

renderPipeline();

renderNotes();

initTheme();