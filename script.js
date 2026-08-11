let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}