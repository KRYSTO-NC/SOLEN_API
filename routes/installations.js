const express = require('express');
const {
  getInstallations,
  createInstallation,
  getInstallation,
  updateInstallation,
  deleteInstallation,
} = require('../controllers/installations');

const Installation = require('../models/Installation');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Installation), getInstallations)
  .post(protect, authorize('admin'), createInstallation);

router
  .route('/:id')
  .get(getInstallation)
  .put(protect, authorize('admin'), updateInstallation)
  .delete(protect, authorize('admin'), deleteInstallation);

module.exports = router;
