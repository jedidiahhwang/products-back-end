module.exports = {
    create: (req, res) => {
        const db = req.app.get("db");
        const {name, description, price, image_url} = req.body;

        db.create_product([name, description, price, image_url]).then(product => {
            res.status(200).send(product);
        }).catch((err) => {
            res.status(500).send(`Something went wrong!`);
        })
    },
    getOne: (req, res) => {
        const db = req.app.get("db");
        const {id} = req.params;
        console.log(id);
        db.read_product([id]).then(product => {
            res.status(200).send(product);
        }).catch((err) => {
            res.status(500).send(`Something went wrong!`);
            console.log(err);
        })
    },
    getAll: (req, res) => {
        const db = req.app.get("db");

        db.read_products().then(products => {
            res.status(200).send(products);
        }).catch((err) => {
            res.status(500).send(`Something went wrong!`);
            console.log(err);
        })
    },
    update: (req, res) => {
        const db = req.app.get("db");
        const {description} = req.body;
        const {id} = req.params;

        db.update_product([id, description]).then(product => {
            res.status(200).send(product);
        }).catch((err) => {
            res.status(500).send(`Something went wrong!`);
            console.log(err);
        })
    },
    delete: (req, res) => {
        const db = req.app.get("db");
        const {id} = req.params;

        db.delete_product([id]).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            res.status(500).send(`Something went wrong!`);
            console.log(err);
        })
    }
}