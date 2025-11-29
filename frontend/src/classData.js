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
                notes: [
                    { id: 1, title: "Chapter 1 - Number System", file: "/notes/grade9/Maths/Chapter - 1 Number_System.pdf" },
                    { id: 2, title: "Chapter 2 - Polynomials", file: "/notes/grade9/Maths/Chapter - 2 Polynomials.pdf" },
                    { id: 3, title: "Chapter 3 - Coordinate Geometry", file: "/notes/grade9/Maths/Chapter - 3 Coordinate_Geometry.pdf" },
                    { id: 4, title: "Chapter 4 - Linear Equations in Two Variables", file: "/notes/grade9/Maths/Chapter - 4 Linear_Equations_in_Two_Variables.pdf" },
                    { id: 5, title: "Chapter 5 - Introduction to Euclid's Geometry", file: "/notes/grade9/Maths/Chapter - 5 Introduction_to_Euclid_s_Geometry.pdf" },
                    { id: 6, title: "Chapter 6 - Lines and Angles", file: "/notes/grade9/Maths/Chapter - 6 Lines_and_Angles.pdf" },
                    { id: 7, title: "Chapter 7 - Triangles", file: "/notes/grade9/Maths/Chapter - 7 Triangles.pdf" },
                    { id: 8, title: "Chapter 8 - Quadrilaterals", file: "/notes/grade9/Maths/Chapter - 8 Quadrilaterals.pdf" },
                    { id: 9, title: "Chapter 9 - Areas of Parallelograms and Triangles", file: "/notes/grade9/Maths/Chapter - 9 Areas_of_Parallelograms_and_Triangles.pdf" },
                    { id: 10, title: "Chapter 10 - Circles", file: "/notes/grade9/Maths/Chapter - 10 Circles.pdf" },
                    { id: 11, title: "Chapter 11 - Geometric Constructions", file: "/notes/grade9/Maths/Chapter - 11 Geometric_Constructions.pdf" },
                    { id: 12, title: "Chapter 12 - Heron's Formula", file: "/notes/grade9/Maths/Chapter - 12 Heron_s_Formula.pdf" },
                    { id: 13, title: "Chapter 13 - Surface Areas and Volumes", file: "/notes/grade9/Maths/Chapter - 13 Surface_Areas_and_Volumes.pdf" },
                    { id: 14, title: "Chapter 14 - Statistics", file: "/notes/grade9/Maths/Chapter - 14 Statistics.pdf" },
                    { id: 15, title: "Chapter 15 - Probability", file: "/notes/grade9/Maths/Chapter - 15 Probability.pdf" },
                ],
            },
            {
                id: 2,
                name: "Science",
                description: "Physics, Chemistry, Biology",
                icon: "🧪",
                hasSubSubjects: true,
                subSubjects: [
                    {
                        id: 21,
                        name: "Physics",
                        icon: "⚡",
                        color: "blue",
                        notes: [
                            { id: 1, title: "Chapter 1 - Motion", file: "/notes/grade9/Physics/Chapter - 1 Motion.pdf" },
                            { id: 2, title: "Chapter 2 - Force and Laws of Motion", file: "/notes/grade9/Physics/Chapter - 2 Force_and_Laws_of_Motion.pdf" },
                            { id: 3, title: "Chapter 3 - Gravitation", file: "/notes/grade9/Physics/Chapter - 3 Gravitation.pdf" },
                            { id: 4, title: "Chapter 4 - Work and Energy", file: "/notes/grade9/Physics/Chapter - 4 Work_and_Energy.pdf" },
                            { id: 5, title: "Chapter 5 - Sound", file: "/notes/grade9/Physics/Chapter - 5 Sound.pdf" },
                        ],
                    },
                    {
                        id: 22,
                        name: "Chemistry",
                        icon: "🧪",
                        color: "purple",
                        notes: [
                            { id: 1, title: "Chapter 1 - Matter in Our Surroundings", file: "/notes/grade9/Chemistry/Chapter_1_Matter_in_Our_Surroundings.pdf" },
                            { id: 2, title: "Chapter 2 - Is Matter Around Us Pure", file: "/notes/grade9/Chemistry/Chapter_2_Is_Matter_Around_Us_Pure.pdf" },
                            { id: 3, title: "Chapter 3 - Atoms and Molecules", file: "/notes/grade9/Chemistry/Chapter_3_Atoms_and_Molecules.pdf" },
                            { id: 4, title: "Chapter 4 - Structure of the Atom", file: "/notes/grade9/Chemistry/Chapter_4_Structure_of_the_Atom.pdf" },
                        ],
                    },
                    {
                        id: 23,
                        name: "Biology",
                        icon: "🌿",
                        color: "green",
                        notes: [
                            { id: 1, title: "Chapter 1 - The Fundamental Unit of Life", file: "/notes/grade9/Biology/Chapter - 1 The_Fundamental_Unit_of_Life.pdf" },
                            { id: 2, title: "Chapter 2 - Tissues", file: "/notes/grade9/Biology/Chapter - 2 Tissues.pdf" },
                            { id: 3, title: "Chapter 3 - Diversity in Living Organisms", file: "/notes/grade9/Biology/Chapter - 3 Diversity_in_Living_Organisms.pdf" },
                            { id: 4, title: "Chapter 4 - Why Do We Fall Ill", file: "/notes/grade9/Biology/Chapter - 4 Why_Do_We_Fall_Ill.pdf" },
                            { id: 5, title: "Chapter 5 - Natural Resources", file: "/notes/grade9/Biology/Chapter - 5 Natural_Resources_updated.pdf" },
                            { id: 6, title: "Chapter 6 - Improvement in Food Resources", file: "/notes/grade9/Biology/Chapter - 6 Improvement_in_Food_Resources-.pdf" },
                        ],
                    },
                ],
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
                notes: [],
            },
            {
                id: 4,
                name: "Science",
                description: "Physics, Chemistry, Biology",
                icon: "🧪",
                hasSubSubjects: true,
                subSubjects: [
                    {
                        id: 41,
                        name: "Physics",
                        icon: "⚡",
                        color: "blue",
                        notes: [],
                    },
                    {
                        id: 42,
                        name: "Chemistry",
                        icon: "🧪",
                        color: "purple",
                        notes: [],
                    },
                    {
                        id: 43,
                        name: "Biology",
                        icon: "🌿",
                        color: "green",
                        notes: [],
                    },
                ],
            },
        ],
    },
};

export const initClassProgress = async (classId, subjects) => {
    try {
        return await API.post("/progress/initSemester", {
            semesterId: classId,
            subjects,
        });
    } catch (error) {
        console.error("Error initializing class progress:", error);
    }
};

export const fetchClassProgress = async (userClass) => {
    try {
        const response = await API.get(
            `/progress/getSemesterProgress?semester=${userClass}`
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
            `/progress/getSubjectProgress?semesterId=${classId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching subject progress:", error);
        throw error;
    }
};

export const markLectureWatched = async (data) => {
    try {
        const response = await API.post("/progress/markLectureWatched", data);
        return response.data;
    } catch (error) {
        console.error("Error marking lecture as watched:", error);
        throw error;
    }
};

export const markNoteRead = async (data) => {
    try {
        const response = await API.post("/progress/markNoteRead", data);
        return response.data;
    } catch (error) {
        console.error("Error marking note as read:", error);
        throw error;
    }
};
