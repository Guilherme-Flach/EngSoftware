import { PrismaClient } from "@prisma/client";
import { transformDocument } from "@prisma/client/runtime";
import { Router } from "express";
import { session } from "../middleware/session";

const router = Router();

const prisma = new PrismaClient();

router.use(session);

// Create Request
router.post("/create", async (req, res) => {
    try {
        const { problem, location } = req.body;
        const request = await prisma.rescueRequest.create({
            data: {
                problem: problem,
                location: location,
                customerId: Number(req.signedCookies.userId),
            },
        });

        // Return the created idea
        res.status(200).json(request);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

router.delete("/:requestId", async (req, res) => {
    try {
        const requestId = Number(req.params.requestId);

        // Check if it was the user who created that idea
        const isRequestUserMade = await prisma.rescueRequest.findFirst({
            where: {
                rescueRequestId: requestId,
                customerId: Number(req.signedCookies.userId),
            },
        });

        if (isRequestUserMade) {
            const deletedRequest = await prisma.rescueRequest.delete({
                where: {
                    rescueRequestId: requestId,
                },
            });

            // Return the deleted user
            res.status(200).json(deletedRequest);
            return;
        } else {
            res.status(401).json("Request was not created by this user!");
        }
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

// list all requests (sort by date)
router.get("/own/active", async (req, res) => {
    try {
        const requestsFound = await prisma.rescueRequest.findMany({
            orderBy: {
                creationDate: "desc",
            },
            select: {
                rescueRequestId: true,
                location: true,
                creationDate: true,
                problem: true,
                isFinished: true,
                customer: {
                    select: {
                        account: {
                            select: {
                                username: true,
                                email: true,
                                phoneNumber: true,
                            },
                        }
                    },
                },
            },
            where: {
                customerId: {
                    equals: Number(req.signedCookies.userId),
                },
                isFinished: {
                    equals: false,
                },
            },
        });
        // Return the selected user
        res.status(200).json(requestsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

router.get("/own/finished", async (req, res) => {
    try {
        const requestsFound = await prisma.rescueRequest.findMany({
            orderBy: {
                creationDate: "desc",
            },
            select: {
                rescueRequestId: true,
                location: true,
                creationDate: true,
                problem: true,
                isFinished: true,
                customer: {
                    select: {
                        account: {
                            select: {
                                username: true,
                                email: true,
                                phoneNumber: true,
                            },
                        }
                    },
                },
            },
            where: {
                customerId: {
                    equals: Number(req.signedCookies.userId),
                },
                isFinished: {
                    equals: true,
                },
            },
        });
        // Return the selected user
        res.status(200).json(requestsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

// list all requests (sort by date)
router.get("/own/all", async (req, res) => {
    try {
        const requestsFound = await prisma.rescueRequest.findMany({
            orderBy: {
                creationDate: "desc",
            },
            select: {
                rescueRequestId: true,
                location: true,
                creationDate: true,
                problem: true,
                isFinished: true,
                customer: {
                    select: {
                        account: {
                            select: {
                                username: true,
                                email: true,
                                phoneNumber: true,
                            },
                        }
                    },
                },
            },
        });
        // Return the selected user
        res.status(200).json(requestsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

router.get("/guincheiro/active", async (req, res) => {
    try {
        const rescueProposals = await prisma.rescueProposal.findMany({
            where: {
                accepted: true,
                rescuerId: Number(req.signedCookies.userId),
            },
            select: {
                rescueProposalId: true
            },

        })

        const rescueProposalsArray: number[] = [];
        rescueProposals.forEach((e) => {
            rescueProposalsArray.push(e.rescueProposalId);
        })

        const requestsFound = await prisma.rescueRequest.findMany({
            orderBy: {
                creationDate: "desc",
            },
            where: {
                rescueProposals: {
                    some: {
                        rescueProposalId: {
                            in: rescueProposalsArray
                        }
                    }
                }
            },
            select: {
                rescueRequestId: true,
                location: true,
                creationDate: true,
                problem: true,
                isFinished: true,
                customer: {
                    select: {
                        account: {
                            select: {
                                username: true,
                                email: true,
                                phoneNumber: true,
                            },
                        }
                    },
                },
            },
        });

        console.log(requestsFound)
        res.status(200).json(requestsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

router.get("/guincheiro/open", async (req, res) => {
    try {
        const requestsFound = await prisma.rescueRequest.findMany({
            orderBy: {
                creationDate: "desc",
            },
            select: {
                rescueRequestId: true,
                location: true,
                creationDate: true,
                problem: true,
                customer: {
                    select: {
                        account: {
                            select: {
                                username: true,
                                email: true,
                                phoneNumber: true,
                            },
                        }
                    },
                },
            },
            where: {
                isFinished: {
                    equals: false,
                }

            },
        });
        // Return the selected user
        res.status(200).json(requestsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

router.get("/all", async (req, res) => {
    try {
        const requestsFound = await prisma.rescueRequest.findMany({
            orderBy: {
                creationDate: "desc",
            },
            select: {
                rescueRequestId: true,
                location: true,
                creationDate: true,
                problem: true,
                customer: {
                    select: {
                        account: {
                            select: {
                                username: true,
                                email: true,
                                phoneNumber: true,
                            },

                        }
                    },
                },
            },
            where: {
                isFinished: {
                    equals: false,
                }

            },
        });
        // Return the selected user
        res.status(200).json(requestsFound);
    } catch (e) {
        res.status(400).json("Erro!");
        console.log(e);
    }
});

export default router;
