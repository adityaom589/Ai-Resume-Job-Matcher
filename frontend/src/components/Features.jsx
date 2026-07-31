import "../styles/features.css";
import {
  FaRobot,
  FaChartLine,
  FaBriefcase,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine />,
    title: "ATS Resume Score",
    desc: "Analyze your resume against ATS systems and receive an instant compatibility score.",
  },
  {
    icon: <FaRobot />,
    title: "AI Resume Review",
    desc: "Get AI-powered suggestions to improve formatting, keywords, and readability.",
  },
  {
    icon: <FaBriefcase />,
    title: "Smart Job Matching",
    desc: "Discover jobs that match your resume using AI-driven recommendations.",
  },
  {
    icon: <FaUserTie />,
    title: "Interview Preparation",
    desc: "Generate personalized interview questions based on your resume and target role.",
  },
];

function Features() {
  return (
    <section id="features" className="features">

      <div className="container">

        <h2 className="section-title">
          Everything You Need to Get Hired
        </h2>

        <p className="section-subtitle">
          One platform to optimize your resume, discover jobs,
          and prepare for interviews.
        </p>

        <div className="row g-4">

          {features.map((feature, index) => (

            <div className="col-lg-3 col-md-6" key={index}>

              <div className="feature-card">

                <div className="feature-icon">

                  {feature.icon}

                </div>

                <h4>{feature.title}</h4>

                <p>{feature.desc}</p>

                <a href="#">
                  Learn More
                  <FaArrowRight className="ms-2"/>
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;