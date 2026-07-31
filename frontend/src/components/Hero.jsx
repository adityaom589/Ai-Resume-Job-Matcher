import "../styles/hero.css";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChartLine,
  FaRobot,
  FaBriefcase,
} from "react-icons/fa";

function Hero() {
  return (
    <section id="hero" className="hero">

      <div className="container">

        <div className="row align-items-center">

          {/* LEFT */}

          <div className="col-lg-6">

            <span className="hero-badge">
              🚀 AI Powered Resume Platform
            </span>

            <h1 className="hero-title">
              Build a Resume
              <br />
              Recruiters
              <span> Can't Ignore.</span>
            </h1>

            <p className="hero-text">
              Improve ATS score, receive AI suggestions,
              discover matching jobs and prepare for interviews —
              all in one platform.
            </p>

            <div className="hero-buttons">

              <button className="btn btn-primary btn-lg">
                Start Free
                <FaArrowRight className="ms-2"/>
              </button>

              <button className="btn btn-outline-dark btn-lg ms-3">
                Watch Demo
              </button>

            </div>

            <div className="hero-points mt-5">

              <p><FaCheckCircle className="text-success me-2"/>ATS Friendly Resume</p>

              <p><FaCheckCircle className="text-success me-2"/>AI Resume Review</p>

              <p><FaCheckCircle className="text-success me-2"/>Interview Questions</p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-lg-6">

            <div className="dashboard-card">

              <div className="dashboard-header">

                Resume Analysis

              </div>

              <div className="score-circle">

                92%

              </div>

              <div className="dashboard-item">

                <FaChartLine className="text-primary"/>

                <span>ATS Compatibility</span>

              </div>

              <div className="dashboard-item">

                <FaRobot className="text-success"/>

                <span>AI Suggestions</span>

              </div>

              <div className="dashboard-item">

                <FaBriefcase className="text-warning"/>

                <span>Job Match Score</span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;