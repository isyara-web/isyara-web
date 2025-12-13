'use client';

import { useState, useCallback } from 'react';

/**
 * Custom hook for API calls
 * @returns {object} - { loading, error, callApi }
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const fullUrl = url.startsWith('http') ? url : `${apiUrl}${url}`;

      // Don't set Content-Type for FormData, let browser set it
      const isFormData = options.body instanceof FormData;
      const headers = isFormData
        ? { ...options.headers }
        : {
            'Content-Type': 'application/json',
            ...options.headers,
          };

      const response = await fetch(fullUrl, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setLoading(false);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      setLoading(false);
      return { data: null, error: errorMessage };
    }
  }, []);

  return {
    loading,
    error,
    callApi
  };
};

export default useApi;

