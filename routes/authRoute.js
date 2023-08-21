
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {User} = require("../models/userModel");

// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password)

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword });
//     await user.save();
//     res.json({ message: 'Signup successful' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'Please create acccount first !' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'masai');
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });

// module.exports = router;


const express = require("express");
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

// UserRouter.get("/", (req, res) => {
//   res.send("welcome to home");
// });

router.post("/signup", async (req, res) => {
  const { email,password} = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newUser = new UserModel({email,password:hash});
        await newUser.save();
        res.status(200).json({ msg: "New user has been registered" });
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { autherID: user._id, auther: user.name },
            "masai"
          );
          res.status(200).json({ msg: "Login successful !!", token: token });
        } else {
          res.status(400).json({ msg: "Password Mismatch !!" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please create an account first !!" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
