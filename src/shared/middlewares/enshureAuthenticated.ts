import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function enshureAuthneticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "5aaa1ce426e969f50fe0c5d4a81cecb3",
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}