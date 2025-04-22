import Book from '../models/product.model.js';

//get all books from database.
export const getProduct =async (req, res)=>{
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json(error);
    }
};
//get one particular book
export const getOneProduct = async (req, res) => {
    const { id } = req.params; // Access id correctly
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const uploadProduct = async (req, res) => {
    const { name, price, discount, category, description, isFeatured } = req.body;

    // Collect all image URLs from the uploaded files
    const images = req.files.map((file) => file.path); // Multer stores the image URLs in req.files[].path

    const product = new Book({
        name,
        price,
        discount,
        category,
        description,
        images, // Store the array of image URLs
        isFeatured,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json({ message: "Product uploaded successfully", product: newProduct });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const updateProduct = async(req, res)=>{
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!updatedBook) return res.status(404).json({message: "Book not found"});
        res.status(200).json({message:"Book Updated Successfully", book:updatedBook})
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json("Error: ",error);
    }
};

export const deleteProduct = async(req, res)=>{
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook) return res.status(404).json({message: "Book not found"});
        res.status(200).json({message:"Book Deleted Successfully", book:deletedBook})
    } catch (error) {
        console.log("Error:",error.message);
        res.status(500).json("Error: ",error);
    }
 
};