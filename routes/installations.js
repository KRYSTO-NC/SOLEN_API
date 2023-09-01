const express = require('express')
const {
  getInstallations,
  getInstallation,
  updateInstallation,
  deleteInstallation,
  createInstallation,
} = require('../controllers/installations')

const Installation = require('../models/Installation')

// incude other resource routers
const interventionRouter = require('./interventions')
const contratMaintenanceRouter = require('./contratMaintenances')


const router = express.Router({ mergeParams: true })

// Re-route into other resource routers
router.use('/:installationId/interventions', interventionRouter)
router.use('/:installationId/contratMaintenances', contratMaintenanceRouter)

const advancedResults = require('../middlewares/advancedResults')
const { protect, authorize } = require('../middlewares/auth')

router
  .route('/')
  .get(
    advancedResults(
      Installation,
      'typeInstallation benneficiaire demandeur interventions',
    ),
    getInstallations,
  )
  .post(createInstallation)

router
  .route('/:id')
  .get(getInstallation)
  .put(updateInstallation)
  .delete(deleteInstallation)

module.exports = router
