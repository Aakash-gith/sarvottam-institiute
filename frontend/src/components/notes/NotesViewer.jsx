import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Bookmark, Eye } from "lucide-react";

function NotesViewer() {
    const { noteId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [htmlContent, setHtmlContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const chapter = location.state?.chapter;
    const filePath = location.state?.file;

    useEffect(() => {
        if (!filePath) {
            navigate(-1);
            return;
        }

        const loadHtmlContent = async () => {
            try {
                setLoading(true);
                // Fetch the HTML file
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error("Failed to load notes");
                }
                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                console.error("Error loading HTML content:", error);
                setHtmlContent("<div style='padding: 40px; text-align: center;'><h2>Error loading notes</h2><p>Please try again later</p></div>");
            } finally {
                setLoading(false);
            }
        };

        loadHtmlContent();
    }, [filePath, navigate]);

    const handleDownload = () => {
        if (filePath) {
            const link = document.createElement("a");
            link.href = filePath;
            link.download = chapter?.title || "notes";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        // Store bookmark in localStorage
        try {
            const bookmarks = JSON.parse(localStorage.getItem("bookmarkedNotes") || "[]");
            if (!isBookmarked) {
                bookmarks.push({ id: noteId, title: chapter?.title, file: filePath });
            } else {
                const index = bookmarks.findIndex(b => b.id === parseInt(noteId));
                if (index > -1) bookmarks.splice(index, 1);
            }
            localStorage.setItem("bookmarkedNotes", JSON.stringify(bookmarks));
        } catch (error) {
            console.error("Error saving bookmark:", error);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: chapter?.title,
                text: `Check out these notes: ${chapter?.title}`,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">
                                {chapter?.title || "Notes"}
                            </h1>
                            <p className="text-sm text-gray-500">Class X - Physics</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleBookmark}
                            className={`p-2 rounded-lg transition-colors ${isBookmarked
                                    ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                                    : "hover:bg-gray-100 text-gray-600"
                                }`}
                            title="Bookmark"
                        >
                            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                            title="Share"
                        >
                            <Share2 size={20} />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                            title="Download"
                        >
                            <Download size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-4xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600 font-medium">Loading notes...</p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="prose prose-lg max-w-none p-6 md:p-8 bg-white rounded-lg m-4 md:m-8"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        style={{
                            fontSize: "16px",
                            lineHeight: "1.6",
                        }}
                    />
                )}
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Eye size={18} />
                            <span className="text-sm">
                                {chapter?.title} - Class X Physics
                            </span>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Back to Chapters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesViewer;
