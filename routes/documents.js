const express = require('express')
const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  documentFileUpload,
} = require('../controllers/documents')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')
const Document = require('../models/Document')
const advancedResults = require('../middlewares/advancedResults')

// Vous pouvez décommenter les lignes suivantes si vous souhaitez protéger les routes ou autoriser certains rôles.
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(Document), getDocuments)
  .post(createDocument)

router.route('/:id').get(getDocument).put(updateDocument).delete(deleteDocument)

router.route('/:id/file').put(documentFileUpload)

module.exports = router