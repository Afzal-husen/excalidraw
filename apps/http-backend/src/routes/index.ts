import express, { type Express } from "express";
import { login, signup } from "../controllers/user";

const router: Express = express();

router.post("/signup", signup);
router.post("/signin", login);

export default router;
