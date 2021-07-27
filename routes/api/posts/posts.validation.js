const { body, param } = require('express-validator')

exports.validation = [
    
]

exports.paramValidation = [
    param('id').isMongoId().withMessage('Invalid ID!')
]