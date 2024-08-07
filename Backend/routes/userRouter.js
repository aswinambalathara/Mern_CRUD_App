const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/multer');
const userController = require('../controllers/userController');
const {isAuthUser} = require('../middlewares/Authenication');

router.post('/login',userController.doLogin);
router.post('/signup',userController.doSignup);
router.get('/profile',isAuthUser,userController.getProfile);
router.patch('/profile/edit',isAuthUser,userController.doEditProfile)
router.patch('/profile/uploadImage',isAuthUser,upload.single('image'),userController.doUploadImage);
 
module.exports = router