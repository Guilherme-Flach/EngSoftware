import { PrismaClient } from "@prisma/client";
import { transformDocument } from "@prisma/client/runtime";
import { Router } from "express";
import { session } from "../middleware/session";

const router = Router();

const prisma = new PrismaClient();

router.use(session);

router.post("/new", async (req, res) => {
    try {
        const { requestId, price } = req.body;
        const proposal = await prisma.rescueProposal.create({
            data: {
                rescueRequestId: requestId,
                price: price,
                rescuerId: Number(req.signedCookies.userId),
            }
        })
        // Return the selected user
        res.status(200).json(proposal);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

export default router;
