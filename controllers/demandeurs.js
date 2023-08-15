const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Demandeur = require("../models/Demandeur");

//@description:     Get all demandeurs
//@route:           GET /api/v1/demandeurs
//@access:          Public
exports.getDemandeurs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single demandeur
//@route:           GET /api/v1/demandeurs/:id
//@access:          Public
exports.getDemandeur = asyncHandler(async (req, res, next) => {
  const demandeur = await Demandeur.findById(req.params.id).populate('contact');
  if (!demandeur) {
    return next(
      new ErrorResponse(`Demandeur not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: demandeur });
});

//@description:     Create new demandeur
//@route:           POST /api/v1/demandeurs
//@access:          Private
exports.createDemandeur = asyncHandler(async (req, res, next) => {
  const demandeur = await Demandeur.create(req.body);
  res.status(201).json({
    success: true,
    data: demandeur,
  });
});

//@description:     Update demandeur
//@route:           PUT /api/v1/demandeurs/:id
//@access:          Private
exports.updateDemandeur = asyncHandler(async (req, res, next) => {
  const demandeur = await Demandeur.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: demandeur,
  });
});

//@description:     Delete demandeur
//@route:           DELETE /api/v1/demandeurs/:id
//@access:          Private
exports.deleteDemandeur = asyncHandler(async (req, res, next) => {
  await Demandeur.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
