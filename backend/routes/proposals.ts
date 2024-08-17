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
                customerId: Number(req.signedCookies.userId),
                isFinished: false
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
                    rescueProposalId: true,
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

router.post("/accept", async (req, res) => {
    try {
        const { proposalId } = req.body;
        // set proposal to accepted
        const { rescueRequestId } = await prisma.rescueProposal.update({
            where: {
                rescueProposalId: proposalId
            },
            data: {
                accepted: true,
            },
            select: {
                rescueRequestId: true
            }
        });

        console.log(rescueRequestId);
        console.log(proposalId);

        // delete all others
        await prisma.rescueProposal.deleteMany({
            where: {
                rescueRequestId: rescueRequestId
                , AND: {
                    rescueProposalId: {
                        not: proposalId
                    },
                }
            }
        });

        // set request to finished
        await prisma.rescueRequest.update({
            data: {
                isFinished: true,
            }, where: {
                rescueRequestId: rescueRequestId
            }
        });

        res.status(200)
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

export default router;
