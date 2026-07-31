import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/auth/login", formData);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/dashboard");

            }

        } catch (error) {

            alert("Invalid Email or Password");

            console.error(error);

        }
    };
    return (
        <section className="login-page">

            <div className="login-card">

                <h2>Welcome Back 👋</h2>

                <p>
                    Login to continue using AI Resume Job Matcher.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="mb-4">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />

                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Login;