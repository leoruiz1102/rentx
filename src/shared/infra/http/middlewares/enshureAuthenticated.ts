import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";


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
  // Bearer token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      process.env.APP_JWT_HASH,
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    req.user = {
      id: user_id,
      isAdmin: user.isAdmin,
      name: user.name,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
