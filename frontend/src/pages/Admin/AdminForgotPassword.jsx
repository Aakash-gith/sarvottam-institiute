import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

function AdminForgotPassword() {
    const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();

    // Timer for OTP expiry
    React.useEffect(() => {
        let interval;
        if (step === 2 && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timeLeft, step]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/admin/forgot-password/send-otp", { email });
            if (response.data.success) {
                toast.success("OTP sent to your email");
                setStep(2);
                setTimeLeft(600); // 10 minutes
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }
        setStep(3);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await API.post("/admin/forgot-password/verify-otp", {
                email,
                otp,
                newPassword,
            });
            if (response.data.success) {
                toast.success("Password reset successfully!");
                setTimeout(() => {
                    navigate("/admin/login");
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                {/* Header */}
                <button
                    onClick={() => (step === 1 ? navigate("/admin/login") : setStep(step - 1))}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">🔑</div>
                    <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                    <p className="text-gray-600 mt-2">Sarvottam Institute Admin</p>
                </div>

                {/* Step 1: Email */}
                {step === 1 && (
                    <form onSubmit={handleSendOTP} className="space-y-6">
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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                            <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                            <p className="text-sm text-blue-700">
                                We'll send a one-time password to your email address.
                            </p>
                        </div>
                    </form>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                                placeholder="000000"
                                maxLength="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                {timeLeft > 0 ? (
                                    <>
                                        OTP expires in{" "}
                                        <span className="font-semibold">
                                            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-red-500">OTP has expired</span>
                                )}
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || otp.length !== 6 || timeLeft === 0}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Verify OTP
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Send OTP Again
                        </button>
                    </form>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {newPassword.length < 6 ? "At least 6 characters" : "✓ Strong password"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {confirmPassword &&
                                (newPassword === confirmPassword ? (
                                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                        <CheckCircle2 size={14} /> Passwords match
                                    </p>
                                ) : (
                                    <p className="text-xs text-red-600 mt-1">Passwords don't match</p>
                                ))}
                        </div>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                newPassword.length < 6 ||
                                newPassword !== confirmPassword
                            }
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AdminForgotPassword;
