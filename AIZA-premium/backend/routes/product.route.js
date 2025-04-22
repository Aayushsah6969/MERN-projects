import express from 'express';
import { 
    deleteProduct, 
    getProduct, 
    getOneProduct, 
    updateProduct, 
    uploadProduct 
} from '../controllers/product.controller.js';
import { isAdminMiddleware } from '../Authenticate/AdminMiddleWare.js';
import upload from '../config/multer.js'; // Updated multer middleware

const router = express.Router();

router.get('/getproduct', getProduct);
router.get('/getoneproduct/:id', getOneProduct);

// Updated to handle multiple images and protect with isAdminMiddleware
router.post('/uploadproduct', upload, isAdminMiddleware, uploadProduct);

router.put('/updateproduct/:id', isAdminMiddleware, updateProduct);
router.delete('/deleteproduct/:id', isAdminMiddleware, deleteProduct);

export default router;
