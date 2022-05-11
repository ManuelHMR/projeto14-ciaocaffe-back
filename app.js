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

app.use(sessionRouter);
app.use(productsRouter);
//app.use(xxxRouter)

app.listen(port, () => {
    console.log(`Servidor ligado na porta ${port}`)
});