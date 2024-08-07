import { NextFunction, Request, Response } from "express";

export const session = (req: Request, res: Response, next: NextFunction) => {
  //req.signedCookies is defined by cookieParser
  if (!req.signedCookies.userId) return res.status(401).json("Unauthorized");
  next();
};
