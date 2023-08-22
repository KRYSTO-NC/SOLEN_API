const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Compagny = require("../models/Compagny");

//@description:     Get all compagnies
//@route:          GET /api/v1/compagnies
//@access:          Public
exports.getCompagnies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single compagny
//@route:          GET /api/v1/compagnies/:id
//@access:          Public
exports.getCompagny = asyncHandler(async (req, res, next) => {
  const compagny = await Compagny.findById(req.params.id);
  if (!compagny) {
    return next(
      new ErrorResponse(`Compagny not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: compagny });
});

//@description:     Create new compagny
//@route:          POST /api/v1/compagnies
//@access:          Private
exports.createNewCompagny = asyncHandler(async (req, res, next) => {
  const compagny = await Compagny.create(req.body);

  res.status(201).json({
    success: true,
    data: compagny,
  });
});

//@description:     Update compagny
//@route:          PUT /api/v1/compagnies/:id
//@access:          Private
exports.updateCompagny = asyncHandler(async (req, res, next) => {
  const compagny = await Compagny.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: compagny,
  });
});

//@description:     Delete compagny
//@route:          DELETE /api/v1/compagnies/:id
//@access:          Private
exports.deleteCompagny = asyncHandler(async (req, res, next) => {
  await Compagny.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
