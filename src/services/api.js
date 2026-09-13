
import axios from "axios";


const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,

  headers: {
    Accept: "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (!error.response) {
      error.message =
        "Unable to connect to the screening server.";
    }

    return Promise.reject(error);
  }
);


export const checkHealth = async () => {
  const response = await api.get("/health");

  return response.data;
};


export const screenFundusImage = async (
  file,
  options = {}
) => {
  if (!file) {
    throw new Error(
      "Fundus image is required."
    );
  }


  const formData = new FormData();

  formData.append("image", file);


  if (options.generateReport !== undefined) {
    formData.append(
      "generate_report",
      String(options.generateReport)
    );
  }


  if (options.generateExplainability !== undefined) {
    formData.append(
      "generate_explainability",
      String(options.generateExplainability)
    );
  }


  if (options.generatePdf !== undefined) {
    formData.append(
      "generate_pdf",
      String(options.generatePdf)
    );
  }


  const response = await api.post(
    "/screen",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );


  return response.data;
};


export const getScreening = async (
  screeningId
) => {
  if (!screeningId) {
    throw new Error(
      "Screening ID is required."
    );
  }


  const response = await api.get(
    `/screen/${screeningId}`
  );


  return response.data;
};


export const downloadScreeningReport = async (
  screeningId
) => {
  if (!screeningId) {
    throw new Error(
      "Screening ID is required."
    );
  }


  const response = await api.get(
    `/screen/${screeningId}/report`,
    {
      responseType: "blob",
    }
  );


  return response;
};


export const downloadScreeningPdf = async (
  screeningId
) => {
  if (!screeningId) {
    throw new Error(
      "Screening ID is required."
    );
  }


  const response = await api.get(
    `/screen/${screeningId}/report/pdf`,
    {
      responseType: "blob",
    }
  );


  return response;
};


export const getScreeningStatus = async (
  screeningId
) => {
  if (!screeningId) {
    throw new Error(
      "Screening ID is required."
    );
  }


  const response = await api.get(
    `/screen/${screeningId}/status`
  );


  return response.data;
};


export default api;

