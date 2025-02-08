import { LaunchType } from "@/components/playground/hooks";
import { LIMIT_SCROLL, STATUS } from "@/utils/constants";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type SpaceXQuery = {
  name?: { $regex: string; $options: string };
  success?: boolean;
  upcoming?: boolean;
};

export const useSpaceX = () => {
  const [launches, setLaunches] = useState<LaunchType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      setIsLoading(true);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();

      const queryObj: SpaceXQuery = {};
      const lowerQuery = query.toLowerCase();

      if (query && !STATUS.includes(lowerQuery)) {
        queryObj.name = { $regex: query, $options: "i" };
      }

      if (lowerQuery === "success") {
        queryObj.success = true;
      } else if (lowerQuery === "failure" || lowerQuery === "failed") {
        queryObj.success = false;
      } else if (lowerQuery === "upcoming") {
        queryObj.upcoming = true;
      }

      try {
        const response = await axios.post(
          "https://api.spacexdata.com/v4/launches/query",
          {
            query: queryObj,
            options: {
              limit: LIMIT_SCROLL,
              page,
            },
          },
          { signal: controllerRef.current.signal }
        );

        setLaunches(
          (prev) =>
            page === 1 ? response.data.docs : [...prev, ...response.data.docs] // Reset on new search
        );
        setHasMore(response.data.docs.length === LIMIT_SCROLL);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching data:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunches();

    return () => controllerRef.current?.abort();
  }, [page, query]);

  return {
    launches,
    isLoading,
    hasMore,
    setPage,
    setQuery: (newQuery: string) => {
      setQuery(newQuery);
      setPage(1);
    },
  };
};
