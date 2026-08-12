// =========================
// Get Pages
// =========================
import { renderDashboard } from "../modules/dashboard.js";
import { renderContacts } from "../modules/contacts.js";
import { renderPipeline } from "../modules/pipeline.js";
import { renderSearch } from "../modules/search.js";
import { renderNotes } from "../modules/notes.js";

const dashboardPage = document.getElementById("dashboardPage");
const contactsPage = document.getElementById("contactsPage");
const pipelinePage = document.getElementById("pipelinePage");
const notesPage = document.getElementById("notesPage");
const settingsPage = document.getElementById("settingsPage");
const searchPage = document.getElementById("searchPage");

// =========================
// Get Navigation Buttons
// =========================

const dashboardBtn = document.getElementById("dashboardBtn");
const contactsBtn = document.getElementById("contactsBtn");
const pipelineBtn = document.getElementById("pipelineBtn");
const notesBtn = document.getElementById("notesBtn");
const settingsBtn = document.getElementById("settingsBtn");
const searchBtn = document.getElementById("searchBtn");

// =========================
// Show Page Function
// =========================

export function showPage(page) {

    dashboardPage.classList.add("page-hidden");
    contactsPage.classList.add("page-hidden");
    pipelinePage.classList.add("page-hidden");
    notesPage.classList.add("page-hidden");
    settingsPage.classList.add("page-hidden");
    searchPage.classList.add("page-hidden");

    page.classList.remove("page-hidden");
}


// =========================
// Dashboard Button
// =========================

dashboardBtn.addEventListener("click", function () {

    showPage(dashboardPage);

    renderDashboard();

});


// =========================
// Contacts Button
// =========================

contactsBtn.addEventListener("click", function () {

    showPage(contactsPage);

    renderContacts();

});


// =========================
// Pipeline Button
// =========================

pipelineBtn.addEventListener("click", function () {

    showPage(pipelinePage);

    renderPipeline();

});


// =========================
// Notes / Activity Log Button
// =========================

notesBtn.addEventListener("click", function () {

    showPage(notesPage);

    renderNotes();

});


// =========================
// Settings Button
// =========================

settingsBtn.addEventListener("click", function () {

    showPage(settingsPage);

});


// =========================
// Search & Filters Button
// =========================

searchBtn.addEventListener("click", function () {

    showPage(searchPage);

    renderSearch();

});

export {
    dashboardPage,
    contactsPage,
    pipelinePage,
    notesPage,
    settingsPage,
    searchPage
};