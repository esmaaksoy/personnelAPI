"use strict"

const express = require('express')
const app = express()
app.use(express.json())


require("dotenv").config()
const PORT = process.env?.PORT || 8000

require("express-async-errors")

const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

app.use(require('cookie-session')({ secret: process.env.SECRET_KEY }))
app.use(require("./src/middlewares/queryHandler"))
app.use(require('./src/middlewares/errorHandler'))
app.use(require('./src/middlewares/authentication'))
app.use(require("./src/middlewares/logging"))

//!Documantation 

app.use('/documents/json', (req, res) => {
    res.sendFile('swagger.json', { root: '.' })
})

const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
app.use('/documents/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }))

const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({
    title: 'PersonnelAPI',
    specUrl: '/documents/json'
}))

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PERSONNEL API',
        user: req.user,
        api: {
            documents: {
                swagger: 'http://127.0.0.1:8000/documents/swagger',
                redoc: 'http://127.0.0.1:8000/documents/redoc',
                json: 'http://127.0.0.1:8000/documents/json',
            },
            contact: 'contact@clarusway.com'
        },
    })
    
})

app.use(require('./src/routes/index'))

app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))


// require('./src/helpers/sync')()