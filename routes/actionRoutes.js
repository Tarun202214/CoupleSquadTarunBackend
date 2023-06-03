const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
var userModel = require('../models/usersDB')
const { check, validationResult } = require('express-validator');
const {editProfile} = require("../controllers/userControllers")
const {getUserById} = require("../middlewares/userParam")
const {isSignedIn,isAuthenticated} = require("../controllers/authControllers")
router.param("user",getUserById)
router.put("/:user",isSignedIn,isAuthenticated,editProfile)
module.exports = router