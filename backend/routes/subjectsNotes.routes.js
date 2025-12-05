import express from "express";
import {
  getSubjectContent,
  addNote,
  addVideo,
  addQuiz,
  updateNote,
  updateVideo,
  deleteNote,
  deleteVideo,
  deleteQuiz,
  uploadNoteFile,
} from "../controllers/subjectNotes.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const subjectNotesRoutes = express.Router();

// ============================================
// PUBLIC ROUTES (Students can access)
// ============================================

subjectNotesRoutes.get("/getContent", getSubjectContent);

// ============================================
// ADMIN ONLY ROUTES (Protected)
// ============================================

// Upload file
subjectNotesRoutes.post("/uploadFile", upload.single("file"), uploadNoteFile);

// Add resources
subjectNotesRoutes.post("/addNote", addNote);
subjectNotesRoutes.post("/addVideo", addVideo);
subjectNotesRoutes.post("/addQuiz", addQuiz);

// Update resources
subjectNotesRoutes.put("/updateNote", updateNote);
subjectNotesRoutes.put("/updateVideo", updateVideo);

// Delete resources
subjectNotesRoutes.delete("/deleteNote", deleteNote);
subjectNotesRoutes.delete(
  "/deleteVideo",
  deleteVideo
);
subjectNotesRoutes.delete("/deleteQuiz", deleteQuiz);

export default subjectNotesRoutes;
