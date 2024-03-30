"use strict"

const router = require('express').Router()



router.use('/auth', require('./auth.router'))

router.use('/tokens', require('./token.router'))

router.use('/personnels', require('./personnel.router'))

router.use('/departments', require('./department.router'))

module.exports = router