import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

// POST /api/v1/auth/register
router.post("/register", userController.register.bind(userController));

// POST /api/v1/auth/login
router.post("/login", userController.login.bind(userController));

export default router;
