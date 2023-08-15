const express = require('express');
const {
  getCommunes,
  createCommune,
  getCommune,
  updateCommune,
  deleteCommune,
} = require('../controllers/communes');

const Commune = require('../models/Commune');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Commune), getCommunes)
  .post(protect, authorize('admin'), createCommune);

router
  .route('/:id')
  .get(getCommune)
  .put(protect, authorize('admin'), updateCommune)
  .delete(protect, authorize('admin'), deleteCommune);

module.exports = router;
