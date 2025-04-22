import express from 'express';
import { allUsers, deleteUser, login, resetPassword, signup, UpdatePassword, updateUsers, verifyEmail,  } from '../controllers/user.controller.js';
import { isAdminMiddleware } from '../Authenticate/AdminMiddleWare.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login',login);
router.get('/verify-email', verifyEmail); // Verification link will hit this route


router.post('/reset-password', resetPassword);
router.post('/update-password', UpdatePassword);


//need to be protected by middlware since this is to be done by admin only...
router.get('/getusers',isAdminMiddleware, allUsers);
router.put('/updateuser/:id',isAdminMiddleware, updateUsers);
router.delete('/deleteuser/:id',isAdminMiddleware, deleteUser);
export default router;