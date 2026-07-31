import { useEffect, useState } from "react";
import { getAllJobs } from "../services/api";

function JobDescription({ onAnalyze }) {

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const data = await getAllJobs();

            setJobs(data);

        } catch (error) {

            console.error(error);

            alert("Failed to load jobs");

        }

    };

    const handleAnalyze = () => {

        if (!selectedJob) {

            alert("Please select a job.");

            return;

        }

        // Pass ONLY the jobId
        onAnalyze(selectedJob);

    };

    return (

        <div className="dashboard-card">

            <h3>💼 Match Resume</h3>

            <select
                className="form-control mb-3"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
            >

                <option value="">Select Job</option>

                {jobs.map((job) => (

                    <option
                        key={job.id}
                        value={job.id}
                    >
                        {job.company} - {job.title}
                    </option>

                ))}

            </select>

            <button
                className="btn btn-success"
                onClick={handleAnalyze}
            >
                Analyze Match
            </button>

        </div>

    );

}

export default JobDescription;