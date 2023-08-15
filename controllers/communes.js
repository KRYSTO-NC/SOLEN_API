const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Commune = require("../models/Commune");

//@description:     Get all communes
//@route:           GET /api/v1/communes
//@access:          Public
exports.getCommunes = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single commune
//@route:           GET /api/v1/communes/:id
//@access:          Public
exports.getCommune = asyncHandler(async (req, res, next) => {
  const commune = await Commune.findById(req.params.id);
  if (!commune) {
    return next(
      new ErrorResponse(`Commune not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: commune });
});

//@description:     Create new commune
//@route:           POST /api/v1/communes
//@access:          Private
exports.createCommune = asyncHandler(async (req, res, next) => {
  const commune = await Commune.create(req.body);
  res.status(201).json({
    success: true,
    data: commune,
  });
});

//@description:     Update commune
//@route:           PUT /api/v1/communes/:id
//@access:          Private
exports.updateCommune = asyncHandler(async (req, res, next) => {
  const commune = await Commune.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: commune,
  });
});

//@description:     Delete commune
//@route:           DELETE /api/v1/communes/:id
//@access:          Private
exports.deleteCommune = asyncHandler(async (req, res, next) => {
  await Commune.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
