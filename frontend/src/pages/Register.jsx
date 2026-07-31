import "../styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
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

            await api.post("/auth/register", formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            alert("Registration Failed!");

            console.error(error);

        }
    };
    return (
        <section className="register-page">

            <div className="register-card">

                <h2>Create Your Account</h2>

                <p>
                    Start improving your resume with AI.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
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
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Create Account
                    </button>

                </form>

                <div className="login-link mt-4">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default Register;