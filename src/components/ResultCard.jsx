
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Activity,
} from "lucide-react";


const ResultCard = ({
  result = null,
  onNewScreening = null,
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


  const predictedGrade = getValue(
    [
      "FinalResult.PredictedGrade",
      "finalResult.PredictedGrade",
      "Classification.PredictedClass",
      "classification.PredictedClass",
      "predictedGrade",
    ],
    "Unknown"
  );


  const confidence = getValue(
    [
      "FinalResult.Confidence",
      "finalResult.Confidence",
      "Classification.Confidence",
      "classification.Confidence",
      "confidence",
    ],
    null
  );


  const referableProbability = getValue(
    [
      "FinalResult.ReferableProbability",
      "finalResult.ReferableProbability",
      "Classification.ReferableProbability",
      "classification.ReferableProbability",
      "referableProbability",
    ],
    null
  );


  const isReferable = getValue(
    [
      "FinalResult.IsReferable",
      "finalResult.IsReferable",
      "Classification.IsReferable",
      "classification.IsReferable",
      "isReferable",
    ],
    null
  );


  const finalStatus = getValue(
    [
      "FinalResult.Status",
      "finalResult.Status",
      "FinalStatus",
      "finalStatus",
      "status",
    ],
    "Indeterminate"
  );


  const recommendation = getValue(
    [
      "FinalResult.Recommendation",
      "finalResult.Recommendation",
      "ScreeningRecommendation",
      "screeningRecommendation",
      "recommendation",
    ],
    "No recommendation available."
  );


  const qualityScore = getValue(
    [
      "FinalResult.QualityScore",
      "finalResult.QualityScore",
      "Quality.QualityScore",
      "quality.QualityScore",
      "qualityScore",
    ],
    null
  );


  const qualityClass = getValue(
    [
      "FinalResult.QualityClass",
      "finalResult.QualityClass",
      "Quality.QualityClass",
      "quality.QualityClass",
      "qualityClass",
    ],
    "Unknown"
  );


  const confidencePercent =
    typeof confidence === "number"
      ? Math.max(
          0,
          Math.min(100, confidence * 100)
        )
      : null;


  const referablePercent =
    typeof referableProbability === "number"
      ? Math.max(
          0,
          Math.min(
            100,
            referableProbability * 100
          )
        )
      : null;


  const qualityPercent =
    typeof qualityScore === "number"
      ? Math.max(
          0,
          Math.min(100, qualityScore * 100)
        )
      : null;


  const getStatusType = () => {
    const status = String(finalStatus).toLowerCase();

    if (
      status.includes("referable") &&
      !status.includes("non")
    ) {
      return "danger";
    }

    if (status.includes("indeterminate")) {
      return "warning";
    }

    if (
      status.includes("non-referable") ||
      status.includes("completed")
    ) {
      return "success";
    }

    return "warning";
  };


  const statusType = getStatusType();


  const StatusIcon =
    statusType === "danger"
      ? ShieldAlert
      : statusType === "success"
        ? ShieldCheck
        : AlertCircle;


  const getGradeClass = () => {
    const grade = String(predictedGrade)
      .toLowerCase();

    if (
      grade.includes("proliferative") ||
      grade.includes("severe") ||
      grade.includes("moderate")
    ) {
      return "text-danger";
    }

    if (grade.includes("mild")) {
      return "text-warning";
    }

    if (
      grade.includes("no dr") ||
      grade.includes("normal")
    ) {
      return "text-success";
    }

    return "text-primary";
  };


  const getConfidenceLevel = () => {
    if (confidencePercent === null) {
      return "Unknown";
    }

    if (confidencePercent >= 80) {
      return "High";
    }

    if (confidencePercent >= 60) {
      return "Moderate";
    }

    return "Low";
  };


  const formatPercent = (value) => {
    if (value === null || !Number.isFinite(value)) {
      return "N/A";
    }

    return `${value.toFixed(1)}%`;
  };


  return (
    <div className="result-card">

      <div
        className={`result-status ${statusType}`}
      >
        <div className="result-status-icon">
          <StatusIcon size={19} />
        </div>

        <div>
          <div>{String(finalStatus)}</div>

          <div className="text-muted">
            AI-assisted screening outcome
          </div>
        </div>
      </div>


      <div className="grade-highlight">

        <div className="grade-highlight-label">
          Predicted DR Grade
        </div>

        <div
          className={`grade-highlight-value ${getGradeClass()}`}
        >
          {String(predictedGrade)}
        </div>

      </div>


      <div className="result-metrics">

        <div className="metric-card">

          <div className="metric-label">
            Model Confidence
          </div>

          <div className="metric-value">
            {formatPercent(confidencePercent)}
          </div>

          <div className="metric-subtext">
            {getConfidenceLevel()} confidence
          </div>

        </div>


        <div className="metric-card">

          <div className="metric-label">
            Referable Probability
          </div>

          <div className="metric-value">
            {formatPercent(referablePercent)}
          </div>

          <div className="metric-subtext">
            {isReferable === true
              ? "Referral indicated"
              : isReferable === false
                ? "Not marked referable"
                : "Not available"}
          </div>

        </div>


        <div className="metric-card">

          <div className="metric-label">
            Image Quality
          </div>

          <div className="metric-value">
            {formatPercent(qualityPercent)}
          </div>

          <div className="metric-subtext">
            {String(qualityClass)}
          </div>

        </div>


        <div className="metric-card">

          <div className="metric-label">
            Screening Type
          </div>

          <div className="metric-value">
            AI
          </div>

          <div className="metric-subtext">
            Research screening
          </div>

        </div>

      </div>


      <div className="result-recommendation">

        <div className="result-recommendation-title">
          Screening Recommendation
        </div>

        <div className="result-recommendation-text">
          {String(recommendation)}
        </div>

      </div>


      <div className="result-card-info-grid">

        <div className="result-card-info-item">

          <div className="result-card-info-icon">
            <FileCheck2 size={17} />
          </div>

          <div>
            <div className="result-card-info-title">
              Analysis Status
            </div>

            <div className="result-card-info-value">
              {safeResult.Status ||
                safeResult.status ||
                "Completed"}
            </div>
          </div>

        </div>


        <div className="result-card-info-item">

          <div className="result-card-info-icon">
            <Activity size={17} />
          </div>

          <div>
            <div className="result-card-info-title">
              Referable Assessment
            </div>

            <div className="result-card-info-value">
              {isReferable === true
                ? "Yes"
                : isReferable === false
                  ? "No"
                  : "N/A"}
            </div>
          </div>

        </div>


        <div className="result-card-info-item">

          <div className="result-card-info-icon">
            <Eye size={17} />
          </div>

          <div>
            <div className="result-card-info-title">
              Quality Assessment
            </div>

            <div className="result-card-info-value">
              {String(qualityClass)}
            </div>
          </div>

        </div>

      </div>


      {onNewScreening && (
        <div className="result-actions">

          <button
            type="button"
            className="btn btn-primary"
            onClick={onNewScreening}
          >
            <CheckCircle2 size={16} />
            Start New Screening
          </button>

        </div>
      )}


      <div className="clinical-disclaimer mt-lg">

        <div className="clinical-disclaimer-icon">
          <AlertCircle size={18} />
        </div>

        <div className="clinical-disclaimer-text">
          <strong>Research / Educational Use:</strong>{" "}
          This result is an AI-assisted screening output and
          is not a clinical diagnosis. Any clinical decision
          should be made by a qualified eye-care professional.
        </div>

      </div>

    </div>
  );
};


export default ResultCard;
