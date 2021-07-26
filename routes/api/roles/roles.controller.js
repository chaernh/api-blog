// let Roles = [
//     {
//         id: "admin",
//         name: "Administrator"
//     },
//     {
//         id: "guest",
//         name: "Guest"
//     }
// ]

const Roles = require('./roles.scheme')

exports.findAll = (req, res, next) => {
    const q = req.query;
    const where = {}
    
    if (q.name) where['name'] = q.name
    if (q.name_long) where['name_long'] = q.name_long
    
    Roles.find(where).limit(req.query.limit || 0).skip(req.query.skip || 0).sort('-_id').then(roles => {
        res.json(roles)
    }).catch(e => next(e))
}

exports.findById = (req, res, next) => {
    const id = req.params.id
    
    Roles.findById(id).then(roles => {
        res.json(roles)
    }).catch(e => next(e))
}

exports.insert = (req, res, next) => {
    const data = req.body;

    Roles.create(data).then(roles => {
        res.json({
            message: `New role added!`,
            data: roles
        })
    }).catch(e => next(e))
}

exports.update = (req, res, next) => {
    const id = req.params.id
    const data = req.body

    Roles.findByIdAndUpdate(id, data).then(roles => {
        res.json({
            message: `Role with id ${id} updated!`,
            data: roles
        })
    }).catch(e => next(e))
}

exports.removeById = (req, res, next) => {
    const id = req.params.id

    Roles.findByIdAndRemove(id).then(roles => {
        res.json({
            message: `Data with id ${id} deleted!`,
            data: roles
        })
    }).catch(e => next(e))
}

exports.remove = (req, res, next) => {
    Roles.remove().then(roles => {
        res.json({
            message: `All datas removed!`,
            data: roles
        })
    }).catch(e => next(e))
}
