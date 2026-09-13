
import { useEffect, useMemo, useState } from "react";
import {
  Image as ImageIcon,
  Layers3,
  Maximize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ScanEye,
} from "lucide-react";


const FundusViewer = ({
  originalImage,
  processedImage = null,
  overlayImage = null,
  gradCamImage = null,
  title = "Fundus Analysis",
}) => {
  const [activeView, setActiveView] = useState("original");
  const [zoom, setZoom] = useState(1);


  useEffect(() => {
    setZoom(1);

    if (!originalImage) {
      setActiveView("original");
    }
  }, [originalImage, processedImage, overlayImage, gradCamImage]);


  const views = useMemo(() => {
    const availableViews = [
      {
        id: "original",
        label: "Original",
        image: originalImage,
        icon: ImageIcon,
      },
      {
        id: "processed",
        label: "Processed",
        image: processedImage,
        icon: ScanEye,
      },
      {
        id: "overlay",
        label: "Lesion Overlay",
        image: overlayImage,
        icon: Layers3,
      },
      {
        id: "gradcam",
        label: "AI Heatmap",
        image: gradCamImage,
        icon: Layers3,
      },
    ];

    return availableViews.filter((view) => !!view.image);
  }, [
    originalImage,
    processedImage,
    overlayImage,
    gradCamImage,
  ]);


  useEffect(() => {
    if (!views.some((view) => view.id === activeView)) {
      if (views.length > 0) {
        setActiveView(views[0].id);
      }
    }
  }, [views, activeView]);


  const activeViewData =
    views.find((view) => view.id === activeView) || views[0];


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


  const toggleFullscreen = async () => {
    const element = document.querySelector(
      ".fundus-viewer"
    );

    if (!element) {
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      return;
    }
  };


  if (!originalImage && views.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <ImageIcon size={24} />
        </div>

        <h3 className="empty-state-title">
          No Fundus Image Available
        </h3>

        <p className="empty-state-text">
          The retinal image will appear here after screening.
        </p>
      </div>
    );
  }


  return (
    <div className="fundus-viewer">

      <div className="fundus-viewer-header">

        <div>
          <div className="fundus-viewer-title">
            {title}
          </div>

          <div className="fundus-viewer-subtitle">
            {activeViewData?.label || "Image"}
          </div>
        </div>


        <div className="fundus-viewer-header-actions">

          <button
            type="button"
            className="viewer-icon-button"
            onClick={decreaseZoom}
            disabled={zoom <= 1}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>


          <span className="viewer-zoom-value">
            {Math.round(zoom * 100)}%
          </span>


          <button
            type="button"
            className="viewer-icon-button"
            onClick={increaseZoom}
            disabled={zoom >= 3}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>


          <button
            type="button"
            className="viewer-icon-button"
            onClick={resetZoom}
            disabled={zoom === 1}
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw size={16} />
          </button>


          <button
            type="button"
            className="viewer-icon-button"
            onClick={toggleFullscreen}
            title="Fullscreen"
            aria-label="Open fullscreen"
          >
            <Maximize2 size={16} />
          </button>

        </div>

      </div>


      {views.length > 0 && (
        <div className="fundus-viewer-tabs">

          {views.map((view) => {
            const Icon = view.icon;

            return (
              <button
                key={view.id}
                type="button"
                className={`fundus-viewer-tab ${
                  activeView === view.id
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  setActiveView(view.id);
                  setZoom(1);
                }}
              >
                <Icon size={14} />
                <span>{view.label}</span>
              </button>
            );
          })}

        </div>
      )}


      <div className="fundus-viewer-body">

        {activeViewData?.image ? (
          <div
            className="fundus-viewer-image-wrapper"
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            <img
              src={activeViewData.image}
              alt={activeViewData.label}
              className="fundus-viewer-image"
            />
          </div>
        ) : (
          <div className="fundus-viewer-no-image">
            <ImageIcon size={30} />
            <span>Image unavailable</span>
          </div>
        )}

      </div>


      <div className="fundus-viewer-footer">

        <div className="viewer-footer-status">
          <span className="viewer-live-dot" />

          <span>
            {activeViewData?.label || "Fundus image"} view
          </span>
        </div>


        <div className="viewer-footer-hint">
          Use zoom controls to inspect retinal details
        </div>

      </div>

    </div>
  );
};


export default FundusViewer;
