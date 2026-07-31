import "../styles/dashboardpreview.css";
import {
  FaChartLine,
  FaCheckCircle,
  FaRobot,
  FaBriefcase,
} from "react-icons/fa";

function DashboardPreview() {
  return (
    <section className="dashboard-preview">

      <div className="container">

        <div className="row align-items-center">

          {/* Left */}

          <div className="col-lg-5">

            <span className="preview-badge">
              Dashboard Preview
            </span>

            <h2>
              Your Career
              <br />
              Dashboard
            </h2>

            <p>
              Everything you need in one place:
              ATS score, AI suggestions,
              resume insights,
              interview preparation,
              and personalized job recommendations.
            </p>

            <button className="btn btn-primary btn-lg">
              Explore Dashboard
            </button>

          </div>

          {/* Right */}

          <div className="col-lg-7">

            <div className="dashboard-box">

              <div className="dashboard-top">

                <h4>Resume Overview</h4>

                <span className="status">
                  Active
                </span>

              </div>

              <div className="progress-box">

                <div className="progress-title">

                  ATS Score

                  <span>92%</span>

                </div>

                <div className="progress">

                  <div
                    className="progress-bar bg-primary"
                    style={{width:"92%"}}
                  ></div>

                </div>

              </div>

              <div className="dashboard-grid">

                <div className="small-card">

                  <FaRobot />

                  <h6>AI Suggestions</h6>

                  <p>12 Improvements</p>

                </div>

                <div className="small-card">

                  <FaChartLine />

                  <h6>Resume Score</h6>

                  <p>Excellent</p>

                </div>

                <div className="small-card">

                  <FaBriefcase />

                  <h6>Job Matches</h6>

                  <p>134 Jobs</p>

                </div>

                <div className="small-card">

                  <FaCheckCircle />

                  <h6>Interview Ready</h6>

                  <p>85%</p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardPreview;