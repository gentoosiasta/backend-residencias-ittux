import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.js";

const router = Router();

export default router;

router.post("/login", loginUser);
router.post("/register", registerUser);