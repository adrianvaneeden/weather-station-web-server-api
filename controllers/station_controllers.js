import ErrorResponse from '../middleware/utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Station from '../models/station_models.js';

// @desc    Get all station data
// @route   GET /api/v1/station
// @access  Public
let getStationData = asyncHandler(async (req, res, next) => {
    const station = await Station.find();

    res
        .status(200)
        .json({ success: true, count: station.length, data: station });
});

// @desc    Get one weather record
// @route   GET /api/v1/station/:id
// @access  Public
let getStationRecord = asyncHandler(async (req, res, next) => {
    const station = await Station.findById(req.params.id);

    if (!station) {
        return next(new ErrorResponse(`Weather Station record not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: station });
});

// @desc    Add one station record
// @route   PUT /api/vi/station/:id
// @access  Private
let addStationRecord = asyncHandler(async (req, res, next) => {
    const station = await Station.create(req.body);

    res
        .status(201)
        .json({
            success: true,
            data: station
        });
});

// @desc    Update station record
// @route   PATCH /api/v1/station/:1
// @access  Private
let updateStationRecord = asyncHandler(async (req, res, next) => {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!station) {
        return next(new ErrorResponse(`Station record not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: station });
});


// @desc    Delete weather record
// @route   DELETE /api/v1/station/:1
// @access  Private
let deleteStationRecord = asyncHandler(async (req, res, next) => {
    const station = await Station.findByIdAndDelete(req.params.id);

    if (!station) {
        return next(new ErrorResponse(`Station record not found with ID ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: {} });
});

// export { getLastUpdate, getWeatherData, getWeatherRecord, addWeatherData, addWeatherRecord, deleteWeatherRecord };
export { getStationData, getStationRecord, addStationRecord, updateStationRecord, deleteStationRecord };
