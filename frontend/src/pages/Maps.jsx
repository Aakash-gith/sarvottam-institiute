import React from "react";
import { Navbar, HeaderBar } from "../components/index.components";
import { MapPin, Building, BookOpen, Coffee } from "lucide-react";

function Maps() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Navbar />

            {/* Main Content Area */}
            <div className="flex-1 transition-all duration-300">
                <div className="p-6 md:p-10 rounded-lg gap-5 flex flex-col h-full overflow-auto">
                    <HeaderBar />
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg">
                                <MapPin size={32} className="text-white" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Maps</h1>
                            <p className="text-gray-600 text-lg">Navigate your campus with interactive maps!</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Campus Map</h3>
                            <p className="text-gray-600 mb-6">Find classrooms, libraries, cafeterias and more</p>

                            <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center mb-6 border border-gray-200">
                                <div className="text-center">
                                    <MapPin size={48} className="text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">Campus Map Component Goes Here</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                    <Building size={20} className="text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">Classrooms</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <BookOpen size={20} className="text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Library</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                    <Coffee size={20} className="text-amber-600" />
                                    <span className="text-sm font-medium text-gray-700">Cafeteria</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100">
                                    <MapPin size={20} className="text-red-600" />
                                    <span className="text-sm font-medium text-gray-700">Main Gate</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                View Full Map
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Maps;