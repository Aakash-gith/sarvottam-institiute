import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, FileText, ArrowRight, AlertCircle } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

function AdminSignup() {
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        reason: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/admin/request-access", formData);

            if (response.data.success) {
                localStorage.setItem("adminEmail", formData.email);
                navigate("/admin/request-status");
                toast.success("Request submitted successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error submitting request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">🚀</div>
                    <h1 className="text-3xl font-bold text-gray-900">Request Admin Access</h1>
                    <p className="text-gray-600 mt-2">Join our admin team at Sarvottam Institute</p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex gap-3">
                        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-700">
                            <p className="font-semibold mb-1">What happens next?</p>
                            <p>
                                Your request will be reviewed by our master admin. You'll receive an email
                                once your request is approved or rejected.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Why do you want to be an admin? <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Tell us about your experience and why you'd be a good admin..."
                                required
                                rows="5"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Minimum 20 characters required
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || formData.reason.length < 20}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Submitting..." : "Submit Request"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have admin access?{" "}
                        <button
                            onClick={() => navigate("/admin/login")}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;
