import Progress from "../models/Progress.js";

// ----  set all subjects in progress ----
export const initSemesterProgress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { classId, subjects } = req.body;

    if (!classId || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const clsId = parseInt(classId, 10);
    const newSubjectIds = subjects.map((s) => s.id);


    const existingProgress = await Progress.find({
      studentId: userId,
      classId: clsId,
    });

    const existingIds = existingProgress.map((p) => p.subjectId);


    const toAdd = newSubjectIds.filter((id) => !existingIds.includes(id));

    const toRemove = existingIds.filter((id) => !newSubjectIds.includes(id));

    if (toAdd.length > 0) {
      const bulkAdd = toAdd.map((subjectId) => ({
        updateOne: {
          filter: { studentId: userId, classId: clsId, subjectId },
          update: {
            $setOnInsert: {
              studentId: userId,
              classId: clsId,
              subjectId,
              notesCompleted: [],
              videosCompleted: [],
              notesRead: 0,
              lecturesWatched: 0,
              completion: 0,
            },
          },
          upsert: true,
        },
      }));
      await Progress.bulkWrite(bulkAdd);
    }

    if (toRemove.length > 0) {
      await Progress.deleteMany({
        studentId: userId,
        classId: clsId,
        subjectId: { $in: toRemove },
      });
    }

    const updated = await Progress.find({
      studentId: userId,
      classId: clsId,
    }).sort({ subjectId: 1 });

    return res.status(200).json({
      message: "Class progress synced successfully",
      added: toAdd,
      removed: toRemove,
      progress: updated,
    });
  } catch (error) {
    console.error("syncSemesterProgress error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ----  compute completion for a subject ----
const computeCompletion = ({
  totalNotes = 0,
  totalLectures = 0,
  notesCompletedCount = 0,
  videosCompletedCount = 0,
}) => {
  const totalItems = totalNotes + totalLectures;
  if (totalItems === 0) return undefined;

  const completed = notesCompletedCount + videosCompletedCount;
  const raw = (completed / totalItems) * 100;

  return Math.max(0, Math.min(100, Math.round(raw)));
};

// ---- overall semester progress ----
export const getSemesterProgress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { classId } = req.query;
    if (!classId) {
      return res.status(400).json({ message: "Class parameter required" });
    }

    const classIdNum = parseInt(classId, 10);

    const progressRecords = await Progress.find({
      studentId: userId,
      classId: classIdNum,
    });

    if (progressRecords.length === 0) {
      return res.status(200).json({
        completion: 0,
        classId: classIdNum,
        studentId: userId,
      });
    }

    const completions = progressRecords.map((r) =>
      typeof r.completion === "number" ? r.completion : 0
    );
    const avg = completions.reduce((sum, v) => sum + v, 0) / completions.length;

    return res.status(200).json({
      completion: Math.round(avg),
      classId: classIdNum,
      studentId: userId,
      subjectCount: progressRecords.length,
    });
  } catch (error) {
    console.error("getSemesterProgress error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ----  subject progress for a semester ----
export const getSubjectProgress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { classId } = req.query;
    if (!classId) {
      return res
        .status(400)
        .json({ message: "Class ID parameter required" });
    }

    const classIdNum = parseInt(classId, 10);

    const progressRecords = await Progress.find({
      studentId: userId,
      classId: classIdNum,
    }).sort({ subjectId: 1 });

    return res.status(200).json(progressRecords);
  } catch (error) {
    console.error("getSubjectProgress error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ----  specific subject progress ----
export const getSubjectProgressById = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subjectId } = req.params;

    const progress = await Progress.findOne({
      studentId: userId,
      subjectId: parseInt(subjectId, 10),
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    return res.status(200).json(progress);
  } catch (error) {
    console.error("getSubjectProgressById error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---- mark a note as read  ----
export const markNoteRead = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subjectId, classId, noteId, totalNotes, totalLectures } =
      req.body;

    if (!subjectId || !classId || !noteId) {
      return res.status(400).json({
        message: "subjectId, classId and noteId are required",
      });
    }

    const subjectIdNum = parseInt(subjectId, 10);
    const classIdNum = parseInt(classId, 10);
    const noteIdStr = String(noteId);
    const totalNotesNum = parseInt(totalNotes, 10) || 0;
    const totalLecturesNum = parseInt(totalLectures, 10) || 0;

    let progress = await Progress.findOne({
      studentId: userId,
      subjectId: subjectIdNum,
      classId: classIdNum,
    });

    // If no doc exists yet, create one with this note marked
    if (!progress) {
      const notesCompleted = [noteIdStr];
      const videosCompleted = [];

      const completion = computeCompletion({
        totalNotes: totalNotesNum,
        totalLectures: totalLecturesNum,
        notesCompletedCount: notesCompleted.length,
        videosCompletedCount: videosCompleted.length,
      });

      progress = await Progress.create({
        studentId: userId,
        subjectId: subjectIdNum,
        classId: classIdNum,
        notesRead: 1,
        lecturesWatched: 0,
        notesCompleted,
        videosCompleted,
        completion: typeof completion === "number" ? completion : 0,
        lastUpdated: new Date(),
      });

      return res.status(200).json({ message: "Note marked as read", progress });
    }

    // If already marked, do nothing (idempotent)
    if (
      Array.isArray(progress.notesCompleted) &&
      progress.notesCompleted.includes(noteIdStr)
    ) {
      return res
        .status(200)
        .json({ message: "Note already marked as read", progress });
    }

    // Mark as read
    progress.notesCompleted.push(noteIdStr);
    progress.notesRead = (progress.notesRead || 0) + 1;

    const completion = computeCompletion({
      totalNotes: totalNotesNum,
      totalLectures: totalLecturesNum,
      notesCompletedCount: progress.notesCompleted.length,
      videosCompletedCount: progress.videosCompleted?.length || 0,
    });

    if (typeof completion === "number") {
      progress.completion = completion;
    }

    progress.lastUpdated = new Date();

    // Force Mongoose to recognize the array change
    progress.notesCompleted = [...progress.notesCompleted];

    await progress.save();

    return res.status(200).json({ message: "Note marked as read", progress });
  } catch (error) {
    console.error("markNoteRead error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ----  mark a lecture video as watched ----

export const markLectureWatched = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subjectId, classId, videoId, totalNotes, totalLectures } =
      req.body;

    if (!subjectId || !classId || !videoId) {
      return res.status(400).json({
        message: "subjectId, classId and videoId are required",
      });
    }

    const subjectIdNum = parseInt(subjectId, 10);
    const classIdNum = parseInt(classId, 10);
    const videoIdStr = String(videoId);

    let progress = await Progress.findOne({
      studentId: userId,
      subjectId: subjectIdNum,
      classId: classIdNum,
    });

    // Create if not exists
    if (!progress) {
      const videosCompleted = [videoIdStr];
      const notesCompleted = [];

      const completion = computeCompletion({
        totalNotes,
        totalLectures,
        notesCompletedCount: notesCompleted.length,
        videosCompletedCount: videosCompleted.length,
      });

      progress = await Progress.create({
        studentId: userId,
        subjectId: subjectIdNum,
        classId: classIdNum,
        lecturesWatched: 1,
        notesRead: 0,
        notesCompleted,
        videosCompleted,
        completion: typeof completion === "number" ? completion : 0,
        lastUpdated: new Date(),
      });

      return res
        .status(200)
        .json({ message: "Lecture marked as watched", progress });
    }

    // If already marked, do nothing
    if (
      Array.isArray(progress.videosCompleted) &&
      progress.videosCompleted.includes(videoIdStr)
    ) {
      return res
        .status(200)
        .json({ message: "Lecture already marked as watched", progress });
    }

    // Mark as watched
    progress.videosCompleted.push(videoIdStr);
    progress.lecturesWatched = (progress.lecturesWatched || 0) + 1;

    const completion = computeCompletion({
      totalNotes,
      totalLectures,
      notesCompletedCount: progress.notesCompleted?.length || 0,
      videosCompletedCount: progress.videosCompleted.length,
    });

    if (typeof completion === "number") {
      progress.completion = completion;
    }

    progress.lastUpdated = new Date();

    // Force Mongoose to recognize the array change
    progress.videosCompleted = [...progress.videosCompleted];

    await progress.save();
    console.log("Lecture marked as watched and saved:", { videoId: videoIdStr, videosCompleted: progress.videosCompleted });

    return res
      .status(200)
      .json({ message: "Lecture marked as watched", progress });
  } catch (error) {
    console.error("markLectureWatched error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
