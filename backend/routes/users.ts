import { PrismaClient } from "@prisma/client";
import { json, Router } from "express";

const router = Router();

const prisma = new PrismaClient();

// Create user
router.post("/create", async (req, res) => {
  try {
    const { username, email, password, accountType } = req.body;

    if (email.length < 5) {
      return res.status(409).json("Email inválido!");
    }

    // Verify if email isn't taken:
    const checkEmail = await prisma.account.findUnique({
      where: {
        email: email
      }
    });

    if (checkEmail) {
      return res.status(409).json("Email já em uso.");

    }

    // Verify if username isnt taken
    const checkUsername = await prisma.account.findUnique({
      where: {
        username: username
      }
    });

    if (checkUsername) {
      return res.status(409).json("Já existe um usuário com este nome.");
    }

    const user = await prisma.account.create({
      data: {
        username: username,
        email: email,
        password: password,
        accountType: accountType,
      },
    });

    if (accountType == "GUINCHEIRO") {
      await prisma.rescuer.create({
        data: {
          accountId: user.accountId
        }
      })
    } else {
      await prisma.customer.create({
        data: {
          accountId: user.accountId
        },
      })
    }

    // Return the created user
    res.status(200).json();
  } catch (e) {
    res.status(500).json("Erro no Servidor!");
    console.log(e);
  }
});

// Read user
router.get("/find/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const selectedUser = await prisma.account.findUnique({
      where: {
        accountId: id,
      },
    });

    // Return the selected user
    res.status(200).json(selectedUser);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { email, password } = req.body;
    const updatedUser = await prisma.account.update({
      where: {
        accountId: id,
      },
      data: {
        email: email,
        password: password,
      },
    });

    // Return the updated user
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await prisma.account.delete({
      where: {
        accountId: id,
      },
    });

    // Return the deleted user
    res.status(200).json(deletedUser);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

// List all users
router.get("/list", async (req, res) => {
  try {
    const userList = await prisma.account.findMany();

    console.table(userList);
    // Return the selected user
    res.status(200).json(userList);
  } catch (e) {
    res.status(400).json("Erro!");
    console.log(e);
  }
});

export default router;
