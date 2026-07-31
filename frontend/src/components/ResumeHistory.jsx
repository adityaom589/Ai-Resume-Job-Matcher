import { useEffect, useState } from "react";
import { deleteResume, getMyResumes } from "../services/api";

function ResumeHistory({
    selectedResumeId,
    onSelect,
    onAnalyze,
    refreshToken,
}) {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const loadResumes = async () => {
        try {
            setLoading(true);
            const data = await getMyResumes();
            setResumes(data);

            if (data.length > 0) {
                const selectedStillExists = data.some(
                    (resume) => resume.id === selectedResumeId
                );

                if (!selectedResumeId || !selectedStillExists) {
                    onSelect(data[0].id);
                }
            } else {
                onSelect(null);
            }
        } catch (error) {
            console.error("Failed to load resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadResumes();
        // selectedResumeId is intentionally not a dependency; otherwise selecting
        // a card would unnecessarily fetch the library again.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshToken]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this resume from your library?")) return;

        try {
            setDeletingId(id);
            await deleteResume(id);
            await loadResumes();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to delete resume");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="dashboard-card resume-library-card">
            <div className="resume-library-heading">
                <div>
                    <h3>📚 Resume Library</h3>
                    <p>Select a saved resume for analysis and job matching.</p>
                </div>
                <span className="resume-count">{resumes.length}</span>
            </div>

            {loading ? (
                <p>Loading resumes...</p>
            ) : resumes.length === 0 ? (
                <div className="resume-empty-state">
                    <strong>No saved resumes yet</strong>
                    <p>Upload one PDF to begin.</p>
                </div>
            ) : (
                <div className="resume-list">
                    {resumes.map((resume) => {
                        const selected = resume.id === selectedResumeId;

                        return (
                            <div
                                key={resume.id}
                                className={`resume-item ${selected ? "selected" : ""}`}
                                onClick={() => onSelect(resume.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        onSelect(resume.id);
                                    }
                                }}
                            >
                                <div className="resume-item-main">
                                    <div className="resume-file-icon">PDF</div>
                                    <div>
                                        <h4>{resume.fileName}</h4>
                                        <p>
                                            Uploaded {new Date(resume.uploadedAt).toLocaleString()}
                                        </p>
                                        {selected && (
                                            <span className="selected-resume-label">
                                                Selected for AI tools
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="resume-actions">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onSelect(resume.id);
                                            onAnalyze(resume.id);
                                        }}
                                    >
                                        Analyze
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        disabled={deletingId === resume.id}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleDelete(resume.id);
                                        }}
                                    >
                                        {deletingId === resume.id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ResumeHistory;
