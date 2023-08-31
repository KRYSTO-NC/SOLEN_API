const express = require('express')
const {
  getInterventions,
  createNewIntervention,
  getIntervention,
  updateIntervention,
  deleteIntervention,
  createNewInterventionForInstallation,
} = require('../controllers/interventions')

const Intervention = require('../models/Intervention')

const router = express.Router({ mergeParams: true })

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(advancedResults(Intervention, 'installation'), getInterventions)
  .post(createNewInterventionForInstallation)

router
  .route('/:id')
  .get(getIntervention)
  .put(updateIntervention)
  .delete(deleteIntervention)

module.exports = router
