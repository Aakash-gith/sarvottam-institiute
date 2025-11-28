// Subject content data for Grade 9 and Grade 10
// Based on the HTML files in grade9/ and grade10/ folders

export const subjectContent = {
  // Grade 9 Mathematics (Subject ID: 1)
  1: {
    name: "Mathematics",
    grade: 9,
    notes: [
      { id: "m9-ch1", title: "Chapter 1: Number System", chapter: 1, type: "notes" },
      { id: "m9-ch2", title: "Chapter 2: Polynomials", chapter: 2, type: "notes" },
      { id: "m9-ch3", title: "Chapter 3: Coordinate Geometry", chapter: 3, type: "notes" },
      { id: "m9-ch4", title: "Chapter 4: Linear Equations in Two Variables", chapter: 4, type: "notes" },
      { id: "m9-ch5", title: "Chapter 5: Introduction to Euclid's Geometry", chapter: 5, type: "notes" },
      { id: "m9-ch6", title: "Chapter 6: Lines and Angles", chapter: 6, type: "notes" },
      { id: "m9-ch7", title: "Chapter 7: Triangles", chapter: 7, type: "notes" },
      { id: "m9-ch8", title: "Chapter 8: Quadrilaterals", chapter: 8, type: "notes" },
      { id: "m9-ch9", title: "Chapter 9: Areas of Parallelograms and Triangles", chapter: 9, type: "notes" },
      { id: "m9-ch10", title: "Chapter 10: Circles", chapter: 10, type: "notes" },
      { id: "m9-ch11", title: "Chapter 11: Geometric Constructions", chapter: 11, type: "notes" },
      { id: "m9-ch12", title: "Chapter 12: Heron's Formula", chapter: 12, type: "notes" },
      { id: "m9-ch13", title: "Chapter 13: Surface Areas and Volumes", chapter: 13, type: "notes" },
      { id: "m9-ch14", title: "Chapter 14: Statistics", chapter: 14, type: "notes" },
      { id: "m9-ch15", title: "Chapter 15: Probability", chapter: 15, type: "notes" },
    ],
    videos: [
      { id: "m9-v1", title: "Chapter 1: Number System", chapter: 1, type: "video" },
      { id: "m9-v2", title: "Chapter 2: Polynomials", chapter: 2, type: "video" },
      { id: "m9-v3", title: "Chapter 3: Coordinate Geometry", chapter: 3, type: "video" },
      { id: "m9-v4", title: "Chapter 4: Linear Equations in Two Variables", chapter: 4, type: "video" },
      { id: "m9-v5", title: "Chapter 5: Introduction to Euclid's Geometry", chapter: 5, type: "video" },
      { id: "m9-v6", title: "Chapter 6: Lines and Angles", chapter: 6, type: "video" },
      { id: "m9-v7", title: "Chapter 7: Triangles", chapter: 7, type: "video" },
      { id: "m9-v8", title: "Chapter 8: Quadrilaterals", chapter: 8, type: "video" },
      { id: "m9-v9", title: "Chapter 9: Areas of Parallelograms and Triangles", chapter: 9, type: "video" },
      { id: "m9-v10", title: "Chapter 10: Circles", chapter: 10, type: "video" },
      { id: "m9-v11", title: "Chapter 11: Geometric Constructions", chapter: 11, type: "video" },
      { id: "m9-v12", title: "Chapter 12: Heron's Formula", chapter: 12, type: "video" },
      { id: "m9-v13", title: "Chapter 13: Surface Areas and Volumes", chapter: 13, type: "video" },
      { id: "m9-v14", title: "Chapter 14: Statistics", chapter: 14, type: "video" },
      { id: "m9-v15", title: "Chapter 15: Probability", chapter: 15, type: "video" },
    ],
    importantContent: [
      { id: "m9-f1", title: "Formula Sheet", type: "formula" },
      { id: "m9-r1", title: "Revision Notes", type: "revision" },
      { id: "m9-e1", title: "Extra Practice Questions", type: "practice" },
    ],
  },

  // Grade 9 Science (Subject ID: 2)
  2: {
    name: "Science",
    grade: 9,
    notes: [
      // Physics
      { id: "s9-p1", title: "Physics - Chapter 1: Motion", chapter: 1, subject: "Physics", type: "notes" },
      { id: "s9-p2", title: "Physics - Chapter 2: Force and Laws of Motion", chapter: 2, subject: "Physics", type: "notes" },
      { id: "s9-p3", title: "Physics - Chapter 3: Gravitation", chapter: 3, subject: "Physics", type: "notes" },
      { id: "s9-p4", title: "Physics - Chapter 4: Work, Power and Energy", chapter: 4, subject: "Physics", type: "notes" },
      { id: "s9-p5", title: "Physics - Chapter 5: Sound", chapter: 5, subject: "Physics", type: "notes" },
      // Chemistry
      { id: "s9-c1", title: "Chemistry - Chapter 1: Matter in Our Surroundings", chapter: 1, subject: "Chemistry", type: "notes" },
      { id: "s9-c2", title: "Chemistry - Chapter 2: Is Matter Around Us Pure", chapter: 2, subject: "Chemistry", type: "notes" },
      { id: "s9-c3", title: "Chemistry - Chapter 3: Atoms and Molecules", chapter: 3, subject: "Chemistry", type: "notes" },
      { id: "s9-c4", title: "Chemistry - Chapter 4: Structure of the Atom", chapter: 4, subject: "Chemistry", type: "notes" },
      // Biology
      { id: "s9-b1", title: "Biology - Chapter 1: The Fundamental Unit of Life", chapter: 1, subject: "Biology", type: "notes" },
      { id: "s9-b2", title: "Biology - Chapter 2: Tissues", chapter: 2, subject: "Biology", type: "notes" },
      { id: "s9-b3", title: "Biology - Chapter 3: Diversity in Living Organisms", chapter: 3, subject: "Biology", type: "notes" },
      { id: "s9-b4", title: "Biology - Chapter 4: Why Do We Fall Ill", chapter: 4, subject: "Biology", type: "notes" },
      { id: "s9-b5", title: "Biology - Chapter 5: Natural Resources", chapter: 5, subject: "Biology", type: "notes" },
      { id: "s9-b6", title: "Biology - Chapter 6: Improvement in Food Resources", chapter: 6, subject: "Biology", type: "notes" },
    ],
    videos: [
      // Physics
      { id: "s9-vp1", title: "Physics - Chapter 1: Motion", chapter: 1, subject: "Physics", type: "video" },
      { id: "s9-vp2", title: "Physics - Chapter 2: Force and Laws of Motion", chapter: 2, subject: "Physics", type: "video" },
      { id: "s9-vp3", title: "Physics - Chapter 3: Gravitation", chapter: 3, subject: "Physics", type: "video" },
      { id: "s9-vp4", title: "Physics - Chapter 4: Work, Power and Energy", chapter: 4, subject: "Physics", type: "video" },
      { id: "s9-vp5", title: "Physics - Chapter 5: Sound", chapter: 5, subject: "Physics", type: "video" },
      // Chemistry
      { id: "s9-vc1", title: "Chemistry - Chapter 1: Matter in Our Surroundings", chapter: 1, subject: "Chemistry", type: "video" },
      { id: "s9-vc2", title: "Chemistry - Chapter 2: Is Matter Around Us Pure", chapter: 2, subject: "Chemistry", type: "video" },
      { id: "s9-vc3", title: "Chemistry - Chapter 3: Atoms and Molecules", chapter: 3, subject: "Chemistry", type: "video" },
      { id: "s9-vc4", title: "Chemistry - Chapter 4: Structure of the Atom", chapter: 4, subject: "Chemistry", type: "video" },
      // Biology
      { id: "s9-vb1", title: "Biology - Chapter 1: The Fundamental Unit of Life", chapter: 1, subject: "Biology", type: "video" },
      { id: "s9-vb2", title: "Biology - Chapter 2: Tissues", chapter: 2, subject: "Biology", type: "video" },
      { id: "s9-vb3", title: "Biology - Chapter 3: Diversity in Living Organisms", chapter: 3, subject: "Biology", type: "video" },
      { id: "s9-vb4", title: "Biology - Chapter 4: Why Do We Fall Ill", chapter: 4, subject: "Biology", type: "video" },
      { id: "s9-vb5", title: "Biology - Chapter 5: Natural Resources", chapter: 5, subject: "Biology", type: "video" },
      { id: "s9-vb6", title: "Biology - Chapter 6: Improvement in Food Resources", chapter: 6, subject: "Biology", type: "video" },
    ],
    importantContent: [
      { id: "s9-bs1", title: "Physics - Motion: Book Solution", type: "solution", subject: "Physics" },
      { id: "s9-bs2", title: "Physics - Force and Laws of Motion: Book Solution", type: "solution", subject: "Physics" },
      { id: "s9-bs3", title: "Physics - Gravitation: Book Solution", type: "solution", subject: "Physics" },
      { id: "s9-bs4", title: "Physics - Work, Power and Energy: Book Solution", type: "solution", subject: "Physics" },
      { id: "s9-bs5", title: "Chemistry - Matter in Our Surroundings: Book Solution", type: "solution", subject: "Chemistry" },
      { id: "s9-bs6", title: "Chemistry - Is Matter Around Us Pure: Book Solution", type: "solution", subject: "Chemistry" },
      { id: "s9-bs7", title: "Chemistry - Atoms and Molecules: Book Solution", type: "solution", subject: "Chemistry" },
      { id: "s9-bs8", title: "Chemistry - Structure of the Atom: Book Solution", type: "solution", subject: "Chemistry" },
      { id: "s9-bs9", title: "Biology - The Fundamental Unit of Life: Book Solution", type: "solution", subject: "Biology" },
      { id: "s9-bs10", title: "Biology - Diversity in Living Organisms: Book Solution", type: "solution", subject: "Biology" },
      { id: "s9-bs11", title: "Biology - Why Do We Fall Ill: Book Solution", type: "solution", subject: "Biology" },
      { id: "s9-bs12", title: "Biology - Natural Resources: Book Solution", type: "solution", subject: "Biology" },
      { id: "s9-bs13", title: "Biology - Improvement in Food Resources: Book Solution", type: "solution", subject: "Biology" },
    ],
  },

  // Grade 10 Mathematics (Subject ID: 3)
  3: {
    name: "Mathematics",
    grade: 10,
    notes: [
      { id: "m10-ch1", title: "Chapter 1: Real Numbers", chapter: 1, type: "notes" },
      { id: "m10-ch2", title: "Chapter 2: Polynomials", chapter: 2, type: "notes" },
      { id: "m10-ch3", title: "Chapter 3: Pair of Linear Equations in Two Variables", chapter: 3, type: "notes" },
      { id: "m10-ch4", title: "Chapter 4: Quadratic Equations", chapter: 4, type: "notes" },
      { id: "m10-ch5", title: "Chapter 5: Arithmetic Progressions", chapter: 5, type: "notes" },
      { id: "m10-ch6", title: "Chapter 6: Triangles", chapter: 6, type: "notes" },
      { id: "m10-ch7", title: "Chapter 7: Coordinate Geometry", chapter: 7, type: "notes" },
      { id: "m10-ch8", title: "Chapter 8: Introduction to Trigonometry", chapter: 8, type: "notes" },
      { id: "m10-ch9", title: "Chapter 9: Some Applications of Trigonometry", chapter: 9, type: "notes" },
      { id: "m10-ch10", title: "Chapter 10: Circles", chapter: 10, type: "notes" },
      { id: "m10-ch11", title: "Chapter 11: Constructions", chapter: 11, type: "notes" },
      { id: "m10-ch12", title: "Chapter 12: Areas Related to Circles", chapter: 12, type: "notes" },
      { id: "m10-ch13", title: "Chapter 13: Surface Areas and Volumes", chapter: 13, type: "notes" },
      { id: "m10-ch14", title: "Chapter 14: Statistics", chapter: 14, type: "notes" },
      { id: "m10-ch15", title: "Chapter 15: Probability", chapter: 15, type: "notes" },
    ],
    videos: [
      { id: "m10-v1", title: "Chapter 1: Real Numbers", chapter: 1, type: "video" },
      { id: "m10-v2", title: "Chapter 2: Polynomials", chapter: 2, type: "video" },
      { id: "m10-v3", title: "Chapter 3: Pair of Linear Equations in Two Variables", chapter: 3, type: "video" },
      { id: "m10-v4", title: "Chapter 4: Quadratic Equations", chapter: 4, type: "video" },
      { id: "m10-v5", title: "Chapter 5: Arithmetic Progressions", chapter: 5, type: "video" },
      { id: "m10-v6", title: "Chapter 6: Triangles", chapter: 6, type: "video" },
      { id: "m10-v7", title: "Chapter 7: Coordinate Geometry", chapter: 7, type: "video" },
      { id: "m10-v8", title: "Chapter 8: Introduction to Trigonometry", chapter: 8, type: "video" },
      { id: "m10-v9", title: "Chapter 9: Some Applications of Trigonometry", chapter: 9, type: "video" },
      { id: "m10-v10", title: "Chapter 10: Circles", chapter: 10, type: "video" },
      { id: "m10-v11", title: "Chapter 11: Constructions", chapter: 11, type: "video" },
      { id: "m10-v12", title: "Chapter 12: Areas Related to Circles", chapter: 12, type: "video" },
      { id: "m10-v13", title: "Chapter 13: Surface Areas and Volumes", chapter: 13, type: "video" },
      { id: "m10-v14", title: "Chapter 14: Statistics", chapter: 14, type: "video" },
      { id: "m10-v15", title: "Chapter 15: Probability", chapter: 15, type: "video" },
    ],
    importantContent: [
      { id: "m10-f1", title: "Formula Sheet", type: "formula" },
      { id: "m10-r1", title: "Revision Notes", type: "revision" },
      { id: "m10-e1", title: "Previous Year Questions", type: "practice" },
    ],
  },

  // Grade 10 Science (Subject ID: 4)
  4: {
    name: "Science",
    grade: 10,
    notes: [
      // Physics
      { id: "s10-p1", title: "Physics - Chapter 1: Electricity", chapter: 1, subject: "Physics", type: "notes" },
      { id: "s10-p2", title: "Physics - Chapter 2: Magnetic Effects of Electric Current", chapter: 2, subject: "Physics", type: "notes" },
      { id: "s10-p3", title: "Physics - Chapter 3: Sources of Energy", chapter: 3, subject: "Physics", type: "notes" },
      { id: "s10-p4", title: "Physics - Chapter 4: Light - Reflection and Refraction", chapter: 4, subject: "Physics", type: "notes" },
      { id: "s10-p5", title: "Physics - Chapter 5: Human Eye and Colourful World", chapter: 5, subject: "Physics", type: "notes" },
      // Chemistry
      { id: "s10-c1", title: "Chemistry - Chapter 1: Chemical Reactions and Equations", chapter: 1, subject: "Chemistry", type: "notes" },
      { id: "s10-c2", title: "Chemistry - Chapter 2: Acids, Bases and Salts", chapter: 2, subject: "Chemistry", type: "notes" },
      { id: "s10-c3", title: "Chemistry - Chapter 3: Metals and Non-metals", chapter: 3, subject: "Chemistry", type: "notes" },
      { id: "s10-c4", title: "Chemistry - Chapter 4: Carbon and its Compounds", chapter: 4, subject: "Chemistry", type: "notes" },
      { id: "s10-c5", title: "Chemistry - Chapter 5: Periodic Classification of Elements", chapter: 5, subject: "Chemistry", type: "notes" },
      // Biology
      { id: "s10-b1", title: "Biology - Chapter 1: Life Processes", chapter: 1, subject: "Biology", type: "notes" },
      { id: "s10-b2", title: "Biology - Chapter 2: Control and Coordination", chapter: 2, subject: "Biology", type: "notes" },
      { id: "s10-b3", title: "Biology - Chapter 3: How do Organisms Reproduce", chapter: 3, subject: "Biology", type: "notes" },
      { id: "s10-b4", title: "Biology - Chapter 4: Heredity and Evolution", chapter: 4, subject: "Biology", type: "notes" },
      { id: "s10-b5", title: "Biology - Chapter 5: Our Environment", chapter: 5, subject: "Biology", type: "notes" },
      { id: "s10-b6", title: "Biology - Chapter 6: Management of Natural Resources", chapter: 6, subject: "Biology", type: "notes" },
    ],
    videos: [
      // Physics
      { id: "s10-vp1", title: "Physics - Chapter 1: Electricity", chapter: 1, subject: "Physics", type: "video" },
      { id: "s10-vp2", title: "Physics - Chapter 2: Magnetic Effects of Electric Current", chapter: 2, subject: "Physics", type: "video" },
      { id: "s10-vp3", title: "Physics - Chapter 3: Sources of Energy", chapter: 3, subject: "Physics", type: "video" },
      { id: "s10-vp4", title: "Physics - Chapter 4: Light - Reflection and Refraction", chapter: 4, subject: "Physics", type: "video" },
      { id: "s10-vp5", title: "Physics - Chapter 5: Human Eye and Colourful World", chapter: 5, subject: "Physics", type: "video" },
      // Chemistry
      { id: "s10-vc1", title: "Chemistry - Chapter 1: Chemical Reactions and Equations", chapter: 1, subject: "Chemistry", type: "video" },
      { id: "s10-vc2", title: "Chemistry - Chapter 2: Acids, Bases and Salts", chapter: 2, subject: "Chemistry", type: "video" },
      { id: "s10-vc3", title: "Chemistry - Chapter 3: Metals and Non-metals", chapter: 3, subject: "Chemistry", type: "video" },
      { id: "s10-vc4", title: "Chemistry - Chapter 4: Carbon and its Compounds", chapter: 4, subject: "Chemistry", type: "video" },
      { id: "s10-vc5", title: "Chemistry - Chapter 5: Periodic Classification of Elements", chapter: 5, subject: "Chemistry", type: "video" },
      // Biology
      { id: "s10-vb1", title: "Biology - Chapter 1: Life Processes", chapter: 1, subject: "Biology", type: "video" },
      { id: "s10-vb2", title: "Biology - Chapter 2: Control and Coordination", chapter: 2, subject: "Biology", type: "video" },
      { id: "s10-vb3", title: "Biology - Chapter 3: How do Organisms Reproduce", chapter: 3, subject: "Biology", type: "video" },
      { id: "s10-vb4", title: "Biology - Chapter 4: Heredity and Evolution", chapter: 4, subject: "Biology", type: "video" },
      { id: "s10-vb5", title: "Biology - Chapter 5: Our Environment", chapter: 5, subject: "Biology", type: "video" },
      { id: "s10-vb6", title: "Biology - Chapter 6: Management of Natural Resources", chapter: 6, subject: "Biology", type: "video" },
    ],
    importantContent: [
      { id: "s10-f1", title: "Physics Formula Sheet", type: "formula", subject: "Physics" },
      { id: "s10-f2", title: "Chemistry Formula Sheet", type: "formula", subject: "Chemistry" },
      { id: "s10-r1", title: "Biology Diagrams Collection", type: "revision", subject: "Biology" },
      { id: "s10-e1", title: "Previous Year Questions", type: "practice" },
    ],
  },
};

export default subjectContent;
