const Document = require('../models/Document')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const path = require('path')
const { log } = require('console')

//@description: Get all documents
//@route: GET /worshift/api/v1/documents
//@access: Public
exports.getDocuments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description: Get a single document
//@route: GET /worshift/api/v1/documents/:id
//@access: Public
exports.getDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id)

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({ success: true, data: document })
})

//@description: Create a new document
//@route: POST /worshift/api/v1/documents
//@access: Private
exports.createDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.create(req.body)
  res.status(201).json({
    success: true,
    data: document,
  })
})

//@description: Update a document
//@route: PUT /worshift/api/v1/documents/:id
//@access: Private
exports.updateDocument = asyncHandler(async (req, res, next) => {
  const document = await Document.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: document,
  })
})

//@description: Delete a document
//@route: DELETE /worshift/api/v1/documents/:id
//@access: Private

exports.deleteDocument = asyncHandler(async (req, res, next) => {
  await Document.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Upload file for document
// @route     PUT /worshift/api/v1/documents/:id/file
// @access    Private
exports.documentFileUpload = asyncHandler(async (req, res, next) => {
  const document = await Document.findById(req.params.id)

  if (!document) {
    return next(
      new ErrorResponse(`Document not found with id of ${req.params.id}`, 404),
    )
  }

  console.log(req.files)

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.document
  if (!file || !file.mimetype) {
    return next(new ErrorResponse(`File or mimetype is missing`, 400))
  }
  // Check if the file is an image or a pdf
  if (
    !file.mimetype.startsWith('image') &&
    !file.mimetype.startsWith('application/pdf')
  ) {
    return next(new ErrorResponse(`Please upload an image or PDF file`, 400))
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`,
        400,
      ),
    )
  }

  // Create custom filename
  file.name = `document_file_${document._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error('File move error:', err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Document.findByIdAndUpdate(req.params.id, {
      document: file.name,
    })

    res.status(200).json({
      success: true,
      data: file.name,
    })
  })
})