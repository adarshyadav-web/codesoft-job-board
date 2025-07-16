// api documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');

// package imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/userModels');

// security imports
const helmet = require('helmet');
// 
const { sanitize, cleanXSS } = require('./middelwares/security');


// routes require
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoute');
// Middleware imports

const cors = require('cors');
const morgan = require('morgan');
const errMiddleware = require('./middelwares/errMiddelwares');
const userAuth = require('./middelwares/authMiddelwares');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
const { MONGO_LOCAL_URL } = process.env;
main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
async function main() {
    await mongoose.connect(MONGO_LOCAL_URL);

}
// swagger documentation
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board API',
            version: '1.0.0',
            description: 'API documentation for the Job Board application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};
const swaggerSpec = swaggerDoc(options);

app.set('trust proxy', 1);


// Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet()); // Set security headers
// app.use(xss()); // Sanitize user input to prevent XSS attacks
app.use(sanitize);
app.use(cleanXSS);

app.use(cors());
app.use(morgan('dev'));

// route

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);

// home route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// error handling middleware
app.use(errMiddleware);
//port configuration
const PORT = process.env.PORT || 5000;

// server configuration
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port no. ${PORT}`);
});