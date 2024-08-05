const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {isAuthAdmin} = require('../middlewares/Authenication');


router.post("/login",adminController.doAdminLogin);
router.get('/get_users',isAuthAdmin,);
router.get('/search_user',isAuthAdmin);
router.post('/create_user',isAuthAdmin);
router.patch('/edit_user/:id',isAuthAdmin);
router.delete('/delete_user/:id',isAuthAdmin);

module.exports = router;
