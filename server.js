import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cookeParser from 'cookie-parser';
import errorHandler from './middleware/error.js';
import connectDB from './config/db.js';
// import logger from './middleware/logger.js';

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
// const weather = require('./routes/weather');
import weather from './routes/weather_routes.js';
import station from './routes/station_routes.js';

const app = express();

// Body parser
app.use(express.json({ limit: '50mb' }));

// Cookie Parser
app.use(cookeParser());

// app.use(express.limit('50M'));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// app.use(logger);

// Mount routers
app.use('/api/v1/weatherdata', weather);
app.use('/api/v1/station', station);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(colors.brightYellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
