import "../styles/whyChoose.css";
import {
  FaRobot,
  FaFileAlt,
  FaBriefcase,
  FaUserTie,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Resume Analysis",
    desc: "Receive intelligent suggestions to improve your resume."
  },
  {
    icon: <FaFileAlt />,
    title: "ATS Compatibility",
    desc: "Check whether your resume passes Applicant Tracking Systems."
  },
  {
    icon: <FaBriefcase />,
    title: "Smart Job Matching",
    desc: "Discover jobs aligned with your skills and experience."
  },
  {
    icon: <FaUserTie />,
    title: "Interview Preparation",
    desc: "Generate personalized interview questions."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Authentication",
    desc: "JWT-based authentication with Spring Security."
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive Design",
    desc: "Optimized for desktop, tablet and mobile devices."
  }
];

function WhyChoose() {
  return (
    <section className="why-section">

      <div className="container">

        <h2 className="section-title">
          Why Choose AI Resume Job Matcher?
        </h2>

        <p className="section-subtitle">
          Built to help students and professionals improve resumes,
          prepare for interviews and discover relevant opportunities.
        </p>

        <div className="row g-4">

          {features.map((item, index) => (

            <div className="col-lg-4 col-md-6" key={index}>

              <div className="why-card">

                <div className="why-icon">

                  {item.icon}

                </div>

                <h4>{item.title}</h4>

                <p>{item.desc}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;