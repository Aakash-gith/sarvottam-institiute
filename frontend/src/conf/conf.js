const conf = {
  apiUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  toast: {
    duration: 4000,
    style: {
      background: "#1F2937",
      color: "#fff",
      border: "1px solid #374151",
    },
    success: {
      iconTheme: {
        primary: "#10B981",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#EF4444",
        secondary: "#fff",
      },
    },
  },
};

export default conf;
