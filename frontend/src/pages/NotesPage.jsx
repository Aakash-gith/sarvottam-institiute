import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Bookmark, Eye, Loader } from "lucide-react";
import toast from "react-hot-toast";

function NotesPage() {
    const { chapterId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [htmlContent, setHtmlContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const chapter = location.state?.chapter;
    const filePath = location.state?.file;

    useEffect(() => {
        if (!filePath) {
            toast.error("Chapter data not found");
            navigate(-1);
            return;
        }

        const loadHtmlContent = async () => {
            try {
                setLoading(true);
                // Fetch the HTML file
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to load notes: ${response.status}`);
                }
                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                console.error("Error loading HTML content:", error);
                toast.error("Failed to load notes. Please try again.");
                setHtmlContent("<div style='padding: 40px; text-align: center;'><h2>Error loading notes</h2><p>Please try again later</p></div>");
            } finally {
                setLoading(false);
            }
        };

        loadHtmlContent();
    }, [filePath, navigate]);

    const handleDownload = () => {
        if (filePath) {
            toast.success("Starting download...");
            const link = document.createElement("a");
            link.href = filePath;
            link.download = `${chapter?.title || "notes"}.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        try {
            const bookmarks = JSON.parse(localStorage.getItem("bookmarkedNotes") || "[]");
            if (!isBookmarked) {
                bookmarks.push({
                    id: chapterId,
                    title: chapter?.title,
                    file: filePath,
                    savedAt: new Date().toISOString()
                });
                toast.success("Bookmarked!");
            } else {
                const index = bookmarks.findIndex(b => b.id === parseInt(chapterId));
                if (index > -1) bookmarks.splice(index, 1);
                toast.success("Removed bookmark");
            }
            localStorage.setItem("bookmarkedNotes", JSON.stringify(bookmarks));
        } catch (error) {
            console.error("Error saving bookmark:", error);
            toast.error("Failed to save bookmark");
        }
    };

    const handleShare = () => {
        const shareText = `Check out these notes: ${chapter?.title} - Class X Physics`;

        if (navigator.share) {
            navigator.share({
                title: chapter?.title,
                text: shareText,
                url: window.location.href,
            }).catch(err => console.log("Share cancelled:", err));
        } else {
            navigator.clipboard.writeText(shareText);
            toast.success("Text copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation Bar - Sticky */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            title="Go back"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-bold text-gray-900 truncate">
                                {chapter?.title || "Notes"}
                            </h1>
                            <p className="text-xs text-gray-500">Class X - Physics</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleBookmark}
                            className={`p-2 rounded-lg transition-colors ${isBookmarked
                                    ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                                    : "hover:bg-gray-100 text-gray-600"
                                }`}
                            title="Bookmark this chapter"
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

            {/* Loading State */}
            {loading && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader size={48} className="text-blue-600 animate-spin" />
                        <p className="text-gray-600 font-medium">Loading notes...</p>
                    </div>
                </div>
            )}

            {/* Content Area - Full Page */}
            {!loading && (
                <div className="flex-1 w-full overflow-y-auto">
                    <div
                        className="w-full bg-white"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            )}

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 mt-8">
                <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Eye size={18} />
                        <span className="text-sm">
                            {chapter?.title} - Class X Physics
                        </span>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full md:w-auto"
                    >
                        Back to Chapters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotesPage;
