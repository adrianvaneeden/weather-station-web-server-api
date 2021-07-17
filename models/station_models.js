import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// TODO:  Delete all PiID fields - db.weathers.update( {}, { $unset: { "piId": "" }}, false, true );
// TODO:  Update all weather_station fields - db.weathers.updateMany( {},{ $set: {"weather_station" : ObjectId("60ec9800842712562c9362da") }})
// TODO:  Update all weather_station fields - db.weathers.updateMany( {},{ $set: {"weather_station" : ObjectId("60f03db1a2158c36ec64eb9f") }})

const StationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a weather station name"],
        unique: true,
        maxlength: [30, "Name can't be more than 30 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter a station description"],
        maxlength: [200, "Name can't be more than 200 characters"]
    },
    email: {
        type: String,
        required: [true, 'Please provide a contact email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
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

// Encrypt password using BCrypt
StationSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return
StationSchema.methods.getSignedJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Match user entered password to hashed password in database
StationSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


export default mongoose.model('Station', StationSchema);
