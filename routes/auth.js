
import express from "express";
import User from "../model/User.js";
import { registerValidation } from "../validation/joi.js";
import CryptoJS from "crypto-js";
import  jwt  from "jsonwebtoken";
const router = express.Router();

// REGISTER USER

router.post('/register', async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { password } = req.body;
    const hashPass = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();

    const newUser = new User({ ...req.body, password: hashPass });
    await newUser.save();

    res.status(200).send({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// LOGIN USER

router.post('/login', async (req, res) => {
  try {
    const { username, } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const decryptedPasswordBytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== req.body.password) {
      return res.status(400).json({ error: "Invalid password" });

    }


    const token = jwt.sign(
      {id:user._id,isAdmin:user.isAdmin},
       process.env.JWT_SEC, 
       { expiresIn: '3d' });

const {password , ...other}=user._doc
    res.status(200).json({...other,token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// LOGOUT USER
router.post('/logout', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    // Find the user based on the token
    const user = await User.findOne({ 'token': token });

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    // Remove the token from the user's tokens array
    user.tokens = user.tokens.filter((storedToken) => storedToken !== token);
    await user.save();

    res.status(200).send({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





export default router;















