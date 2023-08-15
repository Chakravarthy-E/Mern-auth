const User = require("../models/user");
const { comparePassword, hashPassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};
//Register starting
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    //check if email entered
    if (!email) {
      return res.json({
        error: "please enter your email",
      });
    }
    //check password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be more then 6 characters ",
      });
    }
    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already taken",
      });
    }
    const hashedPassword = await hashPassword(password); //hashing password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};
//Register End

//Login start
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exit
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // checking password
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json("Passwords do not match");
    }
  } catch (error) {
    console.log(error);
  }
};
//Login End

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
