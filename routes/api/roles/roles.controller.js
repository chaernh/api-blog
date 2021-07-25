let Roles = [
    {
        id: "admin",
        name: "Administrator"
    },
    {
        id: "guest",
        name: "Guest"
    }
]

exports.findAll = (req, res, next) => {
    const q = req.query;
    let data = Roles;
    
    if (q.id) data = Roles.filter(row => row.id == q.id)
    if (q.name) data = Roles.filter(row =>  row.name == q.name)
    
    res.json({ data });
}

exports.findById = (req, res, next) => {
    const id = req.params.id
    const data = Roles.filter( row =>  row.id == id);

    res.json({ id, data })
}

exports.insert = (req, res, next) => {
    const data = req.body;

    Roles.push(data);

    res.json({ data: Roles });
}

exports.update = (req, res, next) => {
    const id = req.params.id
    let data = Roles;
    const index = Roles.findIndex(row => row.id == id)

    if (req.body.name) data[index].name = req.body.name;

    res.json({ message: `${id} updated!`, data});
}

exports.removeById = (req, res, next) => {
    const id = req.params.id
    const index  = Roles.findIndex(row => row.id == id)

    Roles.splice(index, 1)

    res.json({ message: `${id} deleted!`, data: Roles});
}

exports.remove = (req, res, next) => {
    Roles = []
    res.json({ message: `All Roles removed!`, data: Roles });
}
