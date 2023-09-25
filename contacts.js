const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.join(__dirname, "db", "contacts.json"); //  __dirname абсолютний шлях
const { nanoid } = require("nanoid");

async function listContacts() {
  const readContactsJson = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(readContactsJson);
  // Повертає масив контактів.
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const getContact = contacts.find((contact) => contact.id === contactId);
  return getContact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = await contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();

  // Перевіряємо, чи існує контакт з таким іменем або електронною адресою
  const isDuplicate = contacts.some(
    (contact) => contact.name === name || contact.email === email
  );
  if (isDuplicate) {
    throw new Error("Contact with the same name or email already exists.");
  }

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
