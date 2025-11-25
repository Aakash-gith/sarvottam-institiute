export const semesterData = {
  1: {
    name: "Semester 1",
    subjects: [
      {
        id: 1,
        name: "Calculus I",
        description: "Limits, Derivatives, and integrals",
        icon: "f",
      },
      {
        id: 2,
        name: "Physics I",
        description: "Classical Mechanics and Newton's Laws",
        icon: "⚛",
      },
      {
        id: 3,
        name: "Intro to CS",
        description: "Basics of C Programming",
        icon: "{}",
      },
    ],
  },
  2: {
    name: "Semester 2",
    subjects: [
      {
        id: 4,
        name: "Linear Algebra",
        description: "Matrices, Vectors, and Transformations",
        icon: "[]",
      },
      {
        id: 5,
        name: "Chemistry I",
        description: "Atomic Structure and Chemical Bonding",
        icon: "⚗",
      },
      {
        id: 6,
        name: "Data Structures",
        description: "Arrays, Linked Lists, and Trees",
        icon: "{}",
      },
    ],
  },
  3: {
    name: "Semester 3",
    subjects: [
      {
        id: 7,
        name: "Discrete Math",
        description: "Logic, Sets, and Graph Theory",
        icon: "∑",
      },
   
      {
        id: 8,
        name: "Thermodynamics",
        description: "Heat, Work, and Entropy",
        icon: "🌡",
      },
    ],
  },
  4: {
    name: "Semester 4",
    subjects: [
      {
        id: 9,
        name: "Algorithms",
        description: "Sorting, Searching, and Complexity Analysis",
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
