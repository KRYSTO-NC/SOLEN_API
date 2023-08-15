const express = require('express');
const {
  getTypeInstallations,
  createTypeInstallation,
  getTypeInstallation,
  updateTypeInstallation,
  deleteTypeInstallation,
} = require('../controllers/types-installations');

const TypeInstallation = require('../models/TypeInstallation');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(TypeInstallation), getTypeInstallations)
  .post(protect, authorize('admin'), createTypeInstallation);

router
  .route('/:id')
  .get(getTypeInstallation)
  .put(protect, authorize('admin'), updateTypeInstallation)
  .delete(protect, authorize('admin'), deleteTypeInstallation);

module.exports = router;
