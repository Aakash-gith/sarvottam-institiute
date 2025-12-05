import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const manifestPath = path.join(__dirname, "..", "..", "grade10", "PYQ", "pyq-list.json");

const normalizeSubjectKey = (subject = "") => {
    const s = subject.trim().toLowerCase();
    if (s === "maths" || s === "mathematics") return "Maths";
    if (s === "science") return "Science";
    return "Maths"; // Default
};

// Helper to read manifest
const readManifest = async () => {
    try {
        const raw = await fs.readFile(manifestPath, "utf-8");
        return JSON.parse(raw);
    } catch (error) {
        // If file doesn't exist, return default structure
        return { Maths: [], Science: [] };
    }
};

// Helper to write manifest
const writeManifest = async (data) => {
    await fs.writeFile(manifestPath, JSON.stringify(data, null, 2), "utf-8");
};

export const getPyqList = async (req, res) => {
    try {
        const manifest = await readManifest();
        const subjectFilter = req.query.subject ? normalizeSubjectKey(req.query.subject) : null;

        if (subjectFilter) {
            return res.json({ classId: 10, subjects: { [subjectFilter]: manifest[subjectFilter] || [] } });
        }

        res.json({ classId: 10, subjects: manifest });
    } catch (error) {
        console.error("Failed to load PYQ list", error);
        res.status(500).json({ message: "Unable to load PYQ list." });
    }
};

export const uploadPyq = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { subject, year, examType, class: className } = req.body;

        if (!subject || !year || !examType) {
            return res.status(400).json({ message: "Missing metadata" });
        }

        const subjectKey = normalizeSubjectKey(subject);
        const manifest = await readManifest();

        // Construct public URL
        // Assuming 'uploads' is served statically
        const fileUrl = `/uploads/pyq/${req.file.filename}`;
        const label = `${year} ${examType} ${subject}`;

        const newEntry = {
            id: Date.now().toString(),
            label,
            file: fileUrl,
            year,
            examType,
            uploadedAt: new Date().toISOString()
        };

        if (!manifest[subjectKey]) {
            manifest[subjectKey] = [];
        }

        manifest[subjectKey].push(newEntry);
        await writeManifest(manifest);

        res.json({
            success: true,
            message: "PYQ uploaded successfully",
            data: newEntry
        });

    } catch (error) {
        console.error("Upload PYQ error:", error);
        res.status(500).json({ message: "Error uploading PYQ" });
    }
};

export const deletePyq = async (req, res) => {
    try {
        const { subject, id } = req.body;

        if (!subject || !id) {
            return res.status(400).json({ message: "Subject and ID required" });
        }

        const subjectKey = normalizeSubjectKey(subject);
        const manifest = await readManifest();

        if (!manifest[subjectKey]) {
            return res.status(404).json({ message: "Subject not found" });
        }

        const index = manifest[subjectKey].findIndex(item => item.id === id || item.file === id); // Support legacy file path as ID

        if (index === -1) {
            return res.status(404).json({ message: "PYQ not found" });
        }

        // Optional: Delete actual file
        // const filePath = path.join(process.cwd(), manifest[subjectKey][index].file);
        // await fs.unlink(filePath).catch(() => {});

        manifest[subjectKey].splice(index, 1);
        await writeManifest(manifest);

        res.json({
            success: true,
            message: "PYQ deleted successfully"
        });

    } catch (error) {
        console.error("Delete PYQ error:", error);
        res.status(500).json({ message: "Error deleting PYQ" });
    }
};
