import  { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    id: {
        type: String,
        require,
    },

    title: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        default: '',
    },

    authors: {
        type: String,
        default: '',
    },

    favorite: {
        type: String,
        default: 'false',
    },

    fileCover: {
        type: String,
        default: '',
    },

    fileName: {
        type: String,
        default: '',
    },

    fileBook: {
        type: String,
        default: '',
    },
});

export const Books = model('Books', bookSchema);


