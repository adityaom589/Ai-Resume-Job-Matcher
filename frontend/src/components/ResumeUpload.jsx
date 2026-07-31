import { useState } from "react";
import api from "../services/api";

function ResumeUpload({ onUploaded }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            alert("Choose a resume");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);

            const token = localStorage.getItem("token");
            const response = await api.post("/resume/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(response.data);
            setFile(null);

            const input = document.getElementById("resume-file-input");
            if (input) input.value = "";

            onUploaded?.();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || error.response?.data || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="dashboard-card">
            <h3>📄 Upload Resume</h3>
            <p>Identical files are detected automatically and are not stored twice.</p>

            <input
                id="resume-file-input"
                type="file"
                accept=".pdf"
                onChange={(event) => setFile(event.target.files[0] || null)}
            />

            <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleUpload}
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Upload Resume"}
            </button>
        </div>
    );
}

export default ResumeUpload;
