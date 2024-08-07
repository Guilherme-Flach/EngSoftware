import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

import router from "./routes";

const app = express();
const frontUrl = process.env.frontUrl || "http://localhost:3000";
app.use(cors({ credentials: true, origin: frontUrl })); //cant set cookies if origin is set to wildcard
app.use(express.json());

app.use(cookieparser("muito secreto, confia"));

const prisma = new PrismaClient();

app.get("/status", async (req, res) => {
  // Simple status system to check if the server is running
  res.status(200).json("Server is running.");
  console.log("Server is running.");
});

app.use("/", router);

app.listen(3001, () => {
  console.log("------------ SERVER RUNNING ON PORT 3001 ------------");
});
