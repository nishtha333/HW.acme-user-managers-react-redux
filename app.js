const path = require('path');
const express = require('express');
const app = express();

module.exports = app;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use('/api/users', require('./api/users'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
    let error = new Error("Could not find the resource");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || "Error occurred with the request");
});