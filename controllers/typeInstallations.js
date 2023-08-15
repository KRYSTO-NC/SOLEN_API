const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const TypeInstallation = require("../models/TypeInstallation");

//@description:     Get all types of installations
//@route:           GET /api/v1/types-installations
//@access:          Public
exports.getTypeInstallations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single type of installation
//@route:           GET /api/v1/types-installations/:id
//@access:          Public
exports.getTypeInstallation = asyncHandler(async (req, res, next) => {
  const typeInstallation = await TypeInstallation.findById(req.params.id);
  if (!typeInstallation) {
    return next(
      new ErrorResponse(`Type of installation not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: typeInstallation });
});

//@description:     Create new type of installation
//@route:           POST /api/v1/types-installations
//@access:          Private
exports.createTypeInstallation = asyncHandler(async (req, res, next) => {
  const typeInstallation = await TypeInstallation.create(req.body);
  res.status(201).json({
    success: true,
    data: typeInstallation,
  });
});

//@description:     Update type of installation
//@route:           PUT /api/v1/types-installations/:id
//@access:          Private
exports.updateTypeInstallation = asyncHandler(async (req, res, next) => {
  const typeInstallation = await TypeInstallation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: typeInstallation,
  });
});

//@description:     Delete type of installation
//@route:           DELETE /api/v1/types-installations/:id
//@access:          Private
exports.deleteTypeInstallation = asyncHandler(async (req, res, next) => {
  await TypeInstallation.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
