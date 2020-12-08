require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");

const productsCtrl = require("./products_controller");

const {SERVER_PORT, CONNECTION_STRING} = process.env;

app.use(express.json());

app.post("/api/products", productsCtrl.create);
app.get("/api/products", productsCtrl.getAll);
app.get("/api/products/:id", productsCtrl.getOne);
app.put("/api/products/:id", productsCtrl.update);
app.delete("/api/products/:id", productsCtrl.delete);

massive ({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    },
}).then(dbInstance => {
    console.log("DB Ready");
    app.set("db", dbInstance);
    app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`));
}).catch((err) => {
    console.log(err);
})