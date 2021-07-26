const { body } = require('express-validator')
exports.validation = [
    body('username').trim(),
    body('displayName').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    // body('password').isStrongPassword()
    // body('password').isLength({ min: 8 })
]