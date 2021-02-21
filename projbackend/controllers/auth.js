const User = require('../models/user');

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((err, usersaved) => {
    //********* showing error here that user is already declared in the upper scope*************
    if (err || !usersaved) {
      console.log(err);
      return res.status(400).json({
        err: 'Not able to save user in DB',
      });
    }
    res.json({
      name: usersaved.name,
      email: usersaved.email,
      id: usersaved._id,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: 'User signout',
  });
};
