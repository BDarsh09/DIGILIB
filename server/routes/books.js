const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../models/books')
const Author = require('../models/authors')

// const uploadPath = path.join('server', Book.coverImageBasePath)
const router = express.Router()
// const upload = multer({
//     dest: uploadPath
// })

// All Books Route
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).populate("author")
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Create Books Route
router.post('/', async (req, res) => {
    // const fileName = req.file != null ? req.file.filename : null    
    const bookAuthor = await Author.findOne({ 'name': req.body.author })
    const book = new Book({
        title: req.body.title,
        author: bookAuthor,
        publishedDate: req.body.publishedDate,
        pageCount: req.body.pageCount,
        bookCover: req.body.bookCover,
        description: req.body.description
    })
    try {
        await book.save()
        res.status(200).send(book)
    } catch (error) {
        if (book.coverImageName !== null) {
            removeBookCover(book.coverImageName)
        }
        res.status(400).send(error)
    }
})

router.get('/:id', async(req, res) => {
})

function convertToBase64() {
    let objJsonStr = JSON.stringify(fetchedData);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
    return objJsonB64
}

function removeBookCover() {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) {
            console.log(error)
        }
    })
}

module.exports = router