const express = require('express')
const { getOrigines, createOrigine, getOrigine, deleteOrigine, updateOrigine } = require('../controllers/origines')

const Customer = require('../models/Origine')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')
const Origine = require('../models/Origine')

router
  .route('/')
  .get(advancedResults(Origine), getOrigines)
  .post(createOrigine)

router.route('/:id').get(getOrigine).put(updateOrigine).delete(deleteOrigine)

module.exports = router
