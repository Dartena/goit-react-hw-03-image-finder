class LocalStorage {
  addToList(value) {
    let contactList = localStorage.getItem("contacts");
    if (!contactList) contactList = [];
    localStorage.setItem("contacts", JSON.stringify(value));
  }
  getFromList() {
    const contactList = JSON.parse(localStorage.getItem("contacts"));
    return contactList ? contactList : [];
  }
}

const LS = new LocalStorage();

export default LS;
