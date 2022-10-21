const fs = require('fs/promises')
const path = require('path');
const contacts = path.join(__dirname, 'contacts.json');

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

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
