const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Installation = require("../models/Installation");

//@description:     Get all installations
//@route:           GET /api/v1/installations
//@access:          Public
exports.getInstallations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single installation
//@route:           GET /api/v1/installations/:id
//@access:          Public
exports.getInstallation = asyncHandler(async (req, res, next) => {
  const installation = await Installation.findById(req.params.id).populate('typeInstallation');
  if (!installation) {
    return next(
      new ErrorResponse(`Installation not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: installation });
});

//@description:     Create new installation
//@route:           POST /api/v1/installations
//@access:          Private
exports.createInstallation = asyncHandler(async (req, res, next) => {
  const installation = await Installation.create(req.body);
  res.status(201).json({
    success: true,
    data: installation,
  });
});

//@description:     Update installation
//@route:           PUT /api/v1/installations/:id
//@access:          Private
exports.updateInstallation = asyncHandler(async (req, res, next) => {
  const installation = await Installation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: installation,
  });
});

//@description:     Delete installation
//@route:           DELETE /api/v1/installations/:id
//@access:          Private
exports.deleteInstallation = asyncHandler(async (req, res, next) => {
  await Installation.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
