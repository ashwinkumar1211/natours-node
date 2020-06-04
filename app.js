const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError.utils');
const globalErrorHandler = require('./controllers/error.controller');

const tourRouter = require('./routes/tours.router');
const userRouter = require('./routes/users.router');
const reviewRouter = require('./routes/reviews.router');
const bookingRouter = require('./routes/bookings.router');
const viewRouter = require('./routes/views.router');

const bookingController = require('./controllers/booking.controller');

const app = express();

// Make app trust proxies
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ---- GLOBAL MIDDLEWARES ----

// Implement CORS
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

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

// Stripe needs the body in a raw form (not in JSON)
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout
);

// Body Parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie Parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization agains XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Compress all responses (not images)
app.use(compression());

// Test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log(req.cookies);
//   next();
// });

// ---- ROUTES ----

// API Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// View Routes
app.use('/', viewRouter);

// Undefined (404) routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
