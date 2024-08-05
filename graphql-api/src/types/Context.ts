import type { Request, Response } from "express";
import type { User } from "../entities/User";

export interface Context {
  req: Request;
  res: Response;
  user?: User;
}
