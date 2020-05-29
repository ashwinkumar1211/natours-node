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

exports.getTour = catchAsync(async (req, res) => {
  // 1) Get the data for the requested tour (including reviews and tour guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  // 2) Render template using data
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });

  // res.status(200).json({ tour });
});
