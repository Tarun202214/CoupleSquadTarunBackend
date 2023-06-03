const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
var userModel = require('../models/usersDB')
const { check, validationResult } = require('express-validator');

exports.editProfile = async (req, res) => {
    try {
        console.log(req.profile, req.body)
        const userLoggedin = await userModel.findOne({ _id: req.profile._id })
        userLoggedin.Name = req.body.Name
        userLoggedin.Email = req.body.Email
        userLoggedin.Phone = req.body.Phone
        userLoggedin.Password = req.body.Password
        const Token = jwt.sign(
            {
                email: req.body.Email, _id: userLoggedin._id
            }
            , process.env.SECRET)
        await userLoggedin.save();
        const { _id, Email, Password, Phone, Name } = userLoggedin
        return res.json({ Token, user: { _id, Email, Password, Phone, Name } })
    } catch (error) {
        console.log(error)
    }
}