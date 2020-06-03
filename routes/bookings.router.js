const express = require('express');
const authController = require('../controllers/auth.controller');
const bookingController = require('../controllers/booking.controller');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
