const catchAsync = require('./catchAsync.utils');
const AppError = require('./appError.utils');
const APIFeatures = require('./apiFeatures.utils');

const removeLastChar = (str) => {
  // tours => tour
  return str.substring(0, str.length - 1);
};

const getCollectionName = (Model) => Model.collection.collectionName;

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No ${getCollectionName(Model)} found with that ID`, 404)
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError(`No ${getCollectionName(Model)} found with that ID`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: { [removeLastChar(getCollectionName(Model))]: doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { [removeLastChar(getCollectionName(Model))]: newDoc },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id); // Model.findOne({_id: req.params.id})

    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No ${getCollectionName(Model)} found with that ID`, 404)
      );
    }

    res.status(200).json({
      status: 'success',
      data: { [removeLastChar(getCollectionName(Model))]: doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Lazy hack for Reviews. Need to refactor!
    // Reviews can be obtained by GET /reviews.
    // The below code allows nested tour ids as GET /tours/:tourId/reviews
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { [getCollectionName(Model)]: doc },
    });
  });
