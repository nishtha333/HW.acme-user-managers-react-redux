const db = require('../db');
const { Users } = db.models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    Users.findAll()
        .then(users => res.send(users))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Users.destroy({ where: {id: req.params.id} })
        .then(() => res.sendStatus(204))
        .catch(next);
});

router.post('/', (req, res, next) => {
    const user = { name: req.body.name, managerId: req.body.managerId };
    Users.create(user)
        .then(user => res.send(user))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => user.update({ name: req.body.name, managerId: req.body.managerId }))
        .then(user => res.send(user))
        .catch(next);
});