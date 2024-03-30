"use strict"

const router = require('express').Router()

const auth = require('../controllers/auth.controller')

router.post('/login', auth.login)
router.all('/logout', auth.logout)


module.exports = router