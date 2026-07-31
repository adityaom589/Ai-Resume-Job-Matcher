import "../styles/architecture.css";

function Architecture() {

  return (

    <section id="architecture" className="architecture">

      <div className="container">

        <h2 className="section-title">
          Project Architecture
        </h2>

        <div className="architecture-grid">

          <div className="arch-card">
            <h3>Frontend</h3>
            <p>React</p>
            <p>Bootstrap</p>
            <p>Axios</p>
          </div>

          <div className="arrow">↓</div>

          <div className="arch-card">
            <h3>Backend</h3>
            <p>Spring Boot</p>
            <p>Spring Security</p>
            <p>REST APIs</p>
            <p>JWT</p>
          </div>

          <div className="arrow">↓</div>

          <div className="arch-card">
            <h3>Database & AI</h3>
            <p>MySQL</p>
            <p>Gemini API</p>
          </div>

        </div>

      </div>

    </section>

  );

}

export default Architecture;