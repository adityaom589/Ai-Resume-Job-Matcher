import "../styles/howItWorks.css";

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">

        <h2 className="text-center fw-bold mb-5">
          How It Works
        </h2>

        <div className="row text-center">

          <div className="col-md-3">
            <div className="step-circle">1</div>
            <h5>Upload Resume</h5>
            <p>Upload your resume securely.</p>
          </div>

          <div className="col-md-3">
            <div className="step-circle">2</div>
            <h5>AI Analysis</h5>
            <p>Receive ATS and AI insights.</p>
          </div>

          <div className="col-md-3">
            <div className="step-circle">3</div>
            <h5>Job Match</h5>
            <p>Find jobs suited to your profile.</p>
          </div>

          <div className="col-md-3">
            <div className="step-circle">4</div>
            <h5>Interview Prep</h5>
            <p>Practice with AI-generated questions.</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;