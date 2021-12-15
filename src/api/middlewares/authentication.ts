import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../../config";

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) return res.sendStatus(401);

  const bearer = bearerHeader?.split(" ") || [];
  const bearerToken = bearer[1];

  try {
    const verified = verify(bearerToken, config.jwtSecret);
    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalido" });
  }
}
