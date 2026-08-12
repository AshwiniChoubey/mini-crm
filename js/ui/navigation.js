// =========================
// Get Pages
// =========================
import { renderDashboard } from "../modules/dashboard.js";
import { renderContacts } from "../modules/contacts.js";

const dashboardPage = document.getElementById("dashboardPage");
const contactsPage = document.getElementById("contactsPage");
const pipelinePage = document.getElementById("pipelinePage");
const settingsPage = document.getElementById("settingsPage");


// =========================
// Get Navigation Buttons
// =========================

const dashboardBtn = document.getElementById("dashboardBtn");
const contactsBtn = document.getElementById("contactsBtn");
const pipelineBtn = document.getElementById("pipelineBtn");
const settingsBtn = document.getElementById("settingsBtn");


// =========================
// Show Page Function
// =========================

export function showPage(page) {

    dashboardPage.classList.add("page-hidden");
    contactsPage.classList.add("page-hidden");
    pipelinePage.classList.add("page-hidden");
    settingsPage.classList.add("page-hidden");

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

});


// =========================
// Settings Button
// =========================

settingsBtn.addEventListener("click", function () {

    showPage(settingsPage);

});

export {
    dashboardPage,
    contactsPage,
    pipelinePage,
    settingsPage
};