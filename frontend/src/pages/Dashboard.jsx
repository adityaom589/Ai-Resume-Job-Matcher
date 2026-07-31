import { useEffect, useState } from "react";

import "../styles/dashboard.css";
import ResumeUpload from "../components/ResumeUpload";
import ResumeHistory from "../components/ResumeHistory";
import JobDescription from "../components/JobDescription";
import AITools from "../components/AITools";
import ResumeScoreCard from "../components/ResumeScoreCard";
import api, {
    analyzeResume,
    getLatestResume,
    matchResume,
} from "../services/api";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [selectedResumeId, setSelectedResumeId] = useState(null);
    const [resumeRefreshToken, setResumeRefreshToken] = useState(0);
    const [resumeAnalysis, setResumeAnalysis] = useState(null);
    const [jobMatch, setJobMatch] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [matching, setMatching] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const resolveResumeId = async (requestedResumeId) => {
        if (requestedResumeId) return requestedResumeId;
        if (selectedResumeId) return selectedResumeId;

        const latestResume = await getLatestResume();
        setSelectedResumeId(latestResume.id);
        return latestResume.id;
    };

    const handleAnalyze = async (resumeId) => {
        try {
            setAnalyzing(true);
            const resolvedResumeId = await resolveResumeId(resumeId);
            const result = await analyzeResume(resolvedResumeId);
            setResumeAnalysis(result);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Resume analysis failed");
        } finally {
            setAnalyzing(false);
        }
    };

    const handleJobMatch = async (jobId) => {
        try {
            setMatching(true);
            const resumeId = await resolveResumeId();
            const result = await matchResume(resumeId, jobId);
            setJobMatch(result);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Job match failed");
        } finally {
            setMatching(false);
        }
    };

    const handleResumeUploaded = () => {
        setResumeRefreshToken((value) => value + 1);
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>Welcome, {user ? user.fullName : "User"} 👋</h1>
                        <p>{user?.email}</p>
                    </div>

                    <button type="button" className="btn btn-danger" onClick={logout}>
                        Logout
                    </button>
                </div>

                <div className="dashboard-grid">
                    <ResumeUpload onUploaded={handleResumeUploaded} />

                    <div className="dashboard-card">
                        <h3>🤖 AI Resume Analysis</h3>
                        <p>
                            {selectedResumeId
                                ? `Using saved resume #${selectedResumeId}`
                                : "Select a resume from your library."}
                        </p>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAnalyze()}
                            disabled={analyzing}
                        >
                            {analyzing ? "Analyzing..." : "Analyze Selected Resume"}
                        </button>
                    </div>

                    <ResumeHistory
                        selectedResumeId={selectedResumeId}
                        onSelect={setSelectedResumeId}
                        onAnalyze={handleAnalyze}
                        refreshToken={resumeRefreshToken}
                    />

                    <JobDescription
                        onAnalyze={handleJobMatch}
                        loading={matching}
                        selectedResumeId={selectedResumeId}
                    />

                    <AITools />

                    {resumeAnalysis && <ResumeScoreCard analysis={resumeAnalysis} />}

                    {resumeAnalysis && (
                        <div className="dashboard-card result-card">
                            <h3>📄 AI Resume Analysis</h3>
                            <hr />
                            <h4>👤 Candidate</h4>
                            <p>{resumeAnalysis.candidateName}</p>
                            <hr />
                            <h4>🎓 Education</h4>
                            <p>{resumeAnalysis.education}</p>
                            <hr />
                            <h4>💼 Experience</h4>
                            <p>{resumeAnalysis.experienceYears} Years</p>
                            <hr />
                            <h4>🛠 Skills</h4>
                            <ul>
                                {(resumeAnalysis.skills || []).map((skill, index) => (
                                    <li key={index}>✅ {skill}</li>
                                ))}
                            </ul>
                            <hr />
                            <h4>📝 Resume Summary</h4>
                            <p>{resumeAnalysis.summary}</p>
                            <hr />
                            <h4>🤖 AI Review</h4>
                            <div className="ai-review-box">{resumeAnalysis.aiReview}</div>
                        </div>
                    )}

                    {jobMatch && (
                        <div className="dashboard-card result-card">
                            <h3>💼 AI Job Match</h3>
                            <hr />
                            <h4>📊 ATS Score</h4>
                            <p>{jobMatch.atsScore}%</p>
                            <hr />
                            <h4>🎯 Match Percentage</h4>
                            <p>{jobMatch.matchPercentage}%</p>
                            <hr />
                            <h4>✅ Matching Skills</h4>
                            <ul>
                                {(jobMatch.matchingSkills || []).map((skill, index) => (
                                    <li key={index}>✅ {skill}</li>
                                ))}
                            </ul>
                            <hr />
                            <h4>❌ Missing Skills</h4>
                            <ul>
                                {(jobMatch.missingSkills || []).map((skill, index) => (
                                    <li key={index}>❌ {skill}</li>
                                ))}
                            </ul>
                            <hr />
                            <h4>💪 Strengths</h4>
                            <ul>
                                {(jobMatch.strengths || []).map((item, index) => (
                                    <li key={index}>✔ {item}</li>
                                ))}
                            </ul>
                            <hr />
                            <h4>💡 Suggestions</h4>
                            <ul>
                                {(jobMatch.suggestions || []).map((item, index) => (
                                    <li key={index}>👉 {item}</li>
                                ))}
                            </ul>
                            <hr />
                            <h4>📝 AI Summary</h4>
                            <p>{jobMatch.summary}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
