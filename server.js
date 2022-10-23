const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/dist/DIGILIB'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/DIGILIB/index.html'));
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})