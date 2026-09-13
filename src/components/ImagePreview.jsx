
import { useEffect, useState } from "react";
import {
  Eye,
  Image as ImageIcon,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  X,
  CheckCircle2,
} from "lucide-react";


const ImagePreview = ({
  file,
  previewUrl,
  onRemove,
  onChange,
  showControls = true,
}) => {
  const [zoom, setZoom] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [imageSize, setImageSize] = useState({
    width: null,
    height: null,
  });


  useEffect(() => {
    setZoom(1);
    setImageError(false);
    setImageSize({
      width: null,
      height: null,
    });
  }, [file, previewUrl]);


  if (!file || !previewUrl) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <ImageIcon size={24} />
        </div>

        <h3 className="empty-state-title">
          No Image Selected
        </h3>

        <p className="empty-state-text">
          Upload a retinal fundus image to preview it here.
        </p>
      </div>
    );
  }


  const formatFileSize = (bytes) => {
    if (!bytes || bytes <= 0) {
      return "0 KB";
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };


  const handleImageLoad = (event) => {
    setImageSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });

    setImageError(false);
  };


  const handleImageError = () => {
    setImageError(true);
  };


  const increaseZoom = () => {
    setZoom((previous) =>
      Math.min(Number((previous + 0.25).toFixed(2)), 3)
    );
  };


  const decreaseZoom = () => {
    setZoom((previous) =>
      Math.max(Number((previous - 0.25).toFixed(2)), 1)
    );
  };


  const resetZoom = () => {
    setZoom(1);
  };


  return (
    <div className="image-preview-wrapper">

      <div className="card card-lg image-preview-card">

        <div className="image-preview-header">

          <div className="flex">
            <div className="image-preview-icon">
              <Eye size={18} />
            </div>

            <div>
              <div className="image-preview-title">
                Fundus Image Preview
              </div>

              <div className="text-muted">
                Review the image before screening
              </div>
            </div>
          </div>


          {onRemove && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onRemove}
            >
              <X size={15} />
              Remove
            </button>
          )}

        </div>


        <div className="upload-file-info">

          <div>
            <div className="upload-file-name">
              {file.name}
            </div>

            <div className="text-muted">
              {formatFileSize(file.size)}
            </div>
          </div>


          <span className="badge badge-success">
            <CheckCircle2 size={13} />
            Ready
          </span>

        </div>


        <div className="fundus-preview-meta">

          <div className="fundus-meta-item">
            <span className="fundus-meta-label">
              Format
            </span>

            <span className="fundus-meta-value">
              {file.type
                ? file.type.split("/").pop().toUpperCase()
                : "IMAGE"}
            </span>
          </div>


          <div className="fundus-meta-item">
            <span className="fundus-meta-label">
              Dimensions
            </span>

            <span className="fundus-meta-value">
              {imageSize.width && imageSize.height
                ? `${imageSize.width} × ${imageSize.height}`
                : "Detecting..."}
            </span>
          </div>


          <div className="fundus-meta-item">
            <span className="fundus-meta-label">
              Zoom
            </span>

            <span className="fundus-meta-value">
              {Math.round(zoom * 100)}%
            </span>
          </div>

        </div>


        <div className="fundus-preview-container">

          {!imageError ? (
            <div className="fundus-preview-viewport">

              <img
                src={previewUrl}
                alt="Uploaded retinal fundus preview"
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  transform: `scale(${zoom})`,
                }}
              />

            </div>
          ) : (
            <div className="empty-state image-preview-error">

              <div className="empty-state-icon">
                <X size={24} />
              </div>

              <h3 className="empty-state-title">
                Unable to Preview Image
              </h3>

              <p className="empty-state-text">
                The selected image could not be displayed.
                Please choose another image.
              </p>

            </div>
          )}

        </div>


        {showControls && !imageError && (
          <div className="fundus-preview-controls">

            <div className="fundus-preview-control-group">

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={decreaseZoom}
                disabled={zoom <= 1}
                aria-label="Zoom out"
              >
                <ZoomOut size={15} />
                Zoom Out
              </button>


              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={resetZoom}
                disabled={zoom === 1}
                aria-label="Reset zoom"
              >
                <RotateCcw size={15} />
                Reset
              </button>


              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={increaseZoom}
                disabled={zoom >= 3}
                aria-label="Zoom in"
              >
                <ZoomIn size={15} />
                Zoom In
              </button>

            </div>


            <div className="fundus-preview-status">
              <span className="status-dot" />
              Image loaded successfully
            </div>

          </div>
        )}


        {onChange && (
          <div className="image-preview-change">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onChange}
            >
              <ImageIcon size={16} />
              Choose Different Image
            </button>

          </div>
        )}

      </div>

    </div>
  );
};


export default ImagePreview;
