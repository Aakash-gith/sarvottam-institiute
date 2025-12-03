import AdminUser from "../models/AdminUser.js";

export const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const adminUser = await AdminUser.findOne({
            userId: req.user._id,
            isActive: true,
        });

        if (!adminUser) {
            return res.status(403).json({
                success: false,
                message: "Admin access required",
            });
        }

        req.admin = adminUser;
        next();
    } catch (error) {
        console.error("Admin middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Error verifying admin status",
        });
    }
};

export const masterAdminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const adminUser = await AdminUser.findOne({
            userId: req.user._id,
            role: "master_admin",
            isActive: true,
        });

        if (!adminUser) {
            return res.status(403).json({
                success: false,
                message: "Master admin access required",
            });
        }

        req.admin = adminUser;
        next();
    } catch (error) {
        console.error("Master admin middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Error verifying master admin status",
        });
    }
};

export const checkPermission = (permission) => {
    return async (req, res, next) => {
        try {
            if (!req.admin) {
                return res.status(403).json({
                    success: false,
                    message: "Admin access required",
                });
            }

            if (!req.admin.permissions[permission]) {
                return res.status(403).json({
                    success: false,
                    message: `Permission denied: ${permission}`,
                });
            }

            next();
        } catch (error) {
            console.error("Permission check error:", error);
            res.status(500).json({
                success: false,
                message: "Error checking permissions",
            });
        }
    };
};
