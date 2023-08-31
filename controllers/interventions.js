const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Intervention = require('../models/Intervention')
const Installation = require('../models/Installation')

//@description:     Get all interventions
//@route:          GET /api/v1/interventions
//@access:          Public
exports.getInterventions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single intervention
//@route:          GET /api/v1/interventions/:id
//@access:          Public
exports.getIntervention = asyncHandler(async (req, res, next) => {
  const intervention = await Intervention.findById(req.params.id)
  if (!intervention) {
    return next(
      new ErrorResponse(
        `Intervention not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(200).json({ success: true, data: intervention })
})

//@description:     Create new intervention for a specific installation
//@route:          POST /api/v1/installations/:installationId/interventions
//@access:          Private
exports.createNewInterventionForInstallation = asyncHandler(
  async (req, res, next) => {
    console.log('Req.body avant:', req.body)
    // Add installation id to req.body
    req.body.installation = req.params.installationId
    const installation = await Installation.findById(req.params.installationId)
    console.log('Installation ID:', req.params.installationId)
    if (!installation) {
      return next(
        new ErrorResponse(
          `Aucune installation trouvée avec l'id : ${req.params.installationId}`,
          404,
        ),
      )
    }
    const intervention = await Intervention.create(req.body)
    res.status(201).json({
      success: true,
      data: intervention,
    })
  },
)

//@description:     Update intervention
//@route:          PUT /api/v1/interventions/:id
//@access:          Private
exports.updateIntervention = asyncHandler(async (req, res, next) => {
  const intervention = await Intervention.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: intervention,
  })
})

//@description:     Delete intervention
//@route:          DELETE /api/v1/interventions/:id
//@access:          Private
exports.deleteIntervention = asyncHandler(async (req, res, next) => {
  await Intervention.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
