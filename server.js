if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const path = require('path');
const authorsRoute = require('./server/routes/authors')
const booksRoute = require('./server/routes/books')
const mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/dist/DIGILIB'));
app.use(express.json())

// default route to load whole application
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/DIGILIB/index.html'));
});

// database connection
mongoose.connect(process.env.MONGODB_URL, {})

// Routes section
app.use('/api/authors', authorsRoute)
app.use('/api/books', booksRoute)

// Listener
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// mickey_marry9997, digilib9997
// mongodb + srv://mickey_marry9997:<password>@cluster0.szdkmjv.mongodb.net/test