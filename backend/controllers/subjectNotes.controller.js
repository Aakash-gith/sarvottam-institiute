import SubjectNotes from "../models/SubjectNotes.js";
import mongoose from "mongoose";

// Get all notes/videos/quizzes for a subject
export const getSubjectContent = async (req, res) => {
  try {
    const { subjectId, semesterId } = req.query;

    if (!subjectId || !semesterId) {
      return res
        .status(400)
        .json({ message: "Subject ID and Semester ID required" });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      semesterId: parseInt(semesterId),
    });

    // Return empty structure if not found
    if (!content) {
      content = {
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
        notes: [],
        videos: [],
        quizzes: [],
      };
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("getSubjectContent error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ============================================
// ADMIN ONLY OPERATIONS
// ============================================

export const addNote = async (req, res) => {
  try {
    const { subjectId, semesterId, title, description, fileType, fileUrl } =
      req.body;

    if (!subjectId || !semesterId || !title || !fileUrl) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, title, and fileUrl required",
      });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      semesterId: parseInt(semesterId),
    });

    if (!content) {
      content = new SubjectNotes({
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
        notes: [],
        videos: [],
        quizzes: [],
      });
    }

    const newNote = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      fileType: fileType || "pdf",
      fileUrl,
      uploadedAt: new Date(),
    };

    content.notes.push(newNote);
    await content.save();

    return res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (error) {
    console.error("addNote error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addVideo = async (req, res) => {
  try {
    const { subjectId, semesterId, title, description, youtubeUrl, duration } =
      req.body;

    if (!subjectId || !semesterId || !title || !youtubeUrl) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, title, and youtubeUrl required",
      });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      semesterId: parseInt(semesterId),
    });

    if (!content) {
      content = new SubjectNotes({
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
        notes: [],
        videos: [],
        quizzes: [],
      });
    }

    const newVideo = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      youtubeUrl,
      duration: duration || "0:00",
      uploadedAt: new Date(),
    };

    content.videos.push(newVideo);
    await content.save();

    return res.status(201).json({
      message: "Video added successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("addVideo error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addQuiz = async (req, res) => {
  try {
    const { subjectId, semesterId, title, description, quizId } = req.body;

    if (!subjectId || !semesterId || !title) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, and title required",
      });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      semesterId: parseInt(semesterId),
    });

    if (!content) {
      content = new SubjectNotes({
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
        notes: [],
        videos: [],
        quizzes: [],
      });
    }

    const newQuiz = {
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      quizId: quizId || null,
      uploadedAt: new Date(),
    };

    content.quizzes.push(newQuiz);
    await content.save();

    return res.status(201).json({
      message: "Quiz added successfully",
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("addQuiz error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { subjectId, semesterId, noteId, title, description, fileUrl } =
      req.body;

    if (!subjectId || !semesterId || !noteId) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, and Note ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
        "notes._id": noteId,
      },
      {
        $set: {
          "notes.$[elem].title": title,
          "notes.$[elem].description": description,
          "notes.$[elem].fileUrl": fileUrl,
        },
      },
      {
        arrayFilters: [{ "elem._id": noteId }],
        new: true,
      }
    );

    if (!content) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("updateNote error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { subjectId, semesterId, videoId, title, description, youtubeUrl, duration } =
      req.body;

    if (!subjectId || !semesterId || !videoId) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, and Video ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
        "videos._id": videoId,
      },
      {
        $set: {
          "videos.$[elem].title": title,
          "videos.$[elem].description": description,
          "videos.$[elem].youtubeUrl": youtubeUrl,
          "videos.$[elem].duration": duration,
        },
      },
      {
        arrayFilters: [{ "elem._id": videoId }],
        new: true,
      }
    );

    if (!content) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({
      message: "Video updated successfully",
    });
  } catch (error) {
    console.error("updateVideo error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { subjectId, semesterId, noteId } = req.body;

    if (!subjectId || !semesterId || !noteId) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, and Note ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
      },
      { $pull: { notes: { _id: noteId } } },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Subject content not found" });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("deleteNote error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { subjectId, semesterId, videoId } = req.body;

    if (!subjectId || !semesterId || !videoId) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, and Video ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
      },
      { $pull: { videos: { _id: videoId } } },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Subject content not found" });
    }

    return res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("deleteVideo error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { subjectId, semesterId, quizId } = req.body;

    if (!subjectId || !semesterId || !quizId) {
      return res.status(400).json({
        message: "Subject ID, Semester ID, and Quiz ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        semesterId: parseInt(semesterId),
      },
      { $pull: { quizzes: { _id: quizId } } },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Subject content not found" });
    }

    return res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.error("deleteQuiz error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};