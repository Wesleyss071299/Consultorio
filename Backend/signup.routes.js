const express = require("express");
const User = require("./user.model");
const UserSession = require("./userSession.model");
const router = express.Router();

router.route("/account/signup").post((req, res, next) => {
  const { body } = req;
  const { firstName, lastName, password } = body;
  let { email } = body;

  if (!firstName) {
    return res.send({
      success: false,
      message: "Error: First name cannot be blank."
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: "Error: Last name cannot be blank."
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find({
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.status(500).send({
          message: 'Error: Server Error',
      });
      } else if (previousUsers.length > 0) {
        return res.status(400).send("Exists");
      }else{
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
      
        newUser.save()
      }
    });
});

router.route("/account/signin").post((req, res) =>{
  const {body} = req;
  const{
    password
  } = body;
  let {
    email
  } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank."
    });
  }


  email = email.toLowerCase();

  User.find({
    email: email
  }, (err, users) => {
    if(err){
      return res.status(500).send({
        message: 'Error: Server Error',
     });
    }

    if(users.length != 1){
      return res.status(500).send({
        message: 'Error: Server Error',
    });
    }

    const user = users[0]
    if(!user.validPassword(password)){
      return res.status(500).send({
        message: 'Error: Server Error',
     });
    }

    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, docs) => {
      if(err){
        return res.status(500).send({
          message: 'Error: Server Error',
       });
      }else{
        return res.send({
          success: true,
          message: "Valid signin",
          token: docs._id
        });
      }
    });
  
  });
});

router.route("/account/verify").get((req, res) =>{
  const {query} = req;
  const {token} = req;

  UserSession.find({
    _id: token,
    isDeleted:false
  }, (err, sessions) => {
    if(err){
      return res.status(500).send({
        message: 'Error: Server Error',
     });
    }

    if(sessions.length != 1){
      return res.status(500).send({
        message: 'Error: Server Error',
     });
    }else{
      return res.send({
        success: true,
        message: "Good",
      });
    }
  });
});

module.exports = router;
