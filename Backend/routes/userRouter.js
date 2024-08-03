const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/login',userController.doLogin);
router.post('/signup',userController.doSignup);

module.exports = router