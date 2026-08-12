// =========================
// Show Error
// =========================

export function showError(elementId, message) {

    document.getElementById(elementId).textContent = message;

}


// =========================
// Clear Errors
// =========================

export function clearErrors() {

    document.getElementById("nameError").textContent = "";

    document.getElementById("phoneError").textContent = "";

    document.getElementById("emailError").textContent = "";

    document.getElementById("companyError").textContent = "";

    document.getElementById("categoryError").textContent = "";

}