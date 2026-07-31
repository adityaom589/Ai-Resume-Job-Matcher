import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats } from "../services/api";
import AdminJobManager from "../components/AdminJobManager";
import "../styles/admin.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        users: 0,
        resumes: 0,
        jobs: 0,
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getAdminStats();
                setStats({
                    users: data.users ?? 0,
                    resumes: data.resumes ?? 0,
                    jobs: data.jobs ?? 0,
                });
            } catch (error) {
                console.error("Failed to load admin stats", error);
            }
        };

        loadStats();
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <main className="admin-page">
            <div className="admin-container">
                <header className="admin-header">
                    <div>
                        <span className="admin-eyebrow">Control center</span>
                        <h1>Admin Dashboard</h1>
                        <p>Manage job listings and monitor platform activity.</p>
                    </div>

                    <button type="button" className="admin-logout" onClick={logout}>
                        Logout
                    </button>
                </header>

                <section className="admin-stats" aria-label="Platform statistics">
                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">👥</div>
                        <div>
                            <p>Users</p>
                            <strong>{stats.users}</strong>
                        </div>
                    </article>

                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">📄</div>
                        <div>
                            <p>Resumes</p>
                            <strong>{stats.resumes}</strong>
                        </div>
                    </article>

                    <article className="admin-stat-card">
                        <div className="admin-stat-icon">💼</div>
                        <div>
                            <p>Active jobs</p>
                            <strong>{stats.jobs}</strong>
                        </div>
                    </article>
                </section>

                <AdminJobManager
                    onJobsChange={(count) =>
                        setStats((current) => ({ ...current, jobs: count }))
                    }
                />
            </div>
        </main>
    );
}

export default AdminDashboard;
