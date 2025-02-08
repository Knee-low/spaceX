import { useCallback, useEffect, useRef, useState } from "react";
import { useSpaceX } from "@/api/useSpaceX/useSpaceX";
import { debounce } from "lodash";

export interface LaunchType {
  id: string;
  name: string;
  success: boolean;
}

export const useHooks = () => {
  const [showButtomMessage, setShowButtomMessage] = useState<boolean>(false);
  const onChangeInput = (input: string) => {
    setQuery(input);
  };

  const { launches, isLoading, hasMore, setPage, setQuery } = useSpaceX();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastLaunchRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Loading next page...");
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPage]
  );

  // scroll logger
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(() => {
      const container = document.getElementById("scroll-container");
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (!hasMore)
        setShowButtomMessage(scrollTop + clientHeight >= scrollHeight - 5);
    }, 100),
    [hasMore]
  );

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {
    launches,
    isLoading,
    lastLaunchRef,
    hasMore,
    showButtomMessage,
    onChangeInput,
  };
};
