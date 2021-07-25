let Users = [
    {
        id: "1",
        name: "Chaerfansyah"
    },
    {
        id: "2",
        name: "Novraina"
    }
]

exports.findAll = (req, res, next) => {
    const q = req.query;
    let data = Users;
    
    if (q.id) data = Users.filter(row => row.id == q.id)
    if (q.name) data = Users.filter(row =>  row.name == q.name)
    
    res.json({ data });
}

exports.findById = (req, res, next) => {
    const id = req.params.id
    const data = Users.filter( row =>  row.id == id);

    res.json({ id, data })
}

exports.insert = (req, res, next) => {
    const data = req.body;

    Users.push(data);

    res.json({ data: Users });
}

exports.update = (req, res, next) => {
    const id = req.params.id
    let data = Users;
    const index = Users.findIndex(row => row.id == id)

    if (req.body.name) data[index].name = req.body.name;

    res.json({ message: `${id} updated!`, data});
}

exports.removeById = (req, res, next) => {
    const id = req.params.id
    const index  = Users.findIndex(row => row.id == id)

    Users.splice(index, 1)

    res.json({ message: `${id} deleted!`, data: Users});
}

exports.remove = (req, res, next) => {
    Users = []
    res.json({ message: `All Users removed!`, data: Users });
}