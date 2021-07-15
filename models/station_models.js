import mongoose from 'mongoose';

// TODO:  Delete all PiID fields - db.weathers.update( {}, { $unset: { "piId": "" }}, false, true );
// TODO:  Update all weather_station fields - db.weathers.updateMany( {},{ $set: {"weather_station" : ObjectId("60ec9800842712562c9362da") }})
// TODO:  Update all weather_station fields - db.weathers.updateMany( {},{ $set: {"weather_station" : ObjectId("60f03db1a2158c36ec64eb9f") }})

const WeatherStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a station name"],
        unique: true,
        trim: true,
        maxlength: [30, "Name can't be more than 30 characters"]

    },
    description: {
        type: String,
        required: [true, "Please enter a station name"],
        maxlength: [200, "Name can't be more than 200 characters"]

    },
    address: {
        type: String,
        required: [true, "Please enter an address so we can use the location for weather data"]
    },
    location: {
        // GeoJSON point
        type: {
            type: String,
            enum: ['Point'],
            required: false //TODO: Must be true and calculated from address
        },
        coordinates: {
            type: [Number],
            required: false,  //TODO: Must be true and calculated from address
            index: '2dsphere'
        }
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    // Add in what sensors are on
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Middleware

//  TODO Geotag address fields



export default mongoose.model('Station', WeatherStationSchema);
