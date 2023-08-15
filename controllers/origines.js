
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Origine = require('../models/Origine')


//@description:     Get all origines
//@ route:          GET /api/v1/origines
//@access:          Public
exports.getOrigines = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//@description:     Get a single oriogine
//@ route:          GET /api/v1/origines/:id
//@access:          Public
exports.getOrigine = asyncHandler(async (req, res, next) => {
  const origine = await Origine.findById(req.params.id)
  if (!origine) {
    return next(
      new ErrorResponse(`Origine not found with ID of ${req.params.id}`, 404),
    )
  }
  res.status(200).json({ success: true, data: origine })
})

//@description:     Create new origine
//@ route:          POST /api/v1/origines
//@access:          Public
exports.createOrigine = asyncHandler(async (req, res, next) => {
    const origine = await Origine.create(req.body);
  
    res.status(200).json({
      success: true,
      data: origine,
    });
  });



//@description:     Update origine
//@ route:          PUT /api/v1/customers/:id
//@access:          Private
exports.updateOrigine = asyncHandler(async (req, res, next) => {
  const origine = await Origine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: origine,
  })
})

//@description:     Delete origine
//@ route:          DELETE /api/v1/origine/:id
//@access:          Private
exports.deleteOrigine = asyncHandler(async (req, res, next) => {
    await Origine.findByIdAndDelete(req.params.id)
  
    res.status(200).json({
      success: true,
      data: {},
    })
  })
  

