const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "db", "contacts.json"); //  __dirname абсолютний шлях

console.log(contactsPath);
const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    const readContactsJson = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(readContactsJson);
    // Повертає масив контактів.
  } catch (error) {
    console.log(error);
  }
}

function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
}
