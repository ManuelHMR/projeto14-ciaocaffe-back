import express from "express";

import { getProducts, getProductId, changeStorage } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getProductId);
productsRouter.put("/products", changeStorage);

export default productsRouter;