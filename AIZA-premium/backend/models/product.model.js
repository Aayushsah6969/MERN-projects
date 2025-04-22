import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    discount: Number,
    category: String,
    images: [String], // Change from a single string to an array of strings for multiple image URLs
    description: String,
    isFeatured: {
        type: Boolean,
        default: false
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
