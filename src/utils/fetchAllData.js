import axios from "axios";

// const fetchAllData = async (
//   url,
//   config = {},
//   setIsLoading = null,
//   setError = null
// ) => {
//   let page = 1;
//   let aggregateData = [];
//   let total = Infinity;

//   if (setIsLoading) setIsLoading(true);
//   console.log("url is: ", url);

//   try {
//     while (aggregateData.length < total) {
//       // const timestamp = Date.now();

//       // Construct the full URL with cache-busting param
//       const requestUrl = `${url}${page}$`;

//       const response = await axios.get(requestUrl, {
//         headers: {
//           "Cache-Control": "no-cache"
//         }
//       });
//       const { tickets, pagination } = response.data;

//       const newTotal = pagination.total;

//       // Reset error if successful
//       if (setError) setError(null);

//       aggregateData = [...aggregateData, ...tickets];
//       total = newTotal;

//       if (aggregateData.length >= total) break;

//       page++;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     if (setError) setError(error);
//   } finally {
//     if (setIsLoading) setIsLoading(false);
//   }

//   console.log("aggregateData is:", aggregateData);
//   return aggregateData;
// };

// export default fetchAllData;

// import axios from "axios";

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

      const { tickets, pagination } = response.data;

      const newTotal = pagination.total;

      if (setError) setError(null);

      aggregateData = [...aggregateData, ...tickets];
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
