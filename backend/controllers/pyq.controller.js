import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const manifestPath = path.join(__dirname, "..", "..", "grade10", "PYQ", "pyq-list.json");

const normalizeSubjectKey = (subject = "") => subject.trim().toLowerCase();

export const getPyqList = async (req, res) => {
    try {
        const raw = await fs.readFile(manifestPath, "utf-8");
        const manifest = JSON.parse(raw);
        const subjectFilter = normalizeSubjectKey(req.query.subject);

        if (subjectFilter) {
            const matchingKey = Object.keys(manifest).find(
                (key) => normalizeSubjectKey(key) === subjectFilter
            );

            if (!matchingKey) {
                return res.status(404).json({ message: `No PYQs found for subject '${req.query.subject}'` });
            }

            return res.json({ classId: 10, subjects: { [matchingKey]: manifest[matchingKey] } });
        }

        res.json({ classId: 10, subjects: manifest });
    } catch (error) {
        if (error.code === "ENOENT") {
            return res.status(404).json({ message: "PYQ manifest is missing. Run update-pyq-list.js to generate it." });
        }

        console.error("Failed to load PYQ list", error);
        res.status(500).json({ message: "Unable to load PYQ list." });
    }
};
