let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


// =========================
// Get Pages
// =========================

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

function showPage(page) {

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


// =========================
// Contact Form
// =========================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get values

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const company =
        document.getElementById("company").value.trim();

    const category =
        document.getElementById("category").value;


    // Clear previous errors

    clearErrors();


    let isValid = true;


    // =========================
    // Name Validation
    // =========================

    if (!name) {

        showError(
            "nameError",
            "Name is required."
        );

        isValid = false;
    }


    // =========================
    // Phone Validation
    // =========================

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phone) {

        showError(
            "phoneError",
            "Phone number is required."
        );

        isValid = false;

    } else if (!phonePattern.test(phone)) {

        showError(
            "phoneError",
            "Please enter a valid 10-digit Indian phone number."
        );

        isValid = false;
    }


    // =========================
    // Email Validation
    // =========================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {

        showError(
            "emailError",
            "Email is required."
        );

        isValid = false;

    } else if (!emailPattern.test(email)) {

        showError(
            "emailError",
            "Please enter a valid email address."
        );

        isValid = false;
    }


    // =========================
    // Company Validation
    // =========================

    if (!company) {

        showError(
            "companyError",
            "Company is required."
        );

        isValid = false;
    }


    // =========================
    // Stop if Invalid
    // =========================

    if (!isValid) {
        return;
    }


    // =========================
    // Create Contact
    // =========================

    // =========================
    // Add or Update Contact
    // =========================

const editingId =
    contactForm.dataset.editingId;


if (editingId) {

    // =========================
    // Update Existing Contact
    // =========================

    const contactIndex =
        contacts.findIndex(function (contact) {

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

    // =========================
    // Create New Contact
    // =========================

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

    const submitButton =
        contactForm.querySelector("button[type='submit']");

    submitButton.textContent = "Add Contact";

    // Update Dashboard

    renderDashboard();

});

// =========================
// Show Error
// =========================

function showError(elementId, message) {

    document.getElementById(elementId).textContent = message;

}


// =========================
// Clear Errors
// =========================

function clearErrors() {

    document.getElementById("nameError").textContent = "";

    document.getElementById("phoneError").textContent = "";

    document.getElementById("emailError").textContent = "";

    document.getElementById("companyError").textContent = "";

    document.getElementById("categoryError").textContent = "";

}


// =========================
// Render Contacts
// =========================

function renderContacts() {

    const contactsList =
        document.getElementById("contactsList");


    contactsList.innerHTML = "";


    // No contacts

    if (contacts.length === 0) {

        contactsList.innerHTML =
            "<p>No contacts added yet.</p>";

        return;
    }


    // Display contacts

    contacts.forEach(function (contact) {

        const contactCard =
            document.createElement("div");


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
            onclick="editContact(${contact.id})"
        >
            Edit
        </button>

        <button
            class="delete-btn"
            onclick="deleteContact(${contact.id})"
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

function editContact(contactId) {

    const contact = contacts.find(function (contact) {

        return contact.id === contactId;

    });


    if (!contact) {

        return;

    }


    // Put existing data into form

    document.getElementById("name").value =
        contact.name;

    document.getElementById("phone").value =
        contact.phone;

    document.getElementById("email").value =
        contact.email;

    document.getElementById("company").value =
        contact.company;

    document.getElementById("category").value =
        contact.category;


    // Remove old contact

    contacts = contacts.filter(function (contact) {

        return contact.id !== contactId;

    });


    saveContacts();


    // Show Contacts page

    showPage(contactsPage);


    // Change button text

    const submitButton =
        contactForm.querySelector("button[type='submit']");

    submitButton.textContent = "Update Contact";


    // Store editing ID

    contactForm.dataset.editingId =
        contactId;

}


// =========================
// Delete Contact
// =========================

function deleteContact(contactId) {

    const contact =
        contacts.find(function (contact) {

            return contact.id === contactId;

        });


    if (!contact) {

        return;

    }


    // =========================
    // Confirmation
    // =========================

    const confirmed = confirm(
        `Are you sure you want to delete ${contact.name}?`
    );


    if (!confirmed) {

        return;

    }


    // =========================
    // Delete Contact
    // =========================

    contacts = contacts.filter(function (contact) {

        return contact.id !== contactId;

    });


    // Save updated contacts

    saveContacts();


    // Re-render contacts

    renderContacts();


    // Update dashboard

    renderDashboard();

}


// Render Dashboard

function renderDashboard() {

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

function renderRecentActivity() {

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


// =========================
// Initial Page
// =========================

// Dashboard should appear first

showPage(dashboardPage);

renderDashboard();