import { useEffect, useState } from "react";
import {
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
} from "../services/api";

const emptyJob = {
    company: "",
    title: "",
    location: "",
    description: "",
    requiredSkills: "",
    minimumExperience: 0,
};

function AdminJobManager({ onJobsChange }) {
    const [jobs, setJobs] = useState([]);
    const [form, setForm] = useState(emptyJob);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const loadJobs = async () => {
        try {
            const data = await getAllJobs();
            const jobList = Array.isArray(data) ? data : [];
            setJobs(jobList);
            onJobsChange?.(jobList.length);
        } catch (error) {
            console.error("Failed to load jobs", error);
            setMessage("Unable to load jobs.");
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleChange = (event) => {
        setForm((current) => ({
            ...current,
            [event.target.name]: event.target.value,
        }));
    };

    const resetForm = () => {
        setForm(emptyJob);
        setEditingId(null);
    };

    const handleSubmit = async () => {
        if (
            !form.company.trim() ||
            !form.title.trim() ||
            !form.location.trim() ||
            !form.requiredSkills.trim() ||
            !form.description.trim()
        ) {
            setMessage("Please fill in all job fields.");
            return;
        }

        const jobData = {
            ...form,
            minimumExperience: Number(form.minimumExperience),
        };

        try {
            setSaving(true);
            setMessage("");

            if (editingId !== null) {
                await updateJob(editingId, jobData);
                setMessage("Job updated successfully.");
            } else {
                await createJob(jobData);
                setMessage("Job created successfully.");
            }

            resetForm();
            await loadJobs();
        } catch (error) {
            console.error("Job save failed:", error);
            console.error("Backend response:", error.response?.data);
            setMessage(
                error.response?.data?.message ||
                (typeof error.response?.data === "string" ? error.response.data : "") ||
                "Failed to save job."
            );
        } finally {
            setSaving(false);
        }
    };

    const editJob = (job) => {
        setEditingId(job.id);
        setForm({
            company: job.company ?? "",
            title: job.title ?? "",
            location: job.location ?? "",
            description: job.description ?? "",
            requiredSkills: job.requiredSkills ?? "",
            minimumExperience: job.minimumExperience ?? 0,
        });
        setMessage("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const removeJob = async (id) => {
        if (!window.confirm("Delete this job?")) return;

        try {
            await deleteJob(id);
            setMessage("Job deleted successfully.");
            if (editingId === id) resetForm();
            await loadJobs();
        } catch (error) {
            console.error("Job delete failed", error);
            setMessage("Failed to delete job.");
        }
    };

    const skillsFor = (job) =>
        String(job.requiredSkills ?? "")
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
            .slice(0, 6);

    return (
        <section className="job-manager">
            <div className="job-manager-heading">
                <div>
                    <span className="admin-eyebrow">Job management</span>
                    <h2>{editingId !== null ? "Update job listing" : "Create a new job"}</h2>
                    <p>Add clear details so candidates can compare their resume accurately.</p>
                </div>
                <span className="job-count-badge">{jobs.length} jobs</span>
            </div>

            <div className="job-form-card">
                <div className="job-form-grid">
                    <label>
                        Company
                        <input name="company" placeholder="e.g. Google" value={form.company} onChange={handleChange} />
                    </label>

                    <label>
                        Job title
                        <input name="title" placeholder="e.g. Java Developer" value={form.title} onChange={handleChange} />
                    </label>

                    <label>
                        Location
                        <input name="location" placeholder="e.g. Bengaluru" value={form.location} onChange={handleChange} />
                    </label>

                    <label>
                        Minimum experience
                        <input
                            type="number"
                            min="0"
                            name="minimumExperience"
                            placeholder="0"
                            value={form.minimumExperience}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="job-form-wide">
                        Required skills
                        <input
                            name="requiredSkills"
                            placeholder="Java, Spring Boot, MySQL, REST APIs"
                            value={form.requiredSkills}
                            onChange={handleChange}
                        />
                    </label>

                    <label className="job-form-wide">
                        Description
                        <textarea
                            rows={5}
                            name="description"
                            placeholder="Describe responsibilities, requirements and the role..."
                            value={form.description}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {message && <p className="job-message" role="status">{message}</p>}

                <div className="job-form-actions">
                    <button type="button" className="admin-primary-button" onClick={handleSubmit} disabled={saving}>
                        {saving ? "Saving..." : editingId !== null ? "Update Job" : "Create Job"}
                    </button>

                    {editingId !== null && (
                        <button type="button" className="admin-secondary-button" onClick={resetForm} disabled={saving}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <div className="job-list-heading">
                <div>
                    <h2>Published jobs</h2>
                    <p>Edit or remove listings currently available to users.</p>
                </div>
            </div>

            {jobs.length === 0 ? (
                <div className="job-empty-state">
                    <span>💼</span>
                    <h3>No jobs published yet</h3>
                    <p>Create your first listing using the form above.</p>
                </div>
            ) : (
                <div className="admin-job-grid">
                    {jobs.map((job) => (
                        <article className="admin-job-card" key={job.id}>
                            <div className="admin-job-topline">
                                <div className="company-avatar">{job.company?.charAt(0)?.toUpperCase() || "J"}</div>
                                <div>
                                    <p className="admin-job-company">{job.company}</p>
                                    <h3>{job.title}</h3>
                                </div>
                            </div>

                            <div className="admin-job-meta">
                                <span>📍 {job.location}</span>
                                <span>🕒 {job.minimumExperience ?? 0}+ yrs</span>
                            </div>

                            <p className="admin-job-description">
                                {job.description || "No description provided."}
                            </p>

                            <div className="admin-skill-list">
                                {skillsFor(job).map((skill) => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>

                            <div className="admin-job-actions">
                                <button type="button" className="admin-edit-button" onClick={() => editJob(job)}>
                                    Edit
                                </button>
                                <button type="button" className="admin-delete-button" onClick={() => removeJob(job.id)}>
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default AdminJobManager;
