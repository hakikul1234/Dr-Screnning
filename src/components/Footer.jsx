import { Link } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Globe,
  MessageCircle,
  Mail,
  Eye,
  Upload,
  FileCheck2,
  Lock,
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
                  <HeartPulse size={20} strokeWidth={2.2} />
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
              </div>
            </div>


            <div>
              <div className="footer-col-title">Screening Pipeline</div>

              <div className="footer-links">
                <span className="footer-link">
                  <Eye size={14} />
                  Image Quality Check
                </span>

                <span className="footer-link">
                  <Eye size={14} />
                  Lesion Analysis
                </span>

                <span className="footer-link">
                  <Eye size={14} />
                  Explainable AI Output
                </span>
              </div>
            </div>


            <div>
              <div className="footer-col-title">Project</div>

              <div className="footer-links">
                <span className="footer-link">Smart India Hackathon</span>
                <span className="footer-link">Research &amp; Educational Use</span>
                <span className="footer-link">Built with React + Vite</span>
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
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};


export default Footer;
