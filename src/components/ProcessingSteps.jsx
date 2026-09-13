
import { useMemo } from "react";
import {
  Check,
  Circle,
  Eye,
  FileText,
  Microscope,
  ScanLine,
  Sparkles,
  Target,
  Stethoscope,
  AlertCircle,
} from "lucide-react";


const ProcessingSteps = ({
  currentStep = 1,
  completedSteps = [],
  failedSteps = [],
  steps = null,
  compact = false,
}) => {
  const defaultSteps = [
    {
      id: 1,
      title: "Image Quality Assessment",
      description:
        "Checking focus, contrast, illumination, retinal field of view, and noise.",
      icon: Eye,
    },
    {
      id: 2,
      title: "Image Preprocessing",
      description:
        "Resizing, normalization, illumination correction, CLAHE, and noise reduction.",
      icon: Sparkles,
    },
    {
      id: 3,
      title: "Retinal Anatomy Analysis",
      description:
        "Analyzing optic disc, fovea, and retinal blood vessels.",
      icon: Microscope,
    },
    {
      id: 4,
      title: "Lesion Analysis",
      description:
        "Detecting microaneurysms, exudates, hemorrhages, and neovascularization.",
      icon: Target,
    },
    {
      id: 5,
      title: "DR Severity Classification",
      description:
        "Predicting the diabetic retinopathy severity grade and confidence.",
      icon: Stethoscope,
    },
    {
      id: 6,
      title: "Explainability Analysis",
      description:
        "Generating AI attention maps and lesion evidence.",
      icon: ScanLine,
    },
    {
      id: 7,
      title: "Evidence Fusion",
      description:
        "Combining image quality, anatomy, lesion, and model evidence.",
      icon: Target,
    },
    {
      id: 8,
      title: "Screening Report",
      description:
        "Preparing the final screening result and recommendation.",
      icon: FileText,
    },
  ];


  const processingSteps = useMemo(() => {
    if (!Array.isArray(steps) || steps.length === 0) {
      return defaultSteps;
    }

    return steps;
  }, [steps]);


  const isCompleted = (stepId) => {
    return (
      completedSteps.includes(stepId) ||
      stepId < currentStep
    );
  };


  const isFailed = (stepId) => {
    return failedSteps.includes(stepId);
  };


  const isActive = (stepId) => {
    return (
      stepId === currentStep &&
      !isCompleted(stepId) &&
      !isFailed(stepId)
    );
  };


  const getStepStatus = (stepId) => {
    if (isFailed(stepId)) {
      return "failed";
    }

    if (isCompleted(stepId)) {
      return "completed";
    }

    if (isActive(stepId)) {
      return "active";
    }

    return "pending";
  };


  return (
    <div
      className={`processing-steps ${
        compact ? "processing-steps-compact" : ""
      }`}
    >

      <div className="processing-steps-header">
        <div>
          <h3 className="processing-steps-title">
            AI Screening Pipeline
          </h3>

          <p className="processing-steps-subtitle">
            {isCompleted(8)
              ? "Analysis completed successfully."
              : `Stage ${Math.min(
                  Math.max(currentStep, 1),
                  processingSteps.length
                )} of ${processingSteps.length}`}
          </p>
        </div>


        <div className="processing-progress-badge">
          {Math.round(
            (completedSteps.length /
              processingSteps.length) *
              100
          ) || 0}
          %
        </div>
      </div>


      <div className="processing-progress-bar">
        <div
          className="processing-progress-fill"
          style={{
            width: `${
              Math.min(
                (
                  (completedSteps.length ||
                    Math.max(currentStep - 1, 0)) /
                  processingSteps.length
                ) * 100,
                100
              )
            }%`,
          }}
        />
      </div>


      <div className="processing-step-list">

        {processingSteps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon || Circle;

          return (
            <div
              key={step.id}
              className={`processing-pipeline-step ${status}`}
            >

              <div className="processing-pipeline-step-line">
                {index < processingSteps.length - 1 && (
                  <span
                    className={`processing-connector ${
                      isCompleted(step.id)
                        ? "completed"
                        : ""
                    }`}
                  />
                )}
              </div>


              <div className="processing-pipeline-icon">

                {status === "completed" ? (
                  <Check
                    size={17}
                    strokeWidth={2.5}
                  />
                ) : status === "failed" ? (
                  <AlertCircle
                    size={17}
                    strokeWidth={2.3}
                  />
                ) : (
                  <Icon
                    size={17}
                    strokeWidth={2}
                  />
                )}

              </div>


              <div className="processing-pipeline-content">

                <div className="processing-pipeline-title-row">

                  <span className="processing-pipeline-title">
                    {step.title}
                  </span>


                  <span className="processing-pipeline-status">

                    {status === "completed" && (
                      <span className="processing-status-completed">
                        Completed
                      </span>
                    )}

                    {status === "active" && (
                      <span className="processing-status-active">
                        Processing
                      </span>
                    )}

                    {status === "failed" && (
                      <span className="processing-status-failed">
                        Failed
                      </span>
                    )}

                    {status === "pending" && (
                      <span className="processing-status-pending">
                        Waiting
                      </span>
                    )}

                  </span>

                </div>


                {!compact && (
                  <p className="processing-pipeline-description">
                    {step.description}
                  </p>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};


export default ProcessingSteps;
