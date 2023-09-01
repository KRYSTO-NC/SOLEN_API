const express = require('express');
const {
  getContrats,
  getContrat,
  createNewContratForInstallation,
  updateContrat,
  deleteContrat,
} = require('../controllers/contratMaintenances');

const ContratMaintenance = require('../models/ContratMaintenance');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(ContratMaintenance, 'installation'), getContrats)
  .post( createNewContratForInstallation);

router
  .route('/:id')
  .get(getContrat)
  .put( updateContrat)
  .delete(deleteContrat);

module.exports = router;
