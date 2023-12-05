import { Router } from "express";
import { createSubject, deleteSubject, subjectById, subjectsByCareer, subjectsByProgram, subjectsBySubject, subjectsList, updateSubject } from "../controllers/subject.js";

const router = Router();

export default router;

router.get("/", subjectsList);
router.get("/:id", subjectById);
router.get("/program/:program", subjectsByProgram);
router.get("/career/:career", subjectsByCareer);
router.get("/subject/:subject", subjectsBySubject);
router.post("/", createSubject);
router.put("/:id", updateSubject);
