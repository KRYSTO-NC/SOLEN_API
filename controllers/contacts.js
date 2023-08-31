const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Contact = require('../models/Contact')
const Company = require('../models/Compagny')

//@description:     Get all contacts
//@ route:          GET /api/v1/contacts
//@access:          Public
exports.getContacts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single contact
//@ route:          GET /api/v1/contacts/:id
//@access:          Public
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: contact })
})

//@description:     Create new contact
//@route:          POST /api/v1/contacts
//@access:          Private
exports.createNewContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body)

  res.status(201).json({
    success: true,
    data: contact,
  })
})

//@description:     Update contact
//@ route:          PUT /api/v1/contacts/:id
//@access:          Private
exports.updateContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: contact,
  })
})

//@description:     Delete contact
//@ route:          DELETE /api/v1/contacts/:id
//@access:          Private
exports.deleteContact = asyncHandler(async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
