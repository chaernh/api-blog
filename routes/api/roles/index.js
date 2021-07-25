const express = require('express')
const router = express.Router()

const c = require('./roles.controller')

router.get('/', c.findAll)
router.get('/:id', c.findById)
router.post('/', c.insert)
router.put('/:id', c.update)
router.delete('/:id', c.removeById)
router.delete('/', c.remove)

module.exports = router