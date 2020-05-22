const express = require('express');
const tourController = require('../controllers/tours.controller');

const router = express.Router();

router.param('id', tourController.checkTourId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
