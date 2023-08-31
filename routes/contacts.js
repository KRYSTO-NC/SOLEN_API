const express = require('express')
const {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createNewContact,
} = require('../controllers/contacts')

const Contact = require('../models/Contact')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(advancedResults(Contact, 'origine'), getContacts)
  .post(createNewContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router
