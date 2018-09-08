const express = require('express');
const app = express();

module.exports = app;

app.use(express.json());
app.use('/api/users', require('./api/users'));