import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js";

const taskRoutes = express.Router();

taskRoutes.post("/createTask", createTask);
taskRoutes.get("/getTasks", getTasks);
taskRoutes.put("/updateTask/:id", updateTask);
taskRoutes.delete("/deleteTask/:id", deleteTask);

export default taskRoutes;