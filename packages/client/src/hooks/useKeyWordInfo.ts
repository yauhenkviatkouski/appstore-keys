import { useState } from "react";
import { useQuery } from "react-query";

export type GameInfoType = {
  icon?: string;
  url?: string;
  title?: string;
};

class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

function useKeyWordInfo(keyWord: string, country: string) {
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [delaySeconds, setDelaySeconds] = useState(0);
  const { isLoading, isError, data, error, isFetching } = useQuery(
    `api/keys/${keyWord}?country=${country}`,
    async () => {
      const response = await fetch(`api/keys/${keyWord}?country=${country}`);
      if (!response.ok) throw new FetchError(response);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      retry: 50,
      retryDelay: (attempt: number, error: any) => {
        setAttemptNumber(attempt);
        setDelaySeconds(Math.min(attempt > 1 ? 2 ** attempt : 1, 200 * 1));
        return Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 200 * 1000);
      },
    }
  );

  let games;
  if (data) {
    games = data.map((game: any) => ({
      icon: game.icon,
      url: game.url,
      title: game.title,
    }));
  }

  return {
    isLoading,
    isError,
    games,
    error,
    isFetching,
    attemptNumber,
    delaySeconds,
  };
}

export { useKeyWordInfo };
