const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../models/books')
const Author = require('../models/authors')
const router = express.Router()

// const uploadPath = path.join('server', Book.coverImageBasePath)
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
    const bookAuthor = await Author.findOne({ 'name': req.body.authorName })
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
        // if (book.coverImageName !== null) {
        //     removeBookCover(book.coverImageName)
        // }
        res.status(400).send(error)
    }
})

// Select Book Route
router.get('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author')
        res.status(200).send(book)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Update Book Route
router.put('/:id', async(req, res) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        const bookAuthor = await Author.findOne({ 'name': req.body.author.name })
        book.title = req.body.title,
        book.author = bookAuthor
        book.publishedDate = new Date(req.body.publishedDate),
        book.pageCount = req.body.pageCount,
        book.bookCover = req.body.bookCover,
        book.description = req.body.description
        await book.save()
        res.status(200).send({
            success: true,
            'message': 'Book Updated Successfully'
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            'message': error
        })
    }
})

// Delete Book Route
router.delete('/:id', async(req, res) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        await book.remove()
        res.status(200).send({
            success: true,
            'message': 'Book deleted successfully'
        })
    } catch (error) {
        res.status(400).send({
            success: true,
            'message': error
        })
    }
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

