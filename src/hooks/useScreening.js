
import { useCallback, useState } from "react";

import api from "../services/api";


const useScreening = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);


  const resetScreening = useCallback(() => {
    setResult(null);
    setLoading(false);
    setError("");
    setProgress(0);
  }, []);


  const startScreening = useCallback(async (file) => {
    if (!file) {
      const message =
        "Please select a fundus image before starting screening.";

      setError(message);

      throw new Error(message);
    }


    setLoading(true);
    setError("");
    setResult(null);
    setProgress(5);


    const formData = new FormData();

    formData.append("image", file);


    try {
      setProgress(15);


      const response = await api.post(
        "/screen",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          timeout: 120000,

          onUploadProgress: (event) => {
            if (!event.total) {
              return;
            }

            const uploadPercent =
              Math.round(
                (event.loaded / event.total) * 35
              );

            setProgress(
              Math.min(
                15 + uploadPercent,
                50
              )
            );
          },
        }
      );


      setProgress(75);


      const responseData = response?.data;


      if (!responseData) {
        throw new Error(
          "The screening server returned an empty response."
        );
      }


      const screeningResult =
        responseData.result ||
        responseData.data ||
        responseData;


      setProgress(100);
      setResult(screeningResult);

      setLoading(false);

      return screeningResult;

    } catch (requestError) {

      setLoading(false);
      setProgress(0);


      const serverMessage =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        requestError?.response?.data?.detail;


      const message =
        serverMessage ||
        requestError?.message ||
        "Unable to connect to the screening server.";


      setError(String(message));

      throw new Error(String(message));

    }
  }, []);


  const getScreeningResult = useCallback(async (screeningId) => {
    if (!screeningId) {
      return null;
    }


    try {

      const response = await api.get(
        `/screen/${screeningId}`
      );


      const responseData = response?.data;


      const screeningResult =
        responseData?.result ||
        responseData?.data ||
        responseData;


      setResult(screeningResult);

      return screeningResult;

    } catch (requestError) {

      const message =
        requestError?.response?.data?.message ||
        requestError?.response?.data?.error ||
        requestError?.message ||
        "Unable to retrieve screening result.";


      setError(String(message));

      throw new Error(String(message));

    }
  }, []);


  return {
    startScreening,
    getScreeningResult,
    resetScreening,
    result,
    loading,
    error,
    progress,
  };
};


export default useScreening;
