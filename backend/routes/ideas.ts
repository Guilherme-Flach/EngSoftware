import { PrismaClient } from "@prisma/client";
import { transformDocument } from "@prisma/client/runtime";
import { Router } from "express";
import { session } from "../middleware/session";

const router = Router();

const prisma = new PrismaClient();

router.use(session);

async function getIdea (id : number, userId : number) {
  const selectedIdea = await prisma.idea.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      text: true,
      date: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  // Count upvotes
  const upvotes = await prisma.vote.count({
    where: {
      ideaId: id,
      voteType: true,
    },
  });

  // Count downvotes
  const downvotes = await prisma.vote.count({
    where: {
      ideaId: id,
      voteType: false,
    },
  });

  // Check to see if the user voted on that idea
  const vote = await prisma.vote.findUnique({
    where: {
      voteId: {
        userId: userId,
        ideaId: id,
      },
    },

    select: {
      voteType: true,
    },
  });

  const returnedIdea = {
    ideaData: selectedIdea,
    voteData: {
      voteType: vote ? vote.voteType : undefined,
      upvotes: upvotes,
      downvotes: downvotes,
    },
  };

  return returnedIdea;
}

// Create Idea
router.post("/create", async (req, res) => {
  try {
    const { title, text } = req.body;
    const idea = await prisma.idea.create({
      data: {
        title: title,
        text: text,
        userId: Number(req.signedCookies.userId),
      },
    });

    // Return the created idea
    res.status(200).json(idea);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// Read idea
router.get("/find/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.signedCookies.userId)
    const returnedIdea = await getIdea(id, userId)

    // Return the selected idea
    res.status(200).json(returnedIdea);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// Delete idea
router.delete("/:ideaId", async (req, res) => {
  try {
    const ideaId = Number(req.params.ideaId);

    // Check if it was the user who created that idea
    const isIdeaUserMade = await prisma.idea.findFirst({
      where: {
        id: ideaId,
        userId: Number(req.signedCookies.userId),
      },
    });

    if (isIdeaUserMade) {
      const deletedIdea = await prisma.idea.delete({
        where: {
          id: ideaId,
        },
      });

      // Return the deleted user
      res.status(200).json(deletedIdea);
      return;
    } else {
      res.status(401).json("Idea was not created by this user!");
    }
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// list all ideas (sort by best)
router.get("/best", async (req, res) => {
  try {
    // Get the ones that have at least one upvote and order by the most upvotes
    const ideasOrder = await prisma.vote.groupBy({
      by: ["ideaId"],

      where: {
        voteType: true,
      },

      _count: {
        ideaId: true,
      },

      orderBy: {
        _count: {
          ideaId: "desc",
        },
      },
    });

    // Get all the ones that dont have any upvotes and put them at the end of the list
    const ideasOrder2 = await prisma.idea.findMany({
      where : {
        votes : {
          none : {
            voteType : true
          }
        }
      },
    });

    var ideasList = [];

    const userId = Number(req.signedCookies.userId);
    for (const i in ideasOrder) {
      const id = ideasOrder[i].ideaId;
      const idea = await getIdea(id, userId);

      ideasList.push(idea);
    }

    for (const i in ideasOrder2) {
      const id = ideasOrder2[i].id;
      const idea = await getIdea(id, userId);

      ideasList.push(idea);
    }

    console.log(ideasList)

    // Return the selected user
    res.status(200).json(ideasList);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// list all ideas (sort by worst)
router.get("/worst", async (req, res) => {
  try {

    // Get the ones that have  at least one downvote and order by the most downvotes
    const ideasOrder = await prisma.vote.groupBy({
      by: ["ideaId"],

      where: {
        voteType: false,
      },

      _count: {
        ideaId: true,
      },

      orderBy: {
        _count: {
          ideaId: "desc",
        },
      },
    });

    // Get all the ones that dont have any downvotes and put them at the end of the list
    const ideasOrder2 = await prisma.idea.findMany({
      where : {
        votes : {
          none : {
            voteType : false
          }
        }
      },
    });

    var ideasList = [];

    const userId = Number(req.signedCookies.userId);
    for (const i in ideasOrder) {
      const id = ideasOrder[i].ideaId;
      const idea = await getIdea(id, userId);

      ideasList.push(idea);
    }

    for (const i in ideasOrder2) {
      const id = ideasOrder2[i].id;
      const idea = await getIdea(id, userId);

      ideasList.push(idea);
    }

    // Return the selected user
    res.status(200).json(ideasList);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// list all ideas (sort by date)
router.get("/latest", async (req, res) => {
  try {
    const ideasList = await prisma.idea.findMany({
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        title: true,
        text: true,
        date: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    let returnedIdeasList = [];

    // Gather data from votes
    for (const i in ideasList) {
      const id = ideasList[i].id;
      const selectedIdea = ideasList[i];
      const upvotes = await prisma.vote.count({
        where: {
          ideaId: id,
          voteType: true,
        },
      });

      // Count downvotes
      const downvotes = await prisma.vote.count({
        where: {
          ideaId: id,
          voteType: false,
        },
      });

      // Check to see if the user voted on that idea
      const vote = await prisma.vote.findUnique({
        where: {
          voteId: {
            userId: Number(req.signedCookies.userId),
            ideaId: id,
          },
        },

        select: {
          voteType: true,
        },
      });

      const returnedIdea = {
        ideaData: selectedIdea,
        voteData: {
          voteType: vote ? vote.voteType : null,
          upvotes: upvotes,
          downvotes: downvotes,
        },
      };
      returnedIdeasList.push(returnedIdea);
    }

    console.table(ideasList);
    // Return the selected user
    res.status(200).json(returnedIdeasList);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

export default router;
