const testGetController =  (req, res) =>{
    const {name} = req.body;
res.status(200).send(`your name is ${name}`);
}

module.exports = { testGetController };
