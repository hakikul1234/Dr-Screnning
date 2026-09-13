
export const APP_NAME = "DR Screening AI";

export const APP_VERSION = "1.0.0";

export const APP_DESCRIPTION =
  "AI-assisted diabetic retinopathy screening from retinal fundus images.";


/* =========================================
   API
========================================= */

export const API_ENDPOINTS = {
  HEALTH: "/health",
  SCREEN: "/screen",
  SCREENING: (id) => `/screen/${id}`,
  STATUS: (id) => `/screen/${id}/status`,
  REPORT: (id) => `/screen/${id}/report`,
  PDF_REPORT: (id) => `/screen/${id}/report/pdf`,
};


/* =========================================
   IMAGE UPLOAD
========================================= */

export const SUPPORTED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".tif",
  ".tiff",
];


export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/tiff",
  "image/x-tiff",
];


export const MAX_IMAGE_SIZE_MB = 15;

export const MAX_IMAGE_SIZE_BYTES =
  MAX_IMAGE_SIZE_MB * 1024 * 1024;


/* =========================================
   DR CLASSIFICATION
========================================= */

export const DR_CLASSES = [
  "No DR",
  "Mild",
  "Moderate",
  "Severe",
  "Proliferative DR",
];


export const DR_CLASS_LEVELS = {
  "No DR": 0,
  Mild: 1,
  Moderate: 2,
  Severe: 3,
  "Proliferative DR": 4,
};


/* =========================================
   REFERABLE DR
========================================= */

export const REFERABLE_THRESHOLD = 0.5;

export const REFERABLE_LEVEL = 2;


/* =========================================
   IMAGE QUALITY
========================================= */

export const QUALITY_THRESHOLDS = {
  EXCELLENT: 0.9,
  GOOD: 0.75,
  BORDERLINE: 0.5,
  POOR: 0.3,
};


export const QUALITY_ACTIONS = {
  ACCEPT: "ACCEPT",
  ENHANCE: "ENHANCE",
  REJECT: "REJECT",
};


/* =========================================
   QUALITY METRICS
========================================= */

export const QUALITY_METRICS = {
  FOCUS: "Focus",
  CONTRAST: "Contrast",
  ILLUMINATION: "Illumination",
  FOV: "Field of View",
  NOISE: "Noise",
};


/* =========================================
   SCREENING PIPELINE
========================================= */

export const PROCESSING_STEPS = [
  {
    id: 1,
    key: "quality",
    title: "Image Quality Assessment",
  },
  {
    id: 2,
    key: "preprocessing",
    title: "Image Preprocessing",
  },
  {
    id: 3,
    key: "anatomy",
    title: "Retinal Anatomy Analysis",
  },
  {
    id: 4,
    key: "lesions",
    title: "Lesion Analysis",
  },
  {
    id: 5,
    key: "classification",
    title: "DR Severity Classification",
  },
  {
    id: 6,
    key: "explainability",
    title: "Explainability Analysis",
  },
  {
    id: 7,
    key: "fusion",
    title: "Evidence Fusion",
  },
  {
    id: 8,
    key: "report",
    title: "Screening Report",
  },
];


export const TOTAL_PROCESSING_STEPS =
  PROCESSING_STEPS.length;


/* =========================================
   LESIONS
========================================= */

export const LESION_TYPES = [
  "Microaneurysms",
  "Exudates",
  "Hemorrhages",
  "Neovascularization",
];


/* =========================================
   RETINAL ANATOMY
========================================= */

export const ANATOMY_TYPES = [
  "Optic Disc",
  "Fovea",
  "Retinal Vessels",
];


/* =========================================
   SCREENING STATUS
========================================= */

export const SCREENING_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  PROCESSING: "processing",
  COMPLETED: "completed",
  REJECTED: "rejected",
  FAILED: "failed",
  INDETERMINATE: "indeterminate",
};


/* =========================================
   RESULT STATUS
========================================= */

export const RESULT_STATUS = {
  REFERABLE: "Referable DR",
  NON_REFERABLE: "Non-Referable DR",
  INDETERMINATE: "Indeterminate",
};


/* =========================================
   CONFIDENCE
========================================= */

export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.8,
  MODERATE: 0.6,
};


export const CONFIDENCE_LEVELS = {
  HIGH: "High",
  MODERATE: "Moderate",
  LOW: "Low",
  UNKNOWN: "Unknown",
};


/* =========================================
   FILE VALIDATION
========================================= */

export const FILE_VALIDATION_MESSAGES = {
  NO_FILE:
    "Please select a fundus image.",

  INVALID_TYPE:
    "Unsupported file type. Please use JPG, JPEG, PNG, or TIFF.",

  FILE_TOO_LARGE:
    `Image size must be ${MAX_IMAGE_SIZE_MB} MB or less.`,

  INVALID_IMAGE:
    "The selected file could not be read as an image.",
};


/* =========================================
   SCREENING MESSAGES
========================================= */

export const SCREENING_MESSAGES = {
  STARTING:
    "Preparing retinal image for analysis...",

  QUALITY:
    "Assessing image quality...",

  PREPROCESSING:
    "Enhancing and preprocessing the fundus image...",

  ANATOMY:
    "Analyzing retinal anatomy...",

  LESIONS:
    "Detecting diabetic retinopathy lesions...",

  CLASSIFICATION:
    "Estimating diabetic retinopathy severity...",

  EXPLAINABILITY:
    "Generating explainable AI evidence...",

  FUSION:
    "Combining screening evidence...",

  REPORT:
    "Preparing screening report...",

  COMPLETED:
    "Screening analysis completed.",

  FAILED:
    "Screening analysis could not be completed.",
};


/* =========================================
   VIEWER
========================================= */

export const VIEWER_VIEWS = {
  ORIGINAL: "original",
  PROCESSED: "processed",
  OVERLAY: "overlay",
  GRADCAM: "gradcam",
};


export const VIEWER_ZOOM = {
  MIN: 1,
  MAX: 3,
  STEP: 0.25,
};


/* =========================================
   REPORT
========================================= */

export const REPORT_FORMATS = {
  JSON: "json",
  CSV: "csv",
  HTML: "html",
  PDF: "pdf",
};


/* =========================================
   RESEARCH DISCLAIMER
========================================= */

export const RESEARCH_DISCLAIMER =
  "This application provides AI-assisted research and educational screening. It does not provide a clinical diagnosis.";


/* =========================================
   UI
========================================= */

export const NAVIGATION_ROUTES = {
  HOME: "/",
  UPLOAD: "/upload",
  PROCESSING: "/processing",
  RESULT: "/result",
};


/* =========================================
   LOCAL STORAGE
========================================= */

export const STORAGE_KEYS = {
  SCREENING_RESULT: "dr_screening_result",
  SCREENING_ID: "dr_screening_id",
};


/* =========================================
   DEFAULT OPTIONS
========================================= */

export const DEFAULT_SCREENING_OPTIONS = {
  generateReport: true,
  generateExplainability: true,
  generatePdf: false,
};


/* =========================================
   ACCEPTED IMAGE LABEL
========================================= */

export const SUPPORTED_IMAGE_LABEL =
  "JPG, JPEG, PNG, TIFF";


/* =========================================
   APPLICATION DISCLAIMERS
========================================= */

export const DISCLAIMER_TITLE =
  "Research / Educational Use";

export const DISCLAIMER_TEXT =
  "Screening results should be reviewed by a qualified ophthalmologist or eye-care professional before clinical decisions are made.";
