import express from "express";

import { signIn,signUp, signOut } from "./../controllers/sessionControllers.js";
import { signInValidation } from "./../middlewares/signInValidation.js";

const sessionRouter = express.Router();

sessionRouter.post("/signin", signInValidation, signIn);
sessionRouter.post("/signup", signUp);
sessionRouter.delete("/signout", signOut);

export default sessionRouter;
