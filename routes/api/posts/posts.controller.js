// let Users = [
//     {
//         id: "1",
//         name: "Chaerfansyah"
//     },
//     {
//         id: "2",
//         name: "Novraina"
//     }
// ]

const Users = require('./posts.scheme')
const passwordHash = require('password-hash')
const createError = require('http-errors')
const { validationResult } = require('express-validator')

exports.findAll = (req, res, next) => {
    const q = req.query;
    const where = {}
    
    if (q.title) where['title'] = q.title
    // if (q.category) where['category'] = q.category
    
    Users.find(where).limit(req.query.limit || 0).skip(req.query.skip || 0).populate('author').sort('-createdAt').then(users => {
        res.json(users)
    }).catch(e => next(e))
}

exports.findById = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const id = req.params.id

    Users.findById(id).populate('author').then(users => {
        res.json(users)
    }).catch(e => next(e))
}

exports.insert = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const data = req.body;
    
    Users.create(data).then(users => {
        res.json({
            message: 'Data inserted',
            data: users
        })
    })
}

exports.update = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    const id = req.params.id
    const data = req.body;

    if (data.password) 
        data.password = passwordHash.generate(data.password)

    Users.findByIdAndUpdate(id, data).then(users => {
        res.json({
            message: `Data with ID ${id} updated!`,
            data: users
        })
    }).catch(e => next(e))
}

exports.removeById = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const id = req.params.id
    
    Users.findByIdAndRemove(id).then(users => {
        res.json({
            message: `Data with id ${id} deleted!`,
            data: users
        })
    }).catch(e => next(e))
}

exports.remove = (req, res, next) => {
    Users.remove().then(users => {
        res.json({
            message: 'All datas deleted!',
            data: users
        })
    }).catch(e => next(e))
}