"use strict";

const { mongoose } = require('../configs/dbConnection')

//! new ile yazdığım kısım bir instance oluşturma
const TokenSchema = new mongoose.Schema({
//!Hangi user için token göndereceğimi bilmek için userId field ekledim.
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personnel',
        required: true,
        index: true,
        unique: true,
    },

    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true,
    },

}, {
    collection: 'tokens',
    timestamps: true
})


module.exports = mongoose.model('Token', TokenSchema)