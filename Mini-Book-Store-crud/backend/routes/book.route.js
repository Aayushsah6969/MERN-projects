import express from 'express';
import { Book } from '../models/book.model.js';

const router = express.Router();

//Route to save the New Book
router.post('/addBook', async(req, res)=>{
    //try to  post the book
    try {
        //check if all the fields are filled
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ error: "All fields are required" });
        }
        //variable to store the book data
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

            //save the book
            const result = await Book.create(newBook);
            res.send(result);

        //catch the error
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
})

//Route to get all saved books
router.get('/getBooks',async(req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
});


//Route to get one book by its ID
router.get('/getBooks/:id',async(req, res)=>{
    try {
        const {id}= req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
})

//Route to update the book
router.put('/updateBook/:id',async (req, res)=>{
    try {
        //check if any field is empty or not
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ error: "All fields are required" });
        }

        //id for the tareted book
        const {id}=req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({ error: "Book not found" });
        }
        return res.status(200).send({message: 'Book updated successfully'});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
})

//Route to delete a book
router.delete('/deleteBook/:id', async(req, res)=>{
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({ error: "Book not found" });
        }
        return res.status(200).send({message: 'Book deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:error.message});
    }
})

export default router;