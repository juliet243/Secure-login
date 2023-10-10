const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    firstName: String,
    lastName: String,
    age: String,
    password: String
});

const User = mongoose.model('User', userSchema);

function validateUser(user) 
{
    const schema = Joi.object({
        userName: Joi.string().min(3).max(50).required(),
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(4).max(100).required(),
        age: Joi.string().min(1).max(10).required(),
        password: Joi.string().min(3).max(50).required()
    });
    return schema.validate(user);
}

module.exports = {User, validateUser};