import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar sticky-top">

            <div className="container-fluid px-5">

                {/* Logo */}

                <Link to="/" className="navbar-brand logo">
                    <span className="logo-blue">AI</span> Resume Job Matcher
                </Link>

                {/* Mobile Toggle */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}

                <div className="collapse navbar-collapse" id="navbarContent">

                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <a className="nav-link" href="#features">
                                Features
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#how-it-works">
                                How It Works
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#architecture">
                                Architecture
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="https://github.com/adityaom589/Ai-Resume-Job-Matcher"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </li>

                    </ul>

                    {/* Buttons */}

                   <div className="d-flex align-items-center gap-2">

                        <Link
                            to="/login"
                            className="btn btn-outline-primary nav-btn"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-primary nav-btn"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;