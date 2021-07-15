import mongoose from 'mongoose';

const WeatherDataSchema = new mongoose.Schema({
    time: Date,   // convert epoch to date time
    wind_dir: Number,
    windspeed_avg: Number,
    windspeed_max: Number,
    rainfall_hour: Number,
    rainfall_day: Number,
    temperature: Number,
    humidity: Number,
    barometer: Number,
    rainsensor_analogue: Number,
    rainsensor_digital: Number,
    lightning: Boolean,
    lightning_distance: Number,
    lightning_intensity: Number,
    probe_temp: Number,
    weather_station: {
        type: mongoose.Schema.ObjectId,
        ref: 'Station',
        required: false //TODO:  make this compulsory and get Pi ID
    }
});


// Middleware to convert epoch time to datetime
// WeatherDataSchema.pre('save', function (next) {
WeatherDataSchema.pre('validate', function (next) {

    // const n = this.time.getTime();
    // Get the stored date which is imported wrong (ms from Python to s in ES), convert to epoch and redo
    const nd = new Date(this.time.getTime() * 1000);
    console.log(`Middleware ${nd}`);
    // const nd = new Date(1625932527.44147 * 1000)
    this.time = nd;

    next()
});


// TODO Include Pi ID

export default mongoose.model('Weather', WeatherDataSchema);
