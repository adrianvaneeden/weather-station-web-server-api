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
// @route   POST /api/vi/station/:id
// @access  Public
// !This is the main authenticaiton method (auth)
let addStationRecord = asyncHandler(async (req, res, next) => {
    console.log("Adding Weather Station");

    const { name, description, email, password, address } = req.body;

    // const station = await Station.create(req.body);
    const station = await Station.create({
        name,
        description,
        email,
        password,
        address
    });

    // Create token
    // const token = station.getSignedJWTToken();
    sendTokenResponse(station, 200, res);

    res
        .status(201)
        .json({
            success: true,
            token,
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


// @desc    Login Station
// @route   POST /api/vi/station/login
// @access  Public
// !This is the login controller
let login = asyncHandler(async (req, res, next) => {
    console.log("Adding Weather Station");

    const { name, password } = req.body;

    // Validate email and password
    if (!name || !password) {
        return next(new ErrorResponse('Please provide a name and password', 400));
    };

    // Check for station
    const station = await Station.findOne({ name }).select('+password');

    if (!station) {
        return next(new ErrorResponse('Invalid credentials', 401));
    };

    // Check if password matches
    const isMatch = await station.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Create token and cookie
    sendTokenResponse(station, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (station, statusCode, res) => {
    // Create token
    const token = station.getSignedJWTToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 80 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

export { getStationData, getStationRecord, addStationRecord, updateStationRecord, deleteStationRecord, login };
