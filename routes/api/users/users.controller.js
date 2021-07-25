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

const Users = require('./users.scheme')
const passwordHash = require('password-hash')

exports.findAll = (req, res, next) => {
    const q = req.query;
    const where = {}
    
    if (q.email) where['email'] = q.email
    if (q.username) where['username'] = q.username
    if (q.displayName) where['displayName'] = q.displayName
    
    Users.find(where).limit(req.query.limit || 0).skip(req.query.skip || 0).then(users => {
        res.json(users)
    }).catch(e => next(e))
}

exports.findById = (req, res, next) => {
    const id = req.params.id

    Users.findById(id).then(users => {
        res.json(users)
    }).catch(e => next(e))
}

exports.insert = (req, res, next) => {
    const data = req.body;

    data.password = passwordHash.generate(data.password)
    Users.create(data).then(users => {
        res.json({
            message: 'Data inserted',
            data: users
        })
    })
}

exports.update = (req, res, next) => {
    const id = req.params.id
    let data = req.body;

    if (data.password) data.password = passwordHash.generate(data.password)

    Users.findByIdAndUpdate(id, data).then(users => {
        res.json({
            message: `Data with ID ${id} updated!`,
            data: users
        })
    }).catch(e => next(e))
}

exports.removeById = (req, res, next) => {
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