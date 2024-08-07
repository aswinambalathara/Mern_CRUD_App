const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {isAuthAdmin} = require('../middlewares/Authenication');


router.post("/login",adminController.doAdminLogin);
router.get('/get_users',isAuthAdmin,adminController.getUsers);
router.get('/search_users',isAuthAdmin,adminController.doSearchUser);
router.post('/create_user',isAuthAdmin,adminController.doCreateUser);
router.get('/get_user/:id',isAuthAdmin,adminController.doGetUser);
router.patch('/edit_user/:id',isAuthAdmin,adminController.doAdminEditUser);
router.delete('/delete_user/:id',isAuthAdmin,adminController.doDeleteUser);

module.exports = router;
