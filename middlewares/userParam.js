const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
var userModel = require('../models/usersDB')
const { check, validationResult } = require('express-validator');

exports.getUserById = (req, res, next, id) => {   
    userModel.findById(id).then((res) => {    
        console.log('user', res)
        console.log("hui hii")
        req.profile = res;
        next()
    }).catch((Err)=>{
        console.log(Err)
    })
}