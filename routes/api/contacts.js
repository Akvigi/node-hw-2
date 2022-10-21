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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
