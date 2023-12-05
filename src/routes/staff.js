import { Router } from "express";
import {
    staffList,
    staffById,
    createStaff,
    updateStaff,
    restoreStaff,
    deleteStaff
} from "../controllers/staff.js";

const router = Router();

export default router;

router.get("/", staffList);
router.get("/:id", staffById);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.patch("/:id", restoreStaff);
router.delete("/:id", deleteStaff);