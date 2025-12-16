import { useState, useCallback } from "react";
import axios from "axios";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async ({ url, method = "GET", data, params }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        data,
        params,
      });

      return response.data; // ✅ return data
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
};
