"use strict"

const router = require('express').Router()


const personnel = require('../controllers/personnel.controller')


router.post('/login', personnel.login)
router.all('/logout', personnel.logout)

router.route('/')
    .get(personnel.list)
    .post(personnel.create)

router.route('/:id')
    .get(personnel.read)
    .put(personnel.update)
    .patch(personnel.update)
    .delete(personnel.delete)

module.exports = router