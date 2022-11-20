const express = require('express')
const Author = require('../models/authors')
const Book = require('../models/books')
const router = express.Router()

// All Authors Route
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({})
        const encoded = convertToBase64(authors)
        res.status(200).send(encoded)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Create Authors Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.authorName
    })
    try {
        await author.save()
        res.status(200).send({
            success: true, 
            message: 'Author saved successfully'
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// Select Author
router.get('/:id', async(req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author: author.id}).limit(6).exec()
        res.status(200).send({
            author: author.name,
            books: books
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// Update Author
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.status(200).send({ 
            success: true, 
            'message': 'Author updated successfully' 
        })
    } catch (error) {
        res.status(400).send({ 
            success: false, 
            author: author, 
            message: 'Error in updating author'
        })
    }
})

// Delete Author
router.delete('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await author.remove()
        res.status(200).send({
            success: true,
            'message': 'Author deleted successfully'
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            author: author.name,
            message: error.message ? error.message : 'Error in deleting author'
        })
    }
})

function convertToBase64(fetchedData) {
    let responseJson = {}
    let objJsonStr = JSON.stringify(fetchedData);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
    responseJson.data = objJsonB64
    return responseJson
}

module.exports = router