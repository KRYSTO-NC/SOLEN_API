const express = require('express');
const {
  getForfaits,
  createNewForfait,
  getForfait,
  updateForfait,
  deleteForfait,
} = require('../controllers/forfaits');

const Forfait = require('../models/Forfait');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Forfait), getForfaits)
  .post(protect, authorize('admin'), createNewForfait);

router
  .route('/:id')
  .get(getForfait)
  .put(protect, authorize('admin'), updateForfait)
  .delete(protect, authorize('admin'), deleteForfait);

module.exports = router;
