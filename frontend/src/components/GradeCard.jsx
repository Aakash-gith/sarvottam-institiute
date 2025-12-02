import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GradeCard({
    icon,
    title,
    description,
    features = [],
    buttonText,
    onButtonClick,
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 mb-6">{description}</p>
            <div className="space-y-3 mb-6">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle size={18} className="text-blue-600" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
            <button
                onClick={onButtonClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
                {buttonText}
                <ArrowRight size={18} />
            </button>
        </div>
    );
}

export default GradeCard;
