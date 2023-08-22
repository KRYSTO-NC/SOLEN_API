const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Intervention = require("../models/Intervention");

//@description:     Get all interventions
//@route:          GET /api/v1/interventions
//@access:          Public
exports.getInterventions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single intervention
//@route:          GET /api/v1/interventions/:id
//@access:          Public
exports.getIntervention = asyncHandler(async (req, res, next) => {
  const intervention = await Intervention.findById(req.params.id);
  if (!intervention) {
    return next(
      new ErrorResponse(`Intervention not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: intervention });
});

//@description:     Create new intervention
//@route:          POST /api/v1/interventions
//@access:          Private
exports.createNewIntervention = asyncHandler(async (req, res, next) => {
  const intervention = await Intervention.create(req.body);

  res.status(201).json({
    success: true,
    data: intervention,
  });
});

//@description:     Update intervention
//@route:          PUT /api/v1/interventions/:id
//@access:          Private
exports.updateIntervention = asyncHandler(async (req, res, next) => {
  const intervention = await Intervention.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: intervention,
  });
});

//@description:     Delete intervention
//@route:          DELETE /api/v1/interventions/:id
//@access:          Private
exports.deleteIntervention = asyncHandler(async (req, res, next) => {
  await Intervention.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
