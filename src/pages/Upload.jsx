
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import ImageUploader from "../components/ImageUploader";
import ImagePreview from "../components/ImagePreview";


const Upload = ({
  image = null,
  previewUrl = null,
  onUpload,
  onStartProcessing,
  onBack,
}) => {
  const [localFile, setLocalFile] = useState(image);
  const [localPreviewUrl, setLocalPreviewUrl] =
    useState(previewUrl);


  const selectedFile = localFile || image;
  const selectedPreview =
    localPreviewUrl || previewUrl;


  const handleUpload = (file) => {
    if (!file) {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }

      setLocalFile(null);
      setLocalPreviewUrl(null);

      onUpload?.(null);
      return;
    }


    if (
      localPreviewUrl &&
      localPreviewUrl !== previewUrl
    ) {
      URL.revokeObjectURL(localPreviewUrl);
    }


    const newPreviewUrl =
      URL.createObjectURL(file);


    setLocalFile(file);
    setLocalPreviewUrl(newPreviewUrl);

    onUpload?.(file);
  };


  const handleRemove = () => {
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
    }

    setLocalFile(null);
    setLocalPreviewUrl(null);

    onUpload?.(null);
  };


  const handleChooseDifferent = () => {
    handleRemove();
  };


  const handleStartProcessing = () => {
    if (!selectedFile) {
      return;
    }

    onStartProcessing?.();
  };


  return (
    <main className="upload-page page-transition">

      <div className="page-container">

        <div className="upload-header">

          <div className="welcome-badge">
            <ShieldCheck size={15} />
            Secure Retinal Screening
          </div>


          <h1 className="upload-title">
            Upload Fundus Image
          </h1>


          <p className="upload-description">
            Upload a clear retinal fundus photograph to begin
            AI-assisted diabetic retinopathy screening.
          </p>

        </div>


        <div className="upload-layout">

          <section className="card card-lg">

            <div className="card-header">

              <h3 className="card-title">
                Select Retinal Image
              </h3>

              <p className="card-description">
                Choose a fundus photograph from your device.
              </p>

            </div>


            <ImageUploader
              selectedFile={selectedFile}
              onUpload={handleUpload}
            />

          </section>


          <section>

            {selectedFile && selectedPreview ? (
              <ImagePreview
                file={selectedFile}
                previewUrl={selectedPreview}
                onRemove={handleRemove}
                onChange={handleChooseDifferent}
              />
            ) : (
              <div className="card card-lg">

                <div className="card-header">

                  <h3 className="card-title">
                    Image Preview
                  </h3>

                  <p className="card-description">
                    Your selected fundus image will appear here.
                  </p>

                </div>


                <div className="empty-state">

                  <div className="empty-state-icon">
                    <Sparkles size={23} />
                  </div>


                  <h3 className="empty-state-title">
                    Ready for Screening
                  </h3>


                  <p className="empty-state-text">
                    Select a retinal image from the upload
                    panel to review it before analysis.
                  </p>

                </div>

              </div>
            )}

          </section>

        </div>


        <div className="upload-guidance card card-md mt-lg">

          <div className="upload-guidance-header">

            <div className="upload-guidance-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <h3 className="upload-guidance-title">
                For better screening quality
              </h3>

              <p className="upload-guidance-text">
                Use a well-centered retinal image with good
                illumination and minimal blur or artifacts.
              </p>
            </div>

          </div>


          <div className="upload-guidance-grid">

            <div className="upload-guidance-item">
              <span className="guidance-number">
                01
              </span>

              <div>
                <strong>Center the retina</strong>

                <p>
                  Keep the retinal field clearly visible.
                </p>
              </div>
            </div>


            <div className="upload-guidance-item">
              <span className="guidance-number">
                02
              </span>

              <div>
                <strong>Avoid blur</strong>

                <p>
                  Use a sharp and focused fundus photograph.
                </p>
              </div>
            </div>


            <div className="upload-guidance-item">
              <span className="guidance-number">
                03
              </span>

              <div>
                <strong>Good illumination</strong>

                <p>
                  Avoid excessive darkness or overexposure.
                </p>
              </div>
            </div>

          </div>

        </div>


        <div className="upload-bottom-actions">

          {onBack && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}


          <div className="upload-start-section">

            {selectedFile && (
              <div className="upload-ready-status">
                <span className="status-dot" />

                <span>
                  Image ready for AI analysis
                </span>
              </div>
            )}


            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleStartProcessing}
              disabled={!selectedFile}
            >
              <Sparkles size={18} />

              {selectedFile
                ? "Start AI Screening"
                : "Select an Image First"}

              <ArrowRight size={17} />
            </button>

          </div>

        </div>


        <div className="clinical-disclaimer">

          <div className="clinical-disclaimer-icon">
            <ShieldCheck size={18} />
          </div>

          <div className="clinical-disclaimer-text">
            Uploaded images are used for the screening workflow.
            This application provides research/educational AI
            screening and does not replace professional clinical
            examination or diagnosis.
          </div>

        </div>

      </div>

    </main>
  );
};


export default Upload;

