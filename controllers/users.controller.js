const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync.utils');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });

  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
});

const createUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
