import express from "express";

import { signIn,signUp, signOut } from "../controllers/sessionControllers";

const sessionRouter = express.Router();

sessionRouter.post("/signin", signIn);
sessionRouter.post("/signup", signUp);
sessionRouter.delete("/signout", signOut);