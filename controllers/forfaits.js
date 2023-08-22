const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Forfait = require("../models/Forfait");

//@description:     Get all forfaits
//@route:          GET /api/v1/forfaits
//@access:          Public
exports.getForfaits = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single forfait
//@route:          GET /api/v1/forfaits/:id
//@access:          Public
exports.getForfait = asyncHandler(async (req, res, next) => {
  const forfait = await Forfait.findById(req.params.id);
  if (!forfait) {
    return next(
      new ErrorResponse(`Forfait not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: forfait });
});

//@description:     Create new forfait
//@route:          POST /api/v1/forfaits
//@access:          Private
exports.createNewForfait = asyncHandler(async (req, res, next) => {
  const forfait = await Forfait.create(req.body);

  res.status(201).json({
    success: true,
    data: forfait,
  });
});

//@description:     Update forfait
//@route:          PUT /api/v1/forfaits/:id
//@access:          Private
exports.updateForfait = asyncHandler(async (req, res, next) => {
  const forfait = await Forfait.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: forfait,
  });
});

//@description:     Delete forfait
//@route:          DELETE /api/v1/forfaits/:id
//@access:          Private
exports.deleteForfait = asyncHandler(async (req, res, next) => {
  await Forfait.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
