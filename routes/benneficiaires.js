const express = require('express');
const {
  getBeneficiaires,
  createBeneficiaire,
  getBeneficiaire,
  updateBeneficiaire,
  deleteBeneficiaire,
} = require('../controllers/beneficiaires');

const Benneficiaire = require('../models/Benneficiaire');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

router
  .route('/')
  .get(advancedResults(Benneficiaire), getBeneficiaires)
  .post(protect, authorize('admin'), createBeneficiaire);

router
  .route('/:id')
  .get(getBeneficiaire)
  .put(protect, authorize('admin'), updateBeneficiaire)
  .delete(protect, authorize('admin'), deleteBeneficiaire);

module.exports = router;
