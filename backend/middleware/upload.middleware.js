import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directories exist
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = "uploads/";

        // Determine path based on field name or route
        if (req.originalUrl.includes("pyq")) {
            uploadPath += "pyq/";
        } else if (req.originalUrl.includes("Note")) {
            uploadPath += "notes/";
        } else {
            uploadPath += "misc/";
        }

        ensureDir(path.join(process.cwd(), uploadPath));
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Sanitize filename: remove special chars, keep extension
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "_");
        cb(null, basename + "-" + uniqueSuffix + ext);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and Image files are allowed!"));
    }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: fileFilter,
});
