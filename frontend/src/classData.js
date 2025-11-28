import API from "./api/axios";

export const classData = {
    9: {
        name: "Class IX",
        subjects: [
            {
                id: 1,
                name: "Mathematics",
                description: "Number Systems, Polynomials, Linear Equations, Geometry",
                icon: "🔢",
            },
            {
                id: 2,
                name: "Science",
                description: "Physics, Chemistry, Biology - Motion, Matter, Life Processes",
                icon: "🧪",
            },
        ],
    },
    10: {
        name: "Class X",
        subjects: [
            {
                id: 3,
                name: "Mathematics",
                description: "Real Numbers, Polynomials, Trigonometry, Statistics",
                icon: "🔢",
            },
            {
                id: 4,
                name: "Science",
                description: "Physics, Chemistry, Biology - Electricity, Periodic Table, Genetics",
                icon: "🧪",
            },
        ],
    },
};

export const initClassProgress = async (classId, subjects) => {
    return API.post("/progress/initClass", {
        classId,
        subjects,
    });
};

export const fetchClassProgress = async (userClass) => {
    try {
        const response = await API.get(
            `/progress/getClassProgress?class=${userClass}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching class progress:", error);
        throw error;
    }
};

export const fetchSubjectProgress = async (classId) => {
    try {
        const response = await API.get(
            `/progress/getSubjectProgress?classId=${classId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching subject progress:", error);
        throw error;
    }
};

export const markLectureWatched = async (subjectId, lectureId) => {
    try {
        const response = await API.post("/progress/markLectureWatched", {
            subjectId,
            lectureId,
        });
        return response.data;
    } catch (error) {
        console.error("Error marking lecture as watched:", error);
        throw error;
    }
};

export const markNoteRead = async (subjectId, noteId) => {
    try {
        const response = await API.post("/progress/markNoteRead", {
            subjectId,
            noteId,
        });
        return response.data;
    } catch (error) {
        console.error("Error marking note as read:", error);
        throw error;
    }
};
