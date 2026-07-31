import "../styles/techstack.css";
import {
  FaReact,
  FaBootstrap,
  FaJava,
  FaGithub,
} from "react-icons/fa";
import { SiSpringboot, SiMysql } from "react-icons/si";

function TechStack() {
  return (
    <section className="tech-section">

      <div className="container">

        <p className="tech-title">
          Built with modern technologies
        </p>

        <div className="tech-grid">

          <div className="tech-item">
            <FaReact />
            <span>React</span>
          </div>

          <div className="tech-item">
            <SiSpringboot />
            <span>Spring Boot</span>
          </div>

          <div className="tech-item">
            <SiMysql />
            <span>MySQL</span>
          </div>

          <div className="tech-item">
            <FaBootstrap />
            <span>Bootstrap</span>
          </div>

          <div className="tech-item">
            <FaJava />
            <span>Java</span>
          </div>

          <div className="tech-item">
            <FaGithub />
            <span>GitHub</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default TechStack;