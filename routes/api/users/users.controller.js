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
const createError = require('http-errors')

exports.login = (username, password) => {
    return new Promise((resolve, reject) => {
        Users.findOne({ username })
        .select('_id password username role')
        .populate('role')
        .then((foundUser) => {
            if (!foundUser) return reject(createError(400, 'Username not found!'))
                const hashedPassword = foundUser.password
                const isValidPassword = passwordHash.verify(password, hashedPassword)
                if (isValidPassword) {
                    resolve(foundUser)
                } else {
                    reject(createError(400, 'Wrong Password!'))
                }
        })
    })
}


exports.findAll = (req, res, next) => {
    const q = req.query;
    const where = {}
    
    if (q.email) where['email'] = q.email
    if (q.username) where['username'] = q.username
    if (q.displayName) where['displayName'] = q.displayName
    
    Users.find(where).limit(req.query.limit || 0).skip(req.query.skip || 0).populate('role').then(users => {
        res.json(users)
    }).catch(e => next(e))
}

exports.findById = (req, res, next) => {
    const id = req.params.id

    Users.findById(id).populate('role').then(users => {
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