import React from "react";
import { Navbar, HeaderBar } from "../components/index.components";

function News() {
    const newsItems = [
        {
            id: 1,
            title: "New Interactive Quiz System Launched",
            date: "November 26, 2025",
            summary: "Experience our new interactive quiz system with slide animations and detailed feedback.",
            category: "Technology"
        },
        {
            id: 2,
            title: "Campus Library Hours Extended",
            date: "November 25, 2025",
            summary: "The library will now be open until 11 PM on weekdays to support student study needs.",
            category: "Campus"
        },
        {
            id: 3,
            title: "Study Group Formation Event",
            date: "November 24, 2025",
            summary: "Join fellow students in forming study groups for the upcoming semester.",
            category: "Academic"
        }
    ];

    return (
        <div className="flex h-screen bg-bg">
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 transition-all duration-300">
                <div className="p-10 rounded-lg gap-5 flex flex-col h-full overflow-auto">
                    <HeaderBar />
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-6">Latest News</h1>

                        <div className="space-y-6">
                            {newsItems.map((item) => (
                                <div key={item.id} className="bg-white/10 p-6 rounded-lg">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {item.category}
                                        </span>
                                        <span className="text-gray-400 text-sm">{item.date}</span>
                                    </div>

                                    <h2 className="text-xl font-semibold text-white mb-3">{item.title}</h2>
                                    <p className="text-gray-300 mb-4">{item.summary}</p>

                                    <button className="text-purple-400 hover:text-purple-300 font-medium">
                                        Read More →
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
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