import React, { useState, useEffect } from "react";
import { Check, X, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/axios";

function AdminRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectionReason, setRejectionReason] = useState("");
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await API.get("/admin/pending-requests");
            setRequests(response.data.data || []);
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Error loading requests");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const response = await API.put(`/admin/approve/${requestId}`);
            toast.success("Request approved!");
            fetchPendingRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error approving request");
        }
    };

    const handleReject = async (requestId) => {
        if (!rejectionReason.trim()) {
            toast.error("Please provide a rejection reason");
            return;
        }

        try {
            await API.put(`/admin/reject/${requestId}`, {
                rejectionReason,
            });
            toast.success("Request rejected");
            setRejectionReason("");
            setSelectedRequestId(null);
            fetchPendingRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error rejecting request");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-4">
                        <Clock size={32} className="text-yellow-600" />
                        <div>
                            <p className="text-gray-600 text-sm">Pending Requests</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {requests.filter((r) => r.status === "pending").length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Access Requests</h2>

                {requests.filter((r) => r.status === "pending").length === 0 ? (
                    <div className="text-center py-12">
                        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 text-lg">No pending requests</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {requests
                            .filter((r) => r.status === "pending")
                            .map((request) => (
                                <div
                                    key={request._id}
                                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {request.fullName}
                                            </h3>
                                            <p className="text-sm text-gray-600">{request.email}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                                            <Clock size={16} />
                                            Pending
                                        </span>
                                    </div>

                                    {/* Reason */}
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">
                                            Why they want to be admin:
                                        </p>
                                        <p className="text-gray-600 bg-gray-50 p-3 rounded text-sm">
                                            {request.reason}
                                        </p>
                                    </div>

                                    {/* Request Date */}
                                    <p className="text-xs text-gray-500 mb-4">
                                        Requested on {new Date(request.requestDate).toLocaleDateString()}
                                    </p>

                                    {/* Rejection Reason Form (if selected) */}
                                    {selectedRequestId === request._id && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rejection Reason <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                                placeholder="Explain why you're rejecting this request..."
                                                rows="3"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                            ></textarea>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        {selectedRequestId === request._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleReject(request._id)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                                >
                                                    <X size={18} />
                                                    Confirm Rejection
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedRequestId(null);
                                                        setRejectionReason("");
                                                    }}
                                                    className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(request._id)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                                                >
                                                    <Check size={18} />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => setSelectedRequestId(request._id)}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                                                >
                                                    <X size={18} />
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* All Requests History */}
            {requests.some((r) => r.status !== "pending") && (
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Request History</h2>
                    <div className="space-y-3">
                        {requests
                            .filter((r) => r.status !== "pending")
                            .map((request) => (
                                <div
                                    key={request._id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900">{request.fullName}</p>
                                        <p className="text-sm text-gray-600">{request.email}</p>
                                    </div>
                                    <span
                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${request.status === "approved"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {request.status === "approved" ? (
                                            <>
                                                <Check size={16} />
                                                Approved
                                            </>
                                        ) : (
                                            <>
                                                <X size={16} />
                                                Rejected
                                            </>
                                        )}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminRequests;
