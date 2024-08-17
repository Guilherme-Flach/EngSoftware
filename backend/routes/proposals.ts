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

router.get("/open", async (req, res) => {
    try {
        const clientRequests = await prisma.rescueRequest.findMany({
            where: {
                customerId: Number(req.signedCookies.userId)
            },
            select: {
                rescueRequestId: true
            }
        })

        let proposalsFound: {
            price: number; rescueRequest: { rescueRequestId: number; problem: string; }; rescuer: { account: { username: string; email: string; }; }
        }[] = [];

        for (let request of clientRequests) {
            const proposal = await prisma.rescueProposal.findMany({
                where: {
                    rescueRequestId: {
                        equals: request.rescueRequestId
                    }
                },

                select: {
                    price: true,
                    rescueRequest: {
                        select: {
                            rescueRequestId: true,
                            problem: true,
                        }
                    },
                    rescuer: {
                        select: {
                            account: {
                                select: {
                                    username: true,
                                    email: true,
                                }
                            }
                        }
                    }
                }
            });

            proposal.forEach(element => {
                proposalsFound.push(element)
            });
        }

        res.status(200).json(proposalsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

export default router;
