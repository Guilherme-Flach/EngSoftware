import { Router } from "express";
import users from "./users";
import ideas from "./ideas";
import votes from "./votes";
import login from "./login";

const router = Router();

router.use("/users", users);
router.use("/ideas", ideas);
router.use("/votes", votes);
router.use("/login", login);

export default router;
