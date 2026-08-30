export const useFetchWithRefresh = () => {
  const fetchWithRefresh = async (url, options = {}) => {
    const requestOptions = { ...options, credentials: "include" };

    let response = await fetch(url, requestOptions);

    if (response.status === 401) {
      const refresh = await fetch(`${import.meta.env.VITE_API_URL}/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (refresh.ok) {
        response = await fetch(url, requestOptions);
      }
    }

    return response;
  };

  return {
    fetchWithRefresh,
  };
};
