import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAdminStats = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get("/admin/stats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createJob = async (job) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/jobs",
        job,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const updateJob = async(id,job)=>{

    const token=localStorage.getItem("token");

    const response=await api.put(
        `/jobs/${id}`,
        job,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    return response.data;

};

export const deleteJob = async(id)=>{

    const token=localStorage.getItem("token");

    await api.delete(`/jobs/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

};

// Fetch all jobs
export const getAllJobs = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get("/jobs", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Fetch latest uploaded resume
export const getLatestResume = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get("/resume/latest", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Fetch all resumes of logged-in user
export const getMyResumes = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get("/resume/my", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const analyzeResume = async (resumeId) => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        `/resume/analyze/${resumeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Delete Resume
export const deleteResume = async (id) => {

    const token = localStorage.getItem("token");

    await api.delete(`/resume/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

};

// Match Resume with Job
export const matchResume = async (resumeId, jobId) => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        `/job/match?resumeId=${resumeId}&jobId=${jobId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Generate Cover Letter
export const generateCoverLetter = async (jobDescription) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/ai/cover-letter",
        {
            jobDescription,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Generate Interview Questions
export const generateInterviewQuestions = async () => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/ai/interview-questions",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export default api;