import { Link } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Globe,
  MessageCircle,
  Mail,
  Upload,
  FileCheck2,
  Lock,
  BookOpen,
  Gauge,
  Sparkles,
  Microscope,
  BrainCircuit,
} from "lucide-react";


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-container">

          <div className="footer-top">

            <div>
              <div className="footer-brand">
                <span className="footer-brand-logo">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    width="21"
                    height="21"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="13"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.45"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="7.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <circle cx="16" cy="16" r="3" fill="currentColor" />
                    <path
                      d="M16 3v3.5M16 25.5V29M3 16h3.5M25.5 16H29"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span>DR Screening AI</span>
              </div>

              <p className="footer-tagline">
                AI-assisted diabetic retinopathy screening built to
                support fundus image analysis with structured,
                explainable results.
              </p>

              <div className="footer-badge-row">
                <span className="footer-pill">
                  <Lock size={12} />
                  Secure by design
                </span>

                <span className="footer-pill">
                  <ShieldCheck size={12} />
                  Research use
                </span>
              </div>

              <div className="footer-social">
                <a
                  className="footer-social-link"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Project website"
                >
                  <Globe size={16} />
                </a>

                <a
                  className="footer-social-link"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Community"
                >
                  <MessageCircle size={16} />
                </a>

                <a
                  className="footer-social-link"
                  href="mailto:contact@drscreening.ai"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>


            <div>
              <div className="footer-col-title">Navigate</div>

              <div className="footer-links">
                <Link className="footer-link" to="/">
                  <HeartPulse size={14} />
                  Home
                </Link>

                <Link className="footer-link" to="/upload">
                  <Upload size={14} />
                  Start Screening
                </Link>

                <Link className="footer-link" to="/result">
                  <FileCheck2 size={14} />
                  Results
                </Link>

                <Link className="footer-link" to="/docs">
                  <BookOpen size={14} />
                  Documentation
                </Link>
              </div>
            </div>


            <div>
              <div className="footer-col-title">Screening Pipeline</div>

              <div className="footer-links">
                <Link className="footer-link" to="/docs">
                  <Gauge size={14} />
                  Image Quality Assessment
                </Link>

                <Link className="footer-link" to="/docs">
                  <Sparkles size={14} />
                  Image Enhancement
                </Link>

                <Link className="footer-link" to="/docs">
                  <Microscope size={14} />
                  Lesion Detection
                </Link>

                <Link className="footer-link" to="/docs">
                  <BrainCircuit size={14} />
                  DR Severity Grading
                </Link>
              </div>
            </div>


            <div>
              <div className="footer-col-title">Project</div>

              <div className="footer-links">
                <span className="footer-link">Smart India Hackathon</span>
                <span className="footer-link">Research &amp; Educational Use</span>
                <span className="footer-link">React · Django · MATLAB</span>
                <span className="footer-link">5-Level DR Severity Scale</span>
              </div>
            </div>

          </div>


          <div className="footer-disclaimer">
            <ShieldCheck size={16} />
            <div>
              <strong>Important:</strong> This application provides
              AI-assisted research and educational screening only. It
              does not establish a clinical diagnosis and should not
              replace examination by a qualified eye-care professional.
            </div>
          </div>


          <div className="footer-bottom">
            <span>
              © {year} DR Screening AI. All rights reserved.
            </span>

            <div className="footer-bottom-links">
              <Link to="/docs">Documentation</Link>
              <Link to="/docs">Limitations</Link>
              <Link to="/upload">Start Screening</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};


export default Footer;
