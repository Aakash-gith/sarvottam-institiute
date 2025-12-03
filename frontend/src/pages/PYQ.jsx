import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FileText, Download, Eye, ArrowLeft, Filter } from "lucide-react";
import { Helmet } from "react-helmet-async";
import API from "../api/axios";

function PYQ() {
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const { subjectId } = useParams();

    const [pyqList, setPyqList] = useState([]);
    const [filteredPyq, setFilteredPyq] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedSubject, setSelectedSubject] = useState(subjectId || "all");

    const classYear = userData?.class || 9;
    const subjects = ["Maths", "Science"];
    const years = ["2023", "2024", "2025"];

    useEffect(() => {
        fetchPYQ();
    }, [classYear]);

    const fetchPYQ = async () => {
        try {
            setLoading(true);
            const response = await API.get("/pyq");
            if (response.data) {
                // Transform the data from the backend structure
                const data = response.data;
                let pyqList = [];

                if (data.subjects) {
                    // Convert subjects object to array of PYQ items
                    Object.entries(data.subjects).forEach(([subject, papers]) => {
                        if (Array.isArray(papers)) {
                            papers.forEach((paper) => {
                                pyqList.push({
                                    _id: `${subject}-${paper.year}-${paper.exam}`,
                                    subject: subject,
                                    year: paper.year?.toString() || "Unknown",
                                    examType: paper.exam || "Exam",
                                    fileUrl: paper.url || paper.fileUrl,
                                    description: paper.description || "",
                                });
                            });
                        }
                    });
                }

                setPyqList(pyqList);
            }
        } catch (error) {
            console.error("Failed to fetch PYQ:", error);
            setPyqList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = pyqList;

        if (selectedSubject !== "all") {
            filtered = filtered.filter((pyq) =>
                pyq.subject?.toLowerCase() === selectedSubject.toLowerCase()
            );
        }

        if (selectedYear !== "all") {
            filtered = filtered.filter((pyq) => pyq.year === selectedYear);
        }

        setFilteredPyq(filtered);
    }, [selectedSubject, selectedYear, pyqList]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Helmet>
                <title>Previous Year Questions | Sarvottam Institute</title>
                <meta name="description" content="Access previous year questions for Class 9 and Class 10" />
            </Helmet>

            <Navbar />

            <div className="max-w-7xl mx-auto w-full px-6 py-12 mt-16">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="p-2 hover:bg-gray-200 rounded-lg transition"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={24} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Previous Year Questions</h1>
                            <p className="text-gray-600 mt-2">Class {classYear} - Prepare with past papers</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Subject Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Subjects</option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject.toLowerCase()}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="all">All Years</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* PYQ List */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredPyq.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 text-lg">No PYQ papers found</p>
                        <p className="text-gray-500">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPyq.map((pyq) => (
                            <div
                                key={pyq._id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {pyq.subject || "Subject"} - {pyq.year || "Year"}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {pyq.examType || "Exam"}
                                        </p>
                                    </div>
                                    <FileText size={24} className="text-blue-600" />
                                </div>

                                {pyq.description && (
                                    <p className="text-gray-600 text-sm mb-4">{pyq.description}</p>
                                )}

                                <div className="flex gap-3">
                                    {pyq.fileUrl && (
                                        <a
                                            href={pyq.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                        >
                                            <Eye size={18} />
                                            View
                                        </a>
                                    )}
                                    {pyq.fileUrl && (
                                        <a
                                            href={pyq.fileUrl}
                                            download
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                                        >
                                            <Download size={18} />
                                            Download
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PYQ;
