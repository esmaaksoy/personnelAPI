"use strict"

const router = require('express').Router()

const token = require('../controllers/token.controller')

//! Tüm permission çağırmamak için dest ettik isAdmini
const { isAdmin } = require('../middlewares/permissions')

//! Bütün routelara permission.isAdmin diye eklemek yerine router.use(isAdmin) yazarsam aynı işi yapar.
router.use(isAdmin)

router.route('/')
    .get(token.list)
    .post(token.create)

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete)


module.exports = router