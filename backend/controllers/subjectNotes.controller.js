import SubjectNotes from "../models/SubjectNotes.js";
import mongoose from "mongoose";

// Get all notes/videos/quizzes for a subject
export const getSubjectContent = async (req, res) => {
  try {
    const { subjectId, classId } = req.query;

    if (!subjectId || !classId) {
      return res
        .status(400)
        .json({ message: "Subject ID and Class ID required" });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      classId: parseInt(classId),
    });

    // Return empty structure if not found
    if (!content) {
      content = {
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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

// Upload file for note
export const uploadNoteFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Construct public URL
    // Assuming 'uploads' is served statically
    const fileUrl = `/uploads/notes/${req.file.filename}`;

    res.json({
      success: true,
      fileUrl: fileUrl,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error("Upload note file error:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

export const addNote = async (req, res) => {
  try {
    const { subjectId, classId, title, description, fileType, fileUrl } =
      req.body;

    if (!subjectId || !classId || !title || !fileUrl) {
      return res.status(400).json({
        message: "Subject ID, Class ID, title, and fileUrl required",
      });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      classId: parseInt(classId),
    });

    if (!content) {
      content = new SubjectNotes({
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, title, description, youtubeUrl, duration } =
      req.body;

    if (!subjectId || !classId || !title || !youtubeUrl) {
      return res.status(400).json({
        message: "Subject ID, Class ID, title, and youtubeUrl required",
      });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      classId: parseInt(classId),
    });

    if (!content) {
      content = new SubjectNotes({
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, title, description, quizId } = req.body;

    if (!subjectId || !classId || !title) {
      return res.status(400).json({
        message: "Subject ID, Class ID, and title required",
      });
    }

    let content = await SubjectNotes.findOne({
      subjectId: parseInt(subjectId),
      classId: parseInt(classId),
    });

    if (!content) {
      content = new SubjectNotes({
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, noteId, title, description, fileUrl } =
      req.body;

    if (!subjectId || !classId || !noteId) {
      return res.status(400).json({
        message: "Subject ID, Class ID, and Note ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, videoId, title, description, youtubeUrl, duration } =
      req.body;

    if (!subjectId || !classId || !videoId) {
      return res.status(400).json({
        message: "Subject ID, Class ID, and Video ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, noteId } = req.body;

    if (!subjectId || !classId || !noteId) {
      return res.status(400).json({
        message: "Subject ID, Class ID, and Note ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, videoId } = req.body;

    if (!subjectId || !classId || !videoId) {
      return res.status(400).json({
        message: "Subject ID, Class ID, and Video ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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
    const { subjectId, classId, quizId } = req.body;

    if (!subjectId || !classId || !quizId) {
      return res.status(400).json({
        message: "Subject ID, Class ID, and Quiz ID required",
      });
    }

    const content = await SubjectNotes.findOneAndUpdate(
      {
        subjectId: parseInt(subjectId),
        classId: parseInt(classId),
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