const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/books'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishedDate : {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    bookCover: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    __v: { type: Number, select: false },
}, {
    toJSON: { virtuals: true},
})

// bookSchema.virtual('coverImagePath').get(function() {
//     if (this.coverImageName != null) {
//         return path.join('server', coverImageBasePath, this.coverImageName)
//     }
// })
module.exports = mongoose.model('Book', bookSchema)
// module.exports.coverImageBasePath = coverImageBasePath