const db = require('./db');

db.sync()
    .then(() => db.seed())
    .then(() => "Listening");