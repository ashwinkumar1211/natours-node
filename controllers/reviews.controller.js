const Review = require('../models/review.model');
const handlerFactory = require('../utils/handlerFactory.utils');
const AppError = require('../utils/appError.utils');
// const catchAsync = require('../utils/catchAsync.utils');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkIfUserIsAuthor = async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (req.user.role !== 'admin' && review.user.id !== req.user.id)
    return next(new AppError(`You cannot edit someone's else review`, 403));

  next();
};

exports.getAllReviews = handlerFactory.getAll(Review);
exports.getReview = handlerFactory.getOne(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.updateReview = handlerFactory.updateOne(Review);
exports.deleteReview = handlerFactory.deleteOne(Review);
