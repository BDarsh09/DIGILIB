const { response } = require('express')
const express = require('express')
const Author = require('../models/authors')
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
        res.status(200).send({success: true, 'message': 'Author saved successfully'})
    } catch (error) {
        res.status(400).send(error)
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