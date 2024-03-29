const mongoose = require('mongoose')
const Book = require('../models/books')
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
    
})

authorSchema.pre('remove', function preRemove(next) {  
    Book.find({ author: this._id }, (error, books) => {
        if (error) {
            next(error)
        } else if (books.length > 0) {
            next(new Error('This author still has books'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)