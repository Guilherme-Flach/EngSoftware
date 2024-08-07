import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

const prisma = new PrismaClient();

// Efeutar login
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const fetchedLogin = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (fetchedLogin) {
      res.cookie("userId", fetchedLogin.id, { signed: true });
      res.cookie("username", fetchedLogin.username);
      res.cookie("email", fetchedLogin.email);

      res.status(200).json("Login bem sucedido!");
    } else {
      res.status(401).json("Login inválido!");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json("Erro!");
  }
});

// DEBUG ONLY: Pegar o cookie pra testar no browser
router.get("/debug", async (req, res) => {
  try {
    const fetchedLogin = await prisma.user.findFirst();

    if (fetchedLogin) {
      res.cookie("userId", fetchedLogin.id, { signed: true });
      res.cookie("username", fetchedLogin.username);
      res.cookie("email", fetchedLogin.email);
      console.log(fetchedLogin);
      res.status(200).json("Login bem sucedido!");
    } else {
      res.status(401).json("Nenhum usuário cadastrado!");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json("Erro!");
  }
});

export default router;
