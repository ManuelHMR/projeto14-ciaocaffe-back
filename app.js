import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import sessionRouter from "./routers/sessionRouter.js"
import productsRouter from "./routers/productsRouter.js"

const app = express();
let port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(sessionRouter);
app.use(productsRouter);
//app.use(xxxRouter)

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});