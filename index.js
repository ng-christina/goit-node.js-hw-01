const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ... listContacts
      const getList = await listContacts();
      return console.log(getList);

      break;

    case "get":
      // ... id
      const getContact = await getContactById(id);
      return console.log(getContact);
      break;

    case "add":
      // ... name email phone
      const addNewContact = await addContact(name, email, phone);
      return console.log(addNewContact);
      break;

    case "remove":
      // ... id
      const deleteContact = await removeContact(id);
      return console.log(deleteContact);
      break;

    case "update":
      // id
      const updateContact = await contact.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
