import express from "express";

import { getProducts } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/products", getProducts);

export default productsRouter;