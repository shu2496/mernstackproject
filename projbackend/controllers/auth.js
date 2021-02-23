const User = require('../models/user');
const { check, validationResult } = require('express-validator');

var jwt = require('jsonwebtoken');
var exppressJwt = require('express-jwt');

const { json } = require('body-parser');

exports.signup = (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }


  console.log(req.body);
  const user = new User(req.body);
  user.save((err, usersaved) => {
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

exports.signin = (req, res) => {

  const errors = validationResult(req);

  const { email, password} = req.body;

  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User email does not exists"
      });
    }

    if(!user.authenticate(password) ) {
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
    // create token
    const token = jwt.sign({ _id: user._id},  process.env.SECRET);
    // put token in cookie
    res.cookie("token", token , { expire: new Date() + 9999});

    // send respond to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role} }); 
  }); 
};

exports.signout = (req, res) => {
  res.json({
    message: 'User signout',
  });
};
