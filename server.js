const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, './client/build')));
app.use('*', (req, res) => res.status(200).send('index.html'));


http.createServer(app).listen(port, () => {
    console.log(`App running on port ${port}.`);
});
