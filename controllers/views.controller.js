const Tour = require('../models/tour.model');
const catchAsync = require('../utils/catchAsync.utils');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Render that template using tour data
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
