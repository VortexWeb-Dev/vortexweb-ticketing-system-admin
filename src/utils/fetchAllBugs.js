import axios from "axios";

const fetchAllData = async (
  url,
  config = {},
  setIsLoading = null,
  setError = null
) => {
  let page = 1;
  let aggregateData = [];
  let total = Infinity;

  if (setIsLoading) setIsLoading(true);

  try {
    while (aggregateData.length < total) {
      const timestamp = Date.now(); // Cache-busting param
      const requestUrl = `${url}${page}?$cb=${timestamp}`;

      const response = await axios.get(requestUrl, {
        headers: {
          "Cache-Control": "no-cache"
        }
      });

      const { bugs, pagination } = response.data;

      const newTotal = pagination.total;

      if (setError) setError(null);

      aggregateData = [...aggregateData, ...bugs];
      total = newTotal;

      if (aggregateData.length >= total) break;

      page++;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    if (setError) setError(error);
  } finally {
    if (setIsLoading) setIsLoading(false);
  }

  return aggregateData;
};

export default fetchAllData;
