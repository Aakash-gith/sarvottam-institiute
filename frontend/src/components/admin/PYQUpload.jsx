import React, { useState } from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

function PYQUpload() {
    const [formData, setFormData] = useState({
        subject: "",
        class: "",
        year: "",
        examType: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [uploadedPYQ, setUploadedPYQ] = useState([]);

    const subjects = ["Maths", "Science"];
    const classes = ["9", "10"];
    const years = ["2023", "2024", "2025"];
    const examTypes = ["Half Yearly", "Annual", "Board"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) {
                toast.error("File size must be less than 50MB");
                return;
            }
            if (!file.type.includes("pdf") && !file.type.includes("image")) {
                toast.error("Only PDF and image files are allowed");
                return;
            }
            setFormData((prev) => ({
                ...prev,
                file: file,
            }));
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.subject ||
            !formData.class ||
            !formData.year ||
            !formData.examType ||
            !formData.file
        ) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            // API call would go here
            // const response = await API.post("/admin/upload-pyq", formData);

            toast.success("PYQ uploaded successfully!");

            setUploadedPYQ([
                ...uploadedPYQ,
                {
                    id: Date.now(),
                    subject: formData.subject,
                    class: formData.class,
                    year: formData.year,
                    examType: formData.examType,
                    fileName: fileName,
                    date: new Date().toLocaleDateString(),
                },
            ]);

            setFormData({
                subject: "",
                class: "",
                year: "",
                examType: "",
                file: null,
            });
            setFileName("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error uploading PYQ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload PYQ Papers</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Class <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="class"
                                value={formData.class}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Class</option>
                                {classes.map((c) => (
                                    <option key={c} value={c}>
                                        Class {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Year</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Exam Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Exam Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="examType"
                                value={formData.examType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Exam Type</option>
                                {examTypes.map((e) => (
                                    <option key={e} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Paper <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                            <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="cursor-pointer">
                                <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                                <p className="text-gray-700 font-medium">
                                    {fileName || "Click to upload or drag and drop"}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    PDF or image files up to 50MB
                                </p>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Uploading..." : "Upload PYQ"}
                        {!loading && <Upload size={20} />}
                    </button>
                </form>
            </div>

            {/* Uploaded PYQ List */}
            {uploadedPYQ.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Uploaded</h2>
                    <div className="space-y-4">
                        {uploadedPYQ.map((paper) => (
                            <div
                                key={paper.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <div className="flex items-center gap-4">
                                    <CheckCircle2 size={24} className="text-green-600" />
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {paper.subject} - {paper.examType} {paper.year}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Class {paper.class} • {paper.date}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">{paper.fileName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PYQUpload;
