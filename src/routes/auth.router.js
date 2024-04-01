"use strict"

const router = require('express').Router()

const auth = require('../controllers/auth.controller')

router.post('/login', auth.login)
router.get('/logout', auth.logout)
// !router.all('/logout', auth.logout)   swagger all metodunu desteklemez, oyüzden get yaptık bunu



module.exports = router