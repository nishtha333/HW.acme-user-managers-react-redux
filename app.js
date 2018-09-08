const path = require('path');
const express = require('express');
const app = express();

module.exports = app;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use('/api/users', require('./api/users'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});