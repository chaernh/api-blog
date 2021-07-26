const express = require('express')
const router = express.Router()
const { auth } = require('../../../secret')
const { validation } = require('./users.validation')

const c = require('./users.controller')

router.get('/', auth, c.findAll)
router.get('/:id', auth, c.findById)
router.post('/', auth, validation, c.insert)
router.put('/:id', auth, validation, c.update)
router.delete('/:id', auth, c.removeById)
router.delete('/', auth, c.remove)

module.exports = router