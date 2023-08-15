const express = require('express');
const {
  getDemandeurs,
  createDemandeur,
  getDemandeur,
  updateDemandeur,
  deleteDemandeur,
} = require('../controllers/demandeurs');

const Demandeur = require('../models/Demandeur');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Demandeur), getDemandeurs)
  .post(protect, authorize('admin'), createDemandeur);

router
  .route('/:id')
  .get(getDemandeur)
  .put(protect, authorize('admin'), updateDemandeur)
  .delete(protect, authorize('admin'), deleteDemandeur);

module.exports = router;
