
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import ProcessingSteps from "../components/ProcessingSteps";
import useScreening from "../hooks/useScreening";


const Processing = ({
  image,
  previewUrl,
  onComplete,
  onBack,
}) => {
  const {
    startScreening,
    loading,
    error,
  } = useScreening();


  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [failedSteps, setFailedSteps] = useState([]);
  const [localError, setLocalError] = useState("");


  useEffect(() => {
    if (!image) {
      return;
    }


    let cancelled = false;
    let timers = [];
    let activeStep = 1;


    const updateStep = (step) => {
      if (cancelled) {
        return;
      }

      activeStep = step;

      setCurrentStep(step);

      setCompletedSteps((previous) => {
        const completed = previous.filter(
          (value) => value < step
        );

        return [...new Set(completed)];
      });
    };


    const completeStep = (step) => {
      if (cancelled) {
        return;
      }

      setCompletedSteps((previous) => [
        ...new Set([
          ...previous,
          step,
        ]),
      ]);
    };


    const addTimer = (callback, delay) => {
      const timer = setTimeout(
        callback,
        delay
      );

      timers.push(timer);
    };


    const clearAllTimers = () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });

      timers = [];
    };


    const runPipeline = async () => {
      try {
        setLocalError("");
        setFailedSteps([]);
        setCompletedSteps([]);
        setCurrentStep(1);

        activeStep = 1;


        if (
          typeof startScreening !== "function"
        ) {
          throw new Error(
            "Screening service is not available."
          );
        }


        updateStep(1);


        addTimer(() => {
          if (!cancelled) {
            completeStep(1);
            updateStep(2);
          }
        }, 900);


        addTimer(() => {
          if (!cancelled) {
            completeStep(2);
            updateStep(3);
          }
        }, 1800);


        addTimer(() => {
          if (!cancelled) {
            completeStep(3);
            updateStep(4);
          }
        }, 2900);


        addTimer(() => {
          if (!cancelled) {
            completeStep(4);
            updateStep(5);
          }
        }, 4000);


        addTimer(() => {
          if (!cancelled) {
            completeStep(5);
            updateStep(6);
          }
        }, 5200);


        addTimer(() => {
          if (!cancelled) {
            completeStep(6);
            updateStep(7);
          }
        }, 6500);


        addTimer(() => {
          if (!cancelled) {
            completeStep(7);
            updateStep(8);
          }
        }, 7800);


        const screeningResult =
          await startScreening(image);


        if (cancelled) {
          return;
        }


        clearAllTimers();


        setCompletedSteps([
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
        ]);

        setCurrentStep(8);

        activeStep = 8;


        if (!screeningResult) {
          throw new Error(
            "Screening completed but no result was returned."
          );
        }


        onComplete?.(screeningResult);


      } catch (screeningError) {
        if (cancelled) {
          return;
        }


        clearAllTimers();


        const message =
          screeningError?.response?.data?.message ||
          screeningError?.response?.data?.error ||
          screeningError?.response?.data?.detail ||
          screeningError?.message ||
          error ||
          "Unable to complete diabetic retinopathy screening.";


        setLocalError(
          String(message)
        );


        setFailedSteps((previous) => [
          ...new Set([
            ...previous,
            activeStep,
          ]),
        ]);


        setCurrentStep(activeStep);
      }
    };


    runPipeline();


    return () => {
      cancelled = true;

      clearAllTimers();
    };

  }, [
    image,
    startScreening,
    onComplete,
  ]);


  const displayError =
    localError ||
    error ||
    "";


  return (
    <main className="processing-page page-transition">

      <div className="processing-container">

        <div className="processing-header">

          <div className="welcome-badge">
            <ShieldCheck size={15} />
            Secure AI Screening
          </div>


          <h1 className="processing-title">
            {displayError
              ? "Screening Interrupted"
              : "Analyzing Your Fundus Image"}
          </h1>


          <p className="processing-subtitle">
            {displayError
              ? "The screening pipeline encountered a problem while processing the retinal image."
              : "The screening system is evaluating image quality, retinal anatomy, diabetic retinopathy lesions, severity, and explainability evidence."}
          </p>

        </div>


        <div className="processing-card">

          {previewUrl && (
            <div className="processing-image">

              <img
                src={previewUrl}
                alt="Fundus image under analysis"
              />

            </div>
          )}


          {!displayError && (
            <>
              <div className="processing-analysis-indicator">

                {loading ? (
                  <div className="processing-orbit">

                    <div className="processing-orbit-ring" />

                    <div className="processing-orbit-center">

                      <LoaderCircle
                        size={27}
                        className="processing-spinner-icon"
                      />

                    </div>

                  </div>
                ) : (
                  <div className="success-check">

                    <CheckCircle2
                      size={28}
                    />

                  </div>
                )}

              </div>


              <div className="text-center">

                <h3>
                  {loading
                    ? "AI analysis in progress"
                    : "Analysis completed"}
                </h3>


                <p className="mt-sm">
                  {loading
                    ? "Please keep this page open while the screening pipeline processes your image."
                    : "Your screening result is ready."}
                </p>

              </div>


              <div className="processing-pipeline-wrapper mt-lg">

                <ProcessingSteps
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  failedSteps={failedSteps}
                />

              </div>

            </>
          )}


          {displayError && (
            <div className="error-panel">

              <div className="error-icon">
                <AlertCircle size={27} />
              </div>


              <h3>
                Screening Could Not Be Completed
              </h3>


              <p className="mt-sm">
                {displayError}
              </p>


              <div className="result-actions">

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onBack}
                >
                  <ArrowLeft size={16} />
                  Back to Upload
                </button>

              </div>

            </div>
          )}


          {!displayError && loading && (
            <div className="processing-footer-message">

              <span className="status-dot" />

              <span>
                Securely processing retinal screening data...
              </span>

            </div>
          )}

        </div>


        <div className="clinical-disclaimer">

          <div className="clinical-disclaimer-icon">
            <ShieldCheck size={18} />
          </div>


          <div className="clinical-disclaimer-text">

            Screening results are generated for research and
            educational purposes. This system does not replace
            examination or diagnosis by a qualified eye-care
            professional.

          </div>

        </div>


        {!loading && !displayError && (
          <div className="processing-complete-actions">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              Back to Upload
            </button>

          </div>
        )}

      </div>

    </main>
  );
};


export default Processing;
