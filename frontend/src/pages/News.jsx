import React from "react";
import { Navbar, HeaderBar } from "../components/index.components";
import { Newspaper, ChevronRight, Calendar } from "lucide-react";

function News() {
    const newsItems = [
        {
            id: 1,
            title: "New Interactive Quiz System Launched",
            date: "November 26, 2025",
            summary: "Experience our new interactive quiz system with slide animations and detailed feedback.",
            category: "Technology",
            color: "blue"
        },
        {
            id: 2,
            title: "Campus Library Hours Extended",
            date: "November 25, 2025",
            summary: "The library will now be open until 11 PM on weekdays to support student study needs.",
            category: "Campus",
            color: "green"
        },
        {
            id: 3,
            title: "Study Group Formation Event",
            date: "November 24, 2025",
            summary: "Join fellow students in forming study groups for the upcoming semester.",
            category: "Academic",
            color: "amber"
        }
    ];

    const getCategoryColor = (color) => {
        const colors = {
            blue: "bg-blue-100 text-blue-700 border-blue-200",
            green: "bg-green-100 text-green-700 border-green-200",
            amber: "bg-amber-100 text-amber-700 border-amber-200"
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-1 transition-all duration-300">
                <div className="p-6 md:p-10 rounded-lg gap-5 flex flex-col h-full overflow-auto">
                    <HeaderBar />
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                                <Newspaper size={28} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Latest News</h1>
                                <p className="text-gray-500">Stay updated with the latest announcements</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {newsItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(item.color)}`}>
                                            {item.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                            <Calendar size={14} />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h2>
                                    <p className="text-gray-600 mb-4">{item.summary}</p>

                                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium group-hover:gap-2 transition-all">
                                        Read More
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
                                Load More News
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;