
import {
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";


const DownloadReport = ({
  result,
  imageName = "fundus-image",
  disabled = false,
}) => {
  const safeResult = result || {};


  const getValue = (object, paths, fallback = null) => {
    for (const path of paths) {
      const parts = path.split(".");

      let current = object;

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


  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return "N/A";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return String(value);
  };


  const getReportData = () => {
    return {
      reportTitle: "Diabetic Retinopathy Screening Report",
      generatedAt: new Date().toISOString(),

      inputImage: getValue(
        safeResult,
        [
          "InputImage",
          "inputImage",
          "imageName",
        ],
        imageName
      ),

      pipelineStatus: getValue(
        safeResult,
        [
          "Status",
          "status",
          "pipelineStatus",
        ],
        "N/A"
      ),

      qualityScore: getValue(
        safeResult,
        [
          "Quality.QualityScore",
          "quality.QualityScore",
          "qualityScore",
        ],
        null
      ),

      qualityClass: getValue(
        safeResult,
        [
          "Quality.QualityClass",
          "quality.QualityClass",
          "qualityClass",
        ],
        "N/A"
      ),

      qualityDecision: getValue(
        safeResult,
        [
          "Quality.QualityDecision",
          "quality.QualityDecision",
          "qualityDecision",
        ],
        "N/A"
      ),

      predictedGrade: getValue(
        safeResult,
        [
          "FinalResult.PredictedGrade",
          "finalResult.PredictedGrade",
          "Classification.PredictedClass",
          "classification.PredictedClass",
          "predictedGrade",
        ],
        "N/A"
      ),

      confidence: getValue(
        safeResult,
        [
          "FinalResult.Confidence",
          "finalResult.Confidence",
          "Classification.Confidence",
          "classification.Confidence",
          "confidence",
        ],
        null
      ),

      referableProbability: getValue(
        safeResult,
        [
          "FinalResult.ReferableProbability",
          "finalResult.ReferableProbability",
          "Classification.ReferableProbability",
          "classification.ReferableProbability",
          "referableProbability",
        ],
        null
      ),

      finalStatus: getValue(
        safeResult,
        [
          "FinalResult.Status",
          "finalResult.Status",
          "FinalStatus",
          "finalStatus",
        ],
        "N/A"
      ),

      recommendation: getValue(
        safeResult,
        [
          "FinalResult.Recommendation",
          "finalResult.Recommendation",
          "ScreeningRecommendation",
          "screeningRecommendation",
          "recommendation",
        ],
        "N/A"
      ),

      processingTime: getValue(
        safeResult,
        [
          "ProcessingTimeSeconds",
          "processingTimeSeconds",
        ],
        null
      ),

      microaneurysms: getValue(
        safeResult,
        [
          "FinalResult.LesionSummary.Microaneurysms",
          "finalResult.LesionSummary.Microaneurysms",
          "Lesions.Microaneurysms",
          "lesions.Microaneurysms",
        ],
        null
      ),

      exudates: getValue(
        safeResult,
        [
          "FinalResult.LesionSummary.Exudates",
          "finalResult.LesionSummary.Exudates",
          "Lesions.Exudates",
          "lesions.Exudates",
        ],
        null
      ),

      hemorrhages: getValue(
        safeResult,
        [
          "FinalResult.LesionSummary.Hemorrhages",
          "finalResult.LesionSummary.Hemorrhages",
          "Lesions.Hemorrhages",
          "lesions.Hemorrhages",
        ],
        null
      ),

      neovascularization: getValue(
        safeResult,
        [
          "FinalResult.LesionSummary.Neovascularization",
          "finalResult.LesionSummary.Neovascularization",
          "Lesions.Neovascularization",
          "lesions.Neovascularization",
        ],
        null
      ),

      opticDiscDetected: getValue(
        safeResult,
        [
          "FinalResult.AnatomySummary.OpticDiscDetected",
          "finalResult.AnatomySummary.OpticDiscDetected",
          "Anatomy.OpticDiscDetected",
          "anatomy.OpticDiscDetected",
        ],
        null
      ),

      foveaDetected: getValue(
        safeResult,
        [
          "FinalResult.AnatomySummary.FoveaDetected",
          "finalResult.AnatomySummary.FoveaDetected",
          "Anatomy.FoveaDetected",
          "anatomy.FoveaDetected",
        ],
        null
      ),

      vesselsDetected: getValue(
        safeResult,
        [
          "FinalResult.AnatomySummary.VesselsDetected",
          "finalResult.AnatomySummary.VesselsDetected",
          "Anatomy.VesselsDetected",
          "anatomy.VesselsDetected",
        ],
        null
      ),
    };
  };


  const downloadBlob = (
    content,
    filename,
    mimeType
  ) => {
    const blob = new Blob(
      [content],
      { type: mimeType }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  const sanitizeFilename = (name) => {
    return String(name)
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .slice(0, 80);
  };


  const createJsonReport = () => {
    const report = getReportData();

    const content = JSON.stringify(
      report,
      null,
      2
    );

    downloadBlob(
      content,
      `${sanitizeFilename(imageName)}_DR_Report.json`,
      "application/json"
    );
  };


  const escapeCsv = (value) => {
    const text = formatValue(value)
      .replace(/"/g, '""');

    return `"${text}"`;
  };


  const createCsvReport = () => {
    const report = getReportData();

    const rows = [
      ["Field", "Value"],

      ["Report Title", report.reportTitle],
      ["Generated At", report.generatedAt],
      ["Input Image", report.inputImage],
      ["Pipeline Status", report.pipelineStatus],

      ["Quality Score", report.qualityScore],
      ["Quality Class", report.qualityClass],
      ["Quality Decision", report.qualityDecision],

      ["Predicted Grade", report.predictedGrade],
      ["Confidence", report.confidence],
      [
        "Referable Probability",
        report.referableProbability,
      ],

      ["Final Status", report.finalStatus],
      ["Recommendation", report.recommendation],
      ["Processing Time Seconds", report.processingTime],

      ["Microaneurysms", report.microaneurysms],
      ["Exudates", report.exudates],
      ["Hemorrhages", report.hemorrhages],
      [
        "Neovascularization",
        report.neovascularization,
      ],

      ["Optic Disc Detected", report.opticDiscDetected],
      ["Fovea Detected", report.foveaDetected],
      ["Vessels Detected", report.vesselsDetected],
    ];


    const csv = rows
      .map((row) =>
        row.map(escapeCsv).join(",")
      )
      .join("\n");


    downloadBlob(
      csv,
      `${sanitizeFilename(imageName)}_DR_Report.csv`,
      "text/csv;charset=utf-8"
    );
  };


  const createHtmlReport = () => {
    const report = getReportData();

    const qualityPercent =
      typeof report.qualityScore === "number"
        ? (report.qualityScore * 100).toFixed(1)
        : "N/A";

    const confidencePercent =
      typeof report.confidence === "number"
        ? (report.confidence * 100).toFixed(1)
        : "N/A";

    const referablePercent =
      typeof report.referableProbability === "number"
        ? (report.referableProbability * 100).toFixed(1)
        : "N/A";


    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>DR Screening Report</title>

<style>
body {
  margin: 0;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  color: #172033;
  background: #f5f8fc;
}

.report {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;

  background: white;

  border: 1px solid #e2e8f0;
  border-radius: 18px;

  box-shadow: 0 10px 30px rgba(15,23,42,0.08);
}

h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.subtitle {
  margin-bottom: 30px;
  color: #64748b;
}

.section {
  margin-top: 26px;
}

.section h2 {
  margin-bottom: 12px;
  font-size: 17px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 11px 12px;
  border-bottom: 1px solid #edf2f7;
  vertical-align: top;
}

td:first-child {
  width: 38%;
  font-weight: 700;
  color: #475569;
}

.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1e40af;
  font-weight: 700;
  font-size: 13px;
}

.warning {
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
  line-height: 1.6;
}

@media print {
  body {
    padding: 0;
    background: white;
  }

  .report {
    border: none;
    box-shadow: none;
  }
}
</style>
</head>

<body>

<div class="report">

<h1>Diabetic Retinopathy Screening Report</h1>

<div class="subtitle">
AI-assisted retinal fundus screening analysis
</div>

<div class="section">
<h2>Screening Summary</h2>

<table>
<tr>
<td>Input Image</td>
<td>${formatValue(report.inputImage)}</td>
</tr>

<tr>
<td>Pipeline Status</td>
<td>${formatValue(report.pipelineStatus)}</td>
</tr>

<tr>
<td>Predicted Grade</td>
<td><strong>${formatValue(report.predictedGrade)}</strong></td>
</tr>

<tr>
<td>Final Status</td>
<td>
<span class="status">
${formatValue(report.finalStatus)}
</span>
</td>
</tr>

<tr>
<td>Recommendation</td>
<td>${formatValue(report.recommendation)}</td>
</tr>
</table>

</div>


<div class="section">
<h2>Image Quality</h2>

<table>
<tr>
<td>Quality Score</td>
<td>${qualityPercent}%</td>
</tr>

<tr>
<td>Quality Class</td>
<td>${formatValue(report.qualityClass)}</td>
</tr>

<tr>
<td>Quality Decision</td>
<td>${formatValue(report.qualityDecision)}</td>
</tr>
</table>

</div>


<div class="section">
<h2>Model Metrics</h2>

<table>
<tr>
<td>Confidence</td>
<td>${confidencePercent}%</td>
</tr>

<tr>
<td>Referable Probability</td>
<td>${referablePercent}%</td>
</tr>

<tr>
<td>Processing Time</td>
<td>${formatValue(report.processingTime)} seconds</td>
</tr>
</table>

</div>


<div class="section">
<h2>Lesion Analysis</h2>

<table>
<tr>
<td>Microaneurysms</td>
<td>${formatValue(report.microaneurysms)}</td>
</tr>

<tr>
<td>Exudates</td>
<td>${formatValue(report.exudates)}</td>
</tr>

<tr>
<td>Hemorrhages</td>
<td>${formatValue(report.hemorrhages)}</td>
</tr>

<tr>
<td>Neovascularization</td>
<td>${formatValue(report.neovascularization)}</td>
</tr>
</table>

</div>


<div class="section">
<h2>Retinal Anatomy</h2>

<table>
<tr>
<td>Optic Disc Detected</td>
<td>${formatValue(report.opticDiscDetected)}</td>
</tr>

<tr>
<td>Fovea Detected</td>
<td>${formatValue(report.foveaDetected)}</td>
</tr>

<tr>
<td>Vessels Detected</td>
<td>${formatValue(report.vesselsDetected)}</td>
</tr>
</table>

</div>


<div class="warning">
<strong>Research / Educational Use:</strong>
This screening output is not a clinical diagnosis. Results should be
reviewed by a qualified eye-care professional before making clinical
decisions.
</div>

</div>

</body>
</html>
`;
  };


  const createPrintableReport = () => {
    const html = createHtmlReport();

    const printWindow = window.open(
      "",
      "_blank",
      "width=1000,height=800"
    );

    if (!printWindow) {
      return;
    }

    printWindow.document.open();

    printWindow.document.write(html);

    printWindow.document.close();

    printWindow.focus();

    printWindow.onload = () => {
      printWindow.print();
    };
  };


  return (
    <div className="download-report">

      <div className="download-report-content">

        <div className="download-report-icon">
          <FileText size={20} />
        </div>

        <div>
          <div className="download-report-title">
            Screening Report
          </div>

          <div className="download-report-text">
            Download or print the current analysis
          </div>
        </div>

      </div>


      <div className="download-report-actions">

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={createJsonReport}
          disabled={disabled || !result}
          title="Download JSON report"
        >
          <FileJson size={15} />
          JSON
        </button>


        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={createCsvReport}
          disabled={disabled || !result}
          title="Download CSV report"
        >
          <FileSpreadsheet size={15} />
          CSV
        </button>


        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={createPrintableReport}
          disabled={disabled || !result}
          title="Print or save as PDF"
        >
          <Printer size={15} />
          Print / PDF
        </button>


        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={createHtmlReport}
          disabled={disabled || !result}
          title="Download HTML report"
        >
          <Download size={15} />
          HTML
        </button>

      </div>

    </div>
  );
};


export default DownloadReport;
