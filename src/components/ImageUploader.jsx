
import { useRef, useState } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  ShieldCheck,
  FileImage,
  X,
} from "lucide-react";


const ImageUploader = ({
  onUpload,
  selectedFile = null,
  disabled = false,
}) => {
  const inputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");


  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/tiff",
    "image/x-tiff",
  ];

  const maxFileSize = 15 * 1024 * 1024;


  const validateFile = (file) => {
    if (!file) {
      return "Please select a fundus image.";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Unsupported file type. Please use JPG, PNG, or TIFF.";
    }

    if (file.size > maxFileSize) {
      return "File is too large. Maximum allowed size is 15 MB.";
    }

    return "";
  };


  const processFile = (file) => {
    if (disabled) {
      return;
    }

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onUpload(file);
  };


  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      processFile(file);
    }

    event.target.value = "";
  };


  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    }
  };


  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!disabled) {
      setIsDragging(true);
    }
  };


  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!disabled) {
      setIsDragging(true);
    }
  };


  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setIsDragging(false);
  };


  const handleBrowseClick = () => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };


  const clearSelection = () => {
    if (disabled) {
      return;
    }

    setError("");

    onUpload(null);
  };


  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };


  return (
    <div className="image-uploader">

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.tif,.tiff,image/jpeg,image/png,image/tiff"
        className="upload-input"
        onChange={handleFileChange}
        disabled={disabled}
      />


      {!selectedFile ? (
        <div
          className={`upload-zone upload-zone-glow ${
            isDragging ? "drag-active active" : ""
          }`}
          onClick={handleBrowseClick}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload fundus image"
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              handleBrowseClick();
            }
          }}
        >
          <div className="upload-zone-content">

            <div className="upload-icon">
              <UploadCloud size={38} strokeWidth={1.8} />
            </div>


            <h3 className="upload-zone-title">
              Upload Fundus Image
            </h3>


            <p className="upload-zone-text">
              Drag and drop your retinal fundus image here,
              or click below to browse from your device.
            </p>


            <button
              type="button"
              className="btn btn-primary"
              onClick={(event) => {
                event.stopPropagation();
                handleBrowseClick();
              }}
              disabled={disabled}
            >
              <ImageIcon size={17} />
              Select Image
            </button>


            <div className="upload-info-list mt-lg">

              <div className="upload-info-item">
                <div className="upload-info-icon">
                  <FileImage size={17} />
                </div>

                <div>
                  <div className="upload-info-title">
                    Supported formats
                  </div>

                  <div className="upload-info-text">
                    JPG, JPEG, PNG and TIFF
                  </div>
                </div>
              </div>


              <div className="upload-info-item">
                <div className="upload-info-icon">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <div className="upload-info-title">
                    Image requirement
                  </div>

                  <div className="upload-info-text">
                    Use a clear, centered retinal fundus image
                    for better screening reliability.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      ) : (
        <div className="card card-lg image-preview-card">

          <div className="image-preview-header">

            <div>
              <div className="image-preview-title">
                Selected Fundus Image
              </div>

              <div className="text-muted">
                {selectedFile.name}
              </div>
            </div>


            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={clearSelection}
              disabled={disabled}
              aria-label="Remove selected image"
            >
              <X size={16} />
              Remove
            </button>

          </div>


          <div className="upload-file-info">

            <div>
              <div className="upload-file-name">
                {selectedFile.name}
              </div>

              <div className="text-muted">
                {formatFileSize(selectedFile.size)}
              </div>
            </div>


            <span className="badge badge-success">
              <ShieldCheck size={13} />
              Ready
            </span>

          </div>

        </div>
      )}


      {error && (
        <div className="alert alert-danger mt-md" role="alert">
          <X size={17} />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
};


export default ImageUploader;
