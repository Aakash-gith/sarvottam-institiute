export const semesterData = {
  1: {
    name: "Semester 1",
    subjects: [
      {
        id: 1,
        name: "Mathematics I - Differential Calculus",
        description: "Limits, Derivatives, Applications of Derivatives",
        icon: "f",
      },
      {
        id: 2,
        name: "Physics I - Mechanics",
        description: "Classical Mechanics, Newton's Laws, Motion",
        icon: "⚛",
      },
      {
        id: 3,
        name: "Computer Programming - C Language",
        description: "Fundamentals of C Programming and Problem Solving",
        icon: "{}",
      },
    ],
  },
  2: {
    name: "Semester 2",
    subjects: [
      {
        id: 4,
        name: "Mathematics II - Linear Algebra",
        description: "Matrices, Vector Spaces, Linear Transformations",
        icon: "[]",
      },
      {
        id: 5,
        name: "Chemistry - General Chemistry",
        description: "Atomic Structure, Chemical Bonding, Reactions",
        icon: "⚗",
      },
      {
        id: 6,
        name: "Data Structures and Algorithms",
        description: "Arrays, Linked Lists, Stacks, Queues, Trees",
        icon: "{}",
      },
    ],
  },
  3: {
    name: "Semester 3",
    subjects: [
      {
        id: 7,
        name: "Discrete Mathematics",
        description: "Mathematical Logic, Set Theory, Graph Theory",
        icon: "∑",
      },

      {
        id: 8,
        name: "Engineering Thermodynamics",
        description: "Laws of Thermodynamics, Heat Transfer, Entropy",
        icon: "🌡",
      },
    ],
  },
  4: {
    name: "Semester 4",
    subjects: [
      {
        id: 9,
        name: "Design and Analysis of Algorithms",
        description: "Algorithm Design, Time Complexity, Optimization",
        icon: "{}",
      },
    ],
  },
  5: {
    name: "Semester 5",
    subjects: [],
  },
  6: {
    name: "Semester 6",
    subjects: [],
  },
  7: {
    name: "Semester 7",
    subjects: [],
  },
  8: {
    name: "Semester 8",
    subjects: [],
  },
};

import API from "./api/axios";
export const initSemesterProgress = async (semesterId, subjects) => {
  return API.post("/progress/initSemester", {
    semesterId,
    subjects,
  });
};

export const fetchSemesterProgress = async (semester) => {
  try {
    const response = await API.get(
      `/progress/getSemesterProgress?semester=${semester}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return null;
  }
};

export const fetchSubjectProgress = async (semesterId) => {
  try {
    const response = await API.get(
      `/progress/getSubjectProgress?semesterId=${semesterId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subject progress:", error);
    return [];
  }
};

export const incrementLectures = async (subjectId, semesterId) => {
  try {
    const response = await API.post(
      `/progress/incrementLectures/${subjectId}`,
      { semesterId }
    );
    return response.data;
  } catch (error) {
    console.error("Error incrementing lectures:", error);
    return null;
  }
};

export const markNoteRead = async ({
  subjectId,
  semesterId,
  noteId,
  totalNotes,
  totalLectures,
}) => {
  return API.post("/progress/markNoteRead", {
    subjectId,
    semesterId,
    noteId,
    totalNotes,
    totalLectures,
  });
};

export const markLectureWatched = async ({
  subjectId,
  semesterId,
  videoId,
  totalNotes,
  totalLectures,
}) => {
  return API.post("/progress/markLectureWatched", {
    subjectId,
    semesterId,
    videoId,
    totalNotes,
    totalLectures,
  });
};
