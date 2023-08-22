const express = require('express');
const {
  getInterventions,
  createNewIntervention,
  getIntervention,
  updateIntervention,
  deleteIntervention,
} = require('../controllers/interventions');

const Intervention = require('../models/Intervention');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Intervention), getInterventions)
  .post(protect, authorize('admin'), createNewIntervention);

router
  .route('/:id')
  .get(getIntervention)
  .put(protect, authorize('admin'), updateIntervention)
  .delete(protect, authorize('admin'), deleteIntervention);

module.exports = router;
