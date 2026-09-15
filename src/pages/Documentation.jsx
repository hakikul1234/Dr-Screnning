
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Target,
  Workflow,
  Gauge,
  Sparkles,
  Microscope,
  BrainCircuit,
  FileText,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Rocket,
  ChevronDown,
} from "lucide-react";

import useReveal from "../hooks/useReveal";


const SECTIONS = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "problem", label: "Problem", icon: Target },
  { id: "pipeline", label: "Pipeline", icon: Workflow },
  { id: "quality", label: "Image Quality", icon: Gauge },
  { id: "enhancement", label: "Enhancement", icon: Sparkles },
  { id: "structures", label: "Retinal Structures", icon: Microscope },
  { id: "lesions", label: "Lesion Detection", icon: Layers },
  { id: "grading", label: "Severity Grading", icon: BrainCircuit },
  { id: "report", label: "Screening Report", icon: FileText },
  { id: "architecture", label: "Architecture", icon: ShieldCheck },
  { id: "limitations", label: "Limitations", icon: AlertTriangle },
  { id: "roadmap", label: "Future Scope", icon: Rocket },
];


const QUALITY_METRICS = [
  {
    name: "Focus / Sharpness",
    detail:
      "Laplacian-based analysis estimates high-frequency detail. Blurred images hide small lesions such as microaneurysms.",
  },
  {
    name: "Contrast",
    detail:
      "Derived from the intensity distribution. Low contrast makes vessels, tissue and lesions hard to separate.",
  },
  {
    name: "Illumination",
    detail:
      "Checks intensity spread across the retinal field. Uneven lighting from camera position or patient movement reduces reliability.",
  },
  {
    name: "Field of View",
    detail:
      "Estimates how much of the frame holds usable retinal information, catching off-centre or largely dark captures.",
  },
  {
    name: "Noise",
    detail:
      "Compares the original against a smoothed version. Sensor noise and compression artefacts degrade segmentation.",
  },
];


const GRADES = [
  {
    grade: "Grade 0",
    name: "No DR",
    tone: "success",
    detail:
      "No significant diabetic retinopathy abnormalities identified. Routine screening per medical guidance.",
  },
  {
    grade: "Grade 1",
    name: "Mild DR",
    tone: "warning",
    detail:
      "Early retinal abnormalities. Microaneurysms are the key feature at this stage.",
  },
  {
    grade: "Grade 2",
    name: "Moderate DR",
    tone: "warning",
    detail:
      "Multiple microaneurysms, haemorrhages, exudates or other vascular changes may be present.",
  },
  {
    grade: "Grade 3",
    name: "Severe DR",
    tone: "danger",
    detail:
      "More extensive retinal abnormalities requiring increased clinical attention.",
  },
  {
    grade: "Grade 4",
    name: "Proliferative DR",
    tone: "danger",
    detail:
      "Advanced stage with abnormal new vessel growth. Needs specialist evaluation.",
  },
];


const LESIONS = [
  {
    name: "Microaneurysms",
    detail:
      "Small localised vessel abnormalities and often the earliest visible sign of DR. Hard to detect because they are tiny and resemble vessel intersections.",
  },
  {
    name: "Haemorrhages",
    detail:
      "Blood leaking into retinal tissue, appearing as dark or reddish regions. Must be separated from normal vasculature.",
  },
  {
    name: "Exudates",
    detail:
      "Bright lesions caused by leakage from damaged vessels. Optic disc localisation matters here, since the disc is naturally bright.",
  },
  {
    name: "Neovascularisation",
    detail:
      "Abnormal new vessel growth, assessed through vessel density, branching and irregularity. Associated with advanced disease.",
  },
];


const PIPELINE = [
  { step: "Fundus image input", detail: "Validate file, dimensions and channels." },
  { step: "Quality assessment", detail: "Score focus, contrast, illumination, FOV and noise." },
  { step: "Quality decision", detail: "Good proceeds, borderline is enhanced, poor is recaptured." },
  { step: "Preprocessing", detail: "CLAHE, denoising and illumination normalisation." },
  { step: "Structure analysis", detail: "Locate optic disc, fovea and blood vessels." },
  { step: "Lesion detection", detail: "Find microaneurysm, haemorrhage and exudate candidates." },
  { step: "Feature extraction", detail: "Convert image, vessel and lesion data into measurements." },
  { step: "AI classification", detail: "Predict DR severity from extracted features." },
  { step: "Severity grading", detail: "Map the prediction onto the five-level scale." },
  { step: "Screening report", detail: "Produce a structured, reviewable result." },
];


const Documentation = () => {
  useReveal();

  const [active, setActive] = useState("overview");
  const [openGrade, setOpenGrade] = useState("Grade 0");

  const sectionIds = useMemo(
    () => SECTIONS.map((section) => section.id),
    [],
  );


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);


  const jumpTo = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  return (
    <main className="docs-page page-transition">

      <div className="ai-grid-bg" aria-hidden="true" />


      <header className="docs-hero">

        <span className="welcome-badge">
          <BookOpen size={15} />
          Project Documentation
        </span>

        <h1 className="docs-hero-title">
          AI-Based Automated{" "}
          <span className="welcome-title-highlight">
            Diabetic Retinopathy
          </span>{" "}
          Screening
        </h1>

        <p className="docs-hero-text">
          Severity grading from retinal fundus images, combining image
          processing, computer vision and machine learning into a single
          screening pipeline. This page documents how the system works,
          stage by stage.
        </p>

      </header>


      <div className="docs-layout">

        <aside className="docs-sidebar">

          <div className="docs-sidebar-title">On this page</div>

          <nav className="docs-nav">
            {SECTIONS.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  type="button"
                  key={section.id}
                  className={`docs-nav-link${
                    active === section.id ? " active" : ""
                  }`}
                  onClick={() => jumpTo(section.id)}
                >
                  <Icon size={15} />
                  {section.label}
                </button>
              );
            })}
          </nav>

        </aside>


        <div className="docs-content">

          {/* ---------- Overview ---------- */}
          <section id="overview" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <BookOpen size={18} />
              </span>
              Overview
            </h2>

            <p>
              Diabetic Retinopathy is a progressive retinal disorder caused by
              damage to the small blood vessels that supply the retina.
              Prolonged high blood glucose can lead to leakage, bleeding and
              abnormal vessel growth. Because early stages often produce no
              noticeable symptoms, regular retinal screening matters a great
              deal for people living with diabetes.
            </p>

            <p>
              Conventional screening means capturing fundus photographs and
              having a trained ophthalmologist examine them by hand. That is
              clinically sound but slow to scale, and specialist availability
              is limited in rural and remote regions.
            </p>

            <div className="docs-callout">
              <ShieldCheck size={18} />
              <div>
                This platform is a screening and clinical decision-support
                tool. It does not replace an ophthalmologist and does not
                provide an independent medical diagnosis.
              </div>
            </div>

          </section>


          {/* ---------- Problem ---------- */}
          <section id="problem" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Target size={18} />
              </span>
              Problem Statement
            </h2>

            <p>
              A practical screening system has to handle several problems at
              once:
            </p>

            <ul className="docs-list">
              <li>Population-level screening produces large image volumes.</li>
              <li>Manual examination requires trained medical professionals.</li>
              <li>Specialist access is limited in rural and remote regions.</li>
              <li>Poor-quality captures lead to unreliable analysis.</li>
              <li>Small retinal lesions are hard to identify consistently.</li>
              <li>
                Different cameras produce different brightness, contrast,
                resolution and colour characteristics.
              </li>
              <li>
                The disease progresses in stages, so severity assessment is
                needed rather than a simple disease / no-disease answer.
              </li>
              <li>
                Results must be meaningful, not an unexplained prediction.
              </li>
            </ul>

          </section>


          {/* ---------- Pipeline ---------- */}
          <section id="pipeline" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Workflow size={18} />
              </span>
              Processing Pipeline
            </h2>

            <p>
              Each uploaded image moves through a fixed sequence of stages.
              Every stage can be developed and improved independently.
            </p>

            <ol className="docs-pipeline">
              {PIPELINE.map((item, index) => (
                <li className="docs-pipeline-item" key={item.step}>

                  <span className="docs-pipeline-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="docs-pipeline-step">{item.step}</div>
                    <div className="docs-pipeline-detail">{item.detail}</div>
                  </div>

                </li>
              ))}
            </ol>

          </section>


          {/* ---------- Quality ---------- */}
          <section id="quality" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Gauge size={18} />
              </span>
              Image Quality Assessment
            </h2>

            <p>
              An AI model can produce unreliable results when the input is
              blurred, noisy or badly illuminated. The system therefore scores
              quality <em>before</em> any disease analysis, across five
              measurements.
            </p>

            <div className="docs-metric-grid">
              {QUALITY_METRICS.map((metric) => (
                <div className="docs-metric" key={metric.name}>
                  <div className="docs-metric-name">{metric.name}</div>
                  <p className="docs-metric-detail">{metric.detail}</p>
                </div>
              ))}
            </div>

            <h3 className="docs-subtitle">Decision mechanism</h3>

            <div className="docs-decision-grid">

              <div className="docs-decision good">
                <div className="docs-decision-label">Good</div>
                <p>Proceeds directly to preprocessing and retinal analysis.</p>
              </div>

              <div className="docs-decision borderline">
                <div className="docs-decision-label">Borderline</div>
                <p>Passed through enhancement before classification.</p>
              </div>

              <div className="docs-decision poor">
                <div className="docs-decision-label">Poor</div>
                <p>Rejected, with a prompt to capture a new image.</p>
              </div>

            </div>

          </section>


          {/* ---------- Enhancement ---------- */}
          <section id="enhancement" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Sparkles size={18} />
              </span>
              Preprocessing &amp; Enhancement
            </h2>

            <p>
              Preprocessing makes retinal structures and lesions more visible
              and keeps inputs consistent across devices.
            </p>

            <ul className="docs-list">
              <li>
                <strong>CLAHE</strong> — contrast limited adaptive histogram
                equalisation improves local contrast region by region while
                limiting excessive amplification.
              </li>
              <li>
                <strong>Denoising</strong> — removes unwanted variation while
                preserving genuine retinal structure.
              </li>
              <li>
                <strong>Illumination normalisation</strong> — corrects uneven
                lighting so the model sees a consistent image.
              </li>
              <li>
                <strong>Resizing and channel analysis</strong> — standardises
                the input representation.
              </li>
            </ul>

          </section>


          {/* ---------- Structures ---------- */}
          <section id="structures" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Microscope size={18} />
              </span>
              Retinal Structure Analysis
            </h2>

            <p>
              Anatomical information helps separate normal structures from
              disease-related abnormalities.
            </p>

            <div className="docs-metric-grid">

              <div className="docs-metric">
                <div className="docs-metric-name">Optic Disc</div>
                <p className="docs-metric-detail">
                  Bright, roughly circular region where the optic nerve exits.
                  Locating it reduces false exudate detections, since its
                  brightness can mimic a lesion.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Fovea</div>
                <p className="docs-metric-detail">
                  Responsible for central, detailed vision. Its position is
                  estimated relative to the optic disc and gives useful spatial
                  context.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Blood Vessels</div>
                <p className="docs-metric-detail">
                  Segmented via channel selection, contrast enhancement,
                  thresholding and morphological processing. Feeds vessel
                  density and neovascularisation analysis.
                </p>
              </div>

            </div>

          </section>


          {/* ---------- Lesions ---------- */}
          <section id="lesions" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Layers size={18} />
              </span>
              Lesion Detection
            </h2>

            <p>
              Four lesion categories are considered, each with its own
              detection challenges.
            </p>

            <div className="docs-metric-grid">
              {LESIONS.map((lesion) => (
                <div className="docs-metric" key={lesion.name}>
                  <div className="docs-metric-name">{lesion.name}</div>
                  <p className="docs-metric-detail">{lesion.detail}</p>
                </div>
              ))}
            </div>

          </section>


          {/* ---------- Grading ---------- */}
          <section id="grading" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <BrainCircuit size={18} />
              </span>
              AI Classification &amp; Severity Grading
            </h2>

            <p>
              Extracted image, vessel and lesion features are passed to a
              machine learning model. Classical approaches include SVM, Random
              Forest, Decision Trees, Logistic Regression and k-NN; deep
              learning options include CNN, ResNet, EfficientNet and DenseNet.
            </p>

            <p>
              The prediction is mapped onto a five-level severity scale. Select
              a grade to read what it means.
            </p>

            <div className="docs-accordion">
              {GRADES.map((item) => {
                const isOpen = openGrade === item.name;

                return (
                  <div
                    className={`docs-accordion-item${isOpen ? " open" : ""}`}
                    key={item.name}
                  >

                    <button
                      type="button"
                      className="docs-accordion-trigger"
                      onClick={() =>
                        setOpenGrade(isOpen ? "" : item.name)
                      }
                      aria-expanded={isOpen}
                    >
                      <span className={`docs-grade-chip ${item.tone}`}>
                        {item.grade}
                      </span>

                      <span className="docs-accordion-name">{item.name}</span>

                      <ChevronDown
                        size={17}
                        className="docs-accordion-chevron"
                      />
                    </button>

                    <div className="docs-accordion-panel">
                      <p>{item.detail}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>


          {/* ---------- Report ---------- */}
          <section id="report" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <FileText size={18} />
              </span>
              Screening Report
            </h2>

            <p>
              The final stage produces a structured report rather than raw
              image-processing output.
            </p>

            <ul className="docs-list">
              <li>Session identifier and uploaded image</li>
              <li>Image quality score and category</li>
              <li>Whether enhancement was applied</li>
              <li>Detected retinal structures and lesion candidates</li>
              <li>DR prediction, severity grade and confidence score</li>
              <li>Screening recommendation, date and time</li>
            </ul>

            <div className="docs-callout">
              <AlertTriangle size={18} />
              <div>
                A confidence value is not a guarantee of diagnostic
                correctness. Results are intended for screening assistance
                only.
              </div>
            </div>

          </section>


          {/* ---------- Architecture ---------- */}
          <section id="architecture" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <ShieldCheck size={18} />
              </span>
              System Architecture
            </h2>

            <p>
              The image-processing and AI pipeline is implemented in MATLAB,
              exposed to users through a full-stack web application.
            </p>

            <div className="docs-stack-grid">

              <div className="docs-stack">
                <div className="docs-stack-label">Frontend</div>
                <div className="docs-stack-value">React</div>
                <p>Upload, live pipeline progress and result screens.</p>
              </div>

              <div className="docs-stack">
                <div className="docs-stack-label">Backend</div>
                <div className="docs-stack-value">Django</div>
                <p>Auth, uploads, APIs, analysis management and storage.</p>
              </div>

              <div className="docs-stack">
                <div className="docs-stack-label">AI Engine</div>
                <div className="docs-stack-value">MATLAB</div>
                <p>Quality scoring, segmentation, lesion detection, grading.</p>
              </div>

              <div className="docs-stack">
                <div className="docs-stack-label">Database</div>
                <div className="docs-stack-value">SQLite / PostgreSQL</div>
                <p>Users, images, analyses and screening reports.</p>
              </div>

            </div>

            <h3 className="docs-subtitle">Security &amp; privacy</h3>

            <p>
              Because retinal images may be linked to patient information, the
              application applies authentication, authorisation, secure API
              communication, controlled image access and appropriate data
              retention policies.
            </p>

          </section>


          {/* ---------- Limitations ---------- */}
          <section id="limitations" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <AlertTriangle size={18} />
              </span>
              Limitations
            </h2>

            <ul className="docs-list">
              <li>Automated analysis cannot guarantee correct clinical diagnosis.</li>
              <li>Image quality significantly affects performance.</li>
              <li>Different cameras produce different image characteristics.</li>
              <li>Very small or subtle lesions remain difficult to detect.</li>
              <li>
                Model performance depends heavily on the size, diversity and
                labelling accuracy of the training dataset.
              </li>
              <li>False positives and false negatives are possible.</li>
              <li>
                Real clinical use would require extensive validation,
                regulatory consideration and evaluation by qualified medical
                professionals.
              </li>
            </ul>

          </section>


          {/* ---------- Roadmap ---------- */}
          <section id="roadmap" className="docs-section reveal">

            <h2 className="docs-section-title">
              <span className="docs-section-icon">
                <Rocket size={18} />
              </span>
              Future Scope
            </h2>

            <div className="docs-metric-grid">

              <div className="docs-metric">
                <div className="docs-metric-name">Explainable AI</div>
                <p className="docs-metric-detail">
                  Grad-CAM style heatmaps highlighting the retinal regions that
                  influenced a prediction, improving transparency for
                  clinicians.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Advanced Deep Learning</div>
                <p className="docs-metric-detail">
                  CNN and transfer-learning architectures to improve
                  classification accuracy across severity classes.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Mobile Screening</div>
                <p className="docs-metric-detail">
                  A companion app so healthcare workers can upload retinal
                  images directly from screening camps.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Cloud Deployment</div>
                <p className="docs-metric-detail">
                  Centralised service supporting multiple screening locations
                  with near-real-time analysis.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Multi-Disease Screening</div>
                <p className="docs-metric-detail">
                  Extending the platform to identify other retinal conditions
                  beyond diabetic retinopathy.
                </p>
              </div>

              <div className="docs-metric">
                <div className="docs-metric-name">Hospital Integration</div>
                <p className="docs-metric-detail">
                  Connecting with hospital information systems and electronic
                  medical records, subject to privacy and regulatory
                  requirements.
                </p>
              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
};


export default Documentation;
