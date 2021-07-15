import ErrorResponse from '../middleware/utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Weather from '../models/weather_models.js';

// @desc    Get last updated date  data was updated from this Pi
// @route   GET /api/vi/getlastupdate/:id
// @access  Public
let getLastUpdate = (req, res, next) => {
    res
        .status(200)
        .json({
            success: true,
            msg: `Get last time DB was updated successfully from Pi with ID = ${req.params.id}`
        });
}

// @desc    Get all weather data
// @route   GET /api/v1/weatherdata
// @access  Public
let getWeatherData = asyncHandler(async (req, res, next) => {
    const weather = await Weather.find();

    res
        .status(200)
        .json({ success: true, count: weather.length, data: weather });
});

// @desc    Get one weather record
// @route   GET /api/v1/weatherdata/:id
// @access  Public
let getWeatherRecord = asyncHandler(async (req, res, next) => {
    const weather = await Weather.findById(req.params.id);

    if (!weather) {
        return next(new ErrorResponse(`Weather record not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: weather });
});

// @desc    Add weather data from a Pi
// @route   POST /api/v1/weatherdata
// @access  Private
// TODO:  This should bring in an array of data
let addWeatherData = asyncHandler(async (req, res, next) => {
    const weather = await Weather.insertMany(req.body)
    // console.log(req);

    res
        .status(201)
        .json({
            success: true,
            msg: 'Update weather data from this Pi >> THIS NEEDS TO BE UPDATED!',
            data: weather

        });
});

// @desc    Add one weather record
// @route   PUT /api/v1/weatherdata/:id
// @access  Private
let addWeatherRecord = asyncHandler(async (req, res, next) => {
    const weather = await Weather.create(req.body);

    res
        .status(201)
        .json({
            success: true,
            data: weather
        });
});

// @desc    Update weather record
// @route   PATCH /api/v1/weatherdata/:1
// @access  Private
let updateWeatherRecord = asyncHandler(async (req, res, next) => {
    const weather = await Weather.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!weather) {
        return next(new ErrorResponse(`Weather record not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: weather });
});

// TODO Pre middleware to populate Pi _Id

// @desc    Delete weather record
// @route   DELETE /api/v1/weatherdata/:1
// @access  Private
let deleteWeatherRecord = asyncHandler(async (req, res, next) => {
    const weather = await Weather.findByIdAndDelete(req.params.id);

    if (!weather) {
        return next(new ErrorResponse(`Weather record not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: {} });
});

export { getLastUpdate, getWeatherData, getWeatherRecord, addWeatherData, addWeatherRecord, updateWeatherRecord, deleteWeatherRecord };
