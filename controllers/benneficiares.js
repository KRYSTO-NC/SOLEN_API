const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Benneficiaire = require("../models/Benneficiaire");

//@description:     Get all beneficiaries
//@route:           GET /api/v1/beneficiaires
//@access:          Public
exports.getBeneficiaires = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single beneficiary
//@route:           GET /api/v1/beneficiaires/:id
//@access:          Public
exports.getBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaire = await Benneficiaire.findById(req.params.id).populate('contact');
  if (!beneficiaire) {
    return next(
      new ErrorResponse(`Beneficiary not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: beneficiaire });
});

//@description:     Create new beneficiary
//@route:           POST /api/v1/beneficiaires
//@access:          Private
exports.createBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaire = await Benneficiaire.create(req.body);
  res.status(201).json({
    success: true,
    data: beneficiaire,
  });
});

//@description:     Update beneficiary
//@route:           PUT /api/v1/beneficiaires/:id
//@access:          Private
exports.updateBeneficiaire = asyncHandler(async (req, res, next) => {
  const beneficiaire = await Benneficiaire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: beneficiaire,
  });
});

//@description:     Delete beneficiary
//@route:           DELETE /api/v1/beneficiaires/:id
//@access:          Private
exports.deleteBeneficiaire = asyncHandler(async (req, res, next) => {
  await Benneficiaire.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
