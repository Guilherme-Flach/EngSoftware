import { Router } from "express";
import users from "./users";
import login from "./login";
import requests from "./requests";

const router = Router();

router.use("/users", users);
router.use("/login", login);
router.use("/requests", requests);

export default router;
