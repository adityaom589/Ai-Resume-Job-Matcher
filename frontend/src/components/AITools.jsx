import { useState } from "react";
import {
    generateCoverLetter,
    generateInterviewQuestions
} from "../services/api";

function AITools() {

    const [jobDescription, setJobDescription] = useState("");

    const [coverLetter, setCoverLetter] = useState("");

    const [questions, setQuestions] = useState("");

    const [loading, setLoading] = useState(false);

    const handleCoverLetter = async () => {

        if (!jobDescription.trim()) {
            alert("Paste a Job Description");
            return;
        }

        try {

            setLoading(true);

            const response = await generateCoverLetter(jobDescription);

            setCoverLetter(response);

        } catch (error) {

            console.error(error);

            alert("Failed to generate cover letter.");

        } finally {

            setLoading(false);

        }

    };

    const handleInterviewQuestions = async () => {

        try {

            setLoading(true);

            const response = await generateInterviewQuestions();

            setQuestions(response);

        } catch (error) {

            console.error(error);

            alert("Failed to generate interview questions.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="dashboard-card">

            <h3>✨ AI Career Tools</h3>

            <textarea
                rows="6"
                className="form-control mb-3"
                placeholder="Paste Job Description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
                className="btn btn-primary me-2"
                onClick={handleCoverLetter}
            >
                Generate Cover Letter
            </button>

            <button
                className="btn btn-success"
                onClick={handleInterviewQuestions}
            >
                Interview Questions
            </button>

            {loading && <p>Generating...</p>}

            {coverLetter && (

                <>
                    <hr />

                    <h4>📄 Cover Letter</h4>

                    <div
                        style={{
                            whiteSpace: "pre-wrap",
                            background: "#f8f9fa",
                            padding: "15px",
                            borderRadius: "8px"
                        }}
                    >
                        {coverLetter}
                    </div>
                </>

            )}

            {questions && (

                <>
                    <hr />

                    <h4>🎤 Interview Questions</h4>

                    <div
                        style={{
                            whiteSpace: "pre-wrap",
                            background: "#f8f9fa",
                            padding: "15px",
                            borderRadius: "8px"
                        }}
                    >
                        {questions}
                    </div>
                </>

            )}

        </div>

    );

}

export default AITools;