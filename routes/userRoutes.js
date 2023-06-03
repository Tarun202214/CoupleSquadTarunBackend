const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
var userModel = require('../models/usersDB')
const { check, validationResult } = require('express-validator');
const {login,signup,logout} = require('../controllers/loginControllers')
router.post('/login',login)
router.post('/signup',signup)
router.post('/signout',logout)
module.exports = router