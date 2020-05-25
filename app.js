const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError.utils');
const globalErrorHandler = require('./controllers/error.controller');
const tourRouter = require('./routes/tours.router');
const userRouter = require('./routes/users.router');

const app = express();

// MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
