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
        console.log("🚀 ~ file: useKeyWordInfo.ts ~ error", error);
        return Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 17 * 1000);
      },
    }
  );

  if (error) {
    console.dir(
      "🚀 ~ file: useKeyWordInfo.ts ~ line 34 ~ useKeyWordInfo ~ error",
      error
    );
  }

  let games;
  if (data) {
    games = data.map((game: any) => ({
      icon: game.icon,
      url: game.url,
      title: game.title,
    }));
  }

  return { isLoading, isError, games, error, isFetching };
}

export { useKeyWordInfo };
