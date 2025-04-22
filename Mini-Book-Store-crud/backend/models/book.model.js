import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
    {
        title:{
            type: 'string',
            required: true,
            minlength: 5,
            maxlength: 100
        },
        author:{
            type: 'string',
            required: true,
            minlength: 5,
            maxlength: 50
        },
        publishYear:{
            type: 'number',
            required: true,
            min: 1800,
            max: 2100
        },
    },
        {
            timestamps:true,
        }
    
);

export const Book = mongoose.model('Book', BookSchema);