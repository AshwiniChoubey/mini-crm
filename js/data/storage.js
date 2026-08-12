export let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

export function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


export function setContacts(updatedContacts) {
    contacts = updatedContacts;
    saveContacts();
}