"use strict"

const Personnel = require('../models/personnel.model')
const Token = require('../models/token.model')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {


    login: async (req, res) => {

        const { username, password } = req.body

        if (username && password) {

            //! findOne, passwordu modeldeki set metodundaki encrypt i kullanarak db'de filtreleme yapar
            const user = await Personnel.findOne({ username, password })
            if (user && user.isActive) {

                let tokenData = await Token.findOne({ userId: user._id })

                if (!tokenData) {
                    const tokenKey = passwordEncrypt(user._id + Date.now())
             
                    tokenData = await Token.create({ userId: user._id, token: tokenKey })
                }
                
      
                res.status(200).send({
                    error: false,
                    token: tokenData.token,
                    user
                })

            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong Username or Password.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }
    },

    logout: async (req, res) => {

        req.session = null

        //! 1. Yöntem (Kısa yöntem)
        // Her kullanıcı için sadece 1 adet token var ise (tüm cihazlardan çıkış yap):
        // const deleted = await Token.deleteOne({ userId: req.user._id })  
     
        
        //! 2. Yöntem (Uzun yöntem)
        // Her kullanıcı için 1'den fazla token var ise (çoklu cihaz)

        const auth = req.headers?.authorization || null 
        const tokenKey = auth ? auth.split(' ') : null 
    
        let deleted = null;
        if (tokenKey && tokenKey[0]=='Token') {
            deleted = await Token.deleteOne({ token: tokenKey[1] })
        }

        res.status(200).send({
            error: false,
            message: 'Logout: Token Deleted.',
            deleted
        })
    },
}