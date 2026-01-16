import { useState, useCallback } from "react";
import axiosInstance from "../config/axios.config";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async ({ url, method = "GET", data, params ,headers }) => {
    setLoading(true);
    setError(null);
 
    try {
      const response = await axiosInstance({
        url,
        method,
        data,
        params,
        headers
      });


      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};
