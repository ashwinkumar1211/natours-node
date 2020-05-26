const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utils/appError.utils');
const globalErrorHandler = require('./controllers/error.controller');
const tourRouter = require('./routes/tours.router');
const userRouter = require('./routes/users.router');

const app = express();

// ---- GLOBAL MIDDLEWARES ----

// Security HTTP Headers
app.use(helmet());

// Logger - only during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit HTTP requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

// Body Parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// ---- ROUTES ----

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
