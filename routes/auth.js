const express = require('express').Router;
const app = express();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {isValidPassword } = require('../utils/hash');

//brute force protection
const ExpressBrute = require('express-brute');
//in store memory for persisting request counts
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

// Login route
router.post('/', bruteforce.prevent, async (req, res) => {
const user = await User.findOne ({userName: req.body.userName });
if (!user)
    return res.status(401).json({error: 'Incorrect username or password' });

const valid = await isValidPassword(req.body.password, user.password);

if (!valid)
return res.status(401).json ({ error: 'Incorrect username or password'});

const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);
res.send({token});

});

module.exports = router;