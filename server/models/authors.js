const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
    
    
})

module.exports = mongoose.model('Author', authorSchema)