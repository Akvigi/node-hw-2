const express = require('express')

const contacts = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await contacts.listContacts()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Servor error"})
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const data = await contacts.getContactById(req.params.contactId)
    if (!data) {
      return res.status(404).json({message: "404"})
    }
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "Servor error"})
  }
})

router.post('/', async (req, res, next) => {
  try {
    const resp = await contacts.addContact(req.body)
    res.status(201).json(resp)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message})
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.removeContact(req.params.contactId)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.updateContact(req.params.contactId, req.body)
    res.json(data)
  } catch (error) {
    res.status(404).json()
  }
  
})

module.exports = router
