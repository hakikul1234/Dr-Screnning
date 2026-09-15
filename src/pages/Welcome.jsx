
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
  Gauge,
  Layers,
  ScanEye,
  Sparkle,
} from "lucide-react";
import eyeCloseupImage from "../assets/media/eye-closeup.jpg";
import useReveal from "../hooks/useReveal";


const Welcome = ({ onStart }) => {
  useReveal();

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
    {
      icon: ShieldCheck,
      title: "Quality Gatekeeping",
      text: "Flags poor-quality images before they reach the model.",
    },
  ];


  const workflow = [
    "Image quality assessment",
    "Image enhancement",
    "Retinal structure analysis",
    "Lesion detection",
    "Feature extraction",
    "AI classification",
    "DR severity grading",
    "Screening report",
  ];


  const stats = [
    {
      icon: Layers,
      value: "8",
      label: "Stage AI Pipeline",
    },
    {
      icon: ScanEye,
      value: "4",
      label: "Retinal Lesion Types Tracked",
    },
    {
      icon: Gauge,
      value: "5",
      label: "Image Quality Checks",
    },
    {
      icon: Sparkle,
      value: "5",
      label: "DR Severity Grades",
    },
  ];


  return (
    <main className="welcome-page page-transition">

      <div className="ai-grid-bg" aria-hidden="true" />

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
            structures, lesion evidence and diabetic retinopathy
            severity — ending in a clear, reviewable screening report.
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


        <section className="hero-visual reveal reveal-delay-2">

          <div className="hero-glow" aria-hidden="true" />


          <div className="hero-frame">

            <div className="hero-frame-image-wrap">

              <img
                className="hero-frame-image"
                src={eyeCloseupImage}
                alt="Close-up of a human eye used for retinal screening"
              />

              <div className="hero-frame-tint" />

              <span className="hero-frame-corner corner-tl" />
              <span className="hero-frame-corner corner-tr" />
              <span className="hero-frame-corner corner-bl" />
              <span className="hero-frame-corner corner-br" />

              <div className="hero-frame-scan" />

              <span className="hero-frame-point point-one" />
              <span className="hero-frame-point point-two" />
              <span className="hero-frame-point point-three" />

              <div className="hero-frame-tag tag-quality">
                <ShieldCheck size={14} />
                Quality: Good
              </div>

              <div className="hero-frame-tag tag-ai">
                <BrainCircuit size={14} />
                AI Analysis
              </div>

            </div>


            <div className="hero-frame-status">

              <div className="hero-frame-status-left">
                <span className="hero-live-dot" />
                Live screening preview
              </div>

              <div className="hero-frame-status-right">
                Severity Grading
              </div>

            </div>

          </div>

        </section>

      </div>


      <section className="welcome-stats-section reveal">

        <div className="welcome-stats-grid">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="welcome-stat" key={stat.label}>

                <div className="welcome-stat-icon">
                  <Icon size={18} />
                </div>

                <div>
                  <div className="welcome-stat-value">
                    {stat.value}
                  </div>

                  <div className="welcome-stat-label">
                    {stat.label}
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </section>


      <section
        id="screening-workflow"
        className="welcome-workflow-section reveal"
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
            Every image runs through the same eight stages, so
            quality is checked before anything is classified and
            each result arrives as a structured screening report.
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


                {index < workflow.length - 1 &&
                  (index + 1) % 4 !== 0 && (
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

        <div className="welcome-trust-card reveal">

          <div className="welcome-trust-icon">
            <CheckCircle2 size={22} />
          </div>


          <div>

            <h3>
              Designed for research and educational screening
            </h3>

            <p>
              Results are presented as a structured screening
              report — image quality, detected findings, severity
              grade and confidence — intended as clinical decision
              support, not an independent diagnosis.
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


      <section className="welcome-cta-section reveal">

        <div className="welcome-cta-card">

          <div className="welcome-cta-text">
            <h2>Ready to run your first screening?</h2>

            <p>
              Upload a fundus photograph and get a structured,
              explainable AI screening result in moments.
            </p>
          </div>


          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={onStart}
          >
            <Sparkles size={18} />
            Start Screening
            <ArrowRight size={18} />
          </button>

        </div>

      </section>

    </main>
  );
};


export default Welcome;

