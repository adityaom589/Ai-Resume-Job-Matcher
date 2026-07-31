import "../styles/footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">

            <div className="container">

                <div className="row">

                    <div className="col-lg-4">

                        <h3>AI Resume Job Matcher</h3>

                        <p>
                            AI-powered resume analysis, ATS compatibility,
                            job matching, and interview preparation platform
                            built using React and Spring Boot.
                        </p>

                    </div>

                    <div className="col-lg-2">

                        <h5>Product</h5>

                        <ul>
                            <li>Features</li>
                            <li>Architecture</li>
                            <li>Dashboard</li>
                        </ul>

                    </div>

                    <div className="col-lg-3">

                        <h5>Technology</h5>

                        <ul>
                            <li>React</li>
                            <li>Spring Boot</li>
                            <li>MySQL</li>
                            <li>Gemini AI</li>
                        </ul>

                    </div>

                    <div className="col-lg-3">

                        <h5>Connect</h5>

                        <div className="social-icons">

                            <a
                                href="https://github.com/adityaom589"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/adityamaurya07/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="mailto:aditya.jnp294@example.com"
                                aria-label="Email"
                            >
                                <FaEnvelope />
                            </a>

                        </div>

                    </div>

                </div>

                <hr />

                <p className="copyright">
                    © 2026 Aditya Maurya • Built with React & Spring Boot
                </p>

            </div>

        </footer>
    );
}

export default Footer;