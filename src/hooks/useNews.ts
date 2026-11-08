import { useEffect, useState } from "react";
import { getNews, type News } from "../services/newsService";

export function useNews(query = "") {
  const [result, setResult] = useState<{
    query: string;
    data: News[];
    source: string;
    error: string;
  } | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    getNews(new URLSearchParams(query), controller.signal)
      .then((response) => {
        setResult({ query, ...response, error: "" });
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError")
          setResult({ query, data: [], source: "", error: error.message });
      });
    return () => controller.abort();
  }, [query, attempt]);
  return {
    news: result?.data ?? [],
    source: result?.source ?? "",
    error: result?.error ?? "",
    loading: !result || result.query !== query,
    retry: () => {
      setResult(null);
      setAttempt((n) => n + 1);
    },
  };
}
