import { Router } from "express";

import { AuthenticateUserControler } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserControler";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserControler();

authRoutes.post("/sessions", authenticateUserController.handle);

export { authRoutes };
