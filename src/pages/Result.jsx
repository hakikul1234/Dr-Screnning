
import {
  ArrowLeft,
  Activity,
  BrainCircuit,
  CheckCircle2,
  Eye,
  FileImage,
  Info,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import ResultCard from "../components/ResultCard";
import FundusViewer from "../components/FundusViewer";
import DownloadReport from "../components/DownloadReport";


const Result = ({
  image,
  previewUrl,
  result,
  onNewScreening,
  onBackHome,
}) => {
  const safeResult = result || {};


  const getValue = (paths, fallback = null) => {
    for (const path of paths) {
      const parts = path.split(".");
      let current = safeResult;

      for (const part of parts) {
        if (
          current === null ||
          current === undefined ||
          !Object.prototype.hasOwnProperty.call(
            current,
            part
          )
        ) {
          current = null;
          break;
        }

        current = current[part];
      }

      if (
        current !== null &&
        current !== undefined &&
        current !== ""
      ) {
        return current;
      }
    }

    return fallback;
  };


  const qualityScore = getValue(
    [
      "Quality.QualityScore",
      "quality.QualityScore",
      "FinalResult.QualityScore",
      "finalResult.QualityScore",
      "qualityScore",
    ],
    null
  );


  const qualityClass = getValue(
    [
      "Quality.QualityClass",
      "quality.QualityClass",
      "FinalResult.QualityClass",
      "finalResult.QualityClass",
      "qualityClass",
    ],
    "Unknown"
  );


  const qualityDecision = getValue(
    [
      "Quality.QualityDecision",
      "quality.QualityDecision",
      "qualityDecision",
    ],
    "N/A"
  );


  const focusScore = getValue(
    [
      "Quality.FocusScore",
      "quality.FocusScore",
      "focusScore",
    ],
    null
  );


  const contrastScore = getValue(
    [
      "Quality.ContrastScore",
      "quality.ContrastScore",
      "contrastScore",
    ],
    null
  );


  const illuminationScore = getValue(
    [
      "Quality.IlluminationScore",
      "quality.IlluminationScore",
      "illuminationScore",
    ],
    null
  );


  const fovScore = getValue(
    [
      "Quality.FOVScore",
      "quality.FOVScore",
      "fovScore",
    ],
    null
  );


  const noiseScore = getValue(
    [
      "Quality.NoiseScore",
      "quality.NoiseScore",
      "noiseScore",
    ],
    null
  );


  const microaneurysms = getValue(
    [
      "FinalResult.LesionSummary.Microaneurysms",
      "finalResult.LesionSummary.Microaneurysms",
      "Lesions.Microaneurysms",
      "lesions.Microaneurysms",
    ],
    0
  );


  const exudates = getValue(
    [
      "FinalResult.LesionSummary.Exudates",
      "finalResult.LesionSummary.Exudates",
      "Lesions.Exudates",
      "lesions.Exudates",
    ],
    0
  );


  const hemorrhages = getValue(
    [
      "FinalResult.LesionSummary.Hemorrhages",
      "finalResult.LesionSummary.Hemorrhages",
      "Lesions.Hemorrhages",
      "lesions.Hemorrhages",
    ],
    0
  );


  const neovascularization = getValue(
    [
      "FinalResult.LesionSummary.Neovascularization",
      "finalResult.LesionSummary.Neovascularization",
      "Lesions.Neovascularization",
      "lesions.Neovascularization",
    ],
    0
  );


  const opticDiscDetected = getValue(
    [
      "FinalResult.AnatomySummary.OpticDiscDetected",
      "finalResult.AnatomySummary.OpticDiscDetected",
      "Anatomy.OpticDiscDetected",
      "anatomy.OpticDiscDetected",
    ],
    false
  );


  const foveaDetected = getValue(
    [
      "FinalResult.AnatomySummary.FoveaDetected",
      "finalResult.AnatomySummary.FoveaDetected",
      "Anatomy.FoveaDetected",
      "anatomy.FoveaDetected",
    ],
    false
  );


  const vesselsDetected = getValue(
    [
      "FinalResult.AnatomySummary.VesselsDetected",
      "finalResult.AnatomySummary.VesselsDetected",
      "Anatomy.VesselsDetected",
      "anatomy.VesselsDetected",
    ],
    false
  );


  const processedImage = getValue(
    [
      "Preprocessing.ImageUrl",
      "preprocessing.ImageUrl",
      "Preprocessing.imageUrl",
      "preprocessing.imageUrl",
      "processedImage",
    ],
    null
  );


  const overlayImage = getValue(
    [
      "Explainability.AnnotatedImage",
      "explainability.AnnotatedImage",
      "hemorrhageOverlay",
      "overlayImage",
    ],
    null
  );


  const gradCamImage = getValue(
    [
      "Explainability.GradCAM.HeatmapUrl",
      "explainability.GradCAM.HeatmapUrl",
      "Explainability.GradCAMPlusPlus.HeatmapUrl",
      "explainability.GradCAMPlusPlus.HeatmapUrl",
      "gradCam",
      "gradCamImage",
    ],
    null
  );


  const scoreToPercent = (value) => {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value)
    ) {
      return null;
    }

    return Math.max(
      0,
      Math.min(100, value * 100)
    );
  };


  const formatMetric = (value) => {
    const percent = scoreToPercent(value);

    return percent === null
      ? "N/A"
      : `${percent.toFixed(1)}%`;
  };


  const getQualityTone = () => {
    const value = String(
      qualityClass
    ).toLowerCase();

    if (
      value.includes("good") ||
      value.includes("excellent")
    ) {
      return "success";
    }

    if (
      value.includes("poor") ||
      value.includes("inadequate")
    ) {
      return "danger";
    }

    return "warning";
  };


  const qualityTone = getQualityTone();


  return (
    <main className="result-page page-transition">

      <div className="page-container">

        <div className="result-header">

          <div className="result-header-top">

            <div>

              <div className="welcome-badge">
                <CheckCircle2 size={15} />
                Screening Complete
              </div>

              <h1 className="result-title">
                Diabetic Retinopathy Screening Result
              </h1>

              <p className="result-subtitle">
                Review the AI-assisted analysis, retinal
                findings, image quality, and screening
                recommendation below.
              </p>

            </div>


            <div className="result-header-actions">

              {onBackHome && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onBackHome}
                >
                  <ArrowLeft size={16} />
                  Home
                </button>
              )}

            </div>

          </div>

        </div>


        <div className="result-layout">

          <section>

            <ResultCard
              result={safeResult}
              onNewScreening={onNewScreening}
            />


            <div className="card card-lg mt-lg">

              <div className="card-header">

                <h3 className="card-title">
                  Image Quality Assessment
                </h3>

                <p className="card-description">
                  Quality metrics evaluated before DR grading.
                </p>

              </div>


              <div className="quality-summary-layout">

                <div className="quality-score-panel">

                  <div
                    className="quality-ring"
                    style={{
                      "--quality-progress":
                        qualityScore !== null
                          ? `${Math.max(
                              0,
                              Math.min(
                                100,
                                qualityScore * 100
                              )
                            )}%`
                          : "0%",
                    }}
                  >
                    <div className="quality-ring-content">

                      <span className="quality-ring-score">
                        {qualityScore !== null
                          ? `${(
                              qualityScore * 100
                            ).toFixed(1)}%`
                          : "N/A"}
                      </span>

                      <span className="quality-ring-label">
                        Quality
                      </span>

                    </div>
                  </div>


                  <span
                    className={`badge badge-${qualityTone}`}
                  >
                    {String(qualityClass)}
                  </span>


                  <div className="quality-decision">
                    {String(qualityDecision)}
                  </div>

                </div>


                <div className="quality-metrics-grid">

                  <div className="metric-card">
                    <div className="metric-label">
                      Focus
                    </div>

                    <div className="metric-value">
                      {formatMetric(focusScore)}
                    </div>
                  </div>


                  <div className="metric-card">
                    <div className="metric-label">
                      Contrast
                    </div>

                    <div className="metric-value">
                      {formatMetric(contrastScore)}
                    </div>
                  </div>


                  <div className="metric-card">
                    <div className="metric-label">
                      Illumination
                    </div>

                    <div className="metric-value">
                      {formatMetric(
                        illuminationScore
                      )}
                    </div>
                  </div>


                  <div className="metric-card">
                    <div className="metric-label">
                      FOV
                    </div>

                    <div className="metric-value">
                      {formatMetric(fovScore)}
                    </div>
                  </div>


                  <div className="metric-card">
                    <div className="metric-label">
                      Noise
                    </div>

                    <div className="metric-value">
                      {formatMetric(noiseScore)}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </section>


          <section>

            <FundusViewer
              originalImage={previewUrl}
              processedImage={processedImage}
              overlayImage={overlayImage}
              gradCamImage={gradCamImage}
              title="Retinal Image Analysis"
            />


            <div className="card card-lg mt-lg">

              <div className="card-header">

                <h3 className="card-title">
                  Lesion Analysis
                </h3>

                <p className="card-description">
                  Detected retinal lesion evidence from the
                  screening pipeline.
                </p>

              </div>


              <div className="evidence-list">

                <div className="evidence-item">

                  <div className="evidence-name">
                    <span className="evidence-indicator" />
                    Microaneurysms
                  </div>

                  <div className="evidence-value">
                    {microaneurysms}
                  </div>

                </div>


                <div className="evidence-item">

                  <div className="evidence-name">
                    <span className="evidence-indicator" />
                    Exudates
                  </div>

                  <div className="evidence-value">
                    {exudates}
                  </div>

                </div>


                <div className="evidence-item">

                  <div className="evidence-name">
                    <span className="evidence-indicator" />
                    Hemorrhages
                  </div>

                  <div className="evidence-value">
                    {hemorrhages}
                  </div>

                </div>


                <div className="evidence-item">

                  <div className="evidence-name">
                    <span className="evidence-indicator" />
                    Neovascularization
                  </div>

                  <div className="evidence-value">
                    {neovascularization}
                  </div>

                </div>

              </div>

            </div>


            <div className="card card-lg mt-lg">

              <div className="card-header">

                <h3 className="card-title">
                  Retinal Anatomy
                </h3>

                <p className="card-description">
                  Structural findings identified during analysis.
                </p>

              </div>


              <div className="anatomy-grid">

                <div
                  className={`anatomy-item ${
                    opticDiscDetected
                      ? "detected"
                      : "unavailable"
                  }`}
                >

                  <div className="anatomy-icon">
                    <Eye size={17} />
                  </div>

                  <div>
                    <div className="anatomy-title">
                      Optic Disc
                    </div>

                    <div className="anatomy-status">
                      {opticDiscDetected
                        ? "Detected"
                        : "Unavailable"}
                    </div>
                  </div>

                </div>


                <div
                  className={`anatomy-item ${
                    foveaDetected
                      ? "detected"
                      : "unavailable"
                  }`}
                >

                  <div className="anatomy-icon">
                    <BrainCircuit size={17} />
                  </div>

                  <div>
                    <div className="anatomy-title">
                      Fovea
                    </div>

                    <div className="anatomy-status">
                      {foveaDetected
                        ? "Detected"
                        : "Unavailable"}
                    </div>
                  </div>

                </div>


                <div
                  className={`anatomy-item ${
                    vesselsDetected
                      ? "detected"
                      : "unavailable"
                  }`}
                >

                  <div className="anatomy-icon">
                    <Activity size={17} />
                  </div>

                  <div>
                    <div className="anatomy-title">
                      Retinal Vessels
                    </div>

                    <div className="anatomy-status">
                      {vesselsDetected
                        ? "Detected"
                        : "Unavailable"}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>


        <div className="card mt-lg">

          <DownloadReport
            result={safeResult}
            imageName={image?.name || "fundus-image"}
          />

        </div>


        <div className="clinical-disclaimer mt-lg">

          <div className="clinical-disclaimer-icon">
            <Info size={18} />
          </div>

          <div className="clinical-disclaimer-text">
            <strong>Important:</strong>{" "}
            This application provides AI-assisted research
            screening and does not establish a clinical diagnosis.
            Results should be reviewed by a qualified
            ophthalmologist or eye-care professional.
          </div>

        </div>


        <div className="result-bottom-actions">

          {onNewScreening && (
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onNewScreening}
            >
              <Sparkles size={18} />
              Start New Screening
            </button>
          )}


          {onBackHome && (
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onBackHome}
            >
              <ArrowLeft size={18} />
              Return Home
            </button>
          )}

        </div>

      </div>

    </main>
  );
};


export default Result;
