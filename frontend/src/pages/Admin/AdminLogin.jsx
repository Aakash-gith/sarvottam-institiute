import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight, AlertCircle } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/admin/login", { email });

            if (response.data.success) {
                const { token, role } = response.data.data;
                localStorage.setItem("adminEmail", email);
                localStorage.setItem("token", token);
                localStorage.setItem("adminRole", role);
                navigate("/admin/dashboard");
                toast.success("Welcome to Admin Panel!");
            }
        } catch (error) {
            const message = error.response?.data?.message;

            if (message === "pending") {
                localStorage.setItem("adminEmail", email);
                navigate("/admin/request-status");
                toast.info("Your request is under review");
            } else if (message === "rejected") {
                const data = error.response?.data?.data;
                navigate("/admin/request-rejected", {
                    state: { reason: data?.rejectionReason },
                });
            } else if (message === "notfound") {
                navigate("/admin/signup");
                toast.info("Please request admin access first");
            } else {
                toast.error(error.response?.data?.message || "Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">🔐</div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-600 mt-2">Sarvottam Institute</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Logging in..." : "Login to Admin Panel"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">New here?</span>
                    </div>
                </div>

                {/* Sign up link */}
                <button
                    onClick={() => navigate("/admin/signup")}
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                    Request Admin Access
                </button>

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-700">
                            <p className="font-semibold mb-1">First time?</p>
                            <p>
                                Request admin access and wait for approval from the master admin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
