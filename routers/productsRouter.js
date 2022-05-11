import express from "express";

import { getProducts, getProductId } from "../controllers/productsControllers.js";

const productsRouter = express.Router();

productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getProductId);

export default productsRouter;