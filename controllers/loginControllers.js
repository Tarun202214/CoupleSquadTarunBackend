const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
var userModel = require('../models/usersDB')
const { check, validationResult } = require('express-validator');

exports.login = async (req, res) => {
    try {
        console.log("login me ")
        const record_to_find = await userModel.findOne({
            Email: req.body.email, Password: req.body.password
        })
        console.log(record_to_find, req.body)
        if (!record_to_find) {
            res.json({ error: "No User Was Found" });
        }
        const Token = jwt.sign(
            {
                email: req.body.email, _id: record_to_find._id
            }
            , process.env.SECRET)
        res.cookie("UserLoggedIN", Token);
        const { _id, Email, Password, Phone, Name } = record_to_find
        return res.json({ Token, user: { _id, Email, Password, Phone, Name } })
    } catch (error) {
        console.log(error);
        res.json({ Message: "Error, Kindly Login Again" })
    }
}

exports.signup =  async (req, res) => {
        try {
            const record_new = await new userModel({
                Email: req.body.Email,
                Password: req.body.Password,
                Name: req.body.Name,
                Phone: req.body.Phone,
            })
            await record_new.save();
            const token = jwt.sign(
                {
                    email: req.body.Email, _id: record_new._id
                }
                , process.env.SECRET)
            console.log(token);
            res.cookie("user", token, {
                httpOnly: true
            })
            return res.json({ record_new });
        }
        catch (err) {
            console.log(err)
            return res.json({ errors: [{ 'msg': "Error in the SiginUp, Kindly Try again later" }] })
        }
}

exports.logout = async (req, res) => {
    console.log('res', res)
    res.clearCookie('UserLoggedIN')
    res.json({
        Message: "Cookie Cleared"
    })
}