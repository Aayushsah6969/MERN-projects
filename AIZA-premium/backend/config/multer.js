import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'books', // Folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp", "heif", "avif"],
    },
});

// Allow multiple files to be uploaded
const upload = multer({ storage }).array('images', 10); // Max of 10 images

export default upload;
