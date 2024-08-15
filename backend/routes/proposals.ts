import { PrismaClient } from "@prisma/client";
import { transformDocument } from "@prisma/client/runtime";
import { Router } from "express";
import { session } from "../middleware/session";

const router = Router();

const prisma = new PrismaClient();

router.use(session);

router.post("/new", async (req, res) => {
    try {
        console.log("Powershell");
        // Return the selected user
        res.status(200);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

export default router;
