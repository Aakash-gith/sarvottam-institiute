import { Router } from "express";
import { getPyqList } from "../controllers/pyq.controller.js";

const router = Router();

router.get("/", getPyqList);

export default router;
