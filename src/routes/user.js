import { Router } from "express";
import { 
    createUser,
    deleteUser,
    restoreUser,
    updatePassword,
    updateUser,
    userById,
    usersList
} from "../controllers/user.js";

const router = Router();

export default router;

router.get("/", usersList);
router.get("/:id", userById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/password/:id", updatePassword);
router.patch("/:id", restoreUser);
router.delete("/:id", deleteUser);