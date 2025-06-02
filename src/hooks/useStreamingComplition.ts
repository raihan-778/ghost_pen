import { useCallback, useState } from "react";

export function useStreamingCompletion(apiEndpoint: string) {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(
    async (prompt: string = "") => {
      setIsLoading(true);
      setCompletion("");
      setError(null);

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader!.read();
          done = readerDone;

          const chunk = decoder.decode(value);
          setCompletion((prev) => prev + chunk);
        }

        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error)
          console.error("Streaming error:", err.message);
        setError("Failed to load response.");
        setIsLoading(false);
      }
    },
    [apiEndpoint]
  );

  return { complete, completion, isLoading, error };
}
