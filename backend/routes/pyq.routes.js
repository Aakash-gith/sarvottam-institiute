import { Router } from "express";
import { getPyqList, uploadPyq, deletePyq } from "../controllers/pyq.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getPyqList);
router.post("/upload", upload.single("file"), uploadPyq);
router.post("/delete", deletePyq);

export default router;
