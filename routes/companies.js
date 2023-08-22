const express = require('express');
const {
  getCompagnies,
  createNewCompagny,
  getCompagny,
  updateCompagny,
  deleteCompagny,
} = require('../controllers/Compagnies');

const Compagny = require('../models/Compagny');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Compagny), getCompagnies)
  .post(protect, authorize('admin'), createNewCompagny);

router
  .route('/:id')
  .get(getCompagny)
  .put(protect, authorize('admin'), updateCompagny)
  .delete(protect, authorize('admin'), deleteCompagny);

module.exports = router;
