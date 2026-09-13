
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Eye,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Activity,
} from "lucide-react";


const Welcome = ({ onStart }) => {
  const features = [
    {
      icon: Eye,
      title: "Fundus Analysis",
      text: "Evaluates retinal fundus images before screening.",
    },
    {
      icon: BrainCircuit,
      title: "AI-Assisted Grading",
      text: "Estimates diabetic retinopathy severity from retinal evidence.",
    },
    {
      icon: Microscope,
      title: "Lesion Detection",
      text: "Analyzes retinal lesion evidence and structural findings.",
    },
  ];


  const workflow = [
    "Image quality assessment",
    "Fundus preprocessing",
    "Retinal anatomy analysis",
    "Lesion analysis",
    "DR severity classification",
    "Explainability and final screening",
  ];


  return (
    <main className="welcome-page page-transition ai-grid">

      <div className="welcome-container">

        <section className="welcome-content">

          <div className="welcome-badge">
            <HeartPulse size={15} />
            AI-Assisted Diabetic Retinopathy Screening
          </div>


          <h1 className="welcome-title">
            Smarter Retinal
            <span className="welcome-title-highlight">
              {" "}Screening
            </span>
            {" "}with AI
          </h1>


          <p className="welcome-description">
            Analyze retinal fundus images through a structured
            screening pipeline covering image quality, retinal
            anatomy, lesion evidence, diabetic retinopathy
            severity, and explainable AI findings.
          </p>


          <div className="welcome-actions">

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onStart}
            >
              <Sparkles size={18} />
              Start Screening
              <ArrowRight size={18} />
            </button>


            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => {
                document
                  .getElementById("screening-workflow")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              <Activity size={17} />
              View Workflow
            </button>

          </div>


          <div className="welcome-features">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  className="welcome-feature"
                  key={feature.title}
                >

                  <div className="welcome-feature-icon">
                    <Icon size={19} />
                  </div>


                  <div className="welcome-feature-title">
                    {feature.title}
                  </div>


                  <p className="welcome-feature-text">
                    {feature.text}
                  </p>

                </div>
              );
            })}

          </div>

        </section>


        <section className="hero-visual">

          <div className="hero-visual-card">

            <div className="hero-fundus-placeholder">

              <div className="hero-fundus-circle">

                <div className="analysis-marker marker-one" />
                <div className="analysis-marker marker-two" />
                <div className="analysis-marker marker-three" />

              </div>


              <div className="scan-line" />

            </div>

          </div>


          <div className="floating-info-card card-top">

            <div className="floating-info-icon">
              <ShieldCheck size={16} />
            </div>

            <div>
              Quality
              <br />
              Assessment
            </div>

          </div>


          <div className="floating-info-card card-bottom">

            <div className="floating-info-icon">
              <BrainCircuit size={16} />
            </div>

            <div>
              Explainable
              <br />
              AI Analysis
            </div>

          </div>

        </section>

      </div>


      <section
        id="screening-workflow"
        className="welcome-workflow-section"
      >

        <div className="welcome-workflow-header">

          <div className="welcome-badge">
            <Activity size={15} />
            Screening Pipeline
          </div>


          <h2>
            From Fundus Image to Screening Result
          </h2>


          <p>
            The analysis follows a multi-stage workflow designed
            to keep image quality, retinal findings, model output,
            and explainability together.
          </p>

        </div>


        <div className="welcome-workflow-grid">

          {workflow.map((item, index) => (
            <div
              className="welcome-workflow-item"
              key={item}
            >

              <div className="welcome-workflow-number">
                {String(index + 1).padStart(2, "0")}
              </div>


              <div className="welcome-workflow-content">

                <div className="welcome-workflow-title">
                  {item}
                </div>


                {index < workflow.length - 1 && (
                  <div className="welcome-workflow-arrow">
                    <ArrowRight size={15} />
                  </div>
                )}

              </div>

            </div>
          ))}

        </div>

      </section>


      <section className="welcome-trust-section">

        <div className="welcome-trust-card">

          <div className="welcome-trust-icon">
            <CheckCircle2 size={22} />
          </div>


          <div>

            <h3>
              Designed for research and educational screening
            </h3>

            <p>
              The application presents AI-assisted retinal
              screening outputs in a structured and explainable
              format for project, research, and educational use.
            </p>

          </div>

        </div>


        <div className="clinical-disclaimer">

          <div className="clinical-disclaimer-icon">
            <ShieldCheck size={18} />
          </div>

          <div className="clinical-disclaimer-text">
            <strong>Important:</strong>{" "}
            This application is a research/educational screening
            system and does not provide a clinical diagnosis.
            Screening findings should be reviewed by a qualified
            ophthalmologist or eye-care professional.
          </div>

        </div>

      </section>

    </main>
  );
};


export default Welcome;

