const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/multer');
const userController = require('../controllers/userController')

router.post('/login',userController.doLogin);
router.post('/signup',userController.doSignup);
router.get('/profile',userController.getProfile);
router.patch('/profile/edit',userController.doEditProfile)
router.patch('/profile/uploadImage',upload.single('image'),userController.doUploadImage);

module.exports = router