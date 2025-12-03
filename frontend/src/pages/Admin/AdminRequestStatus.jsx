import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Mail, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import API from "../../api/axios";
import toast from "react-hot-toast";

function AdminRequestStatus() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigate();

    const email = localStorage.getItem("adminEmail");
    const MASTER_ADMIN_EMAIL = "arsir.personal@gmail.com";

    useEffect(() => {
        if (!email) {
            navigate("/admin/login");
            return;
        }
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            setLoading(true);
            const response = await API.get(`/admin/request-status?email=${email}`);
            setStatus(response.data.data);
        } catch (error) {
            toast.error("Error fetching request status");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchStatus();
        setRefreshing(false);
        toast.success("Status updated");
    };

    const handleSendEmail = () => {
        window.location.href = `mailto:${MASTER_ADMIN_EMAIL}?subject=Admin Access Request Follow-up&body=Hi,\n\nI submitted an admin access request with email: ${email}.\n\nCould you please review my request?\n\nThank you!`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading your request status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
                {/* Header */}
                <button
                    onClick={() => navigate("/admin/login")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Login
                </button>

                <div className="text-center mb-8">
                    {status?.status === "pending" && (
                        <Clock size={48} className="mx-auto text-yellow-500 mb-4" />
                    )}
                    {status?.status === "approved" && (
                        <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
                    )}
                    {status?.status === "rejected" && (
                        <XCircle size={48} className="mx-auto text-red-500 mb-4" />
                    )}

                    <h1 className="text-3xl font-bold text-gray-900">
                        {status?.status === "pending" && "Request Under Review"}
                        {status?.status === "approved" && "Request Approved! 🎉"}
                        {status?.status === "rejected" && "Request Rejected"}
                    </h1>
                </div>

                {/* Status Content */}
                <div className="space-y-6">
                    {/* Pending Status */}
                    {status?.status === "pending" && (
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Your request is under review
                            </h2>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    <span className="font-semibold">Request Date:</span>{" "}
                                    {new Date(status.requestDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-semibold">Email:</span> {status.email}
                                </p>
                                <p>
                                    <span className="font-semibold">Name:</span> {status.fullName}
                                </p>
                                <p className="text-sm">
                                    The master admin will review your request and send you an email
                                    notification once a decision is made.
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleRefresh}
                                    disabled={refreshing}
                                    className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50"
                                >
                                    {refreshing ? "Refreshing..." : "Check Status"}
                                </button>
                                <button
                                    onClick={handleSendEmail}
                                    className="w-full border-2 border-yellow-600 text-yellow-600 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition flex items-center justify-center gap-2"
                                >
                                    <Mail size={20} />
                                    Send Email to Master Admin
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Approved Status */}
                    {status?.status === "approved" && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Congratulations!
                            </h2>
                            <div className="space-y-3 text-gray-700">
                                <p>Your admin access has been approved.</p>
                                <p>
                                    <span className="font-semibold">Approved Date:</span>{" "}
                                    {new Date(status.approvedDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm">
                                    You can now access the admin dashboard with all available
                                    permissions.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate("/admin/dashboard")}
                                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                Go to Admin Dashboard
                            </button>
                        </div>
                    )}

                    {/* Rejected Status */}
                    {status?.status === "rejected" && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Request Rejected
                            </h2>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    <span className="font-semibold">Reason:</span>{" "}
                                    {status.rejectionReason}
                                </p>
                                <p className="text-sm">
                                    If you believe this was a mistake or have questions, please
                                    contact the master admin.
                                </p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleSendEmail}
                                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                                >
                                    <Mail size={20} />
                                    Contact Master Admin
                                </button>
                                <button
                                    onClick={() => navigate("/admin/login")}
                                    className="w-full border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminRequestStatus;
