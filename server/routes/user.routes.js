import { Router } from "express";
import { forgotPassword, getPrfile, login, logout, register, resetPassword } from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router=Router();

// for Register
router.post('/register', upload.single("avatar"), register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn, getPrfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken',resetPassword);
// router.post('/change-password',isLoggedIn , changePassword);
// router.post('update/', isLoggedIn, upload.single("avatar"), updateUser);




export default router;