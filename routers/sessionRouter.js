import express from "express";

import { signIn,signUp, signOut } from "../controllers/sessionControllers.js";

const sessionRouter = express.Router();

sessionRouter.post("/signin", signIn);
sessionRouter.post("/signup", signUp);
sessionRouter.delete("/signout", signOut);

export default sessionRouter;