import { AuthenticateUserControler } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserControler";
import { Router } from "express";


const authRoutes = Router();

const authenticateUserController = new AuthenticateUserControler();

authRoutes.post("/sessions", authenticateUserController.handle);

export { authRoutes };
