import express from "express";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../controllers/event.controller.js";

const eventRoutes = express.Router();

eventRoutes.post("/createEvent", createEvent);
eventRoutes.get("/getEvents", getEvents);
eventRoutes.put("/updateEvent/:id", updateEvent);
eventRoutes.delete("/deleteEvent/:id", deleteEvent);

export default eventRoutes;
