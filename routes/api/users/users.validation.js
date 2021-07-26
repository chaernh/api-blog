const { body, param } = require('express-validator')
const { cekRolesId } = require('../roles/roles.controller')
const { findByUserOrEmail } = require('./users.controller')

exports.validation = [
    body('username').trim().custom(value => {
        return findByUserOrEmail(value).then(user => {
            if (user) {
                return Promise.reject("Username telah terdaftar!")
            }
        })
    }),
    body('displayName').trim().escape(),
    body('email').isEmail().normalizeEmail().custom(value => {
        return findByUserOrEmail(value).then(user => {
            if (user) {
                return Promise.reject("E-mail telah terdaftar!")
            }
        })
    }),
    body('role').isMongoId().custom(value => {
        return cekRolesId(value).then(role => {
            if(!role){
                return Promise.reject('Role tidak ditemukan!')
            }
        })
    })
    // body('password').isStrongPassword()
    // body('password').isLength({ min: 8 })
]

exports.paramValidation = [
    param('id').isMongoId().withMessage('Invalid Mongo ID!')
]