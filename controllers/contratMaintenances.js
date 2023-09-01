const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const ContratMaintenance = require('../models/ContratMaintenance');
const Installation = require('../models/Installation');

//@description:     Get all contracts
//@route:           GET /api/v1/contrats
//@access:          Public
exports.getContrats = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@description:     Get a single contract
//@route:           GET /api/v1/contrats/:id
//@access:          Public
exports.getContrat = asyncHandler(async (req, res, next) => {
  const contrat = await ContratMaintenance.findById(req.params.id);
  if (!contrat) {
    return next(
      new ErrorResponse(`Contract not found with ID of ${req.params.id}`, 404),
    );
  }
  res.status(200).json({ success: true, data: contrat });
});

//@description:     Create new contract for a specific installation
//@route:           POST /api/v1/installations/:installationId/contrats
//@access:          Private
exports.createNewContratForInstallation = asyncHandler(async (req, res, next) => {
  req.body.installation = req.params.installationId;
  const installation = await Installation.findById(req.params.installationId);
  if (!installation) {
    return next(
      new ErrorResponse(`No installation found with ID of ${req.params.installationId}`, 404),
    );
  }
  const contrat = await ContratMaintenance.create(req.body);
  res.status(201).json({
    success: true,
    data: contrat,
  });
});

//@description:     Update contract
//@route:           PUT /api/v1/contrats/:id
//@access:          Private
exports.updateContrat = asyncHandler(async (req, res, next) => {
  const contrat = await ContratMaintenance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: contrat,
  });
});

//@description:     Delete contract
//@route:           DELETE /api/v1/contrats/:id
//@access:          Private
exports.deleteContrat = asyncHandler(async (req, res, next) => {
  await ContratMaintenance.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
