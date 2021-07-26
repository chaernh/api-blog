const { body, param } = require('express-validator')
const { findByName } = require('./roles.controller')

exports.validation = [
    body('priority').toInt(),
    body('name_long').isLength({ max: 20 }).withMessage('Max 20 character!')
]

exports.paramValidation = [
    param('id').isMongoId().withMessage('Invalid Mongo ID!')
]