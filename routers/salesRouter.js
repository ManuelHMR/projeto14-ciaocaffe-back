import express from "express";

import { salesPost } from "./../controllers/salesController.js";
import { salesValidation } from "../middlewares/salesValidation.js";

const salesRouter = express.Router();

salesRouter.post("/sales", salesValidation, salesPost); 

export default salesRouter;