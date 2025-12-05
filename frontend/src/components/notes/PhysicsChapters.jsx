import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Zap, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { classData, markNoteRead } from "../../classData";

function PhysicsChapters() {
    const navigate = useNavigate();
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trackedNotes, setTrackedNotes] = useState([]);

    const currentClass = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                const userData = JSON.parse(localStorage.getItem("user") || "{}");
                return userData.class || 10;
            } catch {
                return 10;
            }
        }
        return 10;
    }, []);

    useEffect(() => {
        // Get Physics notes from classData
        const classInfo = classData[currentClass];
        if (classInfo && classInfo.subjects) {
            const scienceSubject = classInfo.subjects.find(s => s.hasSubSubjects);
            if (scienceSubject && scienceSubject.subSubjects) {
                const physics = scienceSubject.subSubjects.find(s => s.id === 41);
                if (physics && physics.notes) {
                    setChapters(physics.notes);
                }
            }
        }
        setLoading(false);
    }, [currentClass]);

    const handleChapterClick = async (chapter) => {
        try {
            // Mark as read
            await markNoteRead({
                classId: currentClass,
                subjectId: 41,
                noteId: chapter.id,
            });
            setTrackedNotes([...trackedNotes, chapter.id]);
        } catch (error) {
            console.error("Error marking chapter as read:", error);
        }

        // Navigate directly to the notes page with full page display
        navigate(`/notes/chapter/${chapter.id}`, {
            state: {
                chapter,
                file: chapter.file,
                isHTML: chapter.isHTML
            }
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 text-sm">Loading chapters...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back</span>
                </button>

                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg">
                        ⚡
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Physics - Class X
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Master all 12 chapters of Class 10 Physics with comprehensive notes
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mt-6 flex-wrap">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                        <BookOpen size={18} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">
                            {chapters.length} Chapters
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle size={18} className="text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                            {trackedNotes.length} Completed
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
                        <Clock size={18} className="text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                            Self-paced Learning
                        </span>
                    </div>
                </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.length > 0 ? (
                    chapters.map((chapter, index) => {
                        const isCompleted = trackedNotes.includes(chapter.id);
                        return (
                            <div
                                key={chapter.id}
                                onClick={() => handleChapterClick(chapter)}
                                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                            >
                                {/* Chapter Number Badge */}
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                                    {index + 1}
                                </div>

                                {/* Completed Badge */}
                                {isCompleted && (
                                    <div className="absolute top-4 left-4">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                                            <CheckCircle size={14} className="text-green-600" />
                                            <span className="text-xs font-semibold text-green-700">Completed</span>
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="mb-4 mt-2">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors pr-12">
                                        {chapter.title}
                                    </h3>
                                </div>

                                {/* Icon */}
                                <div className="mb-4 inline-flex">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                        📖
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Zap size={14} className="text-blue-500" />
                                        <span>Interactive Notes</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock size={14} className="text-amber-500" />
                                        <span>~20-30 minutes</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                                        {isCompleted ? "Review" : "Start Learning"}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center group-hover:translate-x-1 transition-all duration-300">
                                        <Zap size={14} className="text-blue-600" />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-12">
                        <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">No chapters available yet</p>
                        <p className="text-gray-400 text-sm mt-2">Check back soon for Physics notes</p>
                    </div>
                )}
            </div>

            {/* Features Section */}
            {chapters.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Our Notes?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="font-bold text-gray-900 mb-2">Exam Focused</h3>
                            <p className="text-sm text-gray-600">
                                Designed according to CBSE curriculum and exam patterns
                            </p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                            <div className="text-3xl mb-3">📚</div>
                            <h3 className="font-bold text-gray-900 mb-2">Comprehensive</h3>
                            <p className="text-sm text-gray-600">
                                All concepts, formulas, and important diagrams included
                            </p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="font-bold text-gray-900 mb-2">Easy to Understand</h3>
                            <p className="text-sm text-gray-600">
                                Simplified explanations with real-world examples
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PhysicsChapters;
