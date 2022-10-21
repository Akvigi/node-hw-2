const fs = require('fs/promises')
const path = require('path');
const contacts = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const data = fs.readFile(contacts, 'utf-8').then(data => {return JSON.parse(data)});
  return data
}

const getContactById = async contactId => {
  const data = fs.readFile(contacts, 'utf-8').then(data => {
    const contact = JSON.parse(data).find(item => Number(item.id) === Number(contactId));
    return contact
  });
  return data
};

const removeContact = async (contactId) => {
   const op = fs.readFile(contacts, 'utf-8').then(data => {
    const filtContacts = JSON.parse(data).filter(item => Number(item.id) !== Number(contactId));
     if (filtContacts.length === JSON.parse(data).length) {
      throw Error("Not found")
    }
    fs.writeFile(contacts, JSON.stringify(filtContacts, null, 2));
    return (`deleted ${contactId} contact`);
   });
  return op
}

const addContact = async ({name, email, phone}) => {
  let newID = 1;
  const op = await fs.readFile(contacts, 'utf-8').then(data => {
    const changedContacts = JSON.parse(data);
    for (const us in changedContacts) {
      if (Number(changedContacts[us].id) !== newID) {
        break;
      }
      newID += 1;
    }
    const user = {
      id: newID.toString(),
      name: name,
      email: email,
      phone: phone,
    };
    if (!name || !email || !phone) {
      throw Error("missing fields")
    }
    changedContacts.push(user);
    const sorted = changedContacts.sort((us1, us2) => us1.id - us2.id);
    fs.writeFile(contacts, JSON.stringify(sorted, null, 2));
    return `added ${user.name} contact: ${JSON.stringify(user, null, 2)}`;
  });
  return op
}

const updateContact = async (contactId, { name, email, phone }) => {
  const op = fs.readFile(contacts, 'utf-8').then(data => {
    const contactsList = JSON.parse(data)
    const foundedContact = contactsList.find(item => Number(item.id) === Number(contactId));
     if (!foundedContact) {
      throw Error("Not found")
     }
    if ((!name && !email && !phone) ||
      (email === foundedContact.email &&
        name === foundedContact.name &&
        phone === foundedContact.phone)) {
      throw Error("Nothing to change")
    }
    console.log(foundedContact)
    if (name) {
      foundedContact.name = name
    }
    if (email) {
      foundedContact.email = email
    }
    if (phone) {
      foundedContact.phone = phone
    }
    const filtContacts = JSON.parse(data).filter(item => Number(item.id) !== Number(contactId));
    filtContacts.push(foundedContact)
    const sorted = filtContacts.sort((us1, us2) => us1.id - us2.id);
    fs.writeFile(contacts, JSON.stringify(sorted, null, 2));
    return (`changed ${contactId} contact`);
  })
  return op
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
