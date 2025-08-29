import { useEffect, useState } from "react";

export default function useFetch(FetchFn, initialValue) {
  // Handling fetching, loading, error
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // Define function to fetch data, handle loading & errors.
    async function fetchData() {
      // Set loading
      setIsFetching(true);
      // Call FetchFn to get data & place that data in fetchedData state
      try {
        const data = await FetchFn();
        setFetchedData(data);

        // Catch error and display error.message or string
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }
      // Set loading to false
      setIsFetching(false);
    }

    // Call function.
    fetchData();

    /* Otherwise if the parent component passes a different function to useFetch, 
    the effect wouldn't re-run. */
  }, [FetchFn]);

  // Exposes 3 state values (fetched data, loading, errors)
  return {
    fetchedData,
    isFetching,
    error,
  };
}
